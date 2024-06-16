import React, { useState,useEffect } from 'react'
import ListofCardCartAddBtn from './ListofCardCartAddBtn'
import { fetchCartApi } from '../api'

const Cart = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const [carts,setCarts]=useState([])
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const products = await fetchCartApi();
      setCarts(products);
      setLoading(false); // Set loading to false after data is set
    } catch (error) {
      console.error('Error setting data:', error);
      setLoading(false); // Set loading to false in case of error
    }
  };
  useEffect(() => {


    fetchData();
  }, []);
  return (
    <div className='w-full'>
      <ListofCardCartAddBtn carts={carts} fetchData={fetchData} />
    </div>
  )
}

export default Cart