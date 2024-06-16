import React, { useState, forwardRef } from 'react';
import { Card, Box, CardContent, Typography, Button, IconButton, Dialog, Slide, DialogTitle, DialogContentText, DialogActions, DialogContent, Alert } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EditProduct from './EditProduct';
import { deleteProductByIdApi } from '../api';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AdminProductCard = ({ id, image, name, price, description,fetchData  }) => {
    const navigate = useNavigate();

    const handleProduct = (ProductId) => {
        navigate(`/product_preview/${ProductId}`);
    };

    const text = description;
    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => setShowMore(!showMore);
    const isTextLong = text.length > 20;
    const displayText = showMore || !isTextLong ? text : `${text.substring(0, 20)}...`;
    const [error, setError] = useState('');

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        handleDeleteProduct(id)
        handleShowAlert();
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
        setOpenDelete(false);
    };
    const handleCancelDelete = () => {
        setOpenDelete(false);
    };

    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const result = await deleteProductByIdApi(productId);
            console.log('Delete Product successful:', result);
            fetchData();
        } catch (error) {
            console.error('Error Creating Product:', error);
            setError('Invalid Creating Product');
        }
    };

    return (
        <div className='w-full flex flex-col z-50'>
            <div className='w-full flex flex-row items-start justify-end h-0 z-50'>
                <IconButton aria-label="edit" onClick={handleOpenEdit}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleOpenDelete}>
                    <Delete />
                </IconButton>
            </div>
            <Card
                sx={{ maxWidth: 250, cursor: 'pointer' }}
                onClick={() => handleProduct(id)}
            >
                {image ? (
                    <Box
                    component="img"
                    sx={{ height: 100, width: '100%', objectFit: 'cover' }}
                    src={`data:image/png;base64,${image}`}
                    alt="product image"
                  />
                ) : (
                    <Box sx={{ height: 100, width: '100%' }} />
                )}
                <CardContent className='text-start'>
                    <Typography gutterBottom variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {displayText}
                    </Typography>
                    {isTextLong && (
                        <Button onClick={(e) => { e.stopPropagation(); toggleShowMore(); }} size="small">
                            {showMore ? 'Show Less' : 'Show More'}
                        </Button>
                    )}
                    <Typography gutterBottom variant="h8" component="div">
                        Price: ${price}
                    </Typography>
                </CardContent>
            </Card>
            <Dialog
                fullScreen
                open={openEdit}
                onClose={handleCloseEdit}
                TransitionComponent={Transition}
            >
                <EditProduct onClose={handleCloseEdit} id={id} fetchData={fetchData} />
            </Dialog>
            <Dialog
                open={openDelete}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure to delete product name : ${name}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please make sure before deleting as the item cannot be recovered.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleCloseDelete} autoFocus color='error'>
                        Delete
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
                    <Alert severity="success">Delete Successful</Alert>
                </div>
            )}
        </div>
    );
};

export default AdminProductCard;
