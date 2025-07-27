import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  Divider,
  Chip,
  Container,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SignupSuccessProps {
  onContinue?: () => void;
}

export const SignupSuccess: React.FC<SignupSuccessProps> = ({ onContinue }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCopyClientId = () => {
    if (user?.user_id) {
      navigator.clipboard.writeText(user.user_id);
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      // Default navigation based on user role
      const roleRedirects: Record<string, string> = {
        client: '/client',
        attorney: '/attorney',
        admin: '/admin',
      };
      navigate(roleRedirects[user?.role || 'client'] || '/client');
    }
  };

  if (!user) {
    return null;
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
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: 'center',
          }}
        >
          <CheckCircleIcon 
            sx={{ 
              fontSize: 64, 
              color: 'success.main',
              mb: 2 
            }} 
          />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to ELF Automation!
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your account has been created successfully. Please save your Client ID for future reference.
          </Typography>

          <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Important:</strong> Your Client ID is your unique identifier in our system. 
              Please save it in a secure location for future reference.
            </Typography>
          </Alert>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Client ID:
            </Typography>
            <Chip
              label={user.user_id}
              variant="outlined"
              sx={{ 
                fontSize: '1.1rem',
                padding: '12px 16px',
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiChip-label': {
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }
              }}
            />
            <Button
              startIcon={<ContentCopyIcon />}
              onClick={handleCopyClientId}
              sx={{ ml: 2 }}
              variant="outlined"
              size="small"
            >
              Copy
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Details:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Typography>
          </Box>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              You can now access your dashboard and start using ELF Automation services.
            </Typography>
          </Alert>

          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            sx={{ minWidth: 200 }}
          >
            Continue to Dashboard
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}; 