import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

export default function Layout() {
  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate('/create-user');
  };

  const navigateToUsers = () => {
    navigate('/users');
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch' },
        marginTop: '200px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button component="label" role={undefined} variant="contained" onClick={navigateToCreate}>
        Create user
      </Button>
      <Button component="label" role={undefined} variant="contained" onClick={navigateToUsers}>
        Users
      </Button>
      <Button component="label" role={undefined} variant="contained" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
}
