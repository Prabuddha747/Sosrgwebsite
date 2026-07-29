"use client";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { damp } from "./utils/damp";
import { useSceneStore } from "./store";

export interface CameraKeyframe {
  progress: number; // 0-1, position along this world's local scroll range
  position: [number, number, number];
  lookAt: [number, number, number];
}

interface CameraRigProps {
  keyframes: CameraKeyframe[];
  lambda?: number;
  reducedMotion?: boolean;
}

function sampleKeyframes(keyframes: CameraKeyframe[], t: number) {
  const first = keyframes[0];
  if (!first) {
    return { position: [0, 0, 5] as [number, number, number], lookAt: [0, 0, 0] as [number, number, number] };
  }
  if (keyframes.length === 1 || t <= first.progress) return { position: first.position, lookAt: first.lookAt };

  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i];
    const b = keyframes[i + 1];
    if (t >= a.progress && t <= b.progress) {
      const localT = (t - a.progress) / (b.progress - a.progress || 1);
      const position: [number, number, number] = [
        THREE.MathUtils.lerp(a.position[0], b.position[0], localT),
        THREE.MathUtils.lerp(a.position[1], b.position[1], localT),
        THREE.MathUtils.lerp(a.position[2], b.position[2], localT),
      ];
      const lookAt: [number, number, number] = [
        THREE.MathUtils.lerp(a.lookAt[0], b.lookAt[0], localT),
        THREE.MathUtils.lerp(a.lookAt[1], b.lookAt[1], localT),
        THREE.MathUtils.lerp(a.lookAt[2], b.lookAt[2], localT),
      ];
      return { position, lookAt };
    }
  }
  const last = keyframes[keyframes.length - 1];
  return { position: last.position, lookAt: last.lookAt };
}

// One camera rig for the whole (world) route group. Scroll (via a
// world's own ScrollTrigger, fed in as `progress`) is the only thing
// that moves the camera — mouse never does (Core Experience Engine §2).
// Reduced motion pins progress to 0: a static first frame, not a
// disabled component, so the world's content still reads.
export function CameraRig({ keyframes, lambda = 3.5, reducedMotion = false }: CameraRigProps) {
  const currentLookAt = useRef(new THREE.Vector3(...(keyframes[0]?.lookAt ?? [0, 0, 0])));

  useFrame(({ camera }, delta) => {
    // Read imperatively (not via the reactive hook) — progress updates
    // every scroll tick, and subscribing here would re-render this
    // component every tick instead of just mutating the camera.
    const progress = reducedMotion ? 0 : useSceneStore.getState().worldProgress;
    const sample = sampleKeyframes(keyframes, progress);

    camera.position.x = damp(camera.position.x, sample.position[0], lambda, delta);
    camera.position.y = damp(camera.position.y, sample.position[1], lambda, delta);
    camera.position.z = damp(camera.position.z, sample.position[2], lambda, delta);

    currentLookAt.current.x = damp(currentLookAt.current.x, sample.lookAt[0], lambda, delta);
    currentLookAt.current.y = damp(currentLookAt.current.y, sample.lookAt[1], lambda, delta);
    currentLookAt.current.z = damp(currentLookAt.current.z, sample.lookAt[2], lambda, delta);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
