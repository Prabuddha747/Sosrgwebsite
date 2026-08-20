import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useToast } from '../../design-system';
import { ApiError } from '../../services/httpClient';
import { communityService, CONTENT_SHARE_INDUSTRIES } from '../../services/community';
import type { ContentShare, ContentShareIndustry } from '../../services/community';
import { cn } from '../../lib/utils';

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold focus:bg-black/30 transition-colors placeholder:text-white/30';

// Trigger + inline form in one component so "Create Clip" can be dropped
// into both the Community feed and the profile's My Shared Videos section
// without duplicating the paste-a-link flow.
export const ContentShareComposer = ({ onCreated }: { onCreated: (share: ContentShare) => void }) => {
  const { show } = useToast();
  const [open, setOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [industry, setIndustry] = useState<ContentShareIndustry>('Cinema');
  const [caption, setCaption] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const reset = () => {
    setYoutubeUrl('');
    setCaption('');
    setError(undefined);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(undefined);
    try {
      const created = await communityService.shareContent({
        youtubeUrl: youtubeUrl.trim(),
        industry,
        caption: caption.trim() || undefined,
      });
      onCreated(created);
      show('Clip posted.', 'success');
      reset();
      setOpen(false);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Could not post this clip.';
      setError(message);
      show(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
      >
        <Plus size={14} /> Create Clip
      </button>
    );
  }

  return (
    <div className="glass-panel p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm">Share a YouTube clip</h4>
        <button
          onClick={() => { setOpen(false); reset(); }}
          aria-label="Close"
          className="text-white/40 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">YouTube link</div>
        <input
          type="url"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://youtu.be/…"
          className={inputClass}
        />
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Industry</div>
        <div className="flex flex-wrap gap-2">
          {CONTENT_SHARE_INDUSTRIES.map((ind) => (
            <button
              key={ind}
              type="button"
              onClick={() => setIndustry(ind)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-bold transition-colors border',
                industry === ind
                  ? 'bg-gold border-gold text-black'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white',
              )}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Caption (optional)</div>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Say something about this clip…"
          maxLength={255}
          className={inputClass}
        />
      </div>

      {error && <p role="alert" className="text-xs text-red-400">{error}</p>}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting || !youtubeUrl.trim()}
          className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          {submitting ? 'Posting…' : 'Post Clip'}
        </button>
      </div>
    </div>
  );
};
