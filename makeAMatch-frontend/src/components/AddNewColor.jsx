import React, { useState, useEffect } from 'react'
import { Typography, Button, styled, IconButton } from '@mui/material';
import { Add, AddToPhotos, Remove, Close } from '@mui/icons-material';
import Size from '../components/Size'
import ColorPicker from './ColorPicker';
import { AddProductDetailApi, fetchProductByIdApi, uploadImageApi } from '../api'
import AddSize from './AddSize';

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
const DashedButton = styled(Button)`
  border: 2px dashed #000;
  background-color: transparent;
  height: 30px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const AddNewColor = ({ onClose, details, id, fetch,indexx }) => {
    const [openAdd, setOpenAdd] = useState(false)
    const [product_image, setProduct_image] = useState("");
    const [childDetail, setChildDetail] = useState([]);
    const [productSizes, setproductSizes] = useState(() => ['S']);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('#fff')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [detailId, setDetailId] = useState('');
    const [productDetail, setProductDetail] = useState(details)
    const [isData, SetIsData] = useState(false)
    const handleClickOpenAdd = () => {
        handleAddDetail();
        setOpenAdd(true);
    };
    const handleClickOpenAddLast = () => {
        fetch(id);
        setOpenAdd(true);
    };
    const handleCloseAdd = () => {

        setOpenAdd(false);
    };
    const fetchSizeData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const products = await fetchProductByIdApi(id); // Fetch data from the API
            setProductDetail(products.details);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or in case of error
        }
    };

    const handleChildDetails = () => {
        setChildDetail(

            {
                "color": color,
                "productSizes": [

                ]
            }

        )
    }

    const handelSetColor = (c) => {
        setColor(c);
    }


    const handleAddDetail = async () => {
        try {
            const result = await AddProductDetailApi(childDetail, id);
            console.log('Add Product Detail successful:', result);
            console.log('detail id:', result.product_detail_id);
            setDetailId(result.product_detail_id)
            const responseImg = await uploadImageApi(result.product_detail_id, product_image);
            console.log("Uploaded Image " + responseImg);
            fetch(id);
        } catch (error) {
            console.error('Error Creating Product:', error);
            setError('Invalid Creating Product');
        }
    };
    useEffect(() => {
        handleChildDetails()
    }, [productSizes, quantity, color])

    return (
        <div className='flex flex-col w-full gap-3'>
            <div className='flex flex-row w-full justify-between'>
                <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold' }}>
                    ADD NEW COLOR
                </Typography>
                <IconButton onClick={onClose} className='self-end w-7 h-7'>
                    <Close />
                </IconButton></div>
            <div className="flex flex-col items-start w-full gap-2 ">
                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    IMAGE
                </Typography>
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
                <div className="flex flex-col items-start justify-center w-full gap-2">
                    <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                        COLOR
                    </Typography>
                    <ColorPicker pick={handelSetColor} />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                        Product size
                    </Typography>
                    {loading ? (
                        <div>no data yet</div>
                    ) : (
                        <div className='flex flex-col items-center w-full'>

                                {productDetail[indexx-1]?.productSizes?.map((size, indexs) => {
                                    return (<div key={indexs} className='w-full p-2 bg-sky-200 rounded-lg flex flex-row gap-5'>
                                        <div className='w-1/2 flex flex-col gap-3'>
                                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                                SIZE
                                            </Typography>
                                            <Button variant='outlined'>{size?.size}</Button>
                                        </div>
                                        <div className='w-1/2 flex flex-col gap-3'>
                                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                                QUANTITY
                                            </Typography>
                                            <Button variant='outlined'>{size?.quantity}</Button>
                                        </div>
                                    </div>)
                                })}
                        </div>
                    )}
                </div>
                {isData ? (
                    <DashedButton sx={{ width: '100%' }} onClick={handleClickOpenAddLast}>
                        <Add />
                    </DashedButton>
                ) : (
                    <DashedButton sx={{ width: '100%' }} onClick={handleClickOpenAdd}>
                        <Add />
                    </DashedButton>
                )}
            </div>
            {openAdd && (
                <div className='flex flex-col w-2/6 z-50 items-start justify-start gap-4 bg-white px-5 py-4'>
                    <AddSize onClose={handleCloseAdd} id={detailId} fetch={fetchSizeData} isData={SetIsData} />
                </div>
            )}
            {detailId ? (
                <Button variant='contained' onClick={() => { onClose(); }}>SAVE</Button>
            ) : (
                <Button variant='contained' onClick={() => { handleAddDetail(); }}>SAVE</Button>
            )}
            <Button variant='contained' color="error">CANCEL</Button>
        </div>
    )
}

export default AddNewColor