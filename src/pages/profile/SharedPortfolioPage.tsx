import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image as ImageIcon, FolderOpen } from 'lucide-react';
import { portfoliosService } from '../../services/portfolios';
import type { PortfolioDetail } from '../../services/portfolios';
import { getAssetContentUrl } from '../../services/media';
import { Skeleton, EmptyState } from '../../design-system';
import { ApiError } from '../../services/httpClient';

// GET /v1/shared/portfolios/{shareToken} — no auth required, the public
// counterpart to the owner-only Portfolio Manager tab in ProfileSystem.tsx.
// Reached via the "Share Portfolio" button there, which copies this page's
// URL (origin + /shared/portfolio/{token}) to the clipboard.
export const SharedPortfolioPage = () => {
  const { token } = useParams<{ token: string }>();
  const [portfolio, setPortfolio] = useState<PortfolioDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    portfoliosService
      .getSharedPortfolio(token)
      .then((result) => {
        if (!cancelled) setPortfolio(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'This share link is invalid or has expired.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) {
    return (
      <div className="SosrG-container pt-36 pb-16">
        <Skeleton shape="text" className="w-64 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} shape="card" className="aspect-video h-auto" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="SosrG-container pt-36 pb-16">
        <EmptyState icon={FolderOpen} message={error ?? 'This share link is invalid or has expired.'} />
      </div>
    );
  }

  return (
    <div className="SosrG-container pt-36 pb-16">
      <h1 className="font-display text-SosrG-2xl text-text-primary mb-2">{portfolio.title}</h1>
      {portfolio.summary && <p className="text-text-muted mb-8">{portfolio.summary}</p>}

      {portfolio.items.length === 0 ? (
        <EmptyState icon={ImageIcon} message="This portfolio doesn't have any items yet." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.items.map((item) => (
            <div key={item.id} className="relative aspect-video rounded-2xl overflow-hidden bg-cream-200 shadow-elevation-1">
              {item.mediaAssetId && item.assetType === 'video' && (
                <video controls preload="metadata" src={getAssetContentUrl(item.mediaAssetId)} className="h-full w-full object-cover" />
              )}
              {item.mediaAssetId && item.assetType === 'image' && (
                <img src={getAssetContentUrl(item.mediaAssetId)} alt={item.caption ?? item.title} className="h-full w-full object-cover" />
              )}
              {item.mediaAssetId && item.assetType !== 'video' && item.assetType !== 'image' && (
                <div className="h-full w-full flex flex-col items-center justify-center gap-2 p-3 text-center">
                  <ImageIcon size={20} className="text-text-muted" />
                  <span className="text-SosrG-xs text-text-muted line-clamp-2">{item.caption ?? item.title}</span>
                </div>
              )}
              {!item.mediaAssetId && (
                <div className="h-full w-full flex items-center justify-center p-3 text-center">
                  <span className="text-SosrG-xs text-text-muted line-clamp-3">{item.itemTitle || item.caption || item.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
