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
        setIsMobile(isMobileDevice());

        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setDocumentHeight(document.body.scrollHeight - window.innerHeight);

            if (canvasRef.current && !isMobileDevice()) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        // Initial measure
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Preload Images - skip on mobile for performance
    useEffect(() => {
        // Skip heavy image loading on mobile devices
        if (isMobileDevice()) {
            setLoaded(true); // Mark as loaded to remove loading indicator
            return;
        }

        const loadImages = async () => {
            const promisesHero = [];
            const promisesSecond = [];

            for (let i = 0; i < heroFrameCount; i++) {
                const img = new Image();
                const paddedIndex = i.toString().padStart(3, "0");
                img.src = `${heroSequencePath}/${paddedIndex}.jpg`;
                promisesHero.push(
                    new Promise<HTMLImageElement>((resolve) => {
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(img);
                    })
                );
            }

            for (let i = 0; i < secondFrameCount; i++) {
                const img = new Image();
                const paddedIndex = i.toString().padStart(3, "0");
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

    // Render Loop - skip on mobile
    useMotionValueEvent(scrollY, "change", (latest) => {
        // Skip canvas rendering on mobile devices
        if (isMobile || !loaded || !canvasRef.current || windowHeight === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        // Logic:
        // 0px to windowHeight * 1.2 (approx): Sequence 1
        // windowHeight * 1.2 to End: Sequence 2

        // Let's define the "Switch Point"
        // To make sure Sequence 1 finishes exactly when we want, let's say at 120vh.
        const switchPoint = windowHeight * 1.2;

        let img: HTMLImageElement | undefined;

        if (latest < switchPoint) {
            // Sequence 1
            const progress = latest / switchPoint; // 0 to 1
            const idx = Math.min(
                heroFrameCount - 1,
                Math.floor(progress * (heroFrameCount - 1))
            );
            img = imagesHero[idx];
        } else {
            // Sequence 2
            // Map from switchPoint to documentHeight
            const remainingScroll = documentHeight - switchPoint;
            // Avoid division by zero
            const progress = remainingScroll > 0 ? (latest - switchPoint) / remainingScroll : 0;

            // Clamp progress 0 to 1
            const clampedProgress = Math.max(0, Math.min(1, progress));

            const idx = Math.min(
                secondFrameCount - 1,
                Math.floor(clampedProgress * (secondFrameCount - 1))
            );
            img = imagesSecond[idx];
        }

        if (img) {
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
            {/* Hide canvas on mobile, show static fallback */}
            {!isMobile ? (
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />
            ) : (
                /* Mobile fallback - static gradient background */
                <div 
                    className="w-full h-full"
                    style={{
                        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f0f 100%)'
                    }}
                />
            )}
            {/* Loading Indicator */}
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white z-50">
                    Loading Experience...
                </div>
            )}
        </div>
    );
}
