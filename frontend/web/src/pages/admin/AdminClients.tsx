import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const AdminClients: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Client Management (Admin)
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Admin client management page - view, edit, and manage all clients in the system.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminClients; 