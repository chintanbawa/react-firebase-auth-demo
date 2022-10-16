import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FirebaseError } from 'firebase/app';
import { useToasts } from 'react-toast-notifications';

//services
import { AuthState } from 'services/auth';
//types
import { TAuthContext } from 'types';
//components
import AppButton from 'components/common/Button';


const Register = () => {
  const navigate = useNavigate()
  const { addToast } = useToasts();
  const { setToken, saveFirebaseUser } = useContext(AuthState) as TAuthContext

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleButtonClick = async () => {
    setIsLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(getAuth(), email, password)
      await updateProfile(response.user, { displayName: name })
      setToken(response.user.refreshToken)
      saveFirebaseUser(response.user)
      navigate('/home')
    } catch (error) {
      const errorCode = (error as FirebaseError).code
      if (errorCode === 'auth/email-already-in-use') {
        addToast('Email is already exists our system. Please use another one.', { appearance: 'error' });
      }
      if (errorCode === 'auth/weak-password') {
        addToast('Please enter a strong password.', { appearance: 'error' });
      }
    }
    setIsLoading(false)
  }

  return (
    <Box display='flex' height='100vh' alignItems='center' justifyContent='center'>
      <Box display='flex' flexDirection='column' sx={{ width: '50vw' }}>
        <h3>Register Form</h3>
        <TextField
          id='name'
          type='text'
          label='Enter name'
          variant='outlined'
          onChange={e => setName(e.target.value)}
          sx={{ mt: '20px' }}
        />
        <TextField
          id='email'
          type='email'
          label='Enter email'
          variant='outlined'
          onChange={e => setEmail(e.target.value)}
          sx={{ mt: '20px' }}
        />
        <TextField
          id='password'
          type='password'
          label='Enter password'
          variant='outlined'
          onChange={e => setPassword(e.target.value)}
          sx={{ mt: '20px' }}
        />

        <AppButton
          title='Register'
          onClick={handleButtonClick}
          isLoading={isLoading}
          sx={{ mt: '20px' }}
        />
        <Box sx={{ mt: '20px' }}>
          <Link to='/login'>Already a member? Login</Link>
        </Box>
      </Box>
    </Box>
  )

}

export default Register