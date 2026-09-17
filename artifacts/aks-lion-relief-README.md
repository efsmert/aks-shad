# Alpha Kappa Sigma — 3D relief

The website uses `public/models/aks-lion-relief-gold-smooth.glb`. The letters-only model is `public/models/aks-letters-gold-smooth.glb`. Both are compressed glTF 2.0 assets using Meshopt. Superseded models have been removed.

The geometry reconstructs the lion and Greek-letter silhouettes from `public/metal-rounded.png`. This is a bas-relief with inferred sculpted depth, a closed back, and smoothed sidewalls, not a recovered 360-degree lion sculpture. The source image is not a baked lighting texture.

Embedded materials are satin gold on the face (metalness 1, roughness 0.30), darker gold on the rim (metalness 1, roughness 0.34), and a matte dark recessed backing. The rim name says “brushed,” but the embedded material has no directional brushing texture.

Rebuild from the project root, in order:

```sh
node scripts/build-crest-model.mjs --gold --smooth
node scripts/smooth-crest-edges.mjs
node scripts/extract-crest-letters.mjs --smooth
```

Uncompressed editor intermediates in `artifacts/*-full.glb` are generated locally and ignored by Git. Only compressed assets belong in deployment.

The homepage keeps the smoothed crest stationary and animates its lighting, with a short emerald reveal. It uses dark mode and stylized colored beams. The source image appears only if the 3D renderer fails. Decorative beams represent scattered light rather than physical refraction through opaque metal.

`/crest-studio` supports crest/letters selection, lighting and material presets, pause and speed controls, a square background color picker, and one-loop 1080 × 1080 MP4 recording. Material previews are runtime changes; the model download retains its embedded gold finish. Studio lighting cycles are periodic for complete loop exports. Recording finalizes the MP4 before triggering a download. `/letters-studio` redirects to the combined studio.
