import React from 'react';
import { Card, CardMedia, Box, Typography, CardContent } from '@mui/material';

const CartCard = ({ children, name, description, price, image,len,size,color }) => {
    const truncateDescription = (desc) => {
        return len > 150 ? `${desc.substring(0, 150)}...` : desc;
    };
    return (
        <div className=' w-full flex flex-col z-50'>
            <Card className='w-full flex flex-row items-center justify-start gap-2'>
                <Box className='flex flex-col items-start justify-start w-2/12 h-full'>
                    <CardMedia
                        component="img"
                        image={`data:image/png;base64,${image}`}
                        alt="Product Image"
                        className="object-contain h-full p-2"
                    />
                </Box>
                <Box className='flex flex-col items-start justify-start w-full'>
                    <CardContent sx={{ flex: '1 0 auto',width:'100%' }}>
                        <Typography component="div" variant="h5">
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {truncateDescription(description)}
                        </Typography>
                        <div className='w-full flex flex-row items-center justify-start gap-2'>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                size : {size}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                color : {color}
                            </Typography>
                        </div>
                        <Typography variant='h6'>Price : {price}$</Typography>
                    </CardContent>
                </Box>
                <Box className='flex flex-col items-center justify-center h-full gap-2 p-2 w-3/12'>
                    {children}
                </Box>
            </Card>
        </div>
    );
}

export default CartCard;
