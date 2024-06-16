import React,{useState} from 'react'
import { Box, Typography, FormControl, Input, Button, Toolbar, IconButton } from '@mui/material';
import { HowToReg } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { AddAdminApi } from '../api';

const AddAdmin = ({ onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        const userData = {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            address,
        };

        try {
            const result = await AddAdminApi(userData);
            console.log('Registration successful:', result);
            onClose();
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };
    return (
        <div className='top-0 left-0 w-full h-full flex flex-col z-50 items-start justify-start py-2 bg-gray-300'>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                >
                    <Close />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Close
                </Typography>
            </Toolbar>
            <div className='w-full h-full flex flex-row items-center justify-center gap-20'>
                <div className='w-1/5 flex flex-col z-50 items-center justify-center gap-4 bg-white'>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        position="relative"
                    >
                        {/* Background circle */}
                        <div
                            style={{
                                position: 'absolute',
                                width: 300,
                                height: 300,
                                borderRadius: '50%',
                                backgroundColor: '#1976d2', // Customize the color if needed
                                opacity: 0.2, // Adjust the opacity if needed
                            }}
                        />
                        {/* Bill icon */}
                        <HowToReg
                            style={{
                                position: 'absolute',
                                fontSize: 40,
                                color: '#1976d2', // Customize the color if needed
                            }}
                        />
                    </Box>
                </div>
                <div className='w-3/5 flex flex-col z-50 items-center justify-center gap-4 bg-white px-7 py-7'>
                    <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
                        ADD NEW ADMIN
                    </Typography>
                    <div className='flex flex-col w-full items-start justify-start gap-2 bg-white px-7 py-7'>
                        <div className='flex flex-row w-full items-start justify-between gap-10'>
                            <div className='flex flex-col w-full items-start justify-start'>
                                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                    FIRST NAME
                                </Typography>
                                <FormControl sx={{ width: '100%' }} variant="standard">
                                    <Input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                            <div className='flex flex-col w-full items-start justify-start'>
                                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                    LAST NAME
                                </Typography>
                                <FormControl sx={{ width: '100%' }} variant="standard">
                                    <Input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
                            PHONE NUMBER
                        </Typography>
                        <FormControl sx={{ width: '47%' }} variant="standard">
                            <Input
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </FormControl>
                        <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
                            EMAIL
                        </Typography>
                        <FormControl sx={{ width: '100%' }} variant="standard">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
                            PASSWORD
                        </Typography>
                        <FormControl sx={{ width: '100%' }} variant="standard">
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
                            ADDRESS
                        </Typography>
                        <FormControl sx={{ width: '100%' }} variant="standard">
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </FormControl>
                        <div className='flex flex-row w-full items-center justify-center gap-4 mt-10'>
                            <Button variant="contained" className='w-3/4' onClick={handleRegister}>REGISTER</Button>
                            <Button variant="contained" className='w-3/4' color='error' onClick={handleCancel}>CANCEL</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default AddAdmin