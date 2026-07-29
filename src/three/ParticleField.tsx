"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { noiseGLSL } from "./shaders/noise";
import { falloffGLSL } from "./shaders/falloff";
import { paletteGLSL } from "./shaders/palette";
import { useSceneStore } from "./store";

export interface ParticleFieldConfig {
  count: number;
  radius: number;
  colorCore: string;
  colorEdge: string;
  size: number;
  driftSpeed?: number;
  gravityStrength?: number;
}

const vertexShader = /* glsl */ `
${noiseGLSL}
uniform float uTime;
uniform vec2 uPointer;
uniform float uGravityStrength;
uniform float uDriftSpeed;
uniform float uSize;
attribute float aSeed;
varying float vDist;

void main() {
  vec3 pos = position;

  float n1 = snoise(pos * 0.6 + uTime * uDriftSpeed + aSeed * 10.0);
  float n2 = snoise(pos * 0.6 + uTime * uDriftSpeed + aSeed * 10.0 + 100.0);
  float n3 = snoise(pos * 0.6 + uTime * uDriftSpeed + aSeed * 10.0 + 200.0);
  pos += vec3(n1, n2, n3) * 0.3;

  vec2 toPointer = uPointer - pos.xy;
  float distToPointer = length(toPointer);
  vDist = distToPointer;
  float pull = uGravityStrength / (distToPointer * distToPointer + 1.0);
  pos.xy += normalize(toPointer + 0.0001) * pull;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
${falloffGLSL}
${paletteGLSL}
uniform vec3 uColorCore;
uniform vec3 uColorEdge;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv) * 2.0;
  float alpha = softFalloff(dist, 1.0, 0.6);
  if (alpha < 0.01) discard;
  vec3 color = paletteMix(uColorCore, uColorEdge, dist);
  gl_FragColor = vec4(color, alpha);
}
`;

// The one GPU-instanced particle engine. Behavior is data (a config
// object), not new code — every world reuses this component with its
// own count/radius/palette rather than writing its own particle system
// (Core Experience Engine §6).
export function ParticleField({ config }: { config: ParticleFieldConfig }) {
  const pointer = useSceneStore((s) => s.pointer);
  const performanceTier = useSceneStore((s) => s.performanceTier);

  const count = useMemo(() => {
    if (performanceTier === "low") return Math.floor(config.count * 0.4);
    if (performanceTier === "medium") return Math.floor(config.count * 0.7);
    return config.count;
  }, [config.count, performanceTier]);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = config.radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      seeds[i] = Math.random();
    }
    return { positions, seeds };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, config.radius]);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uGravityStrength: { value: config.gravityStrength ?? 0.4 },
      uDriftSpeed: { value: config.driftSpeed ?? 0.05 },
      uSize: { value: config.size },
      uColorCore: { value: new THREE.Color(config.colorCore) },
      uColorEdge: { value: new THREE.Color(config.colorEdge) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uPointer.value.set(
      pointer.x * config.radius * 0.5,
      pointer.y * config.radius * 0.5
    );
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSeed" count={count} array={seeds} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
