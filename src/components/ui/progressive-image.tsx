'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
}

/**
 * Progressive Image component with blur-up loading effect
 * Shows a pulsing placeholder that crossfades to the full image when loaded
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
}: ProgressiveImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
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

            {/* Actual image - fades in when loaded */}
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
        </div>
    );
}
