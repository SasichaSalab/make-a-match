import React, { forwardRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import {  useNavigate } from 'react-router-dom';

const AboutUs = forwardRef((props, ref) => {
    // Use useMediaQuery hook to check screen width
    const isSmallScreen = useMediaQuery('(max-width:1000px)');
    const navigate=useNavigate()

    return (
        <div className='top-0 left-0 w-full flex flex-row items-center justify-center gap-20 p-4 bg-gray-300' ref={ref}>
            <div className='w-full flex flex-col items-center justify-center gap-4 bg-white px-7 py-7'>
                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
                    AboutUs
                </Typography>
                <Typography variant="h6" >
                &nbsp;&nbsp; Our web application is a web application for selling clothes. You will be able to purchase clothes with ease.
                </Typography>
                <Typography variant="h6" gutterBottom>
                &nbsp;&nbsp; Moreover, our web application will make it easier for you to shop for your clothes without having to imagine how your clothes will match each look. Our web application has a function called "Match" to test the compatibility of your chosen look or not.
                </Typography>
                <Typography variant="h6" sx={{fontWeight:'bold',color:'primary'}}>
                If you haven't used it yet
                </Typography>
                <Button variant='outlined' sx={{fontWeight:'bold'}} onClick={()=>{navigate("/matches")}}>Try it</Button>
            </div>
            {!isSmallScreen && (
                <div className='w-full flex flex-col  items-center justify-center gap-4 bg-white'>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        position="relative"
                    >
                        <img src="./assets/match.png" alt="Match" />
                    </Box>
                </div>
            )}
        </div>
    );
});

export default AboutUs;
