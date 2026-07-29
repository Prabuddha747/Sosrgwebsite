"use client";
import { useSceneStore } from "../store";
import { audioManager } from "./AudioManager";

// Always-visible, always-accessible mute control — DOM, not buried in
// the canvas. CLAUDE.md Section 4: sound is "always user-controllable."
// First click both unlocks the AudioContext (required by browser
// autoplay policy) and doubles as the visitor's explicit opt-in.
export function AudioControl() {
  const muted = useSceneStore((s) => s.muted);
  const volume = useSceneStore((s) => s.volume);
  const setMuted = useSceneStore((s) => s.setMuted);
  const audioUnlocked = useSceneStore((s) => s.audioUnlocked);
  const setAudioUnlocked = useSceneStore((s) => s.setAudioUnlocked);

  const handleClick = () => {
    if (!audioUnlocked) {
      audioManager.unlock(volume, muted);
      setAudioUnlocked(true);
      return;
    }
    const next = !muted;
    setMuted(next);
    audioManager.setMuted(next);
  };

  const showMuted = !audioUnlocked || muted;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={showMuted ? "Unmute ambient sound" : "Mute ambient sound"}
      aria-pressed={!showMuted}
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[#E9DFC9] backdrop-blur-sm transition hover:border-white/30 hover:bg-black/60"
    >
      {showMuted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
      )}
    </button>
  );
}
