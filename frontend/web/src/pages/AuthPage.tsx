import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/LoginForm';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // Get initial mode from URL params, default to login
  const initialMode = (searchParams.get('mode') as 'login' | 'register') || 'login';

  // If user is already authenticated, redirect to their dashboard
  React.useEffect(() => {
    if (user) {
      const roleRedirects: Record<string, string> = {
        client: '/client',
        attorney: '/attorney',
        admin: '/admin',
      };
      navigate(roleRedirects[user.role] || '/client');
    }
  }, [user, navigate]);

  const handleAuthSuccess = () => {
    // Redirect will be handled by the useEffect above
  };

  return (
    <LoginForm mode={initialMode} onSuccess={handleAuthSuccess} />
  );
}; 