import React, { useState, useEffect } from 'react'
import { Typography, Button, styled, IconButton, Box } from '@mui/material';
import { Add, AddToPhotos, Remove, Close } from '@mui/icons-material';
import Size from '../components/Size'
import ColorPicker from './ColorPicker';
import { fetchProductByIdApi } from '../api';
import ShowSize from './ShowSize';

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
const QuantityInputWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  padding: 0.5rem;
  width: auto;
`;

const QuantityInputField = styled('input')`
  text-align: center;
  margin: 0 0.5rem;
  border: none;
  outline: none;
  width: 100px;
  height: 20px;
`;

const CustomQuantityButton = styled(Button)`
  min-width: 30px;
  padding: 0;
`;
const EditProductColor = ({ onClose, id, index }) => {


    const [productDetails, setProductDetails] = useState([])
    const [product, setProduct] = useState([])
    const [productImage, setProductImage] = useState('')
    const [color, setColor] = useState('')
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchProductData = async (productId) => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const products = await fetchProductByIdApi(productId); // Fetch data from the API
            setProductDetails(products.details[index])
            setProductImage(products.details[index].product_image)
            setQuantity(products.details?.[index]?.productSizes?.[0]?.quantity)
            setProduct(products)
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or in case of error
        }
    };
    useEffect(() => {
        fetchProductData(id);
        setColor(productDetails.color)
    }, []);
    return (
        <div className='flex flex-col w-full gap-3'>
            <div className='flex flex-row w-full justify-between'>
                <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold' }}>
                    View product details ID: {id}
                </Typography>
                <IconButton onClick={onClose} className='self-end w-7 h-7'>
                    <Close />
                </IconButton></div>
            <div className='flex flex-row w-full justify-between gap-5 mb-4'>
                <div className="flex flex-col items-start w-full gap-2 ">
                    <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                        IMAGE
                    </Typography>
                    <div className="flex flex-col items-center w-full h-48">
                        <img src={`data:image/png;base64,${productImage}`} alt="Uploaded icon" className="h-full" />
                    </div>
                    <div className="flex flex-col items-start w-full gap-2">
                        <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                            COLOR
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: color,
                                height: 50,
                                width: 50,
                                border: '2px solid black',
                                borderRadius: '50%', // Add this property
                            }}
                        />
                    </div>
                    <div className='w-1/2 flex flex-col gap-3'>
                        <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                            SIZE
                        </Typography>
                        <ShowSize allSize={productDetails} index={index} />
                    </div>
                    <div className='w-1/2 flex flex-col gap-3'>
                        <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                            QUANTITY : {quantity}
                        </Typography>
                    </div>
                </div>
            </div>
            <Button variant='contained' color="error" onClick={()=>{onClose();}}>CANCEL</Button>
        </div>
    )
}

export default EditProductColor