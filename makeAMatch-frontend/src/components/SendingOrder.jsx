import React, { useState, useEffect } from 'react';
import ListofCardCartCustomBtn from './ListofCardCartCustomBtn';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Alert } from '@mui/material';
import { getUserStatusOrder, userConfirmOrderApi } from '../api';

const SendingOrder = () => {
  const [sendingOrders, setSendingOrders] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenConfirm = (id) => {
    setOpenConfirm(true);
    setOrderId(id);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const getAllStatusOrder = async () => {
    try {
      const order = await getUserStatusOrder("Sending");
      console.log('Update cart success:', order);
      setSendingOrders(order);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getAllStatusOrder();
  }, []);

  const handelRecived = async (id) => {
    try {
      const order = await userConfirmOrderApi(id);
      console.log('Confirm order success:', order);
      getAllStatusOrder();
      setOpenConfirm(false);
      setShowAlert(true); // Show the alert
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false); // Hide the alert after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clear the timeout when the component unmounts
    }
  }, [showAlert]);

  return (
    <div>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Sending Orders</Typography>
      {sendingOrders?.length > 0 ? (
        sendingOrders.map((order, index) => {
          return (
            <div key={index} className='m-2 p-2 w-full flex flex-col bg-gray-100 rounded-lg'>
              <div className='w-full flex flex-row items-center justify-between'>
                <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Order ID: {order.orderId}</Typography>
                <Typography variant='h7' sx={{ fontWeight: 'bold', paddingRight: 2 }}>{order.orderStatus}</Typography>
              </div>
              <div className='p-2'>
                <ListofCardCartCustomBtn btnName={'RECEIVED'} total={order.totalPrice} all={order.details} action={() => { handleOpenConfirm(order.orderId) }} />
              </div>
            </div>
          );
        })
      ) : (
        <p>No waiting orders found.</p>
      )}
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to recived this order?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color='error'>CANCEL</Button>
          <Button variant='contained' onClick={() => { handelRecived(orderId) }} autoFocus>
            CONFIRM RECIVED
          </Button>
        </DialogActions>
      </Dialog>
      {showAlert && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000 // Ensure it is above other elements
        }}>
          <Alert severity="success">Order Received Successfully</Alert>
        </div>
      )}
    </div>
  );
};

export default SendingOrder;
