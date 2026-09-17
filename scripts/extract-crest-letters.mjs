// Extract the original letter geometry without cutting any triangles.
// Run from the repository root: node scripts/extract-crest-letters.mjs
import assert from 'node:assert/strict';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dequantize, prune, meshopt } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';

await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
    'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder,
});
const smooth = true;
const source = `aks-lion-relief-gold${smooth ? '-smooth' : ''}.glb`;
const doc = await io.read(`public/models/${source}`);
await doc.transform(dequantize());
const root = doc.getRoot();
const node = root.listNodes()[0];
const mesh = node.getMesh();
const buffer = root.listBuffers()[0];
// The empty band in this source runs from -0.56465 to -0.51216.
const splitY = -0.54;
const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
let triangles = 0;
for (const primitive of mesh.listPrimitives()) {
    const positions = primitive.getAttribute('POSITION').getArray();
    const indices = primitive.getIndices().getArray();
    const kept = [], remap = new Map(), oldVertices = [];
    for (let i = 0; i < indices.length; i += 3) {
        const face = [indices[i], indices[i + 1], indices[i + 2]];
        const below = face.map(index => positions[index * 3 + 1] < splitY);
        assert(below.every(Boolean) || below.every(value => !value), 'Split intersects geometry');
        if (!below[0]) continue;
        for (const index of face) {
            if (!remap.has(index)) { remap.set(index, oldVertices.length); oldVertices.push(index); }
            kept.push(remap.get(index));
        }
    }
    assert(kept.length > 0, 'A source surface is missing from the letters');
    triangles += kept.length / 3;
    for (const semantic of primitive.listSemantics()) {
        const source = primitive.getAttribute(semantic);
        const sourceArray = source.getArray(), size = source.getElementSize();
        const array = new sourceArray.constructor(oldVertices.length * size);
        oldVertices.forEach((old, index) => {
            array.set(sourceArray.subarray(old * size, (old + 1) * size), index * size);
            if (semantic === 'POSITION') for (let axis = 0; axis < 3; axis++) {
                min[axis] = Math.min(min[axis], array[index * size + axis]);
                max[axis] = Math.max(max[axis], array[index * size + axis]);
            }
        });
        primitive.setAttribute(semantic, doc.createAccessor().setType(source.getType())
            .setNormalized(source.getNormalized()).setArray(array).setBuffer(buffer));
    }
    primitive.setIndices(doc.createAccessor().setType('SCALAR').setArray(new Uint32Array(kept)).setBuffer(buffer));
}
const center = min.map((value, axis) => (value + max[axis]) / 2);
for (const primitive of mesh.listPrimitives()) {
    const array = primitive.getAttribute('POSITION').getArray();
    for (let i = 0; i < array.length; i++) array[i] -= center[i % 3];
}
node.setTranslation([0, 0, 0]).setName('Alpha Kappa Sigma — letters only');
mesh.setName('Original gold ΑΚΣ letter relief');
root.setExtras({ source, description: 'Original letters extracted intact, with polished faces, back, rim, and recessed backing.' });
await doc.transform(prune(), meshopt({ encoder: MeshoptEncoder, level: 'high' }));
const output = `public/models/aks-letters-gold${smooth ? '-smooth' : ''}.glb`;
await io.write(output, doc);
const checked = await io.read(output);
assert.equal(checked.getRoot().listMeshes()[0].listPrimitives().length, 3);
assert.equal(checked.getRoot().listMaterials().length, 3);
console.log({ output, triangles, materials: checked.getRoot().listMaterials().map(m => m.getName()) });
