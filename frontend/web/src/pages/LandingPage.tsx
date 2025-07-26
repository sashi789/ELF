import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/LoginForm';

export const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const { user } = useAuth();

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
    setShowLogin(false);
    setShowRegister(false);
  };

  const openLogin = () => {
    setAuthMode('login');
    setShowLogin(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setShowRegister(true);
  };

  const userTypes = [
    {
      title: 'Client',
      description: 'Track your case progress, view documents, and communicate with your legal team.',
      features: ['Case tracking', 'Document access', 'Secure messaging', 'Progress updates'],
      color: '#1976d2',
    },
    {
      title: 'Attorney',
      description: 'Manage your cases, review documents, and collaborate with clients and other attorneys.',
      features: ['Case management', 'Document review', 'Client communication', 'Referral tracking'],
      color: '#388e3c',
    },
    {
      title: 'Admin',
      description: 'Oversee the entire system, manage users, and ensure smooth operations.',
      features: ['User management', 'System monitoring', 'Analytics dashboard', 'Configuration settings'],
      color: '#d32f2f',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <Box sx={{ backgroundColor: 'white', boxShadow: 1, py: 2 }}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1" color="primary" fontWeight="bold">
              ELF Automation
            </Typography>
            <Box>
              <Button variant="outlined" onClick={openLogin} sx={{ mr: 2 }}>
                Sign In
              </Button>
              <Button variant="contained" onClick={openRegister}>
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Streamline Your Legal Practice
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            AI-powered case management, automated document processing, and intelligent attorney matching
          </Typography>
          <Box mt={4}>
            <Button
              variant="contained"
              size="large"
              onClick={openRegister}
              sx={{ mr: 2, px: 4, py: 1.5 }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={openLogin}
              sx={{ px: 4, py: 1.5 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>

        {/* User Types */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {userTypes.map((userType, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ color: userType.color, fontWeight: 'bold' }}
                  >
                    {userType.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {userType.description}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {userType.features.map((feature, featureIndex) => (
                      <Typography
                        key={featureIndex}
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={openRegister}
                    sx={{ color: userType.color }}
                  >
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Paper sx={{ p: 4, mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            Key Features
          </Typography>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                🤖 AI-Powered Document Processing
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Automatically extract, analyze, and organize legal documents using advanced OCR and AI.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                📋 Intelligent Case Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track case progress, manage deadlines, and maintain comprehensive case histories.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                👥 Smart Attorney Matching
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Find the perfect attorney for each case using AI-driven matching algorithms.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                🔒 Secure & Compliant
              </Typography>
              <Typography variant="body2" color="text.secondary">
                HIPAA, GDPR, and CCPA compliant with enterprise-grade security and encryption.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Login Dialog */}
      <Dialog
        open={showLogin}
        onClose={() => setShowLogin(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <LoginForm mode="login" onSuccess={handleAuthSuccess} />
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <Dialog
        open={showRegister}
        onClose={() => setShowRegister(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <LoginForm mode="register" onSuccess={handleAuthSuccess} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}; 