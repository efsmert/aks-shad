import * as THREE from 'three';

export const LIGHTING_PRESETS = [
    { id: 'showcase', label: 'Chapter colors', description: 'Gold, emerald, and rose reflections in continuous motion.' },
    { id: 'studio', label: 'Soft studio', description: 'Neutral softboxes for studying the shape.' },
    { id: 'warm', label: 'Warm gold', description: 'Warm amber light on polished gold.' },
    { id: 'cool', label: 'Cool silver', description: 'Icy blue reflections and a cool fill.' },
    { id: 'white-sweep', label: 'Whiteout sweep', description: 'A sweeping white pass and full reveal, followed by darkness. One cycle every 4.8 seconds at 1×.' },
    { id: 'emerald-sweep', label: 'Emerald pulse', description: 'A bright green sweep emerges from darkness, then recedes.' },
    { id: 'aurora', label: 'Aurora', description: 'Broad emerald and violet light curls around the relief.' },
    { id: 'neon', label: 'Neon nights', description: 'Electric cyan and magenta cross over deep blue fill.' },
    { id: 'sunset', label: 'Sunset', description: 'Slow coral, honey, and amber waves.' },
    { id: 'rose', label: 'Rose & pearl', description: 'Pearl-white highlights travel through soft rose gold.' },
    { id: 'ribbons', label: 'Light ribbons', description: 'Narrow gold and teal reflections trace opposing paths.' },
] as const;
export type Lighting = typeof LIGHTING_PRESETS[number]['id'];

export function studioLoopDuration(preset: Lighting) {
    if (preset === 'white-sweep' || preset === 'emerald-sweep') return 4.8;
    if (preset === 'sunset' || preset === 'rose') return 30;
    return 20;
}

type Rig = {
    scene: THREE.Scene;
    key: THREE.RectAreaLight;
    fill: THREE.RectAreaLight;
    teal: THREE.RectAreaLight;
    violet: THREE.RectAreaLight;
};

export function applyStudioLighting(preset: Lighting, seconds: number, reduced: boolean, rig: Rig) {
    const { scene, key, fill, teal, violet } = rig;
    const t = reduced ? 1.1 : seconds;
    const angle = t / studioLoopDuration(preset) * Math.PI * 2;
    scene.environmentRotation.set(0, .3 * Math.sin(angle), .12 * Math.sin(angle * 2));
    if (['showcase', 'studio', 'warm', 'cool'].includes(preset)) {
        const chapter = preset === 'showcase';
        if (chapter) {
            key.color.set('#dba63c').lerp(new THREE.Color('#e5a69a'), .3 + .3 * Math.sin(angle));
            teal.color.set('#32dc9b'); violet.color.set('#fffaf0');
        }
        teal.visible = violet.visible = chapter;
        key.intensity = chapter ? 7 + Math.sin(angle * 2) : 12;
        teal.intensity = 7 + Math.sin(angle * 3);
        violet.intensity = 5 + Math.cos(angle * 2);
        fill.intensity = .65;
        key.position.set(4.7 * Math.sin(angle * 2), 1.4 + 1.6 * Math.sin(angle * 3), 3.8 + .5 * Math.cos(angle));
        teal.position.set(4.2 * Math.cos(angle * 2 + .8), -1 + 1.8 * Math.sin(angle * 3), 4);
        violet.position.set(-4 * Math.sin(angle * 2 + .7), 2 * Math.cos(angle), 3.8);
        for (const light of [key, teal, violet]) light.lookAt(0, 0, 0);
        return;
    }
    if (preset === 'white-sweep' || preset === 'emerald-sweep') {
        const cycle = reduced ? 1 : t % 4.8;
        const progress = THREE.MathUtils.clamp(cycle / 2.2, 0, 1);
        const envelope = cycle < 2.2 ? Math.sin(progress * Math.PI) ** 2 : 0;
        const flash = cycle > 1.12 && cycle < 1.92 ? Math.sin((cycle - 1.12) / .8 * Math.PI) ** 2 : 0;
        key.color.set(preset === 'white-sweep' ? '#ffffff' : '#31ef98');
        fill.color.copy(key.color);
        key.width = .5; key.height = 5;
        key.position.set(-4.8 + progress * 9.6, 2.3 - progress * 3.6, 3.5);
        key.lookAt(0, 0, 0);
        key.intensity = 32 * envelope;
        fill.intensity = 9 * flash;
        teal.visible = violet.visible = false;
        scene.environmentIntensity = .6 * flash;
        // Reduced motion shows a continuous lit object instead of flashing.
        if (reduced) { key.intensity = 12; fill.intensity = 1; scene.environmentIntensity = .15; }
        return;
    }
    const colors = {
        aurora: ['#32efa1', '#a57cff', '#9effe6'],
        neon: ['#26dfff', '#ff399c', '#536bff'],
        sunset: ['#ffd285', '#f47756', '#f8af80'],
        rose: ['#fff9f1', '#e9a49c', '#dbb378'],
        ribbons: ['#ffe2a0', '#37e6b2', '#e7b7ab'],
    }[preset as 'aurora' | 'neon' | 'sunset' | 'rose' | 'ribbons'];
    if (!colors) return;
    key.color.set(colors[0]); teal.color.set(colors[1]); violet.color.set(colors[2]);
    fill.color.set(colors[2]);
    teal.visible = violet.visible = true;
    const narrow = preset === 'ribbons';
    key.width = narrow ? .22 : 2.1;
    teal.width = narrow ? .3 : 1.8;
    violet.width = narrow ? .4 : 2.4;
    key.height = teal.height = violet.height = 5;
    key.intensity = (narrow ? 23 : 9) * (.85 + .15 * Math.sin(angle * 3));
    teal.intensity = (narrow ? 20 : 8) * (.85 + .15 * Math.cos(angle * 4));
    violet.intensity = narrow ? 8 : 4;
    fill.intensity = .3;
    scene.environmentIntensity = narrow ? .045 : .09;
    key.position.set(Math.sin(angle * 2) * 4.7, 1.7 * Math.cos(angle * 2), 3.6);
    teal.position.set(Math.sin(angle * 2 + 2.1) * 4.2, -1.7 * Math.cos(angle * 3), 4);
    violet.position.set(Math.cos(angle) * 3.8, 2 * Math.sin(angle), 3.8);
    for (const light of [key, teal, violet]) light.lookAt(0, 0, 0);
}
