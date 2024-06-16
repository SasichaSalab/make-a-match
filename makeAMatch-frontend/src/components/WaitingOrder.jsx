import React, { useEffect, useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from '@mui/material';
import { getUserStatusOrder, userCancelOrderApi } from '../api';
import ListOfStatusOrder from './ListOfStatusOrder';

const WaitingOrder = () => {
  const [waitingOrders, setWaitingOrders] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenDelete = (id) => {
    setOpenDelete(true);
    setOrderId(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const getAllStatusOrder = async () => {
    try {
      const order = await getUserStatusOrder("Waiting");
      console.log('Update cart success:', order);
      setWaitingOrders(order);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getAllStatusOrder();
  }, []);

  const handelCancel = async (id) => {
    try {
      const orderr = await userCancelOrderApi(id);
      console.log('Cancel order success:', orderr);
      getAllStatusOrder();
      setOpenDelete(false);
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
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Waiting Orders</Typography>
      {waitingOrders?.length > 0 ? (
        waitingOrders.map((order, index) => {
          return (
            <div key={index} className='m-2 p-2 w-full flex flex-col bg-gray-100 rounded-lg'>
              <div className='w-full flex flex-row items-center justify-between'>
                <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Order ID: {order.orderId}</Typography>
                <div className='flex flex-row items-center justify-center gap-3'>
                  <Typography variant='h7' sx={{ fontWeight: 'bold', paddingRight: 2 }}>{order.orderStatus}</Typography>
                  <Button variant='contained' color='error' onClick={() => { handleOpenDelete(order.orderId) }}>CANCEL ORDER</Button>
                </div>
              </div>
              <div className='p-2'>
                <ListOfStatusOrder total={order.totalPrice} all={order.details} />
              </div>
            </div>
          );
        })
      ) : (
        <p>No waiting orders found.</p>
      )}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to cancel this order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you confirm to delete Data from this order will be permanently deleted and cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color='error'>CANCEL</Button>
          <Button onClick={() => { handelCancel(orderId) }} autoFocus>
            CONFIRM CANCEL
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
          <Alert severity="success">Order Cancelled Successfully</Alert>
        </div>
      )}
    </div>
  );
};

export default WaitingOrder;
