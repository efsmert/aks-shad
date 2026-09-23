import * as THREE from 'three';

// Render tiles at native resolution rather than enlarging the preview. Keeping
// the same scene state throughout preserves the exact displayed lighting moment.
export function captureStudioStill(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.OrthographicCamera): Promise<Blob> {
    const size = 8192;
    const tile = Math.min(2048, renderer.capabilities.maxTextureSize);
    const output = document.createElement('canvas');
    output.width = output.height = size;
    const context = output.getContext('2d');
    if (!context) throw new Error('Unable to create the PNG export canvas.');
    const previousSize = renderer.getSize(new THREE.Vector2());
    const previousRatio = renderer.getPixelRatio();
    const previousView = camera.view ? { ...camera.view } : null;
    try {
        renderer.setPixelRatio(1);
        for (let y = 0; y < size; y += tile) {
            for (let x = 0; x < size; x += tile) {
                const width = Math.min(tile, size - x);
                const height = Math.min(tile, size - y);
                renderer.setSize(width, height, false);
                camera.setViewOffset(size, size, x, y, width, height);
                renderer.render(scene, camera);
                context.drawImage(renderer.domElement, x, y);
            }
        }
    } finally {
        camera.view = previousView;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(previousRatio);
        renderer.setSize(previousSize.x, previousSize.y, false);
        renderer.render(scene, camera);
    }
    return new Promise((resolve, reject) => {
        output.toBlob(blob => {
            output.width = output.height = 0;
            if (blob) resolve(blob);
            else reject(new Error('PNG export failed. Please try again.'));
        }, 'image/png');
    });
}
