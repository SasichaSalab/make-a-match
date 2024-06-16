import React, { useState, useEffect } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { getUserStatusRefund, userCancelRefundApi, getCardData } from '../api';
import CartCard from './CartCard';

const SuccessRefund = () => {
  const [waitingRefund, setWaitingRefund] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [productDetails, setProductDetails] = useState({}); // State to store the fetched card data

  const handleOpenDelete = (id) => {
    setOpenDelete(true);
    setOrderId(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const getAllStatusOrder = async () => {
    try {
      const orders = await getUserStatusRefund("success");
      const orderDetail = orders?.map(item => item.userOrder);
      setWaitingRefund(orderDetail);

      const detail = orderDetail?.map(item => item.details);
      const productSizeIds = detail?.map(details => details.map(item => item.productSize.product_size_id));

      // Fetch card data for each product size ID and store it in the state
      const cardDataPromises = productSizeIds.flat().map(sizeId => getCard(sizeId));
      const cardData = await Promise.all(cardDataPromises);

      // Create a mapping of product size IDs to their corresponding card data
      const cardDataMap = {};
      productSizeIds.flat().forEach((sizeId, index) => {
        cardDataMap[sizeId] = cardData[index];
      });

      setProductDetails(cardDataMap);

    } catch (error) {
      console.error('Error fetching refund:', error);
    }
  };

  useEffect(() => {
    getAllStatusOrder();
  }, []);

  const handelCancel = async (id) => {
    try {
      const orderr = await userCancelRefundApi(id);
      console.log('Cancel refund success:', orderr);
      getAllStatusOrder();
      setOpenDelete(false);
    } catch (error) {
      console.error('Error Cancel refund:', error);
    }
  };

  const getCard = async (sizeId) => {
    try {
      const order = await getCardData(sizeId);
      return order;  // Make sure to return the fetched data
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;  // Ensure errors are propagated to Promise.all
    }
  };

  return (
    <div>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Success Refund</Typography>
      {waitingRefund?.length > 0 ? (
        waitingRefund.map((order, index) => (
          <div key={index} className='m-2 p-2 w-full flex flex-col bg-gray-100 rounded-lg'>
            <div className='w-full flex flex-row items-center justify-between'>
              <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Order ID: {order.orderId}</Typography>
            </div>
            <div className='p-2'>
              {order.details.map((detailItem, detailIndex) => {
                const productSizeId = detailItem.productSize.product_size_id;
                const cardData = productDetails[productSizeId];
                const quantity = detailItem.quantity;
                const size = detailItem.productSize.size;

                return (
                  <div key={detailIndex} className='mb-2'>
                    {cardData && (
                      <CartCard
                        name={cardData.name}
                        description={cardData.description}
                        price={cardData.price}
                        image={cardData.image}
                        len={cardData.description.length}
                        size={size}
                        color={cardData.color}
                      >
                        <div className='w-full flex flex-col items-center justify-center gap-1'>
                          <div className='w-full flex flex-col items-center justify-center gap-1'>
                            <div className='w-full flex flex-row items-center justify-center gap-1'>
                              <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: </Typography>
                              <Typography variant='h7'> {cardData.price}x {quantity}</Typography>
                            </div>
                            <div className='w-full flex flex-row items-center justify-center gap-1'>
                              <Typography variant='h7'> = </Typography>
                              <Typography variant='h7' sx={{ fontWeight: 'bold' }}>
                                {cardData.price * quantity} $
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </CartCard>

                    )}
                  </div>
                );
              })}
              <div className='w-full flex flex-row items-end justify-end gap-1'>
                <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: </Typography>
                <Typography variant='h7' sx={{ fontWeight: 'bold' }}>
                {order.totalPrice} $
                </Typography>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No success refund found.</p>
      )}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to cancel this refund order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you confirm to delete, data from this order will be permanently deleted and cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color='error'>CANCEL</Button>
          <Button onClick={() => handelCancel(orderId)} autoFocus>
            CONFIRM CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SuccessRefund;
