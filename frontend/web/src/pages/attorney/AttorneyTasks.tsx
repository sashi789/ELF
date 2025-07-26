import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const AttorneyTasks: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Tasks (Attorney)
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Attorney tasks page - view and manage tasks, deadlines, and calendar for the current attorney.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AttorneyTasks; 