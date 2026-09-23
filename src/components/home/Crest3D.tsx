'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

import { applyStudioLighting, LIGHTING_PRESETS, studioLoopDuration, type Lighting } from './studio-lighting';
import { StudioSpeedControl } from './StudioSpeedControl';
import { MATERIAL_PRESETS, prepareStudioMaterials } from './studio-materials';
import { CREST_SILHOUETTE } from './crest-silhouette';
import { recordStudioLoop } from './record-studio-loop';
import { captureStudioStill } from './capture-studio-still';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Crest3D({ studio = false, variant = 'crest', onRecordingChange }: { studio?: boolean; variant?: 'crest' | 'letters'; onRecordingChange?: (recording: boolean) => void }) {
    const modelPath = `/models/${variant === 'letters' ? 'aks-letters-gold' : 'aks-lion-relief-gold'}-smooth.glb`;
    const hostRef = useRef<HTMLDivElement>(null);
    const [background, setBackground] = useState('#000000');
    const backgroundRef = useRef('#000000');
    const [recording, setRecording] = useState(false);
    const [savingStill, setSavingStill] = useState(false);
    const stillAction = useRef<(() => Promise<void>) | null>(null);
    const [recordProgress, setRecordProgress] = useState(0);
    const [recordMessage, setRecordMessage] = useState('');
    const recordingRef = useRef(false);
    const recordAction = useRef<(() => Promise<void>) | null>(null);
    const abortRecording = useRef<AbortController | null>(null);
    const recordingChangeRef = useRef(onRecordingChange);
    useEffect(() => { recordingChangeRef.current = onRecordingChange; }, [onRecordingChange]);
    const materialRef = useRef('original');
    const [material, setMaterial] = useState('original');
    const lightingRef = useRef<Lighting>('showcase');
    const spinningRef = useRef(false);
    const lightingPausedRef = useRef(false);
    const lightingSpeedRef = useRef(1);
    const [lightingSpeed, setLightingSpeed] = useState(1);
    const [lightingPaused, setLightingPaused] = useState(false);
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);
    const [lighting, setLighting] = useState<Lighting>('showcase');
    const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;
        const hero = studio ? null : host.closest<HTMLElement>('.home-hero');
        let disposed = false;
        const beams = hero?.querySelector<HTMLElement>('.hero-light-beams');
        let lastBeamColorTime = -Infinity;
        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
        } catch {
            const fallbackFrame = requestAnimationFrame(() => setFailed(true));
            return () => cancelAnimationFrame(fallbackFrame);
        }
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
        const framing = variant === 'letters' ? 1.5 : 2.25;
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
        let frame = 0, lastFrame = 0, frameDeadline = 0, phase = -0.6, visible = true, loaded = false;
        let targetNight = document.documentElement.classList.contains('dark') ? 1 : 0;
        let night = targetNight;
        let studioSeconds = 0;
        // Intro briefly uses display-rate updates, then returns to the economical 30 fps loop.
        const introDuration = 1.95;
        let introTime = studio || reducedMotion.matches ? introDuration : 0;
        const introPosition = new THREE.Vector3();
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
            teal.width = 1.4; teal.height = 4;
            violet.width = 1.2; violet.height = 3;
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
            const fanSpread = 1 - THREE.MathUtils.smoothstep(introTime, 1.42, introDuration);
            beams?.style.setProperty('--beam-key-angle', `${-42 * fanSpread -4 + Math.sin(sweep * 0.73) * mix(1.5, 5, night)}deg`);
            beams?.style.setProperty('--beam-teal-angle', `${8 * fanSpread + Math.sin(sweep * 1.07 + 1.8) * mix(1, 4, night)}deg`);
            beams?.style.setProperty('--beam-violet-angle', `${42 * fanSpread + 3 + Math.cos(sweep * 0.59 + 0.6) * mix(1.5, 5, night)}deg`);
            beams?.style.setProperty('--beam-key-strength', `${0.75 + 0.2 * Math.sin(sweep * 0.81)}`);
            beams?.style.setProperty('--beam-teal-strength', `${0.7 + 0.25 * Math.sin(sweep * 1.11 + 2)}`);
            beams?.style.setProperty('--beam-violet-strength', `${0.7 + 0.2 * Math.cos(sweep * 0.67 + 0.8)}`);
            // Deeper daylight tints read as refracted color on ivory. At night,
            // these converge exactly to the existing luminous light palette.
            rayKey.copy(palette.honeyRay).lerp(palette.roseRay, chroma * 0.3).lerp(key.color, night);
            rayTeal.copy(palette.seaRay).lerp(teal.color, night);
            rayRose.copy(palette.roseRay).lerp(palette.honeyRay, pearlCatch * 0.2).lerp(violet.color, night);
            rayFeed.copy(palette.dayFeed).lerp(palette.white, night);
            beams?.style.setProperty('--beam-strength', `${mix(0.3 + 0.04 * Math.sin(sweep + 0.5) ** 2, 0.19 + 0.07 * Math.sin(sweep + 0.5) ** 2, night)}`);
            // Slow color changes need fewer repaints than motion. Refresh the
            // cached beam colors at 10 Hz, including during the entrance.
            const beamColorTime = performance.now();
            if (beamColorTime - lastBeamColorTime >= 100) {
                beams?.style.setProperty('--beam-key', rayKey.getStyle());
                beams?.style.setProperty('--beam-teal', rayTeal.getStyle());
                beams?.style.setProperty('--beam-violet', rayRose.getStyle());
                beams?.style.setProperty('--beam-feed-color', rayFeed.getStyle());
                lastBeamColorTime = beamColorTime;
            }
            beams?.style.setProperty('--day-light-drift', `${Math.sin(sweep * 0.51) * 24}px`);
            const nightMix = night.toFixed(4);
            if (hero && hero.style.getPropertyValue('--crest-night-mix') !== nightMix) hero.style.setProperty('--crest-night-mix', nightMix);
            if (hero) {
                const settle = THREE.MathUtils.smoothstep(introTime, 0.9, introDuration);
                const ambientReveal = THREE.MathUtils.smoothstep(introTime, 1.3, introDuration);
                const reveal = THREE.MathUtils.smoothstep(introTime, 0.28, 0.65);
                const sweepProgress = THREE.MathUtils.smoothstep(introTime, 0.28, 1.4);
                if (introTime < introDuration) {
                    // A real, narrow softbox travels across the stationary relief,
                    // catching its bevels before blending into the normal rig.
                    introPosition.set(mix(-4.5, 4.5, sweepProgress), mix(2.4, -1, sweepProgress), 3.2);
                    key.position.lerp(introPosition, 1 - settle);
                    key.lookAt(0, 0, 0);
                    key.color.lerp(palette.emerald, 1 - settle);
                    key.width = mix(0.65, key.width, settle);
                    key.intensity = mix(13 * reveal, key.intensity, settle);
                    fill.intensity *= ambientReveal;
                    teal.intensity *= settle;
                    violet.intensity *= settle;
                    feed.intensity *= settle;
                    scene.environmentIntensity *= ambientReveal;
                }
                const incoming = THREE.MathUtils.smoothstep(introTime, 1.02, 1.62);
                const outgoing = THREE.MathUtils.smoothstep(introTime, 1.28, 1.65);
                beams?.style.setProperty('--feed-reveal', `${incoming}`);
                beams?.style.setProperty('--fan-reveal', `${outgoing}`);
                hero.dataset.crestIntro = introTime >= introDuration ? 'complete' : 'revealing';
            }
            if (studio) renderer.setClearColor(backgroundRef.current, 1);
            if (studio) applyStudioLighting(preset, studioSeconds, reducedMotion.matches && !recordingRef.current, { scene, key, fill, teal, violet });
            renderer.render(scene, camera);
        };
        const resize = () => {
            if (disposed || recordingRef.current) return;
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
            if (disposed || recordingRef.current) return;
            const interval = introTime < introDuration ? 1000 / 60 : 1000 / 30;
            if (!lastFrame || now >= frameDeadline - 1) {
                // Keep the fractional deadline instead of discarding timing
                // remainder, which can accidentally turn 30 fps into 20 fps.
                frameDeadline = !lastFrame || now - frameDeadline > interval
                    ? now + interval : frameDeadline + interval;
                const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0;
                introTime = reducedMotion.matches ? introDuration : Math.min(introDuration, introTime + dt);
                night = THREE.MathUtils.damp(night, targetNight, 2.6, dt);
                if (Math.abs(night - targetNight) < 0.001) night = targetNight;
                if (!reducedMotion.matches && !(studio && lightingPausedRef.current)) {
                    // Scale elapsed time, so adjusting speed never jumps the light's position.
                    const lightingDt = dt * (studio ? lightingSpeedRef.current : 1);
                    phase += lightingDt * mix(Math.PI * 2 / 16, Math.PI * 2 / 10, night);
                    studioSeconds += lightingDt;
                }
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
            lastFrame = 0; frameDeadline = 0;
            if (disposed || recordingRef.current || !loaded || !visible || document.hidden) return;
            if (reducedMotion.matches) introTime = introDuration;
            render();
            if (!reducedMotion.matches || night !== targetNight) frame = requestAnimationFrame(animate);
        };
        stillAction.current = async () => {
            if (!loaded || disposed || recordingRef.current) return;
            recordingRef.current = true;
            setSavingStill(true);
            recordingChangeRef.current?.(true);
            setRecordMessage('Saving the current scene as an 8K PNG…');
            cancelAnimationFrame(frame);
            if (controls) controls.enabled = false;
            try {
                const blob = await captureStudioStill(renderer, scene, camera);
                if (disposed) return;
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `aks-${variant}-${lightingRef.current}-${materialRef.current}-${Date.now()}.png`;
                link.click();
                window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
                setRecordMessage('PNG saved · 8192 × 8192 · current scene, including your background.');
            } catch (error) {
                if (!disposed) setRecordMessage(error instanceof Error ? error.message : 'PNG export failed. Please try again.');
            } finally {
                recordingRef.current = false;
                recordingChangeRef.current?.(false);
                if (!disposed) {
                    setSavingStill(false);
                    if (controls) controls.enabled = true;
                    resize(); resume();
                }
            }
        };
        recordAction.current = async () => {
            if (!loaded || recordingRef.current) return;
            const controller = new AbortController();
            abortRecording.current = controller;
            const previous = { seconds: studioSeconds, phase, rotation: group.rotation.y, ratio: renderer.getPixelRatio() };
            const preset = lightingRef.current;
            const loop = studioLoopDuration(preset);
            recordingRef.current = true;
            setRecording(true); recordingChangeRef.current?.(true);
            setRecordProgress(0); setRecordMessage('Recording one complete loop…');
            cancelAnimationFrame(frame);
            if (controls) controls.enabled = false;
            try {
                renderer.setPixelRatio(1);
                renderer.setSize(1080, 1080, false);
                camera.left = -framing; camera.right = framing;
                camera.top = framing; camera.bottom = -framing; camera.updateProjectionMatrix();
                const blob = await recordStudioLoop({
                    canvas: renderer.domElement, duration: loop / lightingSpeedRef.current, signal: controller.signal,
                    progress: setRecordProgress,
                    draw: fraction => {
                        studioSeconds = fraction * loop;
                        if (spinningRef.current) group.rotation.y = previous.rotation + fraction * Math.PI * 2;
                        render();
                    },
                });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `aks-${variant}-${preset}-${materialRef.current}-${Date.now()}.mp4`;
                link.click();
                window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
                if (!disposed) setRecordMessage('MP4 finished. Your download is ready.');
            } catch (error) {
                if (!disposed) setRecordMessage(error instanceof Error ? error.message : 'Recording failed. Please try again.');
            } finally {
                recordingRef.current = false; abortRecording.current = null;
                recordingChangeRef.current?.(false);
                if (!disposed) {
                    setRecording(false);
                    studioSeconds = previous.seconds; phase = previous.phase; group.rotation.y = previous.rotation;
                    renderer.setPixelRatio(previous.ratio);
                    if (controls) controls.enabled = true;
                    resize(); resume();
                }
            }
        };
        const onBackground = () => { if (loaded && !recordingRef.current) render(); };
        host.addEventListener('crest-background', onBackground);
        const themeObserver = new MutationObserver(() => {
            const nextNight = document.documentElement.classList.contains('dark') ? 1 : 0;
            if (nextNight === targetNight) return;
            targetNight = nextNight;
            resume();
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        const onLost = () => { loaded = false; cancelAnimationFrame(frame); setReady(false); setFailed(true); hero?.removeAttribute('data-beams-ready'); };
        const onPreset = () => { studioSeconds = 0; if (loaded) render(); };
        const disposeModel = (object: THREE.Object3D) => object.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(material => material.dispose());
            }
        });
        let applyMaterial: ((id: string) => void) | undefined;
        const onMaterial = () => { applyMaterial?.(materialRef.current); if (loaded) render(); };
        const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
        loader.load(modelPath, gltf => {
            if (disposed) { disposeModel(gltf.scene); return; }
            const center = new THREE.Box3().setFromObject(gltf.scene).getCenter(new THREE.Vector3());
            gltf.scene.position.sub(center);
            group.add(gltf.scene);
            if (studio) { applyMaterial = prepareStudioMaterials(gltf.scene); applyMaterial(materialRef.current); }
            loaded = true;
            resize();
            // The first opaque-black frame is already drawn before exchanging the silhouette.
            host.dataset.ready = 'true';
            setReady(true);
            hero?.setAttribute('data-beams-ready', 'true');
            resume();
        }, undefined, () => { if (!disposed) { setReady(false); setFailed(true); } });
        const sizeObserver = new ResizeObserver(resize);
        sizeObserver.observe(host);
        if (hero) sizeObserver.observe(hero);
        const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
        visibilityObserver.observe(host);
        host.addEventListener('crest-lighting', onPreset);
        host.addEventListener('crest-material', onMaterial);
        renderer.domElement.addEventListener('webglcontextlost', onLost);
        controls?.addEventListener('change', render);
        document.addEventListener('visibilitychange', resume);
        reducedMotion.addEventListener('change', resume);
        resize();
        return () => {
            disposed = true;
            abortRecording.current?.abort();
            recordAction.current = null;
            stillAction.current = null;
            host.removeEventListener('crest-background', onBackground);
            cancelAnimationFrame(frame);
            sizeObserver.disconnect();
            themeObserver.disconnect();
            visibilityObserver.disconnect();
            host.removeEventListener('crest-lighting', onPreset);
            host.removeEventListener('crest-material', onMaterial);
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
            hero?.removeAttribute('data-crest-intro');
            ['--feed-reveal', '--feed-front', '--fan-reveal', '--beam-x', '--beam-y', '--beam-key-angle', '--beam-teal-angle', '--beam-violet-angle', '--beam-key-strength', '--beam-teal-strength', '--beam-violet-strength', '--beam-strength', '--beam-key', '--beam-teal', '--beam-violet', '--beam-feed-color', '--day-light-drift', '--crest-night-mix'].forEach(property => { hero?.style.removeProperty(property); beams?.style.removeProperty(property); });
        };
    }, [studio, variant, modelPath]);

    function changeLighting(preset: Lighting) {
        lightingRef.current = preset;
        setLighting(preset);
        hostRef.current?.dispatchEvent(new Event('crest-lighting'));
    }

    return (
        <div className={`crest-object ${studio ? 'crest-object--studio' : ''}`}>
            <div ref={hostRef} style={studio ? { backgroundColor: background } : undefined} className="crest-object-viewport" data-ready={ready} role="img" aria-label={variant === 'letters' ? 'Three-dimensional gold ΑΚΣ lettering' : 'Three-dimensional gold Alpha Kappa Sigma lion and ΑΚΣ lettering'}>
                {!studio && !failed && <svg className="crest-first-frame" viewBox="0 0 1080 1080" aria-hidden="true"><image href={CREST_SILHOUETTE} width="1080" height="1080" /></svg>}
                {failed && variant === 'letters' && <span className="font-display text-5xl text-gold-400">ΑΚΣ</span>}
                {failed && variant === 'crest' && <Image src="/metal-rounded.png" alt="" width={300} height={300} className="crest-object-fallback" />}
            </div>
            {studio && <div className="crest-studio-controls">
                <p>Drag the emblem to explore its depth and reflections.</p>
                <fieldset disabled={recording || savingStill} className="studio-edit-controls">
                <Tabs defaultValue="lighting" className="studio-settings">
                    <TabsList aria-label="Crest settings">
                        <TabsTrigger value="lighting">Lighting</TabsTrigger>
                        <TabsTrigger value="materials">Materials</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lighting">
                        <div className="flex flex-wrap justify-center gap-2">
                            {LIGHTING_PRESETS.map(preset => <button key={preset.id} type="button" aria-pressed={lighting === preset.id} onClick={() => changeLighting(preset.id)}>{preset.label}</button>)}
                        </div>
                        <p aria-live="polite">{LIGHTING_PRESETS.find(preset => preset.id === lighting)?.description}</p>
                    </TabsContent>
                    <TabsContent value="materials">
                        <div className="flex flex-wrap justify-center gap-2">
                            {MATERIAL_PRESETS.map(preset => <button key={preset.id} type="button" aria-pressed={material === preset.id} onClick={() => {
                                materialRef.current = preset.id;
                                setMaterial(preset.id);
                                hostRef.current?.dispatchEvent(new Event('crest-material'));
                            }}><span className="studio-material-swatch" style={{ backgroundColor: preset.color }} aria-hidden="true" />{preset.label}</button>)}
                        </div>
                        <p aria-live="polite">{MATERIAL_PRESETS.find(preset => preset.id === material)?.description}</p>
                    </TabsContent>
                </Tabs>
                <StudioSpeedControl value={lightingSpeed} onChange={value => { lightingSpeedRef.current = value; setLightingSpeed(value); }} />
                <div className="flex flex-wrap justify-center gap-2">
                    <button type="button" aria-pressed={lightingPaused} onClick={() => { lightingPausedRef.current = !lightingPaused; setLightingPaused(!lightingPaused); }}>{lightingPaused ? 'Resume lighting' : 'Pause lighting'}</button>
                    <button type="button" aria-pressed={spinning} onClick={() => { spinningRef.current = !spinning; setSpinning(!spinning); }}>{spinning ? 'Pause rotation' : 'Rotate emblem'}</button>
                    <a href={modelPath} download>Download original gold finish</a>
                </div>
                <div className="studio-background-control">
                    <label htmlFor="studio-background">Render background</label>
                    <input id="studio-background" type="color" value={background} onChange={event => {
                        setBackground(event.target.value); backgroundRef.current = event.target.value;
                        hostRef.current?.dispatchEvent(new Event('crest-background'));
                    }} />
                    <span>{background.toUpperCase()}</span>
                    {['#000000', '#0b1510', '#73777f', '#ffffff'].map(color => <button key={color} type="button" aria-label={`Background ${color}`} aria-pressed={background === color} style={{ backgroundColor: color, width: 26, height: 26, padding: 0 }} onClick={() => {
                        setBackground(color); backgroundRef.current = color;
                        hostRef.current?.dispatchEvent(new Event('crest-background'));
                    }} />)}
                </div>
                </fieldset>
                <div className="studio-record-controls">
                    <p>Square MP4 · 1080 × 1080 · one complete {(studioLoopDuration(lighting) / lightingSpeed).toFixed(1)}s loop{spinning ? ' + one full turn' : ''}</p>
                    <button type="button" disabled={!ready || failed || recording || savingStill} onClick={() => void recordAction.current?.()}>Record one loop · MP4</button>
                    <button type="button" disabled={!ready || failed || recording || savingStill} onClick={() => void stillAction.current?.()}>{savingStill ? 'Saving PNG…' : 'Save current frame · 8K PNG'}</button>
                    {recording && <button type="button" onClick={() => abortRecording.current?.abort()}>Cancel recording</button>}
                    {recording && <progress aria-label="Recording progress" value={recordProgress} max={1} />}
                    <p role="status">{recording ? `Recording ${Math.round(recordProgress * 100)}% — finishes automatically. Keep this tab visible.` : recordMessage}</p>
                </div>
            </div>}
        </div>
    );
}
