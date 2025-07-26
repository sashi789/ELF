import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  TextField,
  Chip,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const AdminCaseList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  // Mock data - in real app this would come from API
  const cases = [
    { 
      id: '1234', 
      clientName: 'John Doe', 
      type: 'Personal Injury', 
      status: 'In Progress', 
      attorney: 'Sarah Johnson',
      created: '2024-01-15',
      priority: 'High'
    },
    { 
      id: '1235', 
      clientName: 'Jane Smith', 
      type: 'Contract Review', 
      status: 'Pending', 
      attorney: 'Unassigned',
      created: '2024-01-14',
      priority: 'Medium'
    },
    { 
      id: '1236', 
      clientName: 'Mike Wilson', 
      type: 'Employment Dispute', 
      status: 'Completed', 
      attorney: 'David Brown',
      created: '2024-01-10',
      priority: 'Low'
    }
  ];

  const filteredCases = cases.filter(case_ => 
    case_.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    case_.id.includes(searchTerm) ||
    case_.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'primary';
      case 'Pending':
        return 'warning';
      case 'Completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, caseId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedCase(caseId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCase(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          All Cases
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/cases/new')}
        >
          New Case
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Search cases by client name, case ID, or type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={`Total: ${filteredCases.length}`} color="primary" />
            <Chip label={`Active: ${filteredCases.filter(c => c.status === 'In Progress').length}`} color="success" />
            <Chip label={`Pending: ${filteredCases.filter(c => c.status === 'Pending').length}`} color="warning" />
            <Chip label={`Completed: ${filteredCases.filter(c => c.status === 'Completed').length}`} color="info" />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Case ID</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Attorney</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCases.map((case_) => (
                  <TableRow key={case_.id} hover>
                    <TableCell>
                      <Button 
                        variant="text" 
                        onClick={() => navigate(`/admin/cases/${case_.id}`)}
                        sx={{ textTransform: 'none' }}
                      >
                        #{case_.id}
                      </Button>
                    </TableCell>
                    <TableCell>{case_.clientName}</TableCell>
                    <TableCell>{case_.type}</TableCell>
                    <TableCell>
                      <Chip 
                        label={case_.status} 
                        color={getStatusColor(case_.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{case_.attorney}</TableCell>
                    <TableCell>
                      <Chip 
                        label={case_.priority} 
                        color={getPriorityColor(case_.priority) as any}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{new Date(case_.created).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, case_.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          navigate(`/admin/cases/${selectedCase}`);
          handleMenuClose();
        }}>
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Assign Attorney
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Update Status
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Export Case
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminCaseList; 