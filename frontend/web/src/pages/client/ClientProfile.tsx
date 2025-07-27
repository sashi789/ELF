import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Avatar,
  Divider,
  Alert,
  Chip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAuth } from '../../contexts/AuthContext';

const ClientProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Parse the user's name into first and last name
  const nameParts = user?.name ? user.name.split(' ') : ['', ''];
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: user?.email || '',
    phone: '+1 (555) 123-4567', // Default phone, can be updated later
    address: '123 Main St, City, State 12345', // Default address, can be updated later
    emergencyContact: 'Emergency Contact', // Default, can be updated later
    emergencyPhone: '+1 (555) 987-6543' // Default, can be updated later
  });

  // Update form data when user changes
  React.useEffect(() => {
    const nameParts = user?.name ? user.name.split(' ') : ['', ''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    setFormData(prev => ({
      ...prev,
      firstName: firstName,
      lastName: lastName,
      email: user?.email || prev.email
    }));
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  const handleCopyClientId = () => {
    if (user?.user_id) {
      navigator.clipboard.writeText(user.user_id);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to current user values
    const nameParts = user?.name ? user.name.split(' ') : ['', ''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    setFormData(prev => ({
      ...prev,
      firstName: firstName,
      lastName: lastName,
      email: user?.email || prev.email
    }));
  };

  if (!user) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Alert severity="warning">
          Please log in to view your profile.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Manage your personal information and contact details
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Personal Information</Typography>
            <Button 
              variant={isEditing ? "outlined" : "contained"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h6">
                {user.name || `${formData.firstName} ${formData.lastName}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Username: {user.username}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Client ID:
                </Typography>
                <Chip
                  label={user.user_id}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontFamily: 'monospace',
                    fontSize: '0.8rem'
                  }}
                />
                <Button
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyClientId}
                  size="small"
                  variant="outlined"
                  sx={{ minWidth: 'auto', px: 1 }}
                >
                  Copy
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
          </Box>

          {isEditing && (
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Emergency Contact
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <TextField
                fullWidth
                label="Emergency Contact Name"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                disabled={!isEditing}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <TextField
                fullWidth
                label="Emergency Contact Phone"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                disabled={!isEditing}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Settings
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            Password changes and other account settings will be available soon.
          </Alert>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined">
              Change Password
            </Button>
            <Button variant="outlined">
              Notification Preferences
            </Button>
            <Button variant="outlined" color="error">
              Delete Account
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientProfile; 