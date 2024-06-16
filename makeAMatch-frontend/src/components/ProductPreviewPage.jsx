import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeadTitle from '../components/HeadTitle'
import { Typography, Button, IconButton, Box, MobileStepper, useTheme, } from '@mui/material';
import ColorSelector from '../components/ColorSelector'
import Size from '../components/Size'
import { FavoriteOutlined } from '@mui/icons-material';
import { fetchProductByIdApi } from '../api'
import ShowSize from './ShowSize';

const ProductPreviewPage = () => {
    const theme = useTheme();

    const [productData, setProductData] = useState([])
    const [loading, setLoading] = useState(true);
    const [productDetail, setProductDetail] = useState([])
    // Get the ID parameter from the route path
    const { id } = useParams();
    

    const [selectedColorDetail, setSelectedColorDetail] = useState([])
    const [detailsId, setDetailsId] = useState(0)
    const handelSetDetailsIdFromColor = (index) => {
        setDetailsId(index)
    }
    // productData.details is defined and has elements
    const maxSteps = productData?.details?.length ?? 0;
    const [activeStep, setActiveStep] = useState();
    useEffect(() => {
        setActiveStep(0); // BAD: infinite recursion
    }, []);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };
    const truncateText = (text) => {
        if (text === undefined) {
            return '';
        }
        const isTextLong = text.length > 9;
        return isTextLong ? text.substring(0, 9) : text;
    };

useEffect(() => {
        const fetchData = async (productId) => {
            setLoading(true);
            try {
                const products = await fetchProductByIdApi(productId);
                setProductData(products);
                const c = [...new Set(products.details.flatMap(item => item.color))];
                setSelectedColorDetail(c)
                console.log(selectedColorDetail)
                setProductDetail(products.details)
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData(id);
    }, [id,detailsId]);
    return (
        <div className='top-0 left-0 w-full h-screen flex flex-col z-50 items-start justify-start'>
            <HeadTitle backPath={'/admin/product'} />
            {loading ? (
                <div>Loading... // Show loading indicator while data is being fetched</div>
            ) : (
                <div className='w-full flex flex-row items-start justify-between ' style={{ height: '80vh' }}>
                    <Box sx={{ flexGrow: 1, }} className='w-5/12 h-full'>
                        <div className='w-full h-full flex-row flex overflow-hidden'>
                            {productData?.details?.map((step, index) => (
                                <div
                                    className={`w-full h-full m-2 block overflow-hidden ${activeStep === index ? 'active' : 'inactive'
                                        }`}
                                    key={index}
                                >
                                    <Box
                                        component="img"
                                        sx={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        src={`data:image/png;base64,${step.product_image}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Next
                                    {/* Your icon here */}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {/* Your icon here */}
                                    Back
                                </Button>
                            }
                        />
                    </Box>
                    <div className='h-full w-1/12 flex flex-col items-start justify-between z-50 bg-transparent'>
                        <Typography variant="h5" style={{ textTransform: "uppercase", fontWeight: "bold", letterSpacing: "0.5em" }}>
                            {productData.tag}
                        </Typography>
                        <div className="flex items-start justify-start text-gray-200" style={{ writingMode: "vertical-rl", transform: "rotate(-180deg)" }}>
                            <Typography variant='h1' style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                                {truncateText(productData.productName)}
                            </Typography>
                        </div>
                    </div>
                    <div className='w-6/12 flex flex-col items-start justify-start gap-2 pt-10 p-5'>
                        <Typography variant="h4" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                            #{productData.id}
                        </Typography>
                        <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                            name
                        </Typography>
                        <Typography variant="h4" style={{ textTransform: "uppercase", fontWeight: "bold", marginLeft: 20 }}>
                            {productData.productName}
                        </Typography>
                        <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                            description
                        </Typography>
                        <Typography variant="h6" style={{ marginLeft: 20 }}>
                            {productData.productDescription}
                        </Typography>
                        <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                            color
                        </Typography>
                        <div className='ml-4'><ColorSelector colors={selectedColorDetail} defaultColor={selectedColorDetail[0]} func={handelSetDetailsIdFromColor} /></div>
                        <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                            selected color
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: selectedColorDetail[detailsId],
                                height: 50,
                                width: 50,
                                border: '2px solid black',
                                borderRadius: '50%', // Add this property
                            }}
                        />
                        <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                            size
                        </Typography>
                        <div className='ml-4'><ShowSize allSize={productDetail[detailsId]} index={detailsId} /></div>
                        <div className='w-full gap-1 flex flex-row justify-between items-start'>
                            <div className='w-3/5 flex flex-col justify-center items-start'>
                                <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                                    note
                                </Typography>
                                <Typography variant="h6">
                                    In the case that you have already purchased clothes from us You can request an exchange only if you ordered the wrong size.
                                </Typography>
                            </div>
                            <div className='w-2/5 flex flex-col justify-center items-start gap-3'>
                                <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                                    PRICE : {productData.productPrice} $
                                </Typography>
                                <div className='flex flex-row justify-between items-center w-full'>
                                    <IconButton>
                                        <FavoriteOutlined sx={{ fontSize: 35 }} /></IconButton>
                                    <Button variant="outlined" className='w-3/4'>ADD TO CART</Button>
                                </div>
                                <Button variant="contained" className='w-full'>BUY NOW</Button>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default ProductPreviewPage;
