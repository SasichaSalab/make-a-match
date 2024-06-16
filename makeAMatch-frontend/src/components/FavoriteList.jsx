import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const FavoriteList = ({ productData }) => {
    return (
        <Grid container spacing={3} justifyContent="center" className='py-5'>
            {productData.map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={2.3}>
                    <ProductCard
                        image={product.details[0].product_image}
                        name={product.productName}
                        price={product.productPrice}
                        description={product.productDescription}
                        id={product.id}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default FavoriteList;
