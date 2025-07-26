import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const AdminTasks: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Task Management (Admin)
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Admin task management page - view and manage all tasks across the system.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminTasks; 