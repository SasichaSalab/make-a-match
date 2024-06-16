import React,{useState,useEffect} from 'react'
import { Typography } from '@mui/material';
import { getUserStatusOrder } from '../api';
import ListOfStatusOrder from './ListOfStatusOrder';

const SuccessOrder = () => {
  const [successOrders,setSuccessOrders]=useState(null)
  const getAllStatusOrder = async () => {
    try {
      const order = await getUserStatusOrder("Success");
      console.log('Update cart success:', order);
      setSuccessOrders(order)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(()=>{
    getAllStatusOrder();
  },[])

  return (
    <div>
      <Typography variant='h5' sx={{fontWeight:'bold'}}>Success Orders</Typography>
      {successOrders?.length > 0 ? (
        successOrders.map((order,index) => {
          return (
            <div key={index} className='m-2 p-2 w-full flex flex-col bg-gray-100 rounded-lg'>
              <div className='w-full flex flex-row items-center justify-between'>
              <Typography variant='h7' sx={{fontWeight:'bold'}}>Order ID: {order.orderId}</Typography>
              <Typography variant='h7' sx={{fontWeight:'bold',paddingRight:2}}>{order.orderStatus}</Typography>
              </div>
              <div className='p-2'>
              <ListOfStatusOrder total={order.totalPrice} all={order.details}/>
            </div></div>
          );
        })
      ) : (
        <p>No waiting orders found.</p>
      )}
    </div>
  );
};

export default SuccessOrder