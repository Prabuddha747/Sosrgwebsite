// Real content translations only exist for en/hi right now — the navbar's
// picker also lists mr/ta/te/bn (pre-existing UI), which fall back to
// English via this same function until those get their own copy.
export const tr = (language: string, en: string, hi: string) => (language === 'hi' ? hi : en);
