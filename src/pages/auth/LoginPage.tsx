import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ApiError } from '../../services/httpClient';
import { Button, Card, Input, useToast } from '../../design-system';

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
    <div className="sosrg-container pt-36 pb-16 flex justify-center">
      <Card className="w-full max-w-md">
        <h1 className="font-display text-sosrg-2xl text-text-primary mb-6">Log in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </Button>
        </form>
        <p className="mt-6 text-sosrg-sm text-text-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="text-gold-500 sosrg-focus-ring">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};
