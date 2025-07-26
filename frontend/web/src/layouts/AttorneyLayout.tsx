import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, Box, CssBaseline, Avatar, Chip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 220;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, to: '/attorney' },
  { text: 'My Cases', icon: <FolderIcon />, to: '/attorney/cases' },
  { text: 'My Clients', icon: <PeopleIcon />, to: '/attorney/clients' },
  { text: 'Tasks', icon: <EventIcon />, to: '/attorney/tasks' },
  { text: 'Profile', icon: <PersonIcon />, to: '/attorney/profile' },
];

const AttorneyLayout: React.FC = () => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          ELF Automation - Attorney Portal
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            avatar={<Avatar sx={{ width: 24, height: 24 }}>L</Avatar>}
            label="Attorney"
            color="success"
            variant="outlined"
          />
          <Chip 
            icon={<LogoutIcon />}
            label="Logout"
            variant="outlined"
            clickable
            onClick={() => window.location.href = '/'}
          />
        </Box>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} component={RouterLink} to={item.to}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: `${drawerWidth}px` }}>
      <Toolbar />
      <Outlet />
    </Box>
  </Box>
);

export default AttorneyLayout; 