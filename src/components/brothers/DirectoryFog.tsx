'use client';

import { useEffect, useRef } from 'react';

const vertexSource = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentSource = `
precision highp float;
uniform vec2 resolution;
uniform vec3 background;
uniform float strength;
uniform float time;

float pixelNoise(vec2 pixel) {
    vec3 p = fract(vec3(pixel.xyx) * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float drift = time * 0.018;
    float upper = uv.y - (0.66 + 0.15 * sin(uv.x * 4.4 + drift));
    float lower = uv.y - (0.21 + 0.17 * sin(uv.x * 3.7 - drift * 0.7));
    float fog = exp(-upper * upper / 0.023) * 0.64
              + exp(-lower * lower / 0.036) * 0.36;
    fog *= 0.72 + 0.28 * sin(uv.x * 3.1 + drift * 0.4);
    vec3 color = mix(background, vec3(0.714, 0.733, 0.718), fog * strength);

    // Quantize the FINAL opaque color, not a translucent fog layer.
    // Each channel varies only between its two nearest 8-bit values.
    // Noise is anchored to physical pixels, so it never swims with the fog.
    vec3 dithered = floor(color * 255.0 + pixelNoise(gl_FragCoord.xy)) / 255.0;
    gl_FragColor = vec4(dithered, 1.0);
}
`;

export function DirectoryFog() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl', {
            alpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            powerPreference: 'low-power',
        });
        if (!gl) return;

        const shaders: WebGLShader[] = [];
        const compile = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            shaders.push(shader);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
        };
        const vertex = compile(gl.VERTEX_SHADER, vertexSource);
        const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
        const program = gl.createProgram();
        const disposeShaders = () => shaders.forEach(shader => gl.deleteShader(shader));
        if (!vertex || !fragment || !program) {
            disposeShaders();
            if (program) gl.deleteProgram(program);
            return;
        }
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            disposeShaders();
            gl.deleteProgram(program);
            return;
        }

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.useProgram(program);
        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        gl.disable(gl.DITHER);
        const resolution = gl.getUniformLocation(program, 'resolution');
        const background = gl.getUniformLocation(program, 'background');
        const strength = gl.getUniformLocation(program, 'strength');
        const time = gl.getUniformLocation(program, 'time');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        // Let the browser resolve the theme's CSS color into sRGB bytes.
        const colorCanvas = document.createElement('canvas');
        colorCanvas.width = colorCanvas.height = 1;
        const colorContext = colorCanvas.getContext('2d', { willReadFrequently: true });
        let frame = 0;
        let elapsed = 0;
        let lastDraw = 0;
        let contextLost = false;

        const draw = () => {
            if (contextLost) return;
            const width = Math.round(canvas.clientWidth * window.devicePixelRatio);
            const height = Math.round(canvas.clientHeight * window.devicePixelRatio);
            if (!width || !height) return;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }
            gl.uniform2f(resolution, width, height);
            gl.uniform1f(time, elapsed);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            canvas.dataset.ready = 'true';
        };
        const updateTheme = () => {
            if (!colorContext || contextLost) return;
            colorContext.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim();
            colorContext.fillRect(0, 0, 1, 1);
            const [r, g, b] = colorContext.getImageData(0, 0, 1, 1).data;
            gl.uniform3f(background, r / 255, g / 255, b / 255);
            gl.uniform1f(strength, document.documentElement.classList.contains('dark') ? 0.045 : 0.018);
            draw();
        };
        const tick = (now: number) => {
            if (now - lastDraw >= 1000 / 30) {
                elapsed += lastDraw ? Math.min(now - lastDraw, 100) / 1000 : 0;
                lastDraw = now;
                draw();
            }
            frame = requestAnimationFrame(tick);
        };
        const resume = () => {
            cancelAnimationFrame(frame);
            lastDraw = 0;
            if (contextLost || document.hidden) return;
            draw();
            if (!reducedMotion.matches) frame = requestAnimationFrame(tick);
        };
        const onContextLost = () => {
            contextLost = true;
            delete canvas.dataset.ready;
            cancelAnimationFrame(frame);
        };
        const themeObserver = new MutationObserver(updateTheme);
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
        const sizeObserver = new ResizeObserver(draw);
        sizeObserver.observe(canvas);
        canvas.addEventListener('webglcontextlost', onContextLost);
        window.addEventListener('resize', draw);
        document.addEventListener('visibilitychange', resume);
        reducedMotion.addEventListener('change', resume);
        updateTheme();
        resume();

        return () => {
            cancelAnimationFrame(frame);
            themeObserver.disconnect();
            sizeObserver.disconnect();
            canvas.removeEventListener('webglcontextlost', onContextLost);
            window.removeEventListener('resize', draw);
            document.removeEventListener('visibilitychange', resume);
            reducedMotion.removeEventListener('change', resume);
            gl.deleteBuffer(buffer);
            gl.deleteProgram(program);
            disposeShaders();
        };
    }, []);

    return <canvas ref={canvasRef} className="directory-fog" aria-hidden="true" />;
}
