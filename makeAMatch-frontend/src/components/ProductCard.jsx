import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi, getFavoriteIdApi } from '../api';

const ProductCard = ({ id, image, name, price, description,fetchData }) => {
    const navigate = useNavigate();
    const [fav, setFav] = useState(false)
    const [favId, setFavId] = useState('')

    const handleProduct = (ProductId) => {
        navigate(`/product/${ProductId}`);
    };
    const handleAddToFavoritegetIdForDelete = async () => {
        try {
            const products = await getFavoriteIdApi(id); // Fetch data from the API
            setFavId(products[0])
        } catch (error) {
            console.error('Error add product to favorite:', error);
        }
    }
    const handleIsFavorite = async () => {
        try {
            const products = await isFavoriteApi(id); // Fetch data from the API
            setFav(products)
        } catch (error) {
            console.error('Error fetching favorite:', error);
        }
    };
    useEffect(() => {
        handleIsFavorite()
        handleAddToFavoritegetIdForDelete()
    }, [fav])

    const handleAddToFavorite = async () => {
        try {
            const products = await addFavoriteApi(id); // Fetch data from the API
            handleIsFavorite()
        } catch (error) {
            console.error('Error add product to favorite:', error);
        }
    }

    const handleDeleteToFavorite = async () => {
        try {
            const products = await deleteFavoriteApi(favId); // Fetch data from the API
            handleIsFavorite()
            fetchData();
        } catch (error) {
            console.error('Error delete product from favorite:', error);
        }
    }

    const text = description;
    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => setShowMore(!showMore);
    const isTextLong = text?.length > 20;
    const displayText = showMore || !isTextLong ? text : `${text.substring(0, 20)}...`;

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex flex-row items-start justify-end h-0'>
                <IconButton aria-label="add to favorites" onClick={() => {
                    fav ? handleDeleteToFavorite() : handleAddToFavorite();
                }}>
                    {fav ? <Favorite style={{ color: 'red' }} /> : <Favorite style={{ color: 'grey' }} />}
                </IconButton>
            </div>
            <Card
                sx={{ width: '100%', cursor: 'pointer' }}
                onClick={() => handleProduct(id)}
            >
                <CardMedia
                    sx={{ height: 120 }}
                    image={`data:image/png;base64,${image}`}
                    title="product image"
                />
                <CardContent className='text-start'>
                    <Typography gutterBottom variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {displayText}
                    </Typography>
                    {isTextLong && (
                        <Button onClick={(e) => { e.stopPropagation(); toggleShowMore(); }} size="small">
                            {showMore ? 'Show Less' : 'Show More'}
                        </Button>
                    )}
                    <Typography gutterBottom variant="h8" component="div">
                        Price: ${price}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductCard;
