import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ApiError } from '../../services/httpClient';
import { Button, Input, useToast } from '../../design-system';
import { AuthShell } from './AuthShell';
import backstageImage from '../../assets/community/backstage.png';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { show } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setSubmitting(true);
    try {
      const account = await login(email, password);
      const from = (location.state as { from?: Location } | null)?.from;
      if (!account.hasProfile) {
        navigate('/profile/setup', { replace: true });
      } else {
        navigate(from?.pathname ?? '/profile', { replace: true });
      }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      show(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell image={backstageImage} caption="Good to see you again." imageSide="left">
      <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">Log in</h1>
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
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          className="text-sosrg-lg"
        />
        <Button type="submit" disabled={submitting} className="text-sosrg-lg mt-1">
          {submitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
      <p className="mt-8 text-sosrg-base text-text-muted">
        Don't have an account?{' '}
        <Link to="/signup" className="text-gold-500 sosrg-focus-ring">
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
};
