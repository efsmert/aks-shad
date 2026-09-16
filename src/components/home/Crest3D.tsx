'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

type Lighting = 'showcase' | 'studio' | 'warm' | 'cool';

export default function Crest3D({ studio = false }: { studio?: boolean }) {
    const hostRef = useRef<HTMLDivElement>(null);
    const lightingRef = useRef<Lighting>('showcase');
    const spinningRef = useRef(false);
    const [ready, setReady] = useState(false);
    const [lighting, setLighting] = useState<Lighting>('showcase');
    const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;
        const hero = studio ? null : host.closest<HTMLElement>('.home-hero');
        let disposed = false;
        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
        } catch { return; }
        // Supersample the small relief as well as using hardware edge antialiasing.
        renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio * 1.5, 2), 3));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.95;
        renderer.domElement.setAttribute('aria-hidden', 'true');
        // Capture the silhouette only on resize, not every animation frame.
        // This gives daylight a shaped shadow without another 3D render pass.
        const shadow = hero ? document.createElement('canvas') : null;
        const shadowContext = shadow?.getContext('2d');
        if (shadow) {
            shadow.className = 'crest-object-shadow';
            shadow.setAttribute('aria-hidden', 'true');
            host.appendChild(shadow);
        }
        host.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        // An orthographic view keeps the flat chapter mark optically centered.
        const framing = 2.25;
        const camera = new THREE.OrthographicCamera(-framing, framing, framing, -framing, 0.1, 50);
        camera.position.set(0, 0, 7.1);
        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        // A neutral studio lets the metal itself give the reflections their gold tint.
        room.traverse(object => {
            if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshStandardMaterial) {
                object.material.color.set(0x757a80);
            }
        });
        const softbox = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 12),
            new THREE.MeshBasicMaterial({ color: 0x929aa4, side: THREE.DoubleSide }),
        );
        softbox.position.set(0, 2, 9);
        softbox.lookAt(0, 0, 0);
        room.add(softbox);
        const environment = pmrem.fromScene(room, 0.04);
        room.dispose();
        pmrem.dispose();
        scene.environment = environment.texture;
        // Keep ambient reflection quiet so the traveling softbox reads clearly.
        scene.environmentIntensity = 0.24;
        RectAreaLightUniformsLib.init();
        const key = new THREE.RectAreaLight(0xfff4df, 12, 1.8, 5);
        const fill = new THREE.RectAreaLight(0xcbdcff, 1.2, 4, 5);
        const teal = new THREE.RectAreaLight(0x32dc9b, 7, 1.4, 4);
        const violet = new THREE.RectAreaLight(0xe5a69a, 7, 1.2, 3);
        // A narrow source on the incoming beam's side gives the metal a real
        // corresponding reflection; its pulse shares the existing scene clock.
        const feed = new THREE.RectAreaLight(0xfff5da, 3, 0.45, 1.4);
        feed.position.set(3.4, 0.7, 3);
        feed.lookAt(0, 0.7, 0);
        fill.position.set(-3, 1, 5);
        fill.lookAt(0, 0, 0);
        scene.add(key, fill, teal, violet, feed);
        const group = new THREE.Group();
        scene.add(group);
        const controls = studio ? new OrbitControls(camera, renderer.domElement) : null;
        if (controls) {
            controls.enableDamping = false;
            controls.enablePan = false;
            controls.minDistance = 4.5;
            controls.maxDistance = 10;
            controls.enableZoom = false;
        }
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0, lastFrame = 0, phase = -0.6, visible = true, loaded = false;
        let targetNight = document.documentElement.classList.contains('dark') ? 1 : 0;
        let night = targetNight;
        const mix = THREE.MathUtils.lerp;
        const palette = {
            sun: new THREE.Color('#ffe2ae'), sea: new THREE.Color('#73cdb4'), peach: new THREE.Color('#f1ae91'),
            gold: new THREE.Color('#dba63c'), roseGold: new THREE.Color('#e5a69a'),
            emerald: new THREE.Color('#32dc9b'), jade: new THREE.Color('#8ce8bc'), pearl: new THREE.Color('#fffaf0'),
            dayFill: new THREE.Color('#fff0d5'), nightFill: new THREE.Color('#f4eee3'),
            honeyRay: new THREE.Color('#bb873c'), seaRay: new THREE.Color('#438e7c'), roseRay: new THREE.Color('#c18073'),
            dayFeed: new THREE.Color('#c6a163'), white: new THREE.Color('#ffffff'),
        };
        const nightKey = new THREE.Color(), nightTeal = new THREE.Color(), nightViolet = new THREE.Color();
        const rayKey = new THREE.Color(), rayTeal = new THREE.Color(), rayRose = new THREE.Color(), rayFeed = new THREE.Color();
        const render = () => {
            const preset = lightingRef.current;
            const showcase = preset === 'showcase';
            const sweep = phase;
            const chroma = 0.5 + 0.5 * Math.sin(sweep * 0.47);
            // Gold leads; rose gold rolls through the face while a luminous
            // emerald rim separates the metal from the site's deep forest green.
            nightKey.copy(palette.gold).lerp(palette.roseGold, chroma * 0.65);
            nightTeal.copy(palette.emerald).lerp(palette.jade, 0.15 + 0.15 * Math.sin(sweep * 0.71));
            const pearlCatch = (0.5 + 0.5 * Math.cos(sweep * 0.39)) ** 3;
            nightViolet.copy(palette.roseGold).lerp(palette.pearl, pearlCatch * 0.65);
            key.color.copy(palette.sun).lerp(nightKey, night);
            teal.color.copy(palette.sea).lerp(nightTeal, night);
            violet.color.copy(palette.peach).lerp(nightViolet, night);
            fill.color.copy(palette.dayFill).lerp(palette.nightFill, night);
            feed.color.copy(palette.sun).lerp(palette.white, night);
            feed.intensity = mix(2.1, 3.2, night) * (0.9 + 0.1 * Math.sin(sweep * 2.3));
            feed.visible = !studio && showcase;
            key.intensity = mix(8.5 + Math.sin(sweep * 1.3), 6 + Math.sin(sweep * 1.3) * 0.8, night);
            teal.intensity = mix(4.6 + Math.sin(sweep * 0.83) * 0.6, 7 + Math.sin(sweep * 0.83) * 1.2, night);
            violet.intensity = mix(4.8 + Math.cos(sweep * 1.17) * 0.7, 6.5 + Math.cos(sweep * 1.17) * 1.2, night);
            fill.intensity = mix(2.2, 0.65, night);
            key.width = mix(1.6, 1.4, night);
            key.height = mix(5, 4.5, night);
            scene.environmentIntensity = mix(0.55, 0.17, night);
            renderer.toneMappingExposure = mix(0.95, 1, night);
            teal.visible = violet.visible = showcase;
            if (!showcase) {
                key.color.set(preset === 'warm' ? 0xffd499 : preset === 'cool' ? 0xdcecff : 0xfff4df);
                fill.color.set(preset === 'warm' ? 0xe8d8ba : preset === 'cool' ? 0x739fff : 0xcbdcff);
                key.intensity = 12;
            }
            // Blend trajectories without restarting their shared phase. Dark mode
            // adds overlapping, unequal sweeps rather than flashing or strobing.
            key.position.set(
                mix(4.4 * Math.sin(sweep), 4.7 * Math.sin(sweep) + 0.8 * Math.sin(sweep * 1.73), night),
                mix(1.8 + Math.sin(sweep * 1.31), 1.4 + 1.6 * Math.sin(sweep * 1.31), night),
                mix(4.1, 3.8 + 0.5 * Math.cos(sweep * 0.79), night),
            );
            key.lookAt(0, 0, 0);
            teal.position.set(mix(3.7 * Math.cos(sweep * 0.87 + 0.8), 4.2 * Math.cos(sweep * 0.87 + 0.8), night), mix(-0.5 + Math.sin(sweep * 1.19), -1 + 1.8 * Math.sin(sweep * 1.19), night), 4);
            teal.lookAt(0, 0, 0);
            violet.position.set(mix(-3.6 * Math.sin(sweep * 1.13 + 0.7), -4 * Math.sin(sweep * 1.13 + 0.7), night), mix(1.6 * Math.cos(sweep * 0.91), 2 * Math.cos(sweep * 0.91), night), 3.8);
            violet.lookAt(0, 0, 0);
            const offset = preset === 'warm' ? 0.65 : preset === 'cool' ? -0.65 : 0;
            scene.environmentRotation.set(0, offset + Math.sin(sweep) * mix(0.22, 0.35, night), Math.sin(sweep * 0.73) * mix(0.1, 0.18, night));
            // The decorative beams use the very same blended light colors and
            // clock as the metal, including during rapid theme reversals.
            hero?.style.setProperty('--beam-key-angle', `${-4 + Math.sin(sweep * 0.73) * mix(1.5, 5, night)}deg`);
            hero?.style.setProperty('--beam-teal-angle', `${Math.sin(sweep * 1.07 + 1.8) * mix(1, 4, night)}deg`);
            hero?.style.setProperty('--beam-violet-angle', `${3 + Math.cos(sweep * 0.59 + 0.6) * mix(1.5, 5, night)}deg`);
            hero?.style.setProperty('--beam-key-strength', `${0.75 + 0.2 * Math.sin(sweep * 0.81)}`);
            hero?.style.setProperty('--beam-teal-strength', `${0.7 + 0.25 * Math.sin(sweep * 1.11 + 2)}`);
            hero?.style.setProperty('--beam-violet-strength', `${0.7 + 0.2 * Math.cos(sweep * 0.67 + 0.8)}`);
            // Deeper daylight tints read as refracted color on ivory. At night,
            // these converge exactly to the existing luminous light palette.
            rayKey.copy(palette.honeyRay).lerp(palette.roseRay, chroma * 0.3).lerp(key.color, night);
            rayTeal.copy(palette.seaRay).lerp(teal.color, night);
            rayRose.copy(palette.roseRay).lerp(palette.honeyRay, pearlCatch * 0.2).lerp(violet.color, night);
            rayFeed.copy(palette.dayFeed).lerp(palette.white, night);
            hero?.style.setProperty('--beam-strength', `${mix(0.3 + 0.04 * Math.sin(sweep + 0.5) ** 2, 0.19 + 0.07 * Math.sin(sweep + 0.5) ** 2, night)}`);
            hero?.style.setProperty('--beam-key', rayKey.getStyle());
            hero?.style.setProperty('--beam-teal', rayTeal.getStyle());
            hero?.style.setProperty('--beam-violet', rayRose.getStyle());
            hero?.style.setProperty('--beam-feed-color', rayFeed.getStyle());
            hero?.style.setProperty('--day-light-drift', `${Math.sin(sweep * 0.51) * 24}px`);
            hero?.style.setProperty('--crest-night-mix', night.toFixed(4));
            renderer.render(scene, camera);
        };
        const resize = () => {
            if (disposed) return;
            const { width, height } = host.getBoundingClientRect();
            if (!width || !height) return;
            if (hero) {
                const bounds = hero.getBoundingClientRect();
                const crestBounds = host.getBoundingClientRect();
                hero.style.setProperty('--beam-x', `${crestBounds.left - bounds.left + width * 0.47}px`);
                hero.style.setProperty('--beam-y', `${crestBounds.top - bounds.top + height * 0.34}px`);
            }
            renderer.setSize(width, height, false);
            const aspect = width / height;
            camera.left = -framing * Math.max(aspect, 1);
            camera.right = framing * Math.max(aspect, 1);
            camera.top = framing / Math.min(aspect, 1);
            camera.bottom = -camera.top;
            camera.updateProjectionMatrix();
            if (loaded) {
                render();
                if (shadow && shadowContext) {
                    shadow.width = Math.min(Math.round(width * 1.5), 640);
                    shadow.height = Math.round(shadow.width * height / width);
                    shadowContext.drawImage(renderer.domElement, 0, 0, shadow.width, shadow.height);
                    shadowContext.globalCompositeOperation = 'source-in';
                    shadowContext.fillStyle = 'rgba(76, 55, 29, 0.24)';
                    shadowContext.fillRect(0, 0, shadow.width, shadow.height);
                }
            }
        };
        const animate = (now: number) => {
            if (disposed) return;
            if (now - lastFrame >= 1000 / 30) {
                const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0;
                night = THREE.MathUtils.damp(night, targetNight, 2.6, dt);
                if (Math.abs(night - targetNight) < 0.001) night = targetNight;
                if (!reducedMotion.matches) phase += dt * mix(Math.PI * 2 / 16, Math.PI * 2 / 10, night);
                lastFrame = now;
                if (studio) {
                    if (spinningRef.current) group.rotation.y += dt * 0.28;
                }
                render();
            }
            if (!reducedMotion.matches || night !== targetNight) frame = requestAnimationFrame(animate);
        };
        const resume = () => {
            cancelAnimationFrame(frame);
            lastFrame = 0;
            if (disposed || !loaded || !visible || document.hidden) return;
            render();
            if (!reducedMotion.matches || night !== targetNight) frame = requestAnimationFrame(animate);
        };
        const themeObserver = new MutationObserver(() => {
            const nextNight = document.documentElement.classList.contains('dark') ? 1 : 0;
            if (nextNight === targetNight) return;
            targetNight = nextNight;
            resume();
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        const onLost = () => { loaded = false; cancelAnimationFrame(frame); setReady(false); hero?.removeAttribute('data-beams-ready'); };
        const onPreset = () => { if (loaded) render(); };
        const disposeModel = (object: THREE.Object3D) => object.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(material => material.dispose());
            }
        });
        const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
        loader.load('/models/aks-lion-relief-gold.glb?v=2', gltf => {
            if (disposed) { disposeModel(gltf.scene); return; }
            const center = new THREE.Box3().setFromObject(gltf.scene).getCenter(new THREE.Vector3());
            gltf.scene.position.sub(center);
            group.add(gltf.scene);
            loaded = true;
            resize();
            setReady(true);
            hero?.setAttribute('data-beams-ready', 'true');
            resume();
        }, undefined, () => { if (!disposed) setReady(false); });
        const sizeObserver = new ResizeObserver(resize);
        sizeObserver.observe(host);
        if (hero) sizeObserver.observe(hero);
        const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
        visibilityObserver.observe(host);
        host.addEventListener('crest-lighting', onPreset);
        renderer.domElement.addEventListener('webglcontextlost', onLost);
        controls?.addEventListener('change', render);
        document.addEventListener('visibilitychange', resume);
        reducedMotion.addEventListener('change', resume);
        resize();
        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            sizeObserver.disconnect();
            themeObserver.disconnect();
            visibilityObserver.disconnect();
            host.removeEventListener('crest-lighting', onPreset);
            renderer.domElement.removeEventListener('webglcontextlost', onLost);
            document.removeEventListener('visibilitychange', resume);
            reducedMotion.removeEventListener('change', resume);
            controls?.dispose();
            disposeModel(group);
            environment.dispose();
            renderer.dispose();
            renderer.domElement.remove();
            shadow?.remove();
            hero?.removeAttribute('data-beams-ready');
            ['--beam-x', '--beam-y', '--beam-key-angle', '--beam-teal-angle', '--beam-violet-angle', '--beam-key-strength', '--beam-teal-strength', '--beam-violet-strength', '--beam-strength', '--beam-key', '--beam-teal', '--beam-violet', '--beam-feed-color', '--day-light-drift', '--crest-night-mix'].forEach(property => hero?.style.removeProperty(property));
        };
    }, [studio]);

    function changeLighting(preset: Lighting) {
        lightingRef.current = preset;
        setLighting(preset);
        hostRef.current?.dispatchEvent(new Event('crest-lighting'));
    }

    return (
        <div className={`crest-object ${studio ? 'crest-object--studio' : ''}`}>
            <div ref={hostRef} className="crest-object-viewport" data-ready={ready} role="img" aria-label="Three-dimensional gold Alpha Kappa Sigma lion and ΑΚΣ lettering">
                <Image src="/metal-rounded.png" alt="" width={300} height={300} className="crest-object-fallback" priority />
            </div>
            {studio && <div className="crest-studio-controls">
                <p>Drag the emblem to explore its depth and reflections.</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {(['showcase', 'studio', 'warm', 'cool'] as const).map(preset => <button key={preset} type="button" aria-pressed={lighting === preset} onClick={() => changeLighting(preset)}>{preset === 'showcase' ? 'Chromatic light' : preset === 'studio' ? 'Studio light' : preset === 'warm' ? 'Warm light' : 'Cool light'}</button>)}
                    <button type="button" aria-pressed={spinning} onClick={() => { spinningRef.current = !spinning; setSpinning(!spinning); }}>{spinning ? 'Pause rotation' : 'Rotate emblem'}</button>
                    <a href="/models/aks-lion-relief-gold.glb" download>Download gold model</a>
                </div>
            </div>}
        </div>
    );
}
