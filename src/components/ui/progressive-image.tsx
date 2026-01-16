'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useImageQueue } from '@/components/brothers/ImageQueueContext';

interface ProgressiveImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    className?: string;
    style?: React.CSSProperties;
    onError?: () => void;
    priority?: boolean;
    quality?: number;
    /** Index for sequential loading queue (optional) */
    queueIndex?: number;
}

/**
 * Progressive Image component with blur-up loading effect
 * Shows a pulsing placeholder that crossfades to the full image when loaded
 * Supports optional sequential loading via ImageQueueContext
 */
export function ProgressiveImage({
    src,
    alt,
    fill = true,
    sizes,
    className,
    style,
    onError,
    priority = false,
    quality = 75,
    queueIndex,
}: ProgressiveImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const imageQueue = useImageQueue();
    const hasRegistered = useRef(false);

    // Register with queue if index provided and queue context exists
    useEffect(() => {
        if (queueIndex !== undefined && imageQueue && !hasRegistered.current) {
            hasRegistered.current = true;
            imageQueue.registerImage(queueIndex, () => {
                setShouldRender(true);
            });
        } else if (queueIndex === undefined || !imageQueue) {
            // No queue, render immediately
            setShouldRender(true);
        }
    }, [queueIndex, imageQueue]);

    const handleLoad = () => {
        setIsLoaded(true);
        if (queueIndex !== undefined && imageQueue) {
            imageQueue.onImageLoaded(queueIndex);
        }
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
        if (queueIndex !== undefined && imageQueue) {
            imageQueue.onImageError(queueIndex);
        }
    };

    if (hasError) {
        return null; // Let parent handle error state
    }

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Animated gradient placeholder - visible until image loads */}
            <div
                className={cn(
                    'absolute inset-0 bg-gradient-to-br from-green-card via-green-dark-bg to-green-card',
                    'transition-opacity duration-500 ease-out',
                    isLoaded ? 'opacity-0' : 'opacity-100'
                )}
            >
                {/* Shimmer effect */}
                <div
                    className="absolute inset-0 animate-shimmer"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(46, 204, 113, 0.1) 50%, transparent 100%)',
                        backgroundSize: '200% 100%',
                    }}
                />
            </div>

            {/* Actual image - fades in when loaded, only renders when allowed by queue */}
            {shouldRender && (
                <Image
                    src={src}
                    alt={alt}
                    fill={fill}
                    sizes={sizes}
                    className={cn(
                        'transition-opacity duration-500 ease-out',
                        isLoaded ? 'opacity-100' : 'opacity-0',
                        className
                    )}
                    style={style}
                    onLoad={handleLoad}
                    onError={handleError}
                    priority={priority}
                    quality={quality}
                />
            )}
        </div>
    );
}
