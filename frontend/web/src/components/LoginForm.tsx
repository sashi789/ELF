import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
  Link,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { SignupSuccess } from './SignupSuccess';

interface LoginFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ mode: initialMode, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'client' | 'attorney' | 'admin'>('client');
  const [error, setError] = useState<string | null>(null);
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);

  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === 'login') {
        await login(email, password);
        onSuccess?.();
      } else {
        await register(email, username, name, password, confirmPassword, role);
        setShowSignupSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError(null);
    setShowSignupSuccess(false);
    // Clear form fields when switching modes
    if (mode === 'login') {
      setUsername('');
      setName('');
      setConfirmPassword('');
      setRole('client');
    } else {
      setEmail('');
      setPassword('');
    }
  };

  // Show signup success screen if registration was successful
  if (showSignupSuccess) {
    return <SignupSuccess onContinue={onSuccess} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          {mode === 'login' 
            ? 'Sign in to your ELF Automation account' 
            : 'Create your ELF Automation account'
          }
        </Typography>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
              disabled={isLoading}
            />
          )}

          {mode === 'register' && (
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              disabled={isLoading}
            />
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            disabled={isLoading}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={isLoading}
          />

          {mode === 'register' && (
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
              disabled={isLoading}
            />
          )}

          {mode === 'register' && (
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value as 'client' | 'attorney' | 'admin')}
                disabled={isLoading}
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="attorney">Attorney</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        <Divider sx={{ my: 2 }} />
        
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={toggleMode}
            sx={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}; 