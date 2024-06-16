import React, { useState, useEffect } from 'react';
import { Button, Typography, Checkbox, Box } from '@mui/material';
import CartCard from './CartCard';
import { getProductBySizeApi, getProductSizeIdByCartIdApi, getDetailIdBySizeApi, getColorByDetailApi, getImageByDetailApi,getProductSizeByCartIdApi } from '../api';
const ListofCardCartNone = ({ carts, quantity, selectedCart, setTotal }) => {
    const [product, setProduct] = useState(null)
    const [size, setSize] = useState(null)
    const [color, setColor] = useState(null)
    const [image, setImage] = useState(null)
    const getProductBySize = async () => {
        try {
            const products = await getProductBySizeApi(carts);
            setProduct(products)
        } catch (error) {
            console.error('Error Delete cart:', error);
        }
    };
    const getColor = async () => {
        try {
            const sizeId = await getProductSizeIdByCartIdApi(selectedCart);
            const detailId = await getDetailIdBySizeApi(sizeId);
            const products = await getColorByDetailApi(detailId)
            const detail = await getImageByDetailApi(detailId)
            const sizen= await getProductSizeByCartIdApi(selectedCart)
            setSize(sizen.size)
            setImage(detail)
            setColor(products)
        } catch (error) {
            console.error('Error Delete cart:', error);
        }
    };
    useEffect(() => {
        getProductBySize();
        getColor();
    }, [])
    const calculateCardTotal = () => {
        // This is a placeholder. Replace with your actual calculation logic.
        return Number(product?.productPrice)*Number(quantity); // Replace 10 with the actual price or value logic
    };

    const cardTotal = calculateCardTotal();

    useEffect(() => {
        if (!isNaN(cardTotal)) {
            setTotal(cardTotal);
        } else {
            console.error('cardTotal is NaN');
        }
    }, [cardTotal]);

    return (<div className='flex flex-col w-full items-start justify-start'>
        <Box className='w-full flex flex-col gap-3 mt-4'>
            <div className='flex flex-row w-full gap-5 items-center justify-start'>
                <CartCard
                    name={product?.productName}
                    description={product?.productDescription}
                    price={product?.productPrice}
                    image={image}
                    len={product}
                    size={size}
                    color={color}
                >
                    <div className='w-full flex flex-col items-center justify-center gap-1'>
                        <div className='w-full flex flex-col items-center justify-center gap-1'>
                        <div className='w-full flex flex-row items-center justify-center gap-1'>
                            <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: </Typography>
                            <Typography variant='h7'> {product?.productPrice}x {quantity}</Typography></div>
                            <div className='w-full flex flex-row items-center justify-center gap-1'>
                            <Typography variant='h7'> = </Typography>
                            <Typography variant='h7' sx={{ fontWeight: 'bold' }}>
                                {product?.productPrice * quantity} $
                            </Typography></div>
                        </div></div>
                </CartCard>
            </div>
        </Box>
    </div>
    );
};


export default ListofCardCartNone