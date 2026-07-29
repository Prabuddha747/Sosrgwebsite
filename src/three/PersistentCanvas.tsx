"use client";
import { Suspense, useEffect, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useSceneStore } from "./store";
import { AudioBridge } from "./audio/AudioBridge";
import { PostFX } from "./PostFX";
import { usePerformanceTier } from "./hooks/usePerformanceTier";

// Tracked at the window level (not via R3F pointer events) so the
// canvas wrapper can stay pointer-events:none and never block DOM
// content/links rendered in front of it.
function PointerTracker() {
  const setPointer = useSceneStore((s) => s.setPointer);
  useEffect(() => {
    const handle = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      setPointer(x, y);
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, [setPointer]);
  return null;
}

function EngineLoop() {
  usePerformanceTier();
  return null;
}

// The single <Canvas>, mounted once by the (world) route group's
// layout and never unmounted between Home/About/Manifesto navigation
// (Core Experience Engine §1). Everything inside is shared systems +
// whichever world's content is passed as children.
export function PersistentCanvas({ children }: { children: ReactNode }) {
  const reducedMotion = useSceneStore((s) => s.reducedMotion);

  return (
    <div className="fixed inset-0 -z-10" style={{ pointerEvents: "none" }} aria-hidden="true">
      <PointerTracker />
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ fov: 45, position: [0, 0, 6], near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#07080A"]} />
        <fogExp2 attach="fog" args={["#07080A", 0.05]} />
        <ambientLight intensity={0.12} />
        <EngineLoop />
        <AudioBridge />
        <Suspense fallback={null}>{children}</Suspense>
        {!reducedMotion && <PostFX />}
      </Canvas>
    </div>
  );
}
