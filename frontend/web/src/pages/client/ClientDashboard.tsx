import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const clientStats = {
    totalCases: 3,
    activeCases: 2,
    pendingDocuments: 1,
    recentUpdates: 2
  };

  const recentCases = [
    { id: 1, title: 'Personal Injury Case', status: 'In Progress', lastUpdate: '2 days ago' },
    { id: 2, title: 'Contract Review', status: 'Pending', lastUpdate: '1 week ago' },
    { id: 3, title: 'Employment Dispute', status: 'Completed', lastUpdate: '3 weeks ago' }
  ];

  const recentUpdates = [
    { type: 'Document Uploaded', case: 'Personal Injury Case', time: '2 hours ago' },
    { type: 'Attorney Response', case: 'Contract Review', time: '1 day ago' },
    { type: 'Case Status Update', case: 'Employment Dispute', time: '3 days ago' }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, Client
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Here's an overview of your legal matters
      </Typography>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Cases
            </Typography>
            <Typography variant="h3" component="div">
              {clientStats.totalCases}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Active Cases
            </Typography>
            <Typography variant="h3" component="div" color="primary">
              {clientStats.activeCases}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Pending Documents
            </Typography>
            <Typography variant="h3" component="div" color="warning.main">
              {clientStats.pendingDocuments}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Recent Updates
            </Typography>
            <Typography variant="h3" component="div" color="info.main">
              {clientStats.recentUpdates}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Quick Actions */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              startIcon={<FolderIcon />}
              onClick={() => navigate('/client/cases')}
            >
              View All Cases
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<PersonIcon />}
              onClick={() => navigate('/client/profile')}
            >
              Update Profile
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<NotificationsIcon />}
            >
              Contact Attorney
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Cases and Updates */}
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Recent Cases */}
        <Card sx={{ flex: 1, minWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Cases
            </Typography>
            <List>
              {recentCases.map((case_, index) => (
                <React.Fragment key={case_.id}>
                  <ListItem>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={case_.title}
                      secondary={`${case_.status} • ${case_.lastUpdate}`}
                    />
                    <Chip 
                      label={case_.status} 
                      color={case_.status === 'In Progress' ? 'primary' : 
                             case_.status === 'Pending' ? 'warning' : 'success'}
                      size="small"
                    />
                  </ListItem>
                  {index < recentCases.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="text" 
                onClick={() => navigate('/client/cases')}
                fullWidth
              >
                View All Cases
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card sx={{ flex: 1, minWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Updates
            </Typography>
            <List>
              {recentUpdates.map((update, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={update.type}
                      secondary={`${update.case} • ${update.time}`}
                    />
                  </ListItem>
                  {index < recentUpdates.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ClientDashboard; 