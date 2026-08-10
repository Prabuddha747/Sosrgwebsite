import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ApiError } from '../../services/httpClient';
import { Button, Card, Input, useToast } from '../../design-system';

const MIN_PASSWORD_LENGTH = 12;

export const SignupPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();

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
      navigate('/profile/setup', { replace: true });
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
        <h1 className="font-display text-sosrg-2xl text-text-primary mb-6">Create your account</h1>
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
            autoComplete="new-password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </Button>
        </form>
        <p className="mt-6 text-sosrg-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-500 sosrg-focus-ring">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
};
