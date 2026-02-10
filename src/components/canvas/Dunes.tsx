"use client";

import { useMemo, useRef } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

// Vertex Shader: Creates the undulation and the "stepped" terrace effect
const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;

  // Simple pseudo-random noise
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Large rolling waves
    float bigWaves = sin(pos.x * 0.5 + uTime * 0.2) * sin(pos.y * 0.3 + uTime * 0.1);
    
    // Detailed noise
    float detail = noise(pos.xy * 2.0 + uTime * 0.1);
    
    // Combine for height
    float elevation = bigWaves * 1.5 + detail * 0.5;

    // Apply "Stepping" for Terracotta Layer effect
    float steps = 5.0; // How many layers
    elevation = floor(elevation * steps) / steps;

    pos.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment Shader: Matte plaster look with soft lighting
const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  
  uniform vec3 uColor;
  uniform vec3 uShadowColor;

  void main() {
    // Reconstruct normals from derivatives for flat shading effect on curved surface
    // This gives a crisp look to the steps if they are sharp, or smooth if not.
    // Since we stepped the Z in vertex, the derivatives will show the steps.
    vec3 x = dFdx(vElevation * vec3(0.0, 0.0, 1.0));
    vec3 y = dFdy(vElevation * vec3(0.0, 0.0, 1.0));
    // Actually, using vElevation directly for color gradation is better for "soft" look
    
    // Base color mixing based on height for subtle gradient
    vec3 color = mix(uShadowColor, uColor, vElevation * 0.5 + 0.5);

    // Add some noise texture for "Plaster" grain
    float grain = (fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.05;
    
    gl_FragColor = vec4(color + grain, 1.0);
  }
`;

export default function Dunes(props: ThreeElements["mesh"]) {
    const mesh = useRef<THREE.Mesh>(null!);

    // Uniforms for the shader
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: new THREE.Color("#E3D5C9") }, // Light Beige
            uShadowColor: { value: new THREE.Color("#C6A87C") }, // Darker Gold/Beige for depth
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            // @ts-ignore
            mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh} {...props} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
            {/* High segment count plane for displacement */}
            <planeGeometry args={[20, 20, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                wireframe={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
