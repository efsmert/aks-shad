// Inline, geometry-matched silhouette for the homepage's first HTML paint.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dequantize } from '@gltf-transform/functions';
import { MeshoptDecoder } from 'meshoptimizer';
import { Matrix4, Vector3, Box3 } from 'three';
await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder});
const doc = await io.read('public/models/aks-lion-relief-gold-smooth.glb');
await doc.transform(dequantize());
const bounds = new Box3();
const surfaces = [];
for(const node of doc.getRoot().listNodes()) {
 const mesh=node.getMesh(); if(!mesh)continue;
 const matrix=new Matrix4().fromArray(node.getWorldMatrix());
 for(const primitive of mesh.listPrimitives()) {
  const pos=primitive.getAttribute('POSITION').getArray();
  const vertices=[];
  for(let i=0;i<pos.length;i+=3){const v=new Vector3(pos[i],pos[i+1],pos[i+2]).applyMatrix4(matrix);vertices.push(v);bounds.expandByPoint(v);}
  surfaces.push({vertices,indices:primitive.getIndices().getArray()});
 }
}
const center=bounds.getCenter(new Vector3());
const paths=[];
for(const {vertices,indices} of surfaces) {
 const edges=new Map();
 for(let i=0;i<indices.length;i+=3)for(let j=0;j<3;j++) {
  const a=indices[i+j],b=indices[i+(j+1)%3],key=a<b?`${a},${b}`:`${b},${a}`;
  if(edges.has(key))edges.delete(key);else edges.set(key,[a,b]);
 }
 const next=new Map();
 for(const [a,b] of edges.values()){if(!next.has(a))next.set(a,[]);next.get(a).push(b);if(!next.has(b))next.set(b,[]);next.get(b).push(a);}
 const commands=[];
 const point=i=>`${((vertices[i].x-center.x)*200).toFixed(2)},${(-(vertices[i].y-center.y)*200).toFixed(2)}`;
 while(next.size){const start=next.keys().next().value;let current=start;let count=0;commands.push('M'+point(start));
 do{const choices=next.get(current);if(!choices?.length)throw new Error('Open silhouette boundary');const to=choices.pop();if(!choices.length)next.delete(current);const reverse=next.get(to);reverse.splice(reverse.indexOf(current),1);if(!reverse.length)next.delete(to);current=to;commands.push('L'+point(current));if(++count>edges.size+1)throw new Error('Invalid boundary');}while(current!==start);commands.push('Z');}
 if(commands.length)paths.push(commands.join(''));
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-450 -450 900 900" width="1080" height="1080">${paths.map(d=>`<path d="${d}" fill="black" fill-rule="evenodd"/>`).join('')}</svg>`;
const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile('src/components/home/crest-silhouette.ts', '// Generated from the smoothed crest. Regenerate with node scripts/build-crest-silhouette.mjs.\nexport const CREST_SILHOUETTE = '+JSON.stringify('data:image/png;base64,'+png.toString('base64'))+';\n');
console.log({bytes:png.length});
