import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const AdminSettings: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings (Admin)
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Admin system settings page - configure system-wide settings, user permissions, and system preferences.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminSettings; 