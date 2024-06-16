import React, { useState, forwardRef, useEffect } from 'react';
import { Button, Dialog, Slide, Typography } from '@mui/material';
import Pagination from './Pagination';
import AdminProductList from './AdminProductList';
import CreateProduct from './CreateProduct';
import { fetchProducts } from '../api'; // Import fetchProducts from api.js

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageProduct = () => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    setPostsPerPage(10);
    try {
      const products = await fetchProducts(); // Fetch data from the API
      setProductData(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or in case of error
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = productData.slice(firstPostIndex, lastPostIndex);
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this useEffect runs once on component mount

  return (
    <div className='w-full bg-slate-200 flex items-center justify-center p-2'>
      <div className="w-full items-start flex flex-col justify-center bg-white rounded-lg p-2">
        <div className='w-full flex flex-row items-center justify-between text-center gap-3'>
          <div className='w-full flex flex-row items-center text-center gap-3'>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              List of Product
            </Typography>
          </div>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            sx={{ width: 250 }}
          >
            Create New Product
          </Button>
        </div>
        <div className="w-full items-center border-t border-gray-400 my-2 opacity-60"></div>
        <div className="w-full items-center flex flex-col justify-center bg-white rounded-lg self-center">
          <div className='w-full px-10'>
            {loading ? (
              <div>Loading... // Show loading indicator while data is being fetched</div>
            ) : (
              <div className='flex flex-row items-center'>
                <AdminProductList productData={currentPosts} fetchData={fetchData} />
              </div>
            )}
          </div>
          <Pagination
            totalPost={productData.length}
            postPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <CreateProduct onClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default ManageProduct;
