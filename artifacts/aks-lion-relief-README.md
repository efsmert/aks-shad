# Alpha Kappa Sigma — 3D lion relief

- `aks-lion-relief-full.glb`: full-resolution, uncompressed glTF 2.0 model for 3D editors.
- `../public/models/aks-lion-relief.glb`: compressed website version, with EXT_meshopt_compression and KHR_mesh_quantization.
- Preview: http://localhost:3000/crest-studio

The geometry reconstructs the lion and Greek-letter silhouettes from `public/metal-rounded.png`. It is a bas-relief with inferred sculpted depth, a closed back, and machined sidewalls; it is not a recovered original 360-degree lion sculpture. The source image is not used as a baked lighting texture.

Two metallic-roughness PBR materials are embedded: satin silver on the face (metalness 1, roughness 0.26) and darker brushed metal on the back and edges (metalness 1, roughness 0.34). Use studio/environment lighting when opening the model in a 3D editor, since metal reflects its environment.

Rebuild the silver models with `node scripts/build-crest-model.mjs` from the project root. Add `--gold` to generate the separate `aks-lion-relief-gold.glb` web model and `aks-lion-relief-gold-full.glb` editor model. Gold uses a satin face (metalness 1, roughness 0.30), darker brushed gold sides (metalness 1, roughness 0.34), and a matte dark recessed backing following the source alpha silhouette. The current generator samples a finer silhouette and smooths the relief before computing normals, so baked highlights are not exaggerated into surface dents. The existing silver files are preserved from the original generation.

The homepage previews gold with a completely stationary emblem. Its default Chromatic lighting follows the site theme: light mode uses broad sunshine, peach, and sea-glass softboxes with a gentle 24-second base sweep; dark mode combines rich gold, flowing rose gold, luminous emerald/jade, and occasional pearl-white accents with overlapping trajectories and a 10-second base sweep. The emerald is brighter and cooler than the forest-green page backdrop; restrained accent intensities preserve depth in the gold. Ambient intensity, light size, colors, speed, and positions blend continuously when toggling themes without restarting the shared phase. The decorative beams blend multiple live light colors along their length and follow separate angle/intensity trajectories on the shared clock; they represent stylized scattered light, not physical refraction through opaque metal.

Actual geometry bounds are centered in an orthographic view, without an added cast shadow. The panel is forest green in light mode and neutral charcoal-bronze in dark mode. Hardware antialiasing plus 2–3× render resolution smooth the silhouette. The studio retains neutral, warm, and cool comparisons and optional turntable/drag controls. Hidden/offscreen scenes pause. Reduced motion freezes the continuous lighting animation but allows a finite theme crossfade. The original image remains a fallback.

Sparse pinpoint glints are raycast onto the polished face. Their strength follows the surface normal and light/view half-vector, with a shared brightness limit and softer daylight treatment. These tiny additive camera highlights approximate a polished facet catching light; they are not embedded diamonds or a physical diffraction simulation, and remain a website rendering effect rather than part of the downloadable model.
