import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Alert
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useQuery } from '@tanstack/react-query';

const apiUrl = (import.meta as any).env.VITE_API_URL || 'http://localhost:4000';

const ClientCaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: caseData, isLoading, error } = useQuery({
    queryKey: ['case', id],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/cases/${id}`);
      if (!res.ok) throw new Error('Failed to fetch case details');
      return res.json();
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>Loading case details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error">
          Failed to load case details. Please try again.
        </Alert>
      </Box>
    );
  }

  if (!caseData) {
    return (
      <Box>
        <Alert severity="info">Case not found.</Alert>
      </Box>
    );
  }

  const case_ = caseData.case || caseData;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Case Details
      </Typography>

      {/* Case Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h5" component="h2">
              Case #{case_.case_id}
            </Typography>
            <Chip 
              label={case_.referral_status || 'Submitted'} 
              color="primary"
              variant="outlined"
            />
          </Box>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            {case_.case_details?.description || 'No description available'}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Case Type
              </Typography>
              <Typography variant="body1">
                {case_.case_details?.type || 'N/A'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Created
              </Typography>
              <Typography variant="body1">
                {new Date(case_.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body1">
                {new Date(case_.updated_at || case_.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Case Timeline */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Case Timeline
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText
                primary="Case Submitted"
                secondary={new Date(case_.created_at).toLocaleString()}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="Assigned to Attorney"
                secondary="Pending assignment"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Initial Review"
                secondary="Awaiting attorney review"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Documents
          </Typography>
          <Alert severity="info">
            Document upload functionality will be available soon. Please contact your attorney for document submissions.
          </Alert>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" startIcon={<PersonIcon />}>
              Contact Attorney
            </Button>
            <Button variant="outlined" startIcon={<AssignmentIcon />}>
              Request Update
            </Button>
            <Button variant="outlined" startIcon={<FolderIcon />}>
              View All Cases
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientCaseDetail; 