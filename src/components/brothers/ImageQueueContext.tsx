'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface ImageQueueContextType {
    registerImage: (index: number, load: () => void) => void;
    onImageLoaded: (index: number) => void;
    onImageError: (index: number) => void;
}

const ImageQueueContext = createContext<ImageQueueContextType | null>(null);

interface ImageQueueProviderProps {
    children: React.ReactNode;
    // How many images can load at once (1 = strictly sequential, 2-3 = faster with some parallelism)
    concurrency?: number;
}

/**
 * Provider that manages sequential image loading
 * Images register themselves and wait their turn to load
 */
export function ImageQueueProvider({ children, concurrency = 2 }: ImageQueueProviderProps) {
    const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);
    const pendingLoads = useRef<Map<number, () => void>>(new Map());
    const loadedIndices = useRef<Set<number>>(new Set());
    const activeLoads = useRef<Set<number>>(new Set());

    const tryLoadNext = useCallback(() => {
        // Find the next images to load (up to concurrency limit)
        const sorted = Array.from(pendingLoads.current.entries()).sort((a, b) => a[0] - b[0]);

        for (const [index, loadFn] of sorted) {
            if (activeLoads.current.size >= concurrency) break;
            if (activeLoads.current.has(index)) continue;

            // Check if all previous images are loaded or loading
            let canLoad = true;
            for (let i = 0; i < index; i++) {
                if (!loadedIndices.current.has(i) && !activeLoads.current.has(i) && pendingLoads.current.has(i)) {
                    canLoad = false;
                    break;
                }
            }

            if (canLoad) {
                activeLoads.current.add(index);
                pendingLoads.current.delete(index);
                loadFn();
            }
        }
    }, [concurrency]);

    const registerImage = useCallback((index: number, load: () => void) => {
        pendingLoads.current.set(index, load);
        // Use setTimeout to batch registrations
        setTimeout(tryLoadNext, 0);
    }, [tryLoadNext]);

    const onImageLoaded = useCallback((index: number) => {
        loadedIndices.current.add(index);
        activeLoads.current.delete(index);
        tryLoadNext();
    }, [tryLoadNext]);

    const onImageError = useCallback((index: number) => {
        // Treat errors same as loaded so we don't block the queue
        loadedIndices.current.add(index);
        activeLoads.current.delete(index);
        tryLoadNext();
    }, [tryLoadNext]);

    return (
        <ImageQueueContext.Provider value={{ registerImage, onImageLoaded, onImageError }}>
            {children}
        </ImageQueueContext.Provider>
    );
}

export function useImageQueue() {
    return useContext(ImageQueueContext);
}
