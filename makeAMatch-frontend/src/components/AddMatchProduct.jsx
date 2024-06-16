import React, { useState, useEffect } from 'react';
import { Checkroom, Close, Transgender, RollerSkating, Favorite } from '@mui/icons-material';
import { Toolbar, IconButton, Typography, Tabs, Tab, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNinja, faTshirt } from '@fortawesome/free-solid-svg-icons';
import Pagination from './Pagination';
import MatchProductList from './MatchProductList';
import { fetchProductsByTag, fetchProducts, fetchFavoriteApi,addMatchDetailApi } from '../api';

const AddMatchProduct = ({ onClose, detailsSelected,id,fetchMatch }) => {
    const [value, setValue] = useState(0);
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [allIds, setAllIds] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
            let products = await fetchFavoriteApi();
            products = products.map(item => item.product);
            setProductData(products);
            
            if (value === 1) {
                const p = await fetchProducts();
                setProductData(p);
            } else if (value === 2) {
                const h = await fetchProductsByTag("HAT");
                setProductData(h);
            } else if (value === 3) {
                const s = await fetchProductsByTag("SHIRT");
                setProductData(s);
            } else if (value === 4) {
                const p = await fetchProductsByTag("PANTS");
                setProductData(p);
            } else if (value === 5) {
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
    const handleCheckOut = async(selectedIds) => {
        try {
            for(let i=0; i<selectedIds.length; i++){
                const productData = { matchProductId:id, productId:selectedIds[i] };
                const result = await addMatchDetailApi(productData);
            }
            fetchMatch();
            onClose();
        } catch (error) {
            console.error('Error Creating Product:', error);
            setError('Invalid Creating Product');
        }
    };

    useEffect(() => {
        fetchData();
    }, [value]);

    const handleSelectionChange = async(selectedIds) => {
        setAllIds(selectedIds); // Use selectedIds directly here
    };

    const handleClose = () => {
        detailsSelected([]);
        onClose();
    };

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = productData.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='top-0 left-0 w-full flex flex-col z-50 items-start justify-start bg-gray-300'>
            <Toolbar className='w-full flex flex-row items-start justify-between'>
                <div className='w-full flex flex-row items-center justify-start'>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ height: 10 }}
                    >
                        <Close />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Close
                    </Typography>
                </div>
                <div className='w-full flex flex-row items-center justify-end gap-4'>
                    <Typography variant="body1" component="div" className='mt-4'>
                        Selected IDs: {allIds.join(', ')}
                    </Typography>
                    <Button variant='contained' onClick={() => { handleCheckOut(allIds); }}>
                        Select
                    </Button>
                </div>
            </Toolbar>
            <div className='w-full flex flex-col items-center justify-start gap-2 p-2'>
                <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" indicatorColor="primary">
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-2">
                                <Favorite />
                                <Typography variant="h7" component="h4">
                                    MY FAVORITES
                                </Typography>
                            </div>
                        }
                    />
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
                            <div className="flex flex-col items-center gap-4">
                                <FontAwesomeIcon icon={faUserNinja} />
                                <Typography variant="h7" component="h4">
                                    HAT
                                </Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-4">
                                <FontAwesomeIcon icon={faTshirt} />
                                <Typography variant="h7" component="h4">
                                    SHIRT
                                </Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-4">
                                <Transgender />
                                <Typography variant="h7" component="h4">
                                    PANTS
                                </Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-4">
                                <RollerSkating />
                                <Typography variant="h7" component="h4">
                                    SHOES
                                </Typography>
                            </div>
                        }
                    />
                </Tabs>
                <div className='w-full flex flex-col items-center justify-start'>
                    {loading ? (
                        <div>Loading... // Show loading indicator while data is being fetched</div>
                    ) : (
                        <div className='flex flex-row items-center w-full'>
                            <MatchProductList productData={currentPosts} allSelectedIds={allIds} onSelectionChange={handleSelectionChange} />
                        </div>
                    )}
                </div>
                <Pagination totalPost={productData.length}
                    postPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
    );
};

export default AddMatchProduct;
