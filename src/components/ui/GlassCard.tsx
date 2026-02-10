"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high";
}

export default function GlassCard({
    children,
    className,
    intensity = "medium",
    ...props
}: GlassCardProps) {

    const intensityMap = {
        low: "bg-brand-charcoal/30 backdrop-blur-md border-white/5",
        medium: "bg-brand-charcoal/50 backdrop-blur-lg border-white/10 shadow-xl",
        high: "bg-brand-charcoal/70 backdrop-blur-2xl border-white/20 shadow-2xl",
    };

    return (
        <motion.div
            className={cn(
                "rounded-2xl border transition-all duration-500",
                intensityMap[intensity],
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
