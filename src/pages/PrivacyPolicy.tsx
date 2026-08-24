import { Card } from '../design-system';

export const PrivacyPolicy = () => {
  return (
    <div className="pt-32 px-6 w-full max-w-2xl mx-auto min-h-screen pb-24">
      <p className="text-gold-700 font-bold text-SosrG-xs uppercase tracking-widest mb-3">SosrG Talent Platform</p>
      <h1 className="font-auth-display text-SosrG-3xl text-text-primary mb-2">Privacy Policy</h1>
      <p className="text-SosrG-base text-text-muted mb-8">Last updated: August 15, 2026</p>

      <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 mb-6">
        <h2 className="font-body font-bold text-SosrG-base mb-3">1. Information we collect</h2>
        <ul className="space-y-1.5 text-SosrG-base text-text-muted list-disc list-inside">
          <li><span className="font-bold text-text-primary">Account & identity:</span> name, username, email, phone number, date of birth, and password (stored as cryptographic hashes).</li>
          <li><span className="font-bold text-text-primary">Profile & portfolio:</span> profile photos, showreel videos, audio samples, bio, professional skills, and union memberships.</li>
          <li><span className="font-bold text-text-primary">Location:</span> approximate location by PIN code / district / state for regional casting discovery.</li>
          <li><span className="font-bold text-text-primary">Documents:</span> identity verification (KYC) documents submitted for verified badge reviews.</li>
          <li><span className="font-bold text-text-primary">Communications:</span> messages and inquiries exchanged within the platform.</li>
          <li><span className="font-bold text-text-primary">Technical & diagnostics:</span> device identifiers (session tokens), IP hashes, error logs, and performance metrics.</li>
        </ul>
      </Card>

      <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 mb-6">
        <h2 className="font-body font-bold text-SosrG-base mb-3">2. How we use your information</h2>
        <ul className="space-y-1.5 text-SosrG-base text-text-muted list-disc list-inside">
          <li>Provide, maintain, and personalize talent matching and casting discovery.</li>
          <li>Facilitate communication between artists, casting directors, and organizations.</li>
          <li>Verify user identity and prevent fraud or account abuse.</li>
          <li>Send important service notifications, security alerts, and support messages.</li>
        </ul>
      </Card>

      <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 mb-6">
        <h2 className="font-body font-bold text-SosrG-base mb-3">3. Data sharing & third parties</h2>
        <p className="text-SosrG-base text-text-muted mb-2">
          <span className="font-bold text-text-primary">Public profile:</span> information you publish on your public portfolio (display name, photos, videos, skills) is visible to other registered users.
        </p>
        <p className="text-SosrG-base text-text-muted mb-2">
          <span className="font-bold text-text-primary">No data brokerage:</span> we do not sell, rent, or trade your personal information to third-party advertisers.
        </p>
        <p className="text-SosrG-base text-text-muted">
          <span className="font-bold text-text-primary">Service providers:</span> we use secure cloud infrastructure (Google Cloud Platform) to store data and media securely.
        </p>
      </Card>

      <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 mb-6">
        <h2 className="font-body font-bold text-SosrG-base mb-3">4. Data security & retention</h2>
        <p className="text-SosrG-base text-text-muted mb-2">All data is encrypted in transit using industry-standard HTTPS / TLS encryption.</p>
        <p className="text-SosrG-base text-text-muted">We retain your personal data for as long as your account remains active.</p>
      </Card>

      <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 mb-6">
        <h2 className="font-body font-bold text-SosrG-base mb-3">5. Account & data deletion</h2>
        <p className="text-SosrG-base text-text-muted mb-2">Users have the right to request deletion of their account and personal data at any time:</p>
        <ul className="space-y-1.5 text-SosrG-base text-text-muted list-disc list-inside mb-2">
          <li><span className="font-bold text-text-primary">In-app:</span> go to Profile → Security & Settings → Delete Account.</li>
          <li><span className="font-bold text-text-primary">Web form:</span> visit our <a href="/account-deletion" className="text-gold-700 underline">account deletion page</a> to submit an online deletion request.</li>
        </ul>
        <p className="text-SosrG-base text-text-muted">Upon request, all personal profile data, media files, and activity logs are permanently removed within 30 days.</p>
      </Card>

      <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100">
        <h2 className="font-body font-bold text-SosrG-base mb-3">6. Contact us</h2>
        <p className="text-SosrG-base text-text-muted">
          Questions about this Privacy Policy? Email us at{' '}
          <a href="mailto:digitalSosrG@gmail.com" className="text-gold-700 underline">digitalSosrG@gmail.com</a>.
        </p>
      </Card>
    </div>
  );
};
