// Capture the render canvas only. MediaRecorder finalizes the MP4 before download.
export async function recordStudioLoop({ canvas, duration, draw, progress, signal }: {
    canvas: HTMLCanvasElement; duration: number; draw: (fraction: number) => void;
    progress: (fraction: number) => void; signal: AbortSignal;
}): Promise<Blob> {
    const mimeType = ['video/mp4;codecs=avc1.42001f', 'video/mp4'].find(type =>
        typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type));
    if (!mimeType) throw new Error('MP4 recording is unavailable in this browser. Open Crest Studio in current Chrome or Safari.');
    draw(0);
    const stream = canvas.captureStream(30);
    let recorder: MediaRecorder;
    try { recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 12_000_000 }); }
    catch (error) { stream.getTracks().forEach(track => track.stop()); throw error; }
    return new Promise((resolve, reject) => {
        const chunks: Blob[] = [];
        let frame = 0, timer = 0, last = 0, elapsed = 0, lastProgress = -1, completed = false;
        let failure: Error | undefined;
        const cleanup = () => {
            cancelAnimationFrame(frame); clearTimeout(timer);
            stream.getTracks().forEach(track => track.stop());
            document.removeEventListener('visibilitychange', visibility);
            signal.removeEventListener('abort', abort);
        };
        const abort = () => {
            failure = new Error('Recording canceled.');
            cancelAnimationFrame(frame); clearTimeout(timer);
            if (recorder.state !== 'inactive') recorder.stop();
        };
        const tick = (now: number) => {
            if (document.hidden || recorder.state !== 'recording') return;
            if (last) elapsed += (now - last) / 1000;
            last = now;
            const fraction = Math.min(elapsed / duration, 1);
            try { draw(fraction); } catch (error) { failure = error instanceof Error ? error : new Error('Render failed.'); recorder.stop(); return; }
            if (Math.floor(fraction * 100) !== lastProgress) { lastProgress = Math.floor(fraction * 100); progress(fraction); }
            if (fraction >= 1) {
                completed = true;
                // Allow the final endpoint frame to reach the encoder before stop flushes it.
                timer = window.setTimeout(() => { if (recorder.state !== 'inactive') recorder.stop(); }, 100);
            } else frame = requestAnimationFrame(tick);
        };
        const visibility = () => {
            if (completed || recorder.state === 'inactive') return;
            cancelAnimationFrame(frame); last = 0;
            if (document.hidden && recorder.state === 'recording') recorder.pause();
            else if (!document.hidden && recorder.state === 'paused') { recorder.resume(); frame = requestAnimationFrame(tick); }
        };
        recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
        recorder.onerror = () => { failure = new Error('The MP4 encoder failed. Please try recording again.'); if (recorder.state !== 'inactive') recorder.stop(); else { cleanup(); reject(failure); } };
        recorder.onstop = () => {
            cleanup();
            if (failure || !completed || !chunks.length) reject(failure ?? new Error('Recording did not finish. Please try again.'));
            else resolve(new Blob(chunks, { type: 'video/mp4' }));
        };
        signal.addEventListener('abort', abort, { once: true });
        document.addEventListener('visibilitychange', visibility);
        recorder.start();
        if (signal.aborted) abort();
        else if (document.hidden) recorder.pause();
        else frame = requestAnimationFrame(tick);
    });
}
