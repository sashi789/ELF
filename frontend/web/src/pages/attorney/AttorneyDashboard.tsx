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
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

const AttorneyDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const attorneyStats = {
    totalCases: 15,
    activeCases: 8,
    totalClients: 12,
    pendingTasks: 5,
    upcomingDeadlines: 3,
    recentUpdates: 4
  };

  const recentCases = [
    { id: 1, title: 'Personal Injury Case #1234', client: 'John Doe', status: 'In Progress', lastUpdate: '2 hours ago' },
    { id: 2, title: 'Contract Review #1235', client: 'Jane Smith', status: 'Pending', lastUpdate: '1 day ago' },
    { id: 3, title: 'Employment Dispute #1236', client: 'Mike Wilson', status: 'Completed', lastUpdate: '3 days ago' }
  ];

  const upcomingTasks = [
    { title: 'Review contract for Case #1234', dueDate: 'Today', priority: 'High' },
    { title: 'Client meeting with John Doe', dueDate: 'Tomorrow', priority: 'Medium' },
    { title: 'File motion for Case #1235', dueDate: 'Next Week', priority: 'High' },
    { title: 'Prepare settlement offer', dueDate: 'Next Week', priority: 'Medium' }
  ];

  const quickActions = [
    { title: 'View My Cases', path: '/attorney/cases', icon: <FolderIcon /> },
    { title: 'My Clients', path: '/attorney/clients', icon: <PeopleIcon /> },
    { title: 'Tasks & Calendar', path: '/attorney/tasks', icon: <EventIcon /> },
    { title: 'Update Profile', path: '/attorney/profile', icon: <DashboardIcon /> }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Attorney Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome back, Attorney. Here's your case overview and upcoming tasks.
      </Typography>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              My Cases
            </Typography>
            <Typography variant="h3" component="div">
              {attorneyStats.totalCases}
            </Typography>
            <Typography variant="body2" color="success.main">
              {attorneyStats.activeCases} active
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              My Clients
            </Typography>
            <Typography variant="h3" component="div" color="primary">
              {attorneyStats.totalClients}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active clients
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Pending Tasks
            </Typography>
            <Typography variant="h3" component="div" color="warning.main">
              {attorneyStats.pendingTasks}
            </Typography>
            <Typography variant="body2" color="error.main">
              Requires attention
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Upcoming Deadlines
            </Typography>
            <Typography variant="h3" component="div" color="info.main">
              {attorneyStats.upcomingDeadlines}
            </Typography>
            <Typography variant="body2" color="warning.main">
              This week
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

      {/* Recent Cases and Upcoming Tasks */}
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
                      secondary={`${case_.client} • ${case_.lastUpdate}`}
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
                onClick={() => navigate('/attorney/cases')}
                fullWidth
              >
                View All Cases
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card sx={{ flex: 1, minWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upcoming Tasks
            </Typography>
            <List>
              {upcomingTasks.map((task, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.title}
                      secondary={`Due: ${task.dueDate}`}
                    />
                    <Chip 
                      label={task.priority} 
                      color={task.priority === 'High' ? 'error' : 'warning'}
                      size="small"
                      variant="outlined"
                    />
                  </ListItem>
                  {index < upcomingTasks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="text" 
                onClick={() => navigate('/attorney/tasks')}
                fullWidth
              >
                View All Tasks
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AttorneyDashboard; 