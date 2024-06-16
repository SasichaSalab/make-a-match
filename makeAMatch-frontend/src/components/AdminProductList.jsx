import React from 'react';
import { Grid } from '@mui/material';
import AdminProductCard from './AdminProductCard';

const AdminProductList = ({ productData,fetchData }) => {
    return (
        <Grid container spacing={3} justifyContent="start" className='py-5'>
            {productData.map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={2.3}>
                    <AdminProductCard
                        image={product.details.length > 0 ? product.details[0].product_image : null}
                        name={product.productName}
                        price={product.productPrice}
                        description={product.productDescription}
                        id={product.id}
                        fetchData={fetchData}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default AdminProductList;
