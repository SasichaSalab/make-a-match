// ColorSelector.js
import React, { useState, useEffect } from 'react';
import ColorButton from './ColorButton';
import { Typography } from '@mui/material';


const ColorSelector = ({ colors, defaultColor, func }) => {
    const [selectedColor, setSelectedColor] = useState(defaultColor);
    const [indexx, setIndexx] = useState(0)

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="flex flex-col items-start">
            <div className="flex justify-center gap-2">
                {colors?.map((color, index) => (
                    <ColorButton
                        key={index}
                        color={color}
                        isSelected={selectedColor === color}
                        onClick={() => { func(index); handleColorClick(color); }}
                    />
                ))}

            </div>
        </div>
    );
};

export default ColorSelector;
