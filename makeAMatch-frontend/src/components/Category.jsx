import React from 'react'
import { Tab, Tabs, Typography, Button, useMediaQuery, Drawer, IconButton } from '@mui/material'
import { Checkroom, RollerSkating, Transgender, MoreHoriz, Menu } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt, faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Pagination from "./Pagination";
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchProductsByTag } from '../api';

// Inside your functional component


const Category = () => {
    const navigate = useNavigate()
    const handleAllProducts = () => {
        navigate('/products')
    }
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const changetodrawer = useMediaQuery('(max-width:500px)');
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [loading, setLoading] = useState(true); // Add loading state
    const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const products = await fetchProducts();
            setProductData(products);
            if (value === 1) {
                const h = await fetchProductsByTag("HAT");
                setProductData(h);
            }
            else if (value === 2) {
                const s = await fetchProductsByTag("SHIRT");
                setProductData(s);
            }
            else if (value === 3) {
                const p = await fetchProductsByTag("PANTS");
                setProductData(p);
            }
            else if (value === 4) {
                const sh = await fetchProductsByTag("SHOES");
                setProductData(sh);
            }

            setPostsPerPage(5);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or in case of error
        }
    };
    useEffect(() => {

        fetchData();
    }, [value]); // Empty dependency array means this useEffect runs once on component mount

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = productData.slice(firstPostIndex, lastPostIndex);
    return (
        <div className='top-0 left-0 w-full flex flex-col z-50 items-center justify-between py-4 gap-4'>
            {changetodrawer ? (<><IconButton onClick={handleDrawerOpen} aria-label="menu">
                <Menu />
            </IconButton><Drawer anchor="top" open={isDrawerOpen} onClose={handleDrawerClose}>
                    <div
                        role="presentation"
                        onClick={handleDrawerClose}
                        onKeyDown={handleDrawerClose}
                    >
                        <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" indicatorColor="primary">
                            {/* Tabs content */}
                        </Tabs>
                        <div className='w-full'>
                            {/* Product list and other content */}
                        </div>
                    </div>
                </Drawer></>) :
                (<Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" indicatorColor="primary">
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-2">
                                <Checkroom />
                                <Typography variant="h7" component="h4">
                                    ALL PRODUCTS
                                </Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-4" >
                                <FontAwesomeIcon icon={faUserNinja} />
                                <Typography variant="h7" component="h4">
                                    HAT
                                </Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-4" >
                                <FontAwesomeIcon icon={faTshirt} />
                                <Typography variant="h7" component="h4">
                                    SHIRT
                                </Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-4" >
                                <Transgender />
                                <Typography variant="h7" component="h4">
                                    PANTS
                                </Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-4" >
                                <RollerSkating />
                                <Typography variant="h7" component="h4">
                                    SHOES
                                </Typography>
                            </div>
                        }
                    />
                </Tabs>)}
            <div className='w-full'>
                {loading ? (
                    <div>Loading... // Show loading indicator while data is being fetched</div>
                ) : (
                    <div className={isSmallScreen ? 'flex flex-col items-center px-4' : 'flex flex-row items-center px-4'}>
                        <ProductList productData={currentPosts} fetchData={fetchData} />
                        <Button className='flex flex-col items-center' onClick={handleAllProducts}>
                            <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                                All Products
                            </Typography>
                            <MoreHoriz />
                        </Button>
                    </div>
                )}
            </div>
            <Pagination totalPost={productData.length}
                postPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    )
}

export default Category