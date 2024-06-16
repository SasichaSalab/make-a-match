import React, { useState, forwardRef, useEffect } from 'react';
import { Typography, Slide, Button, Toolbar, IconButton, TextField, Alert, styled, Card, Dialog, DialogActions, DialogContent } from '@mui/material';
import { Close, Add } from '@mui/icons-material';
import AddMatchProduct from './AddMatchProduct';
import ViewMatchProduct from './ViewMatchProduct';
import { getMatchByIdApi, updateMatchApi, deleteMatchDetailApi,fetchProductByIdApi } from '../api';
import { Delete } from '@mui/icons-material';

const DashedButton = styled(Button)`
  border: 2px dashed #000;
  background-color: transparent;
  height: 30px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditMatch = ({ onClose, id, fetchMatchData }) => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [details, setDetails] = useState([]);
    const [matchData, setMatchData] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [dataId, setDataId] = useState(null);
    const [product, setProduct] = useState(null);
    const handleClickOpenAdd = () => {
        setOpenData(false);
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleClickOpenData = (data) => {
        fetchProductData(data)
        setOpenAdd(false);
        setOpenData(true);
    };

    const handleCloseData = () => {
        setOpenData(false);
    };

    const handleListOfDetails = (selectedIds) => {
        setDetails(selectedIds);
    };

    const fetchData = async () => {
        try {
            const products = await getMatchByIdApi(id);
            setMatchData(products.details);
            setName(products.name);
            setDescription(products.description);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchProductData= async (id) => {
        try {
            const products = await fetchProductByIdApi(id);
            setProduct(products)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFetch = async () => {
        try {
            const matchProductSize = await Promise.all(matchData.map(detail => detail?.matchProductSize));
            const flattenedMatchProductSize = matchProductSize.flat();
            const productDetails = await Promise.all(flattenedMatchProductSize.map(size => size?.details));
            const flattenedProductDetails = productDetails.flat();
            const product_images = flattenedProductDetails.map(detail => detail?.product_image);
            setImageData(product_images);
        } catch (error) {
            console.error("Error fetching product images:", error);
        }
    };

    useEffect(() => {
        handleFetch();
    }, [matchData]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = async () => {
        const productData = { name, description };
        try {
            await updateMatchApi(id, productData);
            // Optionally refetch data after update
            fetchData();
            handleShowAlert('Update successful', 'success'); // Show success alert with message
            setTimeout(() => {
                onClose();
                fetchMatchData();
                setShowAlert(false);
            }, 3000);
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Error updating product');
            // Optionally, you can also show an error alert here if the update fails
        }
    };
    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = (message) => {
        setAlertMessage(message);
        setAlertSeverity(message.includes('successful') ? 'success' : 'error');
        setShowAlert(true);
    };
    const handleDelete = async (matchDetailId) => {
        try {
            await deleteMatchDetailApi(matchDetailId);
            handleShowAlert('Delete Successful', 'success'); // Show success alert
            fetchData();
        } catch (error) {
            console.error('Error deleting match detail:', error);
            handleShowAlert('Error deleting match detail', 'error'); // Show error alert
        } finally {
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    };


    return (
        <div className='top-0 left-0 w-full min-h-screen flex flex-col z-50 items-start justify-start py-2 bg-gray-300'>
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
            <div className='w-full h-full flex flex-row items-start justify-start gap-2 p-2'>
                <div className='flex flex-col w-2/6 z-50 items-start justify-start gap-4 bg-white px-5 py-4'>
                    <div className='flex flex-col w-full items-start justify-start gap-2 bg-white px-2'>
                        <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold' }}>
                            MATCH DETAIL
                        </Typography>
                        <div className='flex flex-col w-full items-start justify-between gap-2'>
                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                NAME
                            </Typography>
                            <TextField
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label="Match Name"
                                variant="outlined"
                                size="small"
                                sx={{
                                    width: '100%', '& .MuiInputBase-root': {
                                        height: '30px', // Set your desired height here
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '5px 14px', // Adjust padding to fit the new height
                                    }
                                }}
                                fullWidth
                            />
                        </div>
                        <div className='flex flex-col w-full items-start justify-between gap-2'>
                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                DESCRIPTION
                            </Typography>
                            <TextField
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                label="Description"
                                variant="outlined"
                                size="small"
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-root': {
                                        minHeight: '100px', // Set the minimum height here
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '10px', // Adjust padding to fit the new height
                                    }
                                }}
                                fullWidth
                            />
                        </div>
                        <div className='flex flex-col w-full items-start justify-between gap-2 mt-4'>
                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                TOTAL PRICE : 178 $
                            </Typography>
                        </div>
                        <div className='flex flex-col w-full items-center gap-2 '>
                            <Button variant='contained' sx={{ width: '100%' }} onClick={handleUpdate}>Save</Button>
                            <Button variant='contained' color="error" sx={{ width: '100%' }} onClick={onClose}>CANCEL</Button></div>
                    </div>
                </div>
                <div className='flex flex-col w-4/6 z-50 items-start justify-start gap-4 bg-white px-5 py-4'>
                    <div className='flex flex-col w-full gap-3'>
                        <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold' }}>
                            MATCHED LOOK
                        </Typography>
                        <div className='flex flex-wrap w-full gap-3'>
                            {matchData?.map((data, index) => {
                                return <Card key={index} className='w-48 h-48' style={{ backgroundColor: '#f0f0f0', position: 'relative' }} onClick={()=>{handleClickOpenData(data.matchProductSize.id)}}>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        style={{ position: 'absolute', top: 0, right: 0 }}
                                        onClick={() => handleDelete(data.match_product_detail_id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                    <img src={`data:image/png;base64,${imageData[index]}`} alt="Your Image" />
                                </Card>
                            })}
                            <div className='w-48 h-48'>
                                <DashedButton onClick={handleClickOpenAdd} sx={{ width: '100%', height: '100%' }}>
                                    <Add />
                                </DashedButton>
                            </div>
                        </div>
                    </div>
                    <Typography>{details}</Typography>
                </div>
                <Dialog
                    fullScreen
                    open={openAdd}
                    onClose={handleCloseAdd}
                    TransitionComponent={Transition}
                >
                    <AddMatchProduct onClose={handleCloseAdd} detailsSelected={handleListOfDetails} id={id} fetchMatch={fetchData} />
                </Dialog>

                <Dialog
                    open={openData}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseData}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogActions>
                        <IconButton onClick={handleCloseData}><Close /></IconButton>
                    </DialogActions>
                    <DialogContent>
                        <div className='w-full'>
                            <ViewMatchProduct product={product} /></div>
                    </DialogContent>
                </Dialog>

                {showAlert && (
                    <div style={{
                        position: 'fixed',
                        top: '10px',
                        right: '10px',
                        zIndex: 1000 // Ensure it is above other elements
                    }}>
                        <Alert severity={alertSeverity}>{alertMessage}</Alert>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditMatch;
