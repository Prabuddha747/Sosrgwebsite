import { useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '../../design-system';
import { ApiError } from '../../services/httpClient';
import { communityService, CONTENT_SHARE_INDUSTRIES } from '../../services/community';
import type { ContentShare, ContentShareIndustry } from '../../services/community';
import { cn } from '../../lib/utils';

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold focus:bg-black/30 transition-colors placeholder:text-white/30';

// Inline edit form for one already-posted clip — industry + caption only,
// the video itself isn't editable (that's a new post, not an edit).
export const ContentShareEditPanel = ({
  share,
  onSaved,
  onCancel,
}: {
  share: ContentShare;
  onSaved: (updated: ContentShare) => void;
  onCancel: () => void;
}) => {
  const { show } = useToast();
  const [industry, setIndustry] = useState<ContentShareIndustry>(share.industry);
  const [caption, setCaption] = useState(share.caption ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const handleSave = async () => {
    setSubmitting(true);
    setError(undefined);
    try {
      await communityService.updateContentShare(share.id, {
        industry,
        caption: caption.trim(),
      });
      onSaved({ ...share, industry, caption: caption.trim() || null });
      show('Clip updated.', 'success');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Could not update this clip.';
      setError(message);
      show(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm">Edit clip</h4>
        <button onClick={onCancel} aria-label="Close" className="text-white/40 hover:text-white transition-colors">
          <X size={16} />
        </button>
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
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Caption</div>
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

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={submitting}
          className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          {submitting ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};
