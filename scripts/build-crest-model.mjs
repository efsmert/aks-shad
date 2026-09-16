// Reconstruct a closed bas-relief from the original transparent chapter mark.
// Run with: node scripts/build-crest-model.mjs
import sharp from 'sharp';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { mkdir, writeFile } from 'node:fs/promises';

const gold = process.argv.includes('--gold');
const basename = `aks-lion-relief${gold ? '-gold' : ''}`;
const crop = { left: 486, top: 125, width: 1136, height: 1660 };
const width = 600;
const density = width / 360;
const { data, info } = await sharp('public/metal-rounded.png').extract(crop).resize({ width }).raw().toBuffer({ resolveWithObject: true });
// Broad sculpted planes: do not turn the source's brushed highlights into dents.
const { data: smooth } = await sharp(data, { raw: info }).blur(4 * density).raw().toBuffer({ resolveWithObject: true });
const height = info.height, count = width * height;
const coverage = new Float32Array(count), distance = new Float32Array(count), relief = new Float32Array(count);
const threshold = 96;
for (let i = 0; i < count; i++) {
  const j = i * 4;
  const luminance = (data[j] + data[j + 1] + data[j + 2]) / 3;
  coverage[i] = Math.min(data[j + 3], luminance * 8);
  distance[i] = coverage[i] > threshold ? 10000 : 0;
}
// Chamfer distance gives rounded bevels along the lion, mane cutouts, and text.
for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
  const i = y * width + x;
  distance[i] = Math.min(distance[i], distance[i - 1] + 1, distance[i - width] + 1, distance[i - width - 1] + Math.SQRT2, distance[i - width + 1] + Math.SQRT2);
}
for (let y = height - 2; y > 0; y--) for (let x = width - 2; x > 0; x--) {
  const i = y * width + x;
  distance[i] = Math.min(distance[i], distance[i + 1] + 1, distance[i + width] + 1, distance[i + width + 1] + Math.SQRT2, distance[i + width - 1] + Math.SQRT2);
}
for (let i = 0; i < count; i++) {
  const j = i * 4;
  const light = (smooth[j] + smooth[j + 1] + smooth[j + 2]) / (3 * 255);
  const bevel = 1 - Math.exp(-distance[i] / (3.8 * density));
  relief[i] = 0.025 + bevel * (0.075 + 0.045 * light);
}
// Smooth the distance field's grid steps before generating reflective normals.
const sigma = 1.1 * density, radius = Math.ceil(sigma * 3);
const kernel = Array.from({length: radius * 2 + 1}, (_, i) => Math.exp(-((i - radius) ** 2) / (2 * sigma ** 2)));
const total = kernel.reduce((a, b) => a + b, 0);
const horizontal = new Float32Array(count);
for (let y=0;y<height;y++) for (let x=0;x<width;x++) {
  let value=0;
  for(let k=-radius;k<=radius;k++) value += relief[y*width+Math.max(0,Math.min(width-1,x+k))]*kernel[k+radius];
  horizontal[y*width+x]=value/total;
}
for (let y=0;y<height;y++) for (let x=0;x<width;x++) {
  let value=0;
  for(let k=-radius;k<=radius;k++) value += horizontal[Math.max(0,Math.min(height-1,y+k))*width+x]*kernel[k+radius];
  relief[y*width+x]=value/total;
}

const positions = [], indices = [], vertices = new Map();
const scale = 3.6 / height;
const vertex = p => {
  const key = `${p.x.toFixed(5)},${p.y.toFixed(5)}`;
  if (vertices.has(key)) return vertices.get(key);
  const index = positions.length / 3;
  positions.push((p.x - width / 2) * scale, (height / 2 - p.y) * scale, p.z);
  vertices.set(key, index);
  return index;
};
function clippedTriangle(points, edgeHeight = 0.025) {
  const polygon = [];
  for (let n = 0; n < 3; n++) {
    const a = points[n], b = points[(n + 1) % 3];
    const insideA = a.c > threshold, insideB = b.c > threshold;
    if (insideA) polygon.push(a);
    if (insideA !== insideB) {
      const t = (threshold - a.c) / (b.c - a.c);
      polygon.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: edgeHeight, c: threshold });
    }
  }
  for (let n = 1; n < polygon.length - 1; n++) {
    const a = polygon[0], b = polygon[n], c = polygon[n + 1];
    if (Math.abs((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x)) < 0.000001) continue;
    const ids = [vertex(a), vertex(b), vertex(c)];
    if (new Set(ids).size === 3) indices.push(...ids);
  }
}
const point = (x,y) => ({x,y,c:coverage[y*width+x],z:relief[y*width+x]});
for (let y = 0; y < height - 1; y++) for (let x = 0; x < width - 1; x++) {
  const a=point(x,y),b=point(x+1,y),c=point(x,y+1),d=point(x+1,y+1);
  if (Math.max(a.c,b.c,c.c,d.c)<=threshold) continue;
  clippedTriangle([a,c,b]); clippedTriangle([b,c,d]);
}
const frontCount = positions.length / 3;
const frontIndices = [...indices];
const boundary = new Map();
for (let i = 0; i < frontIndices.length; i += 3) {
  for (let n = 0; n < 3; n++) {
    const a = frontIndices[i+n], b = frontIndices[i+(n+1)%3];
    const key = a < b ? `${a}:${b}` : `${b}:${a}`;
    if (boundary.has(key)) boundary.delete(key); else boundary.set(key,[a,b]);
  }
}
const frontIndexCount = indices.length;
for(let i=0;i<frontCount;i++) positions.push(positions[i*3],positions[i*3+1],-0.065);
for(let i=0;i<frontIndices.length;i+=3) indices.push(frontIndices[i]+frontCount,frontIndices[i+2]+frontCount,frontIndices[i+1]+frontCount);
// Separate side vertices keep the polished face and darker machined rim distinct.
for(const [a,b] of boundary.values()) {
  const base=positions.length/3;
  for(const [i,z] of [[b,positions[b*3+2]],[a,positions[a*3+2]],[a,-0.065],[b,-0.065]]) positions.push(positions[i*3],positions[i*3+1],z);
  indices.push(base,base+1,base+2,base,base+2,base+3);
}
// Recessed dark backing follows the source alpha silhouette, including the
// dark eye and mane channels that were previously open onto the green page.
const backingStart = indices.length;
vertices.clear();
const backingPoint = (x,y) => ({x,y,c:data[(y*width+x)*4+3],z:-0.067});
for (let y=0;y<height-1;y++) for (let x=0;x<width-1;x++) {
  const a=backingPoint(x,y),b=backingPoint(x+1,y),c=backingPoint(x,y+1),d=backingPoint(x+1,y+1);
  if (Math.max(a.c,b.c,c.c,d.c)<=threshold) continue;
  clippedTriangle([a,c,b],-0.067); clippedTriangle([b,c,d],-0.067);
}
const geometry = new BufferGeometry();
geometry.setAttribute('position',new Float32BufferAttribute(positions,3));
geometry.setIndex(indices); geometry.computeVertexNormals(); geometry.computeBoundingBox();
const normalAttribute = geometry.getAttribute('normal');
for (let i = 0; i < normalAttribute.count; i++) {
  if (Math.hypot(normalAttribute.getX(i), normalAttribute.getY(i), normalAttribute.getZ(i)) < 0.5) normalAttribute.setXYZ(i, 0, 0, 1);
}
const pos=new Float32Array(positions), normals=geometry.getAttribute('normal').array, idx=new Uint32Array(indices);
const chunks=[Buffer.from(pos.buffer),Buffer.from(normals.buffer),Buffer.from(idx.buffer)];
let offset=0;
const bufferViews=chunks.map((b,i)=>{const view={buffer:0,byteOffset:offset,byteLength:b.length,target:i===2?34963:34962};offset+=b.length;return view;});
const box=geometry.boundingBox;
const gltf={
 asset:{version:'2.0',generator:'AKS relief reconstruction'},scene:0,scenes:[{nodes:[0]}],
 nodes:[{mesh:0,name:'Alpha Kappa Sigma — lion and letters'}],
 meshes:[{name:gold ? 'Closed gold relief' : 'Closed silver relief',primitives:[
  {attributes:{POSITION:0,NORMAL:1},indices:2,material:0},
  {attributes:{POSITION:0,NORMAL:1},indices:3,material:1},
  {attributes:{POSITION:0,NORMAL:1},indices:4,material:2}
 ]}],
 materials:[
  {name:gold ? 'Satin gold — polished face' : 'Satin silver — polished face',pbrMetallicRoughness:{baseColorFactor:gold ? [0.83,0.58,0.24,1] : [0.66,0.69,0.70,1],metallicFactor:1,roughnessFactor:gold ? 0.3 : 0.26}},
  {name:gold ? 'Brushed gold — back and rim' : 'Brushed graphite — back and rim',pbrMetallicRoughness:{baseColorFactor:gold ? [0.38,0.23,0.08,1] : [0.25,0.28,0.29,1],metallicFactor:1,roughnessFactor:0.34}},
  {name:'Dark recessed backing',doubleSided:true,pbrMetallicRoughness:{baseColorFactor:[0.003,0.004,0.003,1],metallicFactor:0,roughnessFactor:1}}
 ],
 buffers:[{byteLength:offset}],bufferViews,
 accessors:[
  {bufferView:0,componentType:5126,count:pos.length/3,type:'VEC3',min:box.min.toArray(),max:box.max.toArray()},
  {bufferView:1,componentType:5126,count:normals.length/3,type:'VEC3'},
  {bufferView:2,componentType:5125,count:frontIndexCount,type:'SCALAR',byteOffset:0},
  {bufferView:2,componentType:5125,count:backingStart-frontIndexCount,type:'SCALAR',byteOffset:frontIndexCount*4},
  {bufferView:2,componentType:5125,count:indices.length-backingStart,type:'SCALAR',byteOffset:backingStart*4}
 ],
 extras:{source:'public/metal-rounded.png',description:'Reconstructed bas-relief with original lion and Greek-letter silhouettes; inferred depth, closed back, and PBR metal surfaces.'}
};
let json=Buffer.from(JSON.stringify(gltf));json=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);
const binary=Buffer.concat(chunks);
const header=Buffer.alloc(12);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(12+8+json.length+8+binary.length,8);
const jsonHeader=Buffer.alloc(8);jsonHeader.writeUInt32LE(json.length,0);jsonHeader.writeUInt32LE(0x4e4f534a,4);
const binHeader=Buffer.alloc(8);binHeader.writeUInt32LE(binary.length,0);binHeader.writeUInt32LE(0x004e4942,4);
await mkdir('public/models',{recursive:true});
const fullModel = Buffer.concat([header,jsonHeader,json,binHeader,binary]);
await writeFile(`public/models/${basename}.glb`, fullModel);
await mkdir('artifacts', { recursive: true });
await writeFile(`artifacts/${basename}-full.glb`, fullModel);
console.log({vertices:pos.length/3,triangles:indices.length/3,bytes:header.readUInt32LE(8),bounds:[box.min.toArray(),box.max.toArray()]});

// Simplify and compress the web copy without baking lighting into a texture.
const { NodeIO } = await import('@gltf-transform/core');
const { ALL_EXTENSIONS } = await import('@gltf-transform/extensions');
const { weld, simplify, meshopt } = await import('@gltf-transform/functions');
const { MeshoptEncoder, MeshoptDecoder, MeshoptSimplifier } = await import('meshoptimizer');
await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready, MeshoptSimplifier.ready]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
const doc = await io.read(`public/models/${basename}.glb`);
await doc.transform(weld(), simplify({ simplifier: MeshoptSimplifier, ratio: 0.35, error: 0.00015, lockBorder: true }), meshopt({ encoder: MeshoptEncoder, level: 'high' }));
await io.write(`public/models/${basename}.glb`, doc);
