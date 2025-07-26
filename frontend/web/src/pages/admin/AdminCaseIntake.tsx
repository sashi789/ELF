import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const AdminCaseIntake: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        New Case Intake (Admin)
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Admin case intake form - allows administrators to create new cases and assign them to attorneys.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminCaseIntake; 