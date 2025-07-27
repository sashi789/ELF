import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Alert,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const apiUrl = (import.meta as any).env.VITE_API_URL || 'http://localhost:4000';

const ClientCaseList: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery<{ cases: any[] }>({
    queryKey: ['cases', user?.email],
    queryFn: async () => {
      if (!user?.email) return { cases: [] };
      const res = await fetch(`${apiUrl}/cases?client_email=${encodeURIComponent(user.email)}`);
      if (!res.ok) throw new Error('Failed to fetch cases');
      return res.json();
    },
    enabled: !!user?.email,
    initialData: { cases: [] }
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'in progress':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  if (!user) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          My Cases
        </Typography>
        <Alert severity="warning">
          Please log in to view your cases.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Cases
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome back, {user.name}! Here are your cases and their current status.
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Cases for {user.email}
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => refetch()}
              disabled={isLoading}
            >
              Refresh
            </Button>
          </Box>
          
          {isLoading && (
            <Alert severity="info">
              Loading your cases...
            </Alert>
          )}
          
          {error && (
            <Alert severity="error">
              Failed to load cases. Please try again.
            </Alert>
          )}
        </CardContent>
      </Card>

      {(data?.cases || []).length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Your Cases ({data.cases.length})
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Case ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(data?.cases || []).map((c: any) => (
                    <TableRow key={c.case_id} hover>
                      <TableCell>{c.case_id}</TableCell>
                      <TableCell>{c.case_details?.type || 'N/A'}</TableCell>
                      <TableCell>{c.case_details?.description || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip 
                          label={c.referral_status || 'Submitted'} 
                          color={getStatusColor(c.referral_status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(c.created_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          variant="outlined"
                          onClick={() => navigate(`/client/cases/${c.case_id}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {(data?.cases || []).length === 0 && user?.email && !isLoading && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No cases found for this email. If you believe this is an error, please contact your attorney.
        </Alert>
      )}
    </Box>
  );
};

export default ClientCaseList; 