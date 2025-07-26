import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Container,
  Paper,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GavelIcon from '@mui/icons-material/Gavel';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const portals = [
    {
      title: 'Client Portal',
      description: 'View your cases, track progress, and manage your legal matters.',
      icon: <PersonIcon sx={{ fontSize: 60 }} />,
      color: 'primary',
      path: '/client',
      features: ['View case status', 'Track progress', 'Upload documents', 'Contact attorney']
    },
    {
      title: 'Attorney Portal',
      description: 'Manage your cases, clients, and legal work efficiently.',
      icon: <GavelIcon sx={{ fontSize: 60 }} />,
      color: 'success' as const,
      path: '/attorney',
      features: ['Manage cases', 'Client communication', 'Document review', 'Task management']
    },
    {
      title: 'Admin Portal',
      description: 'System administration, user management, and overall system oversight.',
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 60 }} />,
      color: 'error' as const,
      path: '/admin',
      features: ['User management', 'System settings', 'Case oversight', 'Analytics']
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              ELF Automation
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Legal Case Management System
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose your portal to access the system
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {portals.map((portal) => (
              <Box key={portal.title} sx={{ width: { xs: '100%', md: '30%' }, minWidth: 300 }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 8
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          bgcolor: `${portal.color}.main`,
                          color: 'white'
                        }}
                      >
                        {portal.icon}
                      </Avatar>
                    </Box>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {portal.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {portal.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {portal.features.map((feature, index) => (
                        <Typography 
                          key={index} 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          • {feature}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button 
                      variant="contained" 
                      color={portal.color as any}
                      size="large"
                      onClick={() => navigate(portal.path)}
                      sx={{ px: 4 }}
                    >
                      Enter Portal
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>

          <Box textAlign="center" mt={4}>
            <Typography variant="body2" color="text.secondary">
              Need help? Contact system administrator
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage; 