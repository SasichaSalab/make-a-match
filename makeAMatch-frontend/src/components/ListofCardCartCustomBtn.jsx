import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import CartCard from './CartCard';
import { getCardData } from '../api';

const ListofCardCartCustomBtn = ({ btnName, btnColor, total, all,action }) => {
  const [sizeId, setSizeId] = useState([])
  const [sizeName, setSizeName] = useState([])
  const [data, setData] = useState([])
  const [quantity, setQuantity] = useState([])
  const handleFetch = async () => {
    const sizes = all.map(item => item.productSize.product_size_id);
    const quantities = all.map(item => item.quantity);
    setQuantity(quantities)
    const name = all.map(item => item.productSize.size);
    setSizeName(name)
    const results = await Promise.all(sizes.map(sizeId => getCard(sizeId)));
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
    <Box className='w-full flex flex-col gap-3'>
      <div className='w-1/5 self-end'>
      <Box >
        <Button variant='contained' color={btnColor} sx={{ width: '100%' }} onClick={()=>{action();}}>
          {btnName}
        </Button>
      </Box>
      </div>
      {data?.map((item, index) => {
        return (
          <CartCard key={index} name={item.name} description={item.description} price={item.price} len={item.description?.length}
            image={item.image}>
          </CartCard>
        )
      })}
      <div className='w-full flex flex-row items-end justify-end gap-1'>
        <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: </Typography>
        <Typography variant='h7'> = </Typography>
        <Typography variant='h7' sx={{ fontWeight: 'bold' }}>
          {total} $
        </Typography>

      </div>
    </Box>
  );
};

export default ListofCardCartCustomBtn;