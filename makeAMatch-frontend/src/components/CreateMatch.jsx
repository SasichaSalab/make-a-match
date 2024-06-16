import React, { useState, forwardRef, useEffect } from 'react'
import { Typography, Slide, Button, Toolbar, IconButton, TextField, styled, Card, Dialog, DialogActions, DialogContent, Alert } from '@mui/material';
import { Close, Add, Delete } from '@mui/icons-material';
import AddMatchProduct from './AddMatchProduct';
import ViewMatchProduct from './ViewMatchProduct';
import { createMatchApi, getMatchByIdApi, deleteMatchDetailApi ,fetchProductByIdApi} from '../api';

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

const CreateMatch = ({ onClose, fetchMatchData }) => {
    const [openAdd, setOpenAdd] = useState(false)
    const [openData, setOpenData] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('');
    const [matchId, setMatchId] = useState(null);
    const [matchData, setmatchData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [product, setProduct] = useState(null);
    const handleClose = () => {
        fetchMatchData()
        onClose();
    };

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
    const [details, setDetails] = useState([])
    const handleListOfDetails = (selectedIds) => {
        setDetails(selectedIds)
    }
    const handleCreateAndAdd = async () => {
        const productData = { name: name, description: description };
        if (productData.name === '' || productData.description === '') {
            handleShowAlert('Error creating product please fill data', 'error'); // Show error alert
        }
        else {
            try {
                const result = await createMatchApi(productData);
                setMatchId(result.match_product_id);
                handleShowAlert('Creation successful', 'success'); // Show success alert
                handleClickOpenAdd();
            } catch (error) {
                console.error('Error Creating Product:', error);
                setError('Invalid Creating Product');
                handleShowAlert('Error creating product', 'error'); // Show error alert
            }
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
    const fetchData = async () => {
        try {
            const products = await getMatchByIdApi(matchId);
            setmatchData(products.details);
        } catch (error) {
            console.error('Error setting data:', error);
        }
    };

    const handleDelete = async (matchDetailId) => {
        try {
            await deleteMatchDetailApi(matchDetailId);
            handleShowAlert('Delete Successful', 'success'); // Show success alert
        } catch (error) {
            console.error('Error deleting match detail:', error);
            handleShowAlert('Error deleting match detail', 'error'); // Show error alert
        } finally {
            setTimeout(() => {
                setShowAlert(false);
                fetchData();
            }, 3000);
        }
    };

    const handleShowAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setShowAlert(true);

        // Hide the alert after 3 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };


    const [imageData, setImageData] = useState([]);

    const handlefetch = async () => {
        try {
            // Extract matchProductSize from each detail item
            const matchProductSize = await Promise.all(matchData.map(detail => detail?.matchProductSize));

            // Flatten the matchProductSize array
            const flattenedMatchProductSize = matchProductSize.flat();

            // Extract productDetails from each matchProductSize item
            const productDetails = await Promise.all(flattenedMatchProductSize.map(size => size?.details));

            // Flatten the productDetails array
            const flattenedProductDetails = productDetails.flat();

            // Extract product_image from each productDetail item
            const product_images = flattenedProductDetails.map(detail => detail?.product_image);

            // Save the images in the state
            setImageData(product_images);
        } catch (error) {
            console.error("Error fetching product images:", error);
        }
    };

    useEffect(() => {
        handlefetch();
    }, [matchData]);
    return (
        <div className='top-0 left-0 w-full h-full flex flex-col z-50 items-start justify-start py-2 bg-gray-300'>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
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
                    </div>
                </div>
                <div className='flex flex-col w-4/6 z-50 items-start justify-start gap-4 bg-white px-5 py-4'>
                    <div className='flex flex-col w-full gap-3'>
                        <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold' }}>
                            MATCHED LOOK
                        </Typography>
                        <div className='flex flex-wrap w-full gap-3'>
                            {matchId && (
                                matchData?.map((data, index) => (
                                    <Card key={index} className='w-48 h-48' style={{ backgroundColor: '#f0f0f0', position: 'relative' }} onClick={()=>{handleClickOpenData(data.matchProductSize.id)}}>
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
                                ))
                            )}
                            <div className='w-48 h-48'>
                                {matchId ? (
                                    <DashedButton onClick={handleClickOpenAdd} sx={{ width: '100%', height: '100%' }}>
                                        <Add />
                                    </DashedButton>
                                ) : (
                                    <DashedButton onClick={handleCreateAndAdd} sx={{ width: '100%', height: '100%' }}>
                                        <Add />
                                    </DashedButton>
                                )}
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
                    <AddMatchProduct onClose={handleCloseAdd} detailsSelected={handleListOfDetails} id={matchId} fetchMatch={fetchData} />
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
}

export default CreateMatch;
