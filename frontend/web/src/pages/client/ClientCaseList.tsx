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

const apiUrl = (import.meta as any).env.VITE_API_URL || 'http://localhost:4000';

const ClientCaseList: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery<{ cases: any[] }>({
    queryKey: ['cases', submittedEmail],
    queryFn: async () => {
      if (!submittedEmail) return { cases: [] };
      const res = await fetch(`${apiUrl}/cases?client_email=${encodeURIComponent(submittedEmail)}`);
      if (!res.ok) throw new Error('Failed to fetch cases');
      return res.json();
    },
    enabled: !!submittedEmail,
    initialData: { cases: [] }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (/.+@.+\..+/.test(email)) {
      setSubmittedEmail(email);
      refetch();
    }
  };

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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Cases
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Enter your email to view your cases and track their progress
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <TextField
                label="Enter your email to view your cases"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                required
                error={touched && !/.+@.+\..+/.test(email)}
                helperText={touched && !/.+@.+\..+/.test(email) ? 'Enter a valid email' : ''}
                sx={{ minWidth: 320, flex: 1 }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={!/.+@.+\..+/.test(email)}
                sx={{ minHeight: 56 }}
              >
                View My Cases
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Loading your cases...
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to fetch cases. Please try again.
        </Alert>
      )}

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

      {(data?.cases || []).length === 0 && submittedEmail && !isLoading && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No cases found for this email. If you believe this is an error, please contact your attorney.
        </Alert>
      )}
    </Box>
  );
};

export default ClientCaseList; 