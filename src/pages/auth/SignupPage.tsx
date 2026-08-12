import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ApiError } from '../../services/httpClient';
import { Button, Input, useToast } from '../../design-system';
import { AuthShell } from './AuthShell';
import onSetImage from '../../assets/community/on-set.png';

const MIN_PASSWORD_LENGTH = 12;

export const SignupPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();
  const [searchParams] = useSearchParams();
  const intent = searchParams.get('intent');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    setError(undefined);
    setSubmitting(true);
    try {
      await register(email, password);
      navigate(intent ? `/profile/setup?intent=${intent}` : '/profile/setup', { replace: true });
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      show(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell image={onSetImage} caption="Where every artist belongs.">
      <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">Create your account</h1>
      <div className="w-12 h-1 bg-gold-500 rounded-full mb-8" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-sosrg-lg"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          className="text-sosrg-lg"
        />
        <Button type="submit" disabled={submitting} className="text-sosrg-lg mt-1">
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <p className="mt-8 text-sosrg-base text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-gold-500 sosrg-focus-ring">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
};
