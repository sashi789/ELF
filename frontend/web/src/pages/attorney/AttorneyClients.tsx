import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const AttorneyClients: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Clients (Attorney)
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Attorney clients page - view and manage clients assigned to the current attorney.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AttorneyClients; 