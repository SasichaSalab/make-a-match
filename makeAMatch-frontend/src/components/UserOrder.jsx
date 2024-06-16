import { Button, Dialog, Typography, Alert, Toolbar, IconButton, DialogContent, DialogActions, styled } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListofCardCartNone from './ListofCardCartNone';
import { Check, Close, AddToPhotos } from '@mui/icons-material';
import { createOrderApi, uploadSlipApi, deleteCartApi } from '../api';
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
const UserOrder = ({ onClose, fetchData, data, selectedCart,setSelectAll }) => {
    const [openQRDialog, setOpenQRDialog] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [total, setTotal] = useState(0)
    const navigate = useNavigate();
    const [product_image, setProduct_image] = useState("");
    const deleteCart = async (cartId) => {
        try {
            const products = await deleteCartApi(cartId);
            console.log('Delete cart success:', products);
        } catch (error) {
            console.error('Error Delete cart:', error);
        }
    };

    const createOrder = async () => {
        const orderData = { details: data, slip_image: "" }
        try {
            const products = await createOrderApi(orderData);
            console.log(products)
            const saveImage = await uploadSlipApi(products.orderId, product_image);
            console.log('create order success:', products);
            for (let i = 0; i < selectedCart.length; i++) {
                deleteCart(selectedCart[i]);
            }
            setShowSuccess(true);
            setTimeout(() => {
                onClose();
                fetchData();
                setSelectAll(false);
            }, 3000); 
        } catch (error) {
            console.error('Error create order:', error);
        }finally {
            // Ensure the QR dialog is closed after all operations
            setOpenQRDialog(false);
        }
    };
    const handlePayment = () => {

        setOpenQRDialog(true);
    }
    const handleConfirm = () => {
        // Navigate to /order/cart after 5 seconds
        setTimeout(() => {
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/order/cart');
            }, 3000);
        }, 5000);
    };

    const handleCancel = () => {
        navigate('/order/cart');
    };
    const [totals, setTotals] = useState(Array(data.length).fill(0));

    const updateTotal = (index, cardTotal) => {
        const newTotals = [...totals];
        newTotals[index] = cardTotal;
        setTotals(newTotals);
    };
    useEffect(() => {
        const newTotal = totals.reduce((acc, curr) => acc + curr, 0);
        setTotal(newTotal);
    }, [totals]);
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
                {data.map((datas, index) => (
                    <div key={index} className='w-full h-8/12 flex flex-row items-start justify-start '>
                        <ListofCardCartNone carts={datas.productSizeId} quantity={datas.quantity}
                            selectedCart={selectedCart[index]} setTotal={(cardTotal) => { updateTotal(index, cardTotal); }} />
                    </div>
                ))}
                <div className='w-full h-3/12 flex flex-col items-start justify-start gap-2'>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>TOTAL : {total}$</Typography>
                    <div className='w-full h-3/12 flex flex-col items-start justify-start '>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>NOTE:</Typography>
                        <Typography variant='h7'>In the case that you have already purchased clothes from us You can request an exchange only if you ordered the wrong size.</Typography>
                    </div>
                    <div className='w-full flex flex-row items-start justify-start gap-5'>
                        <Button variant='contained' sx={{ width: 150, fontSize: 20 }} onClick={handlePayment}>CONFIRM</Button>
                        <Button variant='contained' color='error' sx={{ width: 150, fontSize: 20 }} onClick={handleCancel}>CANCEL</Button>
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
                        <Button variant='contained' onClick={createOrder}>Confirm</Button>
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

export default UserOrder;
