import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useToasts } from 'react-toast-notifications';

//service
import { AuthState } from 'services/auth';
//types
import { TAuthContext } from 'types';
//components
import AppButton from 'components/common/Button';

const Login = () => {
    const navigate = useNavigate()
    const { addToast } = useToasts();
    const { setToken, saveFirebaseUser } = useContext(AuthState) as TAuthContext

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleButtonClick = async () => {
        setIsLoading(true)
        try {
            const response = await signInWithEmailAndPassword(getAuth(), email, password)
            setToken(response.user.refreshToken)
            saveFirebaseUser(response.user)
            navigate('/home')
        } catch (error) {
            const errorCode = (error as FirebaseError).code
            if (errorCode === 'auth/user-not-found') {
                addToast('Please chenk your email.', { appearance: 'error' });
            }
            if (errorCode === 'auth/wrong-password') {
                addToast('Please chenk your password.', { appearance: 'error' });
            }
        }
        setIsLoading(false)
    };

    return (
        <Box display='flex' height='100vh' alignItems='center' justifyContent='center'>
            <Box display='flex' flexDirection='column' sx={{ width: '50vw' }}>
                <h3>Login Form</h3>
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
                    title='Login'
                    onClick={handleButtonClick}
                    isLoading={isLoading}
                    sx={{ mt: '20px' }}
                />
                <Box sx={{ mt: '20px' }}>
                    <Link to='/register'>New User? Register!</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
