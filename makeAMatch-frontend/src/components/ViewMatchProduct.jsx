import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, MobileStepper } from '@mui/material';
import ColorSelector from '../components/ColorSelector'
import HaveSize from '../components/HaveSize';

const ViewMatchProduct = ({ product }) => {

    useEffect(() => {
        const c = [...new Set(product?.details.flatMap(item => item.color))];
        setSelectedColorDetail(c)
        setProductDetail(product?.details)
    },[])
    console.log(product)
    const [productDetail, setProductDetail] = useState([])
    const [size, setSize] = useState('')
    const [detailsId, setDetailsId] = useState(0)

    const [selectedColorDetail, setSelectedColorDetail] = useState([])
    const handelSetDetailsIdFromColor = (index) => {
        setDetailsId(index)
    }
    // productData.details is defined and has elements
    const maxSteps = product?.details?.length ?? 0;
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

    return (
        <div className='top-0 left-0 w-full flex flex-col items-start justify-start'>
            <div className='w-full flex flex-row items-start justify-between '>
                <Box sx={{ flexGrow: 1, }} className='w-5/12 h-full'>
                    <div className='w-full h-full flex-row flex overflow-hidden'>
                        {product?.details?.map((step, index) => (
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
                        {product?.tag}
                    </Typography>
                </div>
                <div className='w-6/12 flex flex-col items-start justify-start gap-2 pt-10 p-5'>
                    <Typography variant="h4" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                        #{product?.id}
                    </Typography>
                    <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                        name
                    </Typography>
                    <Typography variant="h4" style={{ textTransform: "uppercase", fontWeight: "bold", marginLeft: 20 }}>
                        {product?.productName}
                    </Typography>
                    <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                        description
                    </Typography>
                    <Typography variant="h6" style={{ marginLeft: 20 }}>
                        {product?.productDescription}
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
                    <div className='ml-4'><HaveSize allSize={productDetail} index={detailsId} setProductSize={setSize} /></div>
                </div>
            </div>
        </div>
    );
};

export default ViewMatchProduct;
