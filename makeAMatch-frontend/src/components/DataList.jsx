import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DataCard from './DataCard';

const DataList = ({ matchData ,fetchData}) => {
    const [imageData, setImageData] = useState([]);

    const handlefetch = async () => {
        try {
            // Fetch details from matchData
            const details = await Promise.all(matchData.map(match => match.details));

            // Flatten the details array to simplify further processing
            const flattenedDetails = details.flat();

            // Extract matchProductSize from each detail item
            const matchProductSize = await Promise.all(flattenedDetails.map(detail => detail.matchProductSize));

            // Flatten the matchProductSize array
            const flattenedMatchProductSize = matchProductSize.flat();

            // Extract productDetails from each matchProductSize item
            const productDetails = await Promise.all(flattenedMatchProductSize.map(size => size.details));

            // Flatten the productDetails array
            const flattenedProductDetails = productDetails.flat();

            // Extract product_image from each productDetail item
            const product_images = flattenedProductDetails.map(detail => detail.product_image);

            // Save the images in the state
            setImageData(product_images);
        } catch (error) {
            console.error("Error fetching product images:", error);
        }
    };

    useEffect(() => {
        handlefetch();
    }, [matchData]);

    return (
        <Grid container spacing={2} justifyContent="start">
            {matchData.map((match, index) => {
                // Get the corresponding image for the current match
                const image = imageData[index] || null;

                return (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <DataCard
                            image={image}
                            name={match.name}
                            description={match.description}
                            id={match.match_product_id}
                            fetchData={fetchData}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default DataList;
