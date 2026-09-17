// Smooth only the side-wall normals; preserve all source geometry and materials.
// Run after build-crest-model.mjs --gold --smooth; refines only the new copy.
import assert from 'node:assert/strict';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { dequantize } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready]);
const source = 'public/models/aks-lion-relief-gold-smooth.glb';
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
    'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder,
});
const doc = await io.read(source);
await doc.transform(dequantize());
const primitive = doc.getRoot().listMeshes()[0].listPrimitives()[1];
const positions = primitive.getAttribute('POSITION').getArray();
const normals = primitive.getAttribute('NORMAL').getArray();
const before = new Float32Array(normals);
// A local normal filter removes sampling chatter without moving any vertices.
const radius = 0.024, sigma = 0.01;
const buckets = new Map(), points = new Map();
for (let i = 0; i < positions.length; i += 3) {
    if (Math.abs(before[i + 2]) > 0.1) continue;
    const x = positions[i], y = positions[i + 1];
    const key = `${x.toFixed(6)},${y.toFixed(6)}`;
    let point = points.get(key);
    if (!point) {
        point = { x, y, nx: 0, ny: 0, count: 0 };
        points.set(key, point);
        const cell = `${Math.floor(x / radius)},${Math.floor(y / radius)}`;
        if (!buckets.has(cell)) buckets.set(cell, []);
        buckets.get(cell).push(point);
    }
    point.nx += before[i]; point.ny += before[i + 1]; point.count++;
}
for (const p of points.values()) { p.nx /= p.count; p.ny /= p.count; }
let changed = 0;
for (let i = 0; i < positions.length; i += 3) {
    if (Math.abs(before[i + 2]) > 0.1) continue;
    const x = positions[i], y = positions[i + 1];
    const cx = Math.floor(x / radius), cy = Math.floor(y / radius);
    let nx = 0, ny = 0;
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
        for (const p of buckets.get(`${cx + dx},${cy + dy}`) || []) {
            const dist2 = (p.x - x) ** 2 + (p.y - y) ** 2;
            if (dist2 > radius ** 2) continue;
            const weight = Math.exp(-dist2 / (2 * sigma ** 2));
            nx += p.nx * weight; ny += p.ny * weight;
        }
    }
    const length = Math.hypot(nx, ny);
    if (length > 0.001) { normals[i] = nx / length; normals[i + 1] = ny / length; normals[i + 2] = 0; changed++; }
}
// Lossless meshopt buffer compression: no re-quantization or geometry simplification.
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.FILTER });
const output = 'public/models/aks-lion-relief-gold-smooth.glb';
await io.write(output, doc);
const check = await io.read(output);
await check.transform(dequantize());
for (let i = 0; i < 3; i++) {
    const a = doc.getRoot().listMeshes()[0].listPrimitives()[i];
    const b = check.getRoot().listMeshes()[0].listPrimitives()[i];
    assert.deepEqual(b.getAttribute('POSITION').getArray(), a.getAttribute('POSITION').getArray());
}
// This pass refines the separate smooth model; original models are never opened for writing.
console.log({ output, sideVerticesSmoothed: changed, originalModelsPreserved: true });
