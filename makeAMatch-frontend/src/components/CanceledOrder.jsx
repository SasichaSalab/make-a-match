import React,{useState,useEffect} from 'react'
import { Typography } from '@mui/material';
import ListOfStatusOrder from './ListOfStatusOrder';
import { getUserStatusOrder } from '../api';

const CanceledOrder = () => {
  const [canceledOrders, setCanceledOrders] = useState(null)

  const getAllStatusOrder = async () => {
    try {
      const order = await getUserStatusOrder("Cancel");
      console.log('Update cart success:', order);
      setCanceledOrders(order)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    getAllStatusOrder();
  }, [])
  return (
    <div>
      <div className='flex flex-row gap-2'>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Canceled Orders</Typography>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }} color='error'>(Orders canceled by admin only.)</Typography>
      </div>
      {canceledOrders?.length > 0 ? (
        canceledOrders.map((order,index) => {
          return (
            <div key={index} className='m-2 p-2 w-full flex flex-col bg-gray-100 rounded-lg'>
              <div className='w-full flex flex-row items-center justify-between'>
                <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Order ID: {order.orderId}</Typography>
                <Typography variant='h7' sx={{ fontWeight: 'bold', paddingRight: 2 }}>{order.status}</Typography>
              </div>
              <div className='p-2'>
                <ListOfStatusOrder total={order.totalPrice} all={order.details} />
              </div></div>
          );
        })
      ) : (
        <p>No waiting orders found.</p>
      )}
    </div>
  );
};

export default CanceledOrder