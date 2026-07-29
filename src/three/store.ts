import { create } from "zustand";

// The one cross-cutting state store every world reads from. Deliberately
// minimal: only values that are genuinely global (pointer, audio,
// accessibility, performance) live here. Per-world scroll progress stays
// local to each world (via its own ScrollTrigger) until a second world
// exists and a shared range-registry is actually needed — see Core
// Experience Engine doc §1/§9 for why this isn't built speculatively yet.
export type PerformanceTier = "high" | "medium" | "low";

interface SceneState {
  pointer: { x: number; y: number };
  setPointer: (x: number, y: number) => void;

  audioAmplitude: number;
  setAudioAmplitude: (v: number) => void;

  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;

  performanceTier: PerformanceTier;
  setPerformanceTier: (v: PerformanceTier) => void;

  muted: boolean;
  volume: number;
  setMuted: (v: boolean) => void;
  setVolume: (v: number) => void;

  audioUnlocked: boolean;
  setAudioUnlocked: (v: boolean) => void;

  // Single active-world scroll progress (0-1). Deliberately not a
  // multi-world registry yet — one number is correct while Prologue is
  // the only world; generalize into a per-world range map when a second
  // world actually exists (Core Experience Engine §1/§9).
  worldProgress: number;
  setWorldProgress: (v: number) => void;
}

const AUDIO_PREFS_KEY = "sosrg-audio-prefs";

function loadAudioPrefs(): { muted: boolean; volume: number } {
  if (typeof window === "undefined") return { muted: false, volume: 0.5 };
  try {
    const raw = window.localStorage.getItem(AUDIO_PREFS_KEY);
    if (!raw) return { muted: false, volume: 0.5 };
    const parsed = JSON.parse(raw);
    return {
      muted: Boolean(parsed.muted),
      volume: typeof parsed.volume === "number" ? parsed.volume : 0.5,
    };
  } catch {
    return { muted: false, volume: 0.5 };
  }
}

function saveAudioPrefs(muted: boolean, volume: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUDIO_PREFS_KEY, JSON.stringify({ muted, volume }));
}

export const useSceneStore = create<SceneState>((set, get) => {
  const initialAudio = loadAudioPrefs();
  return {
    pointer: { x: 0, y: 0 },
    setPointer: (x, y) => set({ pointer: { x, y } }),

    audioAmplitude: 0,
    setAudioAmplitude: (v) => set({ audioAmplitude: v }),

    reducedMotion: false,
    setReducedMotion: (v) => set({ reducedMotion: v }),

    performanceTier: "high",
    setPerformanceTier: (v) => set({ performanceTier: v }),

    muted: initialAudio.muted,
    volume: initialAudio.volume,
    setMuted: (v) => {
      set({ muted: v });
      saveAudioPrefs(v, get().volume);
    },
    setVolume: (v) => {
      set({ volume: v });
      saveAudioPrefs(get().muted, v);
    },

    audioUnlocked: false,
    setAudioUnlocked: (v) => set({ audioUnlocked: v }),

    worldProgress: 0,
    setWorldProgress: (v) => set({ worldProgress: v }),
  };
});
