"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface SequenceScrollProps {
    heroSequencePath: string;
    heroFrameCount: number;
    secondSequencePath: string;
    secondFrameCount: number;
    className?: string;
}

// Detect mobile device
const isMobileDevice = () => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// Mobile optimization: use every Nth frame to reduce memory
const MOBILE_FRAME_SKIP = 3; // Load every 3rd frame (192 -> 64 frames) - balance between smoothness and performance
const getMobileFrameIndex = (index: number, total: number) => {
    return Math.min(total - 1, index * MOBILE_FRAME_SKIP);
};

export default function SequenceScroll({
    heroSequencePath,
    heroFrameCount,
    secondSequencePath,
    secondFrameCount,
    className = "",
}: SequenceScrollProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesHero, setImagesHero] = useState<HTMLImageElement[]>([]);
    const [imagesSecond, setImagesSecond] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Scroll progress for the entire page
    const { scrollY } = useScroll();
    const [windowHeight, setWindowHeight] = useState(0);
    const [documentHeight, setDocumentHeight] = useState(0);

    useEffect(() => {
        // Check if mobile on mount
        const mobile = isMobileDevice();
        setIsMobile(mobile);

        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setDocumentHeight(document.body.scrollHeight - window.innerHeight);

            if (canvasRef.current) {
                // Set canvas size for both desktop and mobile
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        // Initial measure
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Preload Images - optimized for mobile
    useEffect(() => {
        const isMobile = isMobileDevice();
        
        const loadImages = async () => {
            const promisesHero = [];
            const promisesSecond = [];

            // For mobile: load every Nth frame to save memory
            const heroStep = isMobile ? MOBILE_FRAME_SKIP : 1;
            const secondStep = isMobile ? MOBILE_FRAME_SKIP : 1;
            
            // Calculate actual number of frames to load
            const mobileHeroFrameCount = isMobile 
                ? Math.ceil(heroFrameCount / heroStep) 
                : heroFrameCount;
            const mobileSecondFrameCount = isMobile 
                ? Math.ceil(secondFrameCount / secondStep) 
                : secondFrameCount;

            for (let i = 0; i < mobileHeroFrameCount; i++) {
                const frameIndex = isMobile ? getMobileFrameIndex(i, heroFrameCount) : i;
                const img = new Image();
                const paddedIndex = frameIndex.toString().padStart(3, "0");
                img.src = `${heroSequencePath}/${paddedIndex}.jpg`;
                promisesHero.push(
                    new Promise<HTMLImageElement>((resolve) => {
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(img);
                    })
                );
            }

            for (let i = 0; i < mobileSecondFrameCount; i++) {
                const frameIndex = isMobile ? getMobileFrameIndex(i, secondFrameCount) : i;
                const img = new Image();
                const paddedIndex = frameIndex.toString().padStart(3, "0");
                img.src = `${secondSequencePath}/${paddedIndex}.jpg`;
                promisesSecond.push(
                    new Promise<HTMLImageElement>((resolve) => {
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(img);
                    })
                );
            }

            const loadedHero = await Promise.all(promisesHero);
            const loadedSecond = await Promise.all(promisesSecond);

            setImagesHero(loadedHero);
            setImagesSecond(loadedSecond);
            setLoaded(true);
        };

        loadImages();
    }, [heroSequencePath, heroFrameCount, secondSequencePath, secondFrameCount]);

    // Render Loop - works on both desktop and mobile
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!loaded || !canvasRef.current || windowHeight === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const switchPoint = windowHeight * 1.2;
        let img: HTMLImageElement | undefined;

        // Calculate effective frame counts (different for mobile)
        const effectiveHeroFrameCount = isMobile 
            ? Math.ceil(heroFrameCount / MOBILE_FRAME_SKIP) 
            : heroFrameCount;
        const effectiveSecondFrameCount = isMobile 
            ? Math.ceil(secondFrameCount / MOBILE_FRAME_SKIP) 
            : secondFrameCount;

        if (latest < switchPoint) {
            // Sequence 1
            const progress = latest / switchPoint;
            const idx = Math.min(
                effectiveHeroFrameCount - 1,
                Math.floor(progress * (effectiveHeroFrameCount - 1))
            );
            img = imagesHero[idx];
        } else {
            // Sequence 2
            const remainingScroll = documentHeight - switchPoint;
            const progress = remainingScroll > 0 ? (latest - switchPoint) / remainingScroll : 0;
            const clampedProgress = Math.max(0, Math.min(1, progress));
            const idx = Math.min(
                effectiveSecondFrameCount - 1,
                Math.floor(clampedProgress * (effectiveSecondFrameCount - 1))
            );
            img = imagesSecond[idx];
        }

        if (img && img.width > 0) {
            const canvas = canvasRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // "Cover" algorithm
            const w = canvas.width;
            const h = canvas.height;
            const imgW = img.width;
            const imgH = img.height;

            const scale = Math.max(w / imgW, h / imgH);
            const x = (w / 2) - (imgW / 2) * scale;
            const y = (h / 2) - (imgH / 2) * scale;

            ctx.drawImage(img, x, y, imgW * scale, imgH * scale);
        }
    });

    return (
        <div className={`fixed top-0 left-0 w-full h-full z-0 ${className}`}>
            {/* Canvas for both desktop and mobile - mobile uses reduced frame count */}
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
                style={{ touchAction: 'pan-y pinch-zoom' }}
            />
            {/* Loading Indicator */}
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white z-50">
                    <div className="text-center">
                        <div className="text-lg font-light mb-2">Loading Experience</div>
                        <div className="text-sm text-white/50">
                            {isMobile ? 'Optimized for mobile' : 'Loading sequences...'}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
