import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import CartCard from './CartCard';
import { getCardData } from '../api';
const ListOfStatusOrder = ({ total, all }) => {
    const [sizeId, setSizeId] = useState([])
    const [sizeName, setSizeName] = useState([])
    const [data, setData] = useState([])
    const [quantity, setQuantity] = useState([])
    const handleFetch = async () => {
        const sizes = all?.map(item => item.productSize.product_size_id);
        const quantities = all?.map(item => item.quantity);
        setQuantity(quantities)
        const name = all?.map(item => item.productSize.size);
        setSizeName(name)
        const results = await Promise.all(sizes?.map(sizeId => getCard(sizeId)));
        setData(results);
    }
    const getCard = async (sizeId) => {
        try {
            const order = await getCardData(sizeId);
            return order;  // Make sure to return the fetched data
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;  // Ensure errors are propagated to Promise.all
        }
    }
    useEffect(() => {
        handleFetch();
    }, [])
    return (
        <div className='flex flex-col w-full items-start justify-start'>
            <Box className='w-full flex flex-col gap-3 mt-4'>
                {data?.map((item, index) => (
                    <div key={index} className='flex flex-row w-full gap-5 items-center justify-start'>
                        <CartCard
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            len={item.description.length}
                            size={sizeName[index]}
                            color={item.color}
                        >
                            <div className='w-full flex flex-col items-center justify-center gap-1'>
                                <div className='w-full flex flex-col items-center justify-center gap-1'>
                                    <div className='w-full flex flex-row items-center justify-center gap-1'>
                                        <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: </Typography>
                                        <Typography variant='h7'> {item.price}x {quantity[index]}</Typography>
                                    </div>
                                    <div className='w-full flex flex-row items-center justify-center gap-1'>
                                        <Typography variant='h7'> = </Typography>
                                        <Typography variant='h7' sx={{ fontWeight: 'bold' }}>
                                            {item.price * quantity[index]} $
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </CartCard>
                    </div>
                ))}
                <div className='w-full flex flex-row items-end justify-end gap-1'>
                    <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: </Typography>
                    <Typography variant='h7'> = </Typography>
                    <Typography variant='h7' sx={{ fontWeight: 'bold' }}>
                        {total} $
                    </Typography>

                </div>
            </Box>
        </div>
    );
};


export default ListOfStatusOrder