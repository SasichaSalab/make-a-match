import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';

const MatchProductCard = ({ id, image, name, price, description, isSelected, onCardClick }) => {
  const text = description;
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  const isTextLong = text?.length > 20;
  const displayText = showMore || !isTextLong ? text : `${text.substring(0, 20)}...`;

  return (
    <div className='w-full flex flex-col z-50'>
      <div className='w-full flex flex-row items-start justify-end h-0 z-50'>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
      </div>
      <Card
        sx={{ width: '100%', cursor: 'pointer', border: isSelected ? '2px solid blue' : 'none' }}
        onClick={() => onCardClick(id)}
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

export default MatchProductCard;
