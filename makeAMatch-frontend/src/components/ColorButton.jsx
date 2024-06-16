// ColorButton.js
import React from 'react';

const ColorButton = ({ color, isSelected, onClick }) => {
    return (
        <button
            className={`w-7 h-7 rounded-full m-1 focus:outline-none transition-transform duration-300 
                ring-2 ring-black transform scale-110`}
            style={{ backgroundColor: color }}
            onClick={() => onClick(color)}
        />
    );
};

export default ColorButton;
