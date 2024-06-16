import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, Input, InputAdornment, IconButton } from '@mui/material';
import { LockOpen, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Navigate } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [redirectTo, setRedirectTo] = useState(null);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleLogin = async () => {
        const userData = { email, password };

        try {
            const result = await login(userData);
            console.log('Login successful:', result);
            authLogin(result);
            if (result.ourUsers.role === 'ADMIN') {
                setRedirectTo("/admin/dashboard");
            } else if (result.ourUsers.role === 'USER') {
                setRedirectTo("/");
            } else {
                setError('Unknown role');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid credentials');
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Check if we need to redirect, and render <Navigate> accordingly
    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div className='top-0 left-0 w-full h-screen flex flex-row z-50 items-center justify-center gap-20 py-4 bg-gray-300'>
            <div className='w-1/3 flex flex-col z-50 items-center justify-center gap-4 bg-white'>
                <Box display="flex" justifyContent="center" alignItems="center" position="relative">
                    <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', backgroundColor: '#2E2E2E', opacity: 0.2 }} />
                    <LockOpen style={{ position: 'absolute', fontSize: 40, color: 'primary' }} />
                </Box>
            </div>
            <div className='w-1/3 flex flex-col z-50 items-center justify-center gap-4 bg-white px-7 py-7'>
                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>LOGIN</Typography>
                <div className='flex flex-col w-full items-start justify-start gap-2 bg-white px-7 py-7'>
                    <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>Email</Typography>
                    <FormControl sx={{ width: '100%' }} variant="standard">
                        <Input id="standard-adornment-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>PASSWORD</Typography>
                    <FormControl sx={{ width: '100%' }} variant="standard">
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                    <div className='flex flex-col w-full items-center justify-center gap-4 mt-10'>
                        <Button variant="contained" className='w-3/4' onClick={handleLogin}>LOGIN</Button>
                        <Button variant="outlined" className='w-3/4' onClick={handleRegister}>REGISTER</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
