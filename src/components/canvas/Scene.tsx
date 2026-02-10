"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

type Props = {
    children: React.ReactNode;
    className?: string;
    eventSource?: React.RefObject<HTMLElement>;
    eventPrefix?: "offset" | "client" | "page" | "layer" | "screen";
};

export default function Scene({ children, ...props }: Props) {
    return (
        <Canvas {...props}>
            <directionalLight intensity={0.75} />
            <ambientLight intensity={0.75} />
            {children}
            <Preload all />
        </Canvas>
    );
}
