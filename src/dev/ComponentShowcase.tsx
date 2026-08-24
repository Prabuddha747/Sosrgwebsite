import React, { useState } from 'react';
import { Film, Theater, Music, Inbox, User } from 'lucide-react';
import {
  Button,
  Card,
  Badge,
  Modal,
  ToastProvider,
  useToast,
  Tabs,
  Input,
  Select,
  Textarea,
  Avatar,
  Skeleton,
  EmptyState,
  Navbar,
  SettledHeading,
  type AccountTier,
  type StatusKind,
  type ButtonVariant,
  type CardVariant,
} from '../design-system';

const SECTION_TITLE = 'text-SosrG-2xl text-text-primary mb-4';
const SUBSECTION_TITLE = 'font-body text-SosrG-sm text-text-muted mb-3 uppercase tracking-wide';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-16">
    <SettledHeading as="h2" trigger="scroll" className={SECTION_TITLE}>
      {title}
    </SettledHeading>
    {children}
  </section>
);

const ButtonSection = () => {
  const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'destructive'];
  return (
    <Section title="Button">
      <p className={SUBSECTION_TITLE}>All variants</p>
      <div className="flex flex-wrap gap-4 mb-6">
        {variants.map((v) => (
          <Button key={v} variant={v}>
            {v}
          </Button>
        ))}
      </div>
      <p className={SUBSECTION_TITLE}>Disabled (flat + 45% opacity, never a subtler shadow)</p>
      <div className="flex flex-wrap gap-4">
        {variants.map((v) => (
          <Button key={v} variant={v} disabled>
            {v}
          </Button>
        ))}
      </div>
    </Section>
  );
};

const CardSection = () => {
  const variants: CardVariant[] = ['elevation-1', 'elevation-2', 'flat'];
  return (
    <Section title="Card">
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
        {variants.map((v) => (
          <Card key={v} variant={v}>
            <p className="font-display text-SosrG-lg mb-2">{v}</p>
            <p className="font-body text-SosrG-sm text-text-muted">Card content on the cream-50 surface.</p>
          </Card>
        ))}
        <Card variant="elevation-1" interactive onClick={() => {}}>
          <SettledHeading as="h3" trigger="hover" className="text-SosrG-lg mb-2">
            Epic Period Drama
          </SettledHeading>
          <p className="font-body text-SosrG-sm text-text-muted">
            Card title as a link — hover/focus retriggers the same settle transition instead of scroll.
          </p>
        </Card>
      </div>
    </Section>
  );
};

const BadgeSection = () => {
  const tiers: AccountTier[] = ['yellow', 'green', 'blue', 'red'];
  const statuses: StatusKind[] = ['pending', 'active', 'rejected', 'success', 'error', 'info'];
  return (
    <Section title="Badge / StatusPill">
      <p className={SUBSECTION_TITLE}>Account tiers (schema.md account_status)</p>
      <div className="flex flex-wrap gap-3 mb-6">
        {tiers.map((t) => (
          <Badge key={t} variant={`tier-${t}`} />
        ))}
      </div>
      <p className={SUBSECTION_TITLE}>Generic status</p>
      <div className="flex flex-wrap gap-3">
        {statuses.map((s) => (
          <Badge key={s} variant={s} />
        ))}
      </div>
    </Section>
  );
};

const AvatarSection = () => (
  <Section title="Avatar">
    <div className="flex flex-wrap items-end gap-6">
      <Avatar alt="No tier" fallback="SR" size="sm" />
      <Avatar alt="Yellow tier" fallback="SR" size="md" tier="yellow" />
      <Avatar alt="Green tier" fallback="SR" size="md" tier="green" />
      <Avatar alt="Blue tier" fallback="SR" size="lg" tier="blue" />
      <Avatar alt="Red tier" fallback="SR" size="lg" tier="red" />
    </div>
  </Section>
);

const TabsSection = () => {
  const items = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'reviews', label: 'Reviews' },
  ];
  const [underlineValue, setUnderlineValue] = useState('overview');
  const [pillValue, setPillValue] = useState('overview');
  return (
    <Section title="Tabs">
      <p className={SUBSECTION_TITLE}>Underline (content sections)</p>
      <div className="mb-6">
        <Tabs items={items} value={underlineValue} onChange={setUnderlineValue} variant="underline" label="Underline demo" />
      </div>
      <p className={SUBSECTION_TITLE}>Pill (filters)</p>
      <Tabs items={items} value={pillValue} onChange={setPillValue} variant="pill" label="Pill demo" />
    </Section>
  );
};

const FormSection = () => (
  <Section title="Input / Select / Textarea">
    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 max-w-2xl">
      <Input label="Name" placeholder="Jane Doe" />
      <Input label="Email (error state)" placeholder="jane@example.com" error="Enter a valid email address" />
      <Select label="Industry" options={[{ value: 'cinema', label: 'Cinema' }, { value: 'theatre', label: 'Theatre' }]} />
      <Input label="Disabled field" placeholder="Not editable" disabled />
      <Textarea label="Cover letter" placeholder="Tell us about yourself" className="tablet:col-span-2" />
    </div>
  </Section>
);

const ModalSection = () => {
  const [standardOpen, setStandardOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  return (
    <Section title="Modal">
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setStandardOpen(true)}>
          Open standard modal
        </Button>
        <Button variant="secondary" onClick={() => setFullscreenOpen(true)}>
          Open fullscreen modal
        </Button>
      </div>
      <Modal open={standardOpen} onClose={() => setStandardOpen(false)} titleId="standard-modal-title">
        <h3 id="standard-modal-title" className="font-display text-SosrG-xl mb-4">
          Standard modal
        </h3>
        <p className="font-body text-SosrG-sm text-text-muted mb-6">
          Collapses to a fullscreen sheet below 481px. Escape, backdrop click, or the button below close it.
        </p>
        <Button variant="primary" onClick={() => setStandardOpen(false)}>
          Close
        </Button>
      </Modal>
      <Modal open={fullscreenOpen} onClose={() => setFullscreenOpen(false)} variant="fullscreen" titleId="fullscreen-modal-title">
        <h3 id="fullscreen-modal-title" className="font-display text-SosrG-xl mb-4">
          Fullscreen modal
        </h3>
        <Button variant="primary" onClick={() => setFullscreenOpen(false)}>
          Close
        </Button>
      </Modal>
    </Section>
  );
};

const ToastSection = () => {
  const { show } = useToast();
  return (
    <Section title="Toast">
      <div className="flex flex-wrap gap-4">
        <Button variant="secondary" onClick={() => show('Casting call published successfully.', 'success')}>
          Show success
        </Button>
        <Button variant="secondary" onClick={() => show('Could not save your changes.', 'error')}>
          Show error
        </Button>
        <Button variant="secondary" onClick={() => show('New applicant on your casting call.', 'info')}>
          Show info
        </Button>
      </div>
    </Section>
  );
};

const SkeletonSection = () => (
  <Section title="Skeleton">
    <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mb-6">
      <Skeleton shape="card" />
      <div className="flex flex-col gap-3">
        <Skeleton shape="text" className="w-3/4" />
        <Skeleton shape="text" className="w-full" />
        <Skeleton shape="text" className="w-1/2" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton shape="avatar" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton shape="text" className="w-2/3" />
          <Skeleton shape="text" className="w-1/3" />
        </div>
      </div>
    </div>
  </Section>
);

const EmptyStateSection = () => (
  <Section title="EmptyState">
    <Card variant="flat" className="bg-cream-200">
      <EmptyState icon={Inbox} message="No casting calls match your filters yet." cta={{ label: 'Clear filters', onClick: () => {} }} />
    </Card>
  </Section>
);

const NavbarSection = () => (
  <Section title="Navbar">
    <p className={SUBSECTION_TITLE}>
      Resize the window to see desktop mega-menu (1025px+) / tablet drawer (481-1024px) / mobile drawer + bottom tabs (320-480px).
    </p>
    <div className="relative border border-cream-200 rounded-2xl overflow-hidden" style={{ height: 400 }}>
      <Navbar
        logo={<span className="font-display text-SosrG-xl text-gold-500">SosrG</span>}
        activeHref="/casting"
        adminHref="/admin"
        groups={[
          {
            id: 'network',
            label: 'Network',
            children: [
              { label: 'Talent Directory', href: '/talent', icon: User },
              { label: 'Community', href: '/community', icon: Music },
            ],
          },
          {
            id: 'business',
            label: 'Business',
            children: [
              { label: 'Casting / Hiring', href: '/casting', icon: Film },
              { label: 'Auction', href: '/auction', icon: Theater },
            ],
          },
        ]}
        bottomTabItems={[
          { label: 'Home', href: '/', icon: User },
          { label: 'Casting', href: '/casting', icon: Film },
          { label: 'Events', href: '/events', icon: Theater },
          { label: 'Profile', href: '/profile', icon: User },
        ]}
      />
    </div>
  </Section>
);

export const ComponentShowcase = () => (
  <ToastProvider>
    <div className="min-h-screen bg-cream-100 text-text-primary">
      <div className="SosrG-container py-12">
        <SettledHeading as="h1" trigger="scroll" className="text-SosrG-4xl text-gold-500 mb-2">
          SosrG Component Library
        </SettledHeading>
        <p className="font-body text-SosrG-base text-text-muted mb-12">
          Phase 1 showcase — dev only, excluded from the production build.
        </p>
        <ButtonSection />
        <CardSection />
        <BadgeSection />
        <AvatarSection />
        <TabsSection />
        <FormSection />
        <ModalSection />
        <ToastSection />
        <SkeletonSection />
        <EmptyStateSection />
        <NavbarSection />
      </div>
    </div>
  </ToastProvider>
);
