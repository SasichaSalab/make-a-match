import { Button, Dialog,Box, Typography, Alert, Toolbar, IconButton, DialogContent, DialogActions, styled } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { Check, Close, AddToPhotos } from '@mui/icons-material';
import { getCardData,createOrderApi,uploadSlipApi } from '../api';
import CartCard from './CartCard';
const DashedUploadButton = styled(Button)`
  border: 2px dashed #000;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const BuyNowOrder = ({ onClose, sizeId,amount ,sizeName}) => {
    const [openQRDialog, setOpenQRDialog] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [product_image, setProduct_image] = useState("");
    const [data,setData]=useState(null)

    const getCard = async () => {
        try {
            const order = await getCardData(sizeId);
            setData(order);  // Make sure to return the fetched data
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;  // Ensure errors are propagated to Promise.all
        }
    }
    useEffect(() => {
        getCard();
    }, [])
    const handlePayment = () => {
        setOpenQRDialog(true);
    }
    const createOrder = async () => {
        const orderData = {
            details: [{ productSizeId: sizeId,quantity:amount }],
            slip_image: ""
          };
        console.log("orderData : "+JSON.stringify(orderData,null,2))
        try {
            const products = await createOrderApi(orderData);
            console.log(products)
            const saveImage = await uploadSlipApi(products.orderId, product_image);
            console.log('create order success:', products);
            setShowSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000); 
        } catch (error) {
            console.error('Error create order:', error);
        }finally {
            // Ensure the QR dialog is closed after all operations
            setOpenQRDialog(false);
        }
    };
    return (
        <div className='top-0 left-0 w-full flex flex-col items-start justify-start gap-5 p-4 bg-gray-300'>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    sx={{ height: 10 }}
                >
                    <Close />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Close
                </Typography>
            </Toolbar>
            <div className='w-full h-full flex flex-col items-start justify-start gap-2 p-2'>
                <div className='w-full h-1/12 flex flex-row items-start justify-start '>
                    <Typography variant='h4' sx={{ fontWeight: 'bold' }}>MY ORDER</Typography>
                </div>
                <div className='w-full h-8/12 flex flex-row items-start justify-start '>
                    <div className='flex flex-col w-full items-start justify-start'>
                        <Box className='w-full flex flex-col gap-3 mt-4'>
                                <div className='flex flex-row w-full gap-5 items-center justify-start'>
                                    <CartCard
                                        name={data?.name}
                                        description={data?.description}
                                        price={data?.price}
                                        image={data?.image}
                                        len={data?.description?.length}
                                        size={sizeName}
                                        color={data?.color}
                                    >
                                        <div className='w-full flex flex-col items-center justify-center gap-1'>
                                            <div className='w-full flex flex-col items-center justify-center gap-1'>
                                                <div className='w-full flex flex-row items-center justify-center gap-1'>
                                                    <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: </Typography>
                                                    <Typography variant='h7'> {data?.price}x {amount}</Typography>
                                                </div>
                                                <div className='w-full flex flex-row items-center justify-center gap-1'>
                                                    <Typography variant='h7'> = </Typography>
                                                    <Typography variant='h7' sx={{ fontWeight: 'bold' }}>
                                                        {data?.price * amount} $
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </CartCard>
                                </div>

                            <div className='w-full flex flex-row items-end justify-end gap-1'>
                                <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: </Typography>
                                <Typography variant='h7'> = </Typography>
                                <Typography variant='h7' sx={{ fontWeight: 'bold' }}>
                                    {data?.price * amount} $
                                </Typography>

                            </div>
                        </Box>
                    </div>
                </div>

                <div className='w-full h-3/12 flex flex-col items-start justify-start gap-2'>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>TOTAL : {data?.price * amount}$</Typography>
                    <div className='w-full h-3/12 flex flex-col items-start justify-start '>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>NOTE:</Typography>
                        <Typography variant='h7'>In the case that you have already purchased clothes from us You can request an exchange only if you ordered the wrong size.</Typography>
                    </div>
                    <div className='w-full flex flex-row items-start justify-start gap-5'>
                        <Button variant='contained' sx={{ width: 150, fontSize: 20 }} onClick={handlePayment}>CONFIRM</Button>
                        <Button variant='contained' color='error' sx={{ width: 150, fontSize: 20 }} >CANCEL</Button>
                    </div>
                </div>

                {/* QR Code Image Dialog */}
                <Dialog open={openQRDialog} onClose={() => setOpenQRDialog(false)}>
                    <DialogContent>
                        <div className="flex flex-row items-start justify-center h-full">
                            <div className=' flex flex-col items-center h-full'>
                                <Typography variant="h5" sx={{ marginBottom: '1rem' }}>Scan QR Code</Typography>
                                <img src='https://www.paocloud.co.th/wp-content/uploads/2021/01/Screen-Shot-2564-01-26-at-18.56.53.png' alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
                            </div>
                            <div className=' flex flex-col items-center h-full'>
                                <Typography variant="h5" sx={{ marginBottom: '1rem' }}>Your slip</Typography>
                                <div className="flex flex-col items-center w-full h-full">
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="icon-button-file"
                                        type="file"
                                        onChange={(event) => setProduct_image(event.target.files[0])}
                                    />
                                    <label htmlFor="icon-button-file" className='w-full'>
                                        <DashedUploadButton component="span">
                                            {product_image ? (
                                                <img src={URL.createObjectURL(product_image)} alt="Uploaded icon" className="h-full" />
                                            ) : (
                                                <AddToPhotos />
                                            )}
                                        </DashedUploadButton>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained'  onClick={createOrder}>Confirm</Button>
                        <Button variant='contained' color='error' onClick={() => setOpenQRDialog(false)}>cancel</Button>
                    </DialogActions>
                </Dialog>
                {/* Payment Success Dialog */}
                <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
                    <div className="flex flex-col items-center justify-center w-96">
                        <Alert className='w-full' icon={<Check fontSize="inherit" />} severity="success">
                            Payment Successful!
                        </Alert>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default BuyNowOrder;
