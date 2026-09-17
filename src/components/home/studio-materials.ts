import * as THREE from 'three';

type Finish = { id: string; label: string; description: string; color: string; metalness: number; roughness: number; clearcoat?: number; iridescence?: number; anisotropy?: number };
export const MATERIAL_PRESETS: Finish[] = [
    { id: 'original', label: 'Original satin gold', description: 'The original warm gold finish, with darker sides and a matte recessed backing.', color: '#d9b477', metalness: 1, roughness: .3 },
    { id: 'polished', label: 'Polished gold', description: 'Rich gold with crisp, mirrorlike highlights.', color: '#edc575', metalness: 1, roughness: .12 },
    { id: 'brushed', label: 'Brushed gold', description: 'Directional, stretched highlights for a softly machined finish.', color: '#dbb979', metalness: 1, roughness: .34, anisotropy: .8 },
    { id: 'champagne', label: 'Satin champagne', description: 'Pale gold with a soft, silky sheen.', color: '#e5d5b1', metalness: 1, roughness: .4 },
    { id: 'rose', label: 'Rose gold', description: 'Warm copper-pink metal with polished reflections.', color: '#e3aaa0', metalness: 1, roughness: .23 },
    { id: 'bronze', label: 'Antique bronze', description: 'Deep bronze with broad, subdued highlights.', color: '#99714a', metalness: 1, roughness: .48 },
    { id: 'chrome', label: 'Chrome', description: 'Bright neutral metal that picks up the lighting colors sharply.', color: '#f1f3f5', metalness: 1, roughness: .09 },
    { id: 'silver', label: 'Brushed silver', description: 'Cool silver with broad directional reflections.', color: '#c3cbd1', metalness: 1, roughness: .36, anisotropy: .85 },
    { id: 'black', label: 'Black chrome', description: 'Dark metal with concentrated highlights along the relief.', color: '#454c51', metalness: 1, roughness: .17, clearcoat: .35 },
    { id: 'emerald', label: 'Emerald metallic', description: 'Saturated green metal that catches bright colored light.', color: '#39a879', metalness: 1, roughness: .24 },
    { id: 'enamel', label: 'Emerald enamel', description: 'A glossy green coating with a clear outer sheen.', color: '#126447', metalness: .15, roughness: .27, clearcoat: 1 },
    { id: 'pearl', label: 'Pearlescent enamel', description: 'Ivory enamel with a subtle shifting thin-film sheen.', color: '#f1e9db', metalness: .15, roughness: .26, clearcoat: 1, iridescence: .5 },
    { id: 'iridescent', label: 'Iridescent titanium', description: 'Polished metal with stronger angle-dependent color shifts.', color: '#b3b7c3', metalness: 1, roughness: .23, iridescence: 1 },
    { id: 'coated', label: 'Clear-coated gold', description: 'A sharp glossy layer over a softer gold base.', color: '#d6b47a', metalness: 1, roughness: .42, clearcoat: 1 },
    { id: 'ceramic', label: 'Glossy ceramic', description: 'Porcelain-white surfaces with clean nonmetallic reflections.', color: '#eeeae0', metalness: 0, roughness: .2, clearcoat: .6 },
];

// Studio-only materials: preserve geometry and the dark recessed backing.
export function prepareStudioMaterials(root: THREE.Object3D) {
    const originals = new Map<THREE.MeshStandardMaterial, THREE.MeshPhysicalMaterial>();
    const entries: { material: THREE.MeshPhysicalMaterial; color: THREE.Color; roughness: number; rim: boolean }[] = [];
    root.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        const convert = (source: THREE.Material) => {
            if (!(source instanceof THREE.MeshStandardMaterial) || source.metalness === 0) return source;
            const cached = originals.get(source);
            if (cached) return cached;
            const material = new THREE.MeshPhysicalMaterial({ name: source.name, color: source.color, metalness: source.metalness, roughness: source.roughness, side: source.side });
            entries.push({ material, color: source.color.clone(), roughness: source.roughness, rim: source.name.includes('rim') });
            originals.set(source, material);
            return material;
        };
        object.material = Array.isArray(object.material) ? object.material.map(convert) : convert(object.material);
    });
    originals.forEach((_, source) => source.dispose());
    return (id: string) => {
        const preset = MATERIAL_PRESETS.find(p => p.id === id) ?? MATERIAL_PRESETS[0];
        for (const entry of entries) {
            const m = entry.material;
            if (preset.id === 'original') m.color.copy(entry.color);
            else { m.color.set(preset.color); if (entry.rim) m.color.multiplyScalar(.65); }
            m.roughness = preset.id === 'original' ? entry.roughness : preset.roughness;
            m.metalness = preset.metalness;
            m.clearcoat = preset.clearcoat ?? 0;
            m.clearcoatRoughness = .12;
            m.iridescence = preset.iridescence ?? 0;
            m.iridescenceIOR = 1.3;
            m.iridescenceThicknessRange = [150, 450];
            m.anisotropy = preset.anisotropy ?? 0;
            m.anisotropyRotation = Math.PI / 4;
            m.needsUpdate = true;
        }
    };
}
