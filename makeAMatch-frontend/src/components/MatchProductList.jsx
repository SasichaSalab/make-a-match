import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import MatchProductCard from './MatchProductCard';

const MatchProductList = ({ productData, allSelectedIds, onSelectionChange }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const handleCardClick = (id) => {
        setSelectedIds((prevSelectedIds) => {
            const newSelectedIds = prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedIds, id];

            onSelectionChange(newSelectedIds);
            return newSelectedIds;
        });
    };
    useEffect(() => {
        setSelectedIds(allSelectedIds);
    }, [allSelectedIds]);
    return (
        <Grid container spacing={2} justifyContent="center">
            {productData.map((product, index) => (
                <Grid item key={index} xs={12} sm={10} md={2} lg={2.3}>
                    <MatchProductCard
                        image={product?.details?.[0]?.product_image}
                        name={product?.productName}
                        price={product?.productPrice}
                        description={product?.productDescription}
                        id={product?.id}
                        isSelected={selectedIds.includes(product?.id)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default MatchProductList;
