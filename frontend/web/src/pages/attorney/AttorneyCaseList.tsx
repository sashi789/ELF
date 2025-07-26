import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const AttorneyCaseList: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Cases (Attorney)
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Attorney case list page - view and manage cases assigned to the current attorney.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AttorneyCaseList; 