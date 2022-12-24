import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

//services
import { AuthState } from 'services/auth';
//types
import { TAuthContext } from 'types';
//components
import AppButton from 'components/common/Button';

const Home = () => {
  const navigate = useNavigate();
  const { state, logout } = useContext(AuthState) as TAuthContext;

  const handleLogout = () => {
    navigate('/login');
    logout();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      alignItems="center"
      justifyContent="center">
      <h3>Hi {state.firebaseUser?.displayName}, Have a great day ahead!</h3>
      <AppButton title="Log Out" onClick={handleLogout} />
    </Box>
  );
};

export default Home;
