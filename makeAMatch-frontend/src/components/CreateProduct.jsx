import React, { useState } from 'react'
import { Typography, Button, Toolbar, IconButton, TextField, styled, Card, Box,Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Add ,Delete} from '@mui/icons-material';
import AddNewColor from './AddNewColor';
import EditProductColor from './EditProductColor'
import { CreateProductApi, fetchProductByIdApi,deleteProductDetailApi } from '../api';

const DashedButton = styled(Button)`
  border: 2px dashed #000;
  background-color: transparent;
  height: 30px;
  &:hover {
    background-color: #f0f0f0;
  }
`;



const CreateProduct = ({ onClose }) => {
    const [openAdd, setOpenAdd] = useState(false)
    const [openData, setOpenData] = useState(false)
    const [indexDetail, setIndexDetail] = useState(false)
    const handleClickOpenAdd = () => {
        setOpenData(false);
        setOpenAdd(true);
    };
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    const handleClickOpenData = (index) => {
        setOpenAdd(false);
        setOpenData(true);
        setIndexDetail(index)
    };
    const handleCloseData = () => {
        setOpenData(false);
    };
    const [fproductData, setFProductData] = useState([]);

    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [tag, setTag] = useState('')
    const [error, setError] = useState('');
    const [productId, setProductId] = useState('')
    const [loading, setLoading] = useState(true);

    const fetchData = async (id) => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const products = await fetchProductByIdApi(id); // Fetch data from the API
            setFProductData(products.details);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or in case of error
        }
    };

    const handleCreateAndAdd = async () => {
        const productData = { productName, productDescription, productPrice, tag };
        try {
            const result = await CreateProductApi(productData);
            console.log('Create Product successful: when add', result);
            console.log(result)
            setProductId(result.id)
        } catch (error) {
            console.error('Error Creating Product:', error);
            setError('Invalid Creating Product');
        }
    };
    const handleDeleteDetail = async (productId) => {
        try {
            const result = await deleteProductDetailApi(productId);
            console.log('Delete Product successful:', result);
            handleShowAlert();
            setTimeout(() => {
                setShowAlert(false);
                fetchData();
                setOpenData(false);
            }, 3000);
            
        } catch (error) {
            console.error('Error Creating Product:', error);
            setError('Invalid Creating Product');
        }
    };
    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = () => {
        setShowAlert(true);
    };
    return (
        <div className='top-0 left-0 w-full flex flex-col z-50 items-start justify-start py-2 bg-gray-300'>
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
                <div className='flex flex-col w-3/6 z-50 items-start justify-start gap-4 bg-white px-5 py-4'>
                    <div className='flex flex-col w-full items-start justify-start gap-2 bg-white px-2'>
                        <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold' }}>
                            PRODUCT DETAIL
                        </Typography>
                        <div className='flex flex-col w-full items-start justify-between gap-2'>
                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                NAME
                            </Typography>
                            <TextField
                                id="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                label="Product Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </div>
                        <div className='flex flex-col w-full items-start justify-between gap-2'>
                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                DESCRIPTION
                            </Typography>
                            <TextField
                                id="productDescription"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                label="Product Description"
                                multiline
                                minRows={3}
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </div>
                        <div className='flex flex-col w-full items-start justify-between gap-2'>
                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                PRICE
                            </Typography>
                            <TextField
                                id="productPrice"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                label="Product Price"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </div>
                        <div className='flex flex-col w-full items-start justify-between gap-2'>
                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                TAG
                            </Typography>
                            <TextField
                                id="tag"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                label="Product Tag"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </div>

                        <div className='flex flex-col w-full items-center gap-2 mt-4'>
                            <Button variant='contained' color="error" onClick={onClose}>CANCEL</Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-1/6 z-50 items-start justify-start gap-4 bg-white px-5 py-4'>
                    <div className='flex flex-col w-full gap-3'>
                        <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold' }}>
                            COLOR
                        </Typography>

                        {loading ? (
                            <div>no data yet</div>
                        ) : (
                            <div className='flex flex-col items-center'>
                                {fproductData.map((product, index) => (
                                    <Card key={index} className='w-full h-56' onClick={() => { handleClickOpenData(index) }}>
                                    <div className='w-full flex flex-row items-end justify-end'>
                                        <IconButton onClick={() => { handleDeleteDetail(product.product_detail_id) }}><Delete /></IconButton>
                                    </div>
                                    <Box
                                        component="img"
                                        sx={{ width: '100%', objectFit: 'cover' }}
                                        src={`data:image/png;base64,${product.product_image}`}
                                        alt="product image"
                                    />
                                </Card>
                                ))
                                }
                            </div>
                        )}
                        {/*fetch imagae details in this card*/}

                        {productId !== '' ? (
                            <DashedButton onClick={() => { handleClickOpenAdd(); }}>
                                <Add />
                            </DashedButton>
                        ) : (
                            <DashedButton onClick={() => { handleCreateAndAdd(); handleClickOpenAdd(); }}>
                                <Add />
                            </DashedButton>
                        )}
                    </div>
                </div>
                {openAdd && (
                    <div className='flex flex-col w-2/6 z-50 items-start justify-start gap-4 bg-white px-5 py-4'>
                        <AddNewColor onClose={handleCloseAdd} id={productId} fetch={fetchData} details={fproductData} indexx={fproductData.length} />
                    </div>
                )}
                {openData && (
                    <div className='flex flex-col w-2/6 z-50 items-start justify-start gap-4 bg-white px-5 py-4'>
                        <EditProductColor onClose={handleCloseData} index={indexDetail} id={productId} />
                    </div>
                )}
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
        </div >);
}

export default CreateProduct