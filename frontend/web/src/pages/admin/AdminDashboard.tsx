import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data - in real app this would come from API
  const systemStats = {
    totalCases: 156,
    activeCases: 89,
    totalClients: 124,
    totalAttorneys: 12,
    pendingAssignments: 23,
    recentActivity: 8
  };

  const recentActivity = [
    { type: 'New Case Submitted', details: 'Personal Injury Case #1234', time: '2 hours ago' },
    { type: 'Attorney Assignment', details: 'Case #1234 assigned to John Smith', time: '4 hours ago' },
    { type: 'Case Status Update', details: 'Case #1233 moved to In Progress', time: '6 hours ago' },
    { type: 'New Client Registration', details: 'Jane Doe registered', time: '1 day ago' },
    { type: 'Document Upload', details: 'Case #1232 - Contract uploaded', time: '1 day ago' }
  ];

  const quickActions = [
    { title: 'View All Cases', path: '/admin/cases', icon: <FolderIcon /> },
    { title: 'Manage Clients', path: '/admin/clients', icon: <PeopleIcon /> },
    { title: 'Manage Attorneys', path: '/admin/attorneys', icon: <PersonIcon /> },
    { title: 'View Tasks', path: '/admin/tasks', icon: <EventIcon /> },
    { title: 'System Settings', path: '/admin/settings', icon: <DashboardIcon /> }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome back, {user?.name || 'Admin'}. System overview and management tools
      </Typography>

      {/* User Info Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your Account Information
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">
                {user?.name || 'Not available'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Username
              </Typography>
              <Typography variant="body1">
                {user?.username || 'Not available'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">
                {user?.email || 'Not available'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Role
              </Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                {user?.role || 'Not available'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Cases
            </Typography>
            <Typography variant="h3" component="div">
              {systemStats.totalCases}
            </Typography>
            <Typography variant="body2" color="success.main">
              +12% from last month
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Active Cases
            </Typography>
            <Typography variant="h3" component="div" color="primary">
              {systemStats.activeCases}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round((systemStats.activeCases / systemStats.totalCases) * 100)}% of total
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Clients
            </Typography>
            <Typography variant="h3" component="div" color="info.main">
              {systemStats.totalClients}
            </Typography>
            <Typography variant="body2" color="success.main">
              +5% from last month
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Pending Assignments
            </Typography>
            <Typography variant="h3" component="div" color="warning.main">
              {systemStats.pendingAssignments}
            </Typography>
            <Typography variant="body2" color="error.main">
              Requires attention
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
            {quickActions.map((action) => (
              <Button 
                key={action.title}
                variant="outlined" 
                startIcon={action.icon}
                onClick={() => navigate(action.path)}
                sx={{ minWidth: 150 }}
              >
                {action.title}
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Recent Activity and System Health */}
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Recent Activity */}
        <Card sx={{ flex: 1, minWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUpIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.type}
                      secondary={`${activity.details} • ${activity.time}`}
                    />
                    <Chip label="New" size="small" color="primary" />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card sx={{ flex: 1, minWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Health
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DashboardIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Database Connection"
                  secondary="Connected and healthy"
                />
                <Chip label="OK" size="small" color="success" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <DashboardIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="API Services"
                  secondary="All services operational"
                />
                <Chip label="OK" size="small" color="success" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <DashboardIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Storage Usage"
                  secondary="75% of capacity used"
                />
                <Chip label="75%" size="small" color="warning" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <DashboardIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Backup Status"
                  secondary="Last backup: 2 hours ago"
                />
                <Chip label="OK" size="small" color="success" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 