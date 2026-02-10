"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Hero from "@/components/dom/Hero";
import RealEstateSection from "@/components/dom/RealEstateSection";

export default function HomeOverlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    // We need to link to the PARENT scroll. 
    // Since this component is inside the 400vh container in page.tsx, 
    // valid scroll tracking might be tricky if we don't ref the parent.
    // HOWEVER, we can just use window scroll if the layout is standard.
    // Or better: useScroll without target tracks window/viewport.
    // But we want it relative to the sequence container.

    // Actually, in page.tsx, the SequenceScroll is what defines the height (400vh).
    // The overlay is sticky? No, absolute h-full.
    // So the content inside the overlay moves WITH the container?
    // No, I set `hero` as `sticky` before.
    // If I use `useScroll`, I need to know WHEN to fade.
    // 0vh to 400vh.

    // Let's use generic window scroll and map it to typical viewport heights.
    // 0vh - 100vh: Hero visible.
    // 100vh - 200vh: Hero fades out.
    // 200vh: Sequence Switch.
    // 200vh - 300vh: Real Estate fades in.

    const { scrollY } = useScroll();

    // Assuming window.innerHeight is roughly available. 
    // We can use generic pixel values or vh if we use a resize listener, 
    // but framer motion transforms can take direct pixels. 
    // Let's assume standard laptop 800-1000px height. 
    // Safest is to use `scrollYProgress` of the `ref` of the container passed from parent?
    // But simpler: just fade out based on likely scroll amount (e.g. 500px).

    // Better approach: Pass a ref from page.tsx? 
    // No, client boundaries.

    // Let's try explicit 0-1 mapped to container ref.
    // But we act as the container here?

    // Let's make THIS component the container of the sequence tracking too?
    // No, SequenceScroll does that.

    // Let's just use `sticky` for position, and `useTransform` for opacity.
    // Hero is sticky at top.
    // Opacity: Map scrollY 0->500 (1) to 500->1000 (0).

    // We need `window.innerHeight` to be precise.
    const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);
    const yHero = useTransform(scrollY, [0, 800], [0, 100]); // Parallax slight

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Hero Wrapper - Sticky relative to parent container in page.tsx */}
            <div className="w-full h-full flex flex-col justify-center">
                <motion.div style={{ opacity: opacityHero, y: yHero }} className="w-full h-full pointer-events-auto">
                    <Hero />
                </motion.div>
            </div>
        </div>
    );
}
