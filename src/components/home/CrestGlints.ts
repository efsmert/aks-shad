import * as THREE from 'three';

// Tiny camera glints, anchored to real metal surfaces. Their brightness follows
// the view/light half-vector rather than a random sparkle timer.
export class CrestGlints {
    private geometry = new THREE.BufferGeometry();
    private material: THREE.ShaderMaterial;
    private points: THREE.Points;
    private anchors: { position: THREE.Vector3; normal: THREE.Vector3 }[] = [];
    private strengths: Float32Array;
    private colors: Float32Array;
    private world = new THREE.Vector3();
    private normal = new THREE.Vector3();
    private view = new THREE.Vector3();
    private half = new THREE.Vector3();
    private tint = new THREE.Color();
    private white = new THREE.Color(1, 1, 1);
    private normalMatrix = new THREE.Matrix3();

    constructor(private group: THREE.Group, pixelRatio: number) {
        group.updateMatrixWorld(true);
        const surfaces: THREE.Mesh[] = [];
        group.traverse(child => {
            if (child instanceof THREE.Mesh && !Array.isArray(child.material) && child.material.name.includes('polished face')) surfaces.push(child);
        });
        const ray = new THREE.Raycaster();
        const targets = [[-0.32, 1.05], [0.53, 1.24], [-0.67, 0.64], [0.46, 0.05], [-0.77, -1.12], [0.11, -1.18], [0.84, -1.48]];
        for (const [x, y] of targets) {
            for (const offset of [0, 0.05, -0.05, 0.1, -0.1]) {
                ray.set(new THREE.Vector3(x + offset, y, 2), new THREE.Vector3(0, 0, -1));
                const hit = ray.intersectObjects(surfaces, false)[0];
                if (!hit?.normal) continue;
                const normal = hit.normal.clone().applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld));
                if (normal.z < 0.4) continue;
                this.anchors.push({ position: hit.point.clone().addScaledVector(normal, 0.008), normal });
                break;
            }
        }
        this.strengths = new Float32Array(this.anchors.length);
        this.colors = new Float32Array(this.anchors.length * 3);
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.anchors.flatMap(anchor => anchor.position.toArray()), 3));
        this.geometry.setAttribute('glintStrength', new THREE.BufferAttribute(this.strengths, 1).setUsage(THREE.DynamicDrawUsage));
        this.geometry.setAttribute('glintColor', new THREE.BufferAttribute(this.colors, 3).setUsage(THREE.DynamicDrawUsage));
        this.material = new THREE.ShaderMaterial({
            uniforms: { pixelRatio: { value: pixelRatio }, diameter: { value: 6 } },
            vertexShader: `
                attribute float glintStrength;
                attribute vec3 glintColor;
                uniform float pixelRatio;
                uniform float diameter;
                varying float strength;
                varying vec3 tint;
                void main() {
                    strength = glintStrength;
                    tint = glintColor;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = diameter * pixelRatio;
                }
            `,
            fragmentShader: `
                varying float strength;
                varying vec3 tint;
                void main() {
                    vec2 p = gl_PointCoord * 2.0 - 1.0;
                    float core = exp(-dot(p, p) * 20.0);
                    float facets = exp(-abs(p.x) * 5.0 - abs(p.y) * 40.0)
                                 + exp(-abs(p.x) * 40.0 - abs(p.y) * 6.0);
                    float alpha = min(1.0, core + facets * 0.35) * strength;
                    gl_FragColor = vec4(mix(tint, vec3(1.0), core), alpha);
                    #include <colorspace_fragment>
                }
            `,
            transparent: true, depthWrite: false, depthTest: true,
            blending: THREE.AdditiveBlending, toneMapped: false,
        });
        this.points = new THREE.Points(this.geometry, this.material);
        this.points.renderOrder = 1;
        group.add(this.points);
    }

    update(camera: THREE.Camera, lights: THREE.RectAreaLight[], night: number) {
        this.group.updateMatrixWorld(true);
        this.normalMatrix.getNormalMatrix(this.group.matrixWorld);
        this.material.uniforms.diameter.value = THREE.MathUtils.lerp(4.5, 6.5, night);
        let total = 0;
        this.anchors.forEach((anchor, index) => {
            this.world.copy(anchor.position).applyMatrix4(this.group.matrixWorld);
            this.normal.copy(anchor.normal).applyNormalMatrix(this.normalMatrix);
            this.view.copy(camera.position).sub(this.world).normalize();
            let peak = 0;
            this.tint.setRGB(1, 1, 1);
            if (this.normal.dot(this.view) > 0) for (const light of lights) {
                if (!light.visible) continue;
                this.half.copy(light.position).sub(this.world).normalize().add(this.view).normalize();
                const specular = Math.pow(Math.max(0, this.normal.dot(this.half)), 110) * light.intensity / 7;
                if (specular > peak) { peak = specular; this.tint.copy(light.color).lerp(this.white, 0.7); }
            }
            const strength = THREE.MathUtils.smoothstep(peak, 0.12, 0.85) * THREE.MathUtils.lerp(0.5, 0.85, night);
            this.strengths[index] = strength;
            total += strength;
            this.tint.toArray(this.colors, index * 3);
        });
        // A shared brightness budget keeps overlapping catches restrained.
        if (total > 1.15) for (let i = 0; i < this.strengths.length; i++) this.strengths[i] *= 1.15 / total;
        this.geometry.getAttribute('glintStrength').needsUpdate = true;
        this.geometry.getAttribute('glintColor').needsUpdate = true;
    }

    dispose() {
        this.points.removeFromParent();
        this.geometry.dispose();
        this.material.dispose();
    }
}
