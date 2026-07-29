"use client";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { noiseGLSL } from "../shaders/noise";
import { morphGLSL } from "../shaders/morph";
import { lightShaftGLSL } from "../shaders/lightShaft";
import { CameraRig, type CameraKeyframe } from "../CameraRig";
import { ParticleField, type ParticleFieldConfig } from "../ParticleField";
import { useSceneStore } from "../store";
import { audioManager } from "../audio/AudioManager";

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { progress: 0, position: [0, 0, 7], lookAt: [0, 0, 0] },
  { progress: 0.5, position: [0.35, 0.12, 4.6], lookAt: [0, 0, 0] },
  { progress: 1, position: [-0.25, 0.05, 3.2], lookAt: [0, 0, 0] },
];

const DUST_CONFIG: ParticleFieldConfig = {
  count: 9000,
  radius: 6,
  colorCore: "#C4703A",
  colorEdge: "#E9DFC9",
  size: 6,
  driftSpeed: 0.04,
  gravityStrength: 0.5,
};

const seedVertexShader = /* glsl */ `
${noiseGLSL}
${morphGLSL}
uniform float uTime;
uniform float uAudioPulse;
uniform float uTransitionProgress;
varying vec3 vNormal;
varying float vCrack;

void main() {
  float ambientPulse = sin(uTime * 0.6) * 0.5 + 0.5;
  float crackMask = smoothstep(0.55, 0.75, snoise(position * 3.5) * 0.5 + 0.5);
  vCrack = crackMask;

  float displacement = morphDisplacement(position, uTime, ambientPulse, uAudioPulse, uTransitionProgress, crackMask);
  vec3 displaced = position + normal * displacement;

  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const seedFragmentShader = /* glsl */ `
uniform vec3 uColorBase;
uniform vec3 uColorCrack;
uniform float uAudioPulse;
varying vec3 vNormal;
varying float vCrack;

void main() {
  vec3 lightDir = normalize(vec3(0.4, 0.6, 0.8));
  float diff = max(dot(vNormal, lightDir), 0.0);
  float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.0);

  vec3 base = uColorBase * (0.15 + diff * 0.5);
  vec3 crackGlow = uColorCrack * (vCrack * (0.6 + uAudioPulse * 0.6));

  vec3 color = base + crackGlow + fresnel * uColorCrack * 0.15;
  gl_FragColor = vec4(color, 1.0);
}
`;

const shaftVertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const shaftFragmentShader = /* glsl */ `
${noiseGLSL}
${lightShaftGLSL}
uniform float uTime;
uniform float uSeed;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float envelope = 1.0 - abs(vUv.y - 0.5) * 2.0;
  float flicker = lightShaftOpacity(vUv, uTime, uSeed);
  gl_FragColor = vec4(uColor, envelope * flicker * 0.35);
}
`;

// The "Seed of Creation" — procedural, morphing, audio-reactive hero
// object. See docs2/reports/02_visual_bible_prologue.md for the
// reasoning (phenomenon, not a physical object → procedural, per
// CLAUDE.md Section 7).
function SeedOfCreation() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pannerCreated = useRef(false);
  const audioUnlocked = useSceneStore((s) => s.audioUnlocked);

  useEffect(() => {
    if (!audioUnlocked || pannerCreated.current) return;
    pannerCreated.current = true;
    const panner = audioManager.createPlaceholderAnchor();
    if (panner.positionX) {
      panner.positionX.value = 0;
      panner.positionY.value = 0;
      panner.positionZ.value = 0;
    }
  }, [audioUnlocked]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAudioPulse: { value: 0 },
      uTransitionProgress: { value: 0 },
      uColorBase: { value: new THREE.Color("#3A2A1E") },
      uColorCrack: { value: new THREE.Color("#D98A4E") },
    }),
    []
  );

  useFrame((state) => {
    const { worldProgress, audioAmplitude, reducedMotion } = useSceneStore.getState();
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uAudioPulse.value = audioAmplitude;
    const effectiveProgress = reducedMotion ? 0 : worldProgress;
    uniforms.uTransitionProgress.value = THREE.MathUtils.smoothstep(effectiveProgress, 0.75, 1.0);

    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.037) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1, 4]} />
        <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={seedVertexShader} fragmentShader={seedFragmentShader} />
      </mesh>
      <pointLight color="#D98A4E" intensity={2.2} distance={7} decay={2} />
    </group>
  );
}

function LightShaft({ rotationZ, tilt, seed }: { rotationZ: number; tilt: number; seed: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSeed: { value: seed },
      uColor: { value: new THREE.Color("#D98A4E") },
    }),
    [seed]
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, rotationZ]}>
      <planeGeometry args={[0.5, 5]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={shaftVertexShader}
        fragmentShader={shaftFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Cheap stand-in for volumetric light (Visual Bible "Environment" —
// ceiling/upgrade path to a real raymarched fog volume noted there).
function LightShafts() {
  const shafts = useMemo(
    () =>
      new Array(6).fill(0).map((_, i) => ({
        rotationZ: (i / 6) * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 0.6,
        seed: Math.random() * 10,
      })),
    []
  );

  return (
    <>
      {shafts.map((s, i) => (
        <LightShaft key={i} rotationZ={s.rotationZ} tilt={s.tilt} seed={s.seed} />
      ))}
    </>
  );
}

export function PrologueWorld() {
  const reducedMotion = useSceneStore((s) => s.reducedMotion);
  const headlineRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!headlineRef.current) return;
    const { worldProgress, reducedMotion: rm } = useSceneStore.getState();
    const progress = rm ? 1 : worldProgress;
    const opacity = THREE.MathUtils.smoothstep(progress, 0.15, 0.4);
    const material = headlineRef.current.material as THREE.Material & { opacity: number };
    material.opacity = opacity;
  });

  return (
    <>
      <CameraRig keyframes={CAMERA_KEYFRAMES} reducedMotion={reducedMotion} />
      <SeedOfCreation />
      <LightShafts />
      <ParticleField config={DUST_CONFIG} />
      <Text
        ref={headlineRef}
        position={[0, -1.9, 2.4]}
        fontSize={0.4}
        color="#E9DFC9"
        anchorX="center"
        anchorY="middle"
        maxWidth={4.2}
        textAlign="center"
        material-transparent
        material-opacity={0}
      >
        Every creation begins with a Creator.
      </Text>
    </>
  );
}
