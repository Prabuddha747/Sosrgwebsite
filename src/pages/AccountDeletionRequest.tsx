import { useState } from 'react';
import type { FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import { Button, Card, Input, Textarea, useToast } from '../design-system';
import { ApiError } from '../services/httpClient';
import { requestAccountDeletion } from '../services/auth/apiAuthService';

export const AccountDeletionRequest = () => {
  const { show } = useToast();
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await requestAccountDeletion(email, reason || undefined);
      setSubmitted(true);
      show("Deletion request received. We'll process it within 30 days.", 'success');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Could not submit your request. Please try again.';
      show(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 px-6 w-full max-w-2xl mx-auto min-h-screen pb-24">
      <p className="text-gold-700 font-bold text-sosrg-xs uppercase tracking-widest mb-3">SosrG Talent Platform</p>
      <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-4">Delete your account</h1>
      <p className="font-body text-sosrg-base text-text-muted leading-relaxed mb-8">
        Submit your registered email below and our team will permanently delete your SosrG Talent Platform account and
        associated data.
      </p>

      <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 mb-6">
        <h2 className="font-body font-bold text-sosrg-base mb-3">How it works</h2>
        <ol className="space-y-1.5 text-sosrg-base text-text-muted list-decimal list-inside">
          <li>Enter the email address associated with your account.</li>
          <li>Optionally tell us why you're leaving.</li>
          <li>We verify ownership and delete the account within 30 days.</li>
          <li>You'll get a confirmation email once deletion is complete.</li>
        </ol>
      </Card>

      <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 mb-8">
        <h2 className="font-body font-bold text-sosrg-base mb-3">Data handling notice</h2>
        <p className="text-sosrg-base text-text-muted mb-2">
          <span className="font-bold text-text-primary">Deleted:</span> profile data, uploaded media (photos, videos,
          reels), and activity records (applications, messages, casting history).
        </p>
        <p className="text-sosrg-base text-text-muted">
          <span className="font-bold text-text-primary">Retained:</span> payment and transaction records, kept for
          accounting and tax compliance.
        </p>
      </Card>

      <Card>
        {submitted ? (
          <div className="text-center py-6">
            <Trash2 className="mx-auto mb-4 text-gold-700" size={28} />
            <p className="text-sosrg-lg font-bold text-text-primary mb-1">Request received.</p>
            <p className="text-text-muted">We'll process your deletion within 30 days and confirm by email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Registered email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              label="Reason (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell us why you're leaving..."
            />
            <Button type="submit" variant="destructive" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit deletion request'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};
