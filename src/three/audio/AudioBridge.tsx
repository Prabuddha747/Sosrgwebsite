"use client";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useSceneStore } from "../store";
import { audioManager } from "./AudioManager";

// Lives inside the canvas. Feeds the AudioManager's listener from the
// live camera every frame (so spatial presence responds to camera
// distance) and publishes amplitude data into the shared store for
// worlds' audio-reactive shaders to read.
export function AudioBridge() {
  const setAudioAmplitude = useSceneStore((s) => s.setAudioAmplitude);
  const { camera } = useThree();
  const forward = useRef(new THREE.Vector3());
  const up = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!audioManager.isUnlocked()) return;

    camera.getWorldDirection(forward.current);
    up.current.set(0, 1, 0).applyQuaternion(camera.quaternion);

    audioManager.updateListener(
      [camera.position.x, camera.position.y, camera.position.z],
      [forward.current.x, forward.current.y, forward.current.z],
      [up.current.x, up.current.y, up.current.z]
    );
    setAudioAmplitude(audioManager.getAmplitude());
  });

  return null;
}
