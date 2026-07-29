// Frame-rate-independent exponential damping — the spring/damping
// primitive CLAUDE.md Section 6 asks for in place of hand-authored
// easing. Self-contained (no undeclared transitive-dependency import)
// so it doesn't silently break on a lockfile change.
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}
