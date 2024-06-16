import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ productData,fetchData }) => {
    return (
        <Grid container spacing={2} justifyContent="start">
            {productData?.map((product, index) => (
                <Grid item key={index} xs={12} sm={10} md={2} lg={2.3}>
                    <ProductCard
                        image={product.details?.[0]?.product_image}
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

export default ProductList;
