"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function SectionReveal({
    children,
    className = "",
    delay = 0,
}: SectionRevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}
