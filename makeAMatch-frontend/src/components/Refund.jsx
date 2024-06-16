import React, { useState, forwardRef } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { createRefund } from '../api';
import { useMediaQuery } from '@mui/material';

const Refund = forwardRef((props, ref) => {
  const [orderId, setOrderId] = useState('');
  const [description, setDescription] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleOrderIdChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    const saveData = {
      orderId: parseInt(orderId, 10),
      description: description
    };
    try {
      await createRefund(saveData); // Fetch data from the API
      setAlertMessage('Refund request submitted successfully!');
      setAlertSeverity('success');
      setOrderId('')
      setDescription('')
    } catch (error) {
      console.error('Error creating refund:', error);
      setAlertMessage('Failed to submit refund request.');
      setAlertSeverity('error');
    }
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // Use useMediaQuery hook to check screen width
  const isSmallScreen = useMediaQuery('(max-width:1000px)');

  return (
    <div className='top-0 left-0 w-full flex flex-row items-center justify-center gap-20 p-4 bg-gray-300' ref={ref}>
      {!isSmallScreen && (
        <div className='w-full flex flex-col items-center justify-center gap-4 bg-white'>
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
                width: 400,
                height: 400,
                borderRadius: '50%',
                backgroundColor: '#2E2E2E',
                opacity: 0.2,
              }}
            />
            {/* Bill icon */}
            <AttachMoney
              style={{
                position: 'absolute',
                fontSize: 40,
                color: 'primary',
              }}
            />
          </Box>
        </div>
      )}
      <div className='w-full flex flex-col items-center justify-center gap-4 bg-white px-7 py-7'>
        <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
          REFUND
        </Typography>
        <div className='flex w-full flex-col items-start justify-start gap-5 bg-white px-7 py-7'>
          <div className='w-full flex flex-col gap-0'>
            <Typography variant="subtitle1" component="h4">
              ORDER CODE
            </Typography>
            <TextField
              id="order-code"
              label="Enter ORDER CODE"
              variant="standard"
              className='w-full'
              value={orderId}
              onChange={handleOrderIdChange}
            />
          </div>
          <div className='w-full flex flex-col gap-0'>
            <Typography variant="subtitle1" component="h4">
              ENTER DESCRIPTION
            </Typography>
            <TextField
              id="description"
              label="Enter DESCRIPTION"
              variant="standard"
              className='w-full'
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className='flex flex-col w-full items-center justify-center gap-4'>
            <Button variant="contained" className='w-3/4' onClick={handleSubmit}>
              CONFIRM REFUND
            </Button>
            <Button variant="contained" className='w-3/4' color="error">
              CANCEL
            </Button>
            <Typography>
              check refund status in your shopping bag Icon in navbar
            </Typography>
          </div>
        </div>
      </div>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default Refund;
