import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.primary.main,
    padding: '5px 20px 5px 20px',
    '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        borderColor: theme.palette.secondary.main,
    },
    '&:hover': {
        backgroundColor: theme.palette.secondary.contrastText,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
    },
}));

const HaveSize = ({ allSize, index, setProductSize }) => {
    const getAlignment = (index) => {
        const sizes = allSize && allSize[index] ? allSize[index].productSizes : [];
        const sizeName = sizes?.flatMap(items => items.size);
        return Array.from(new Set(sizeName));
    };

    const [alignment, setAlignment] = useState(() => getAlignment(index));
    const [size, setSize] = useState(alignment[0]);
    const [sizeIndex, setSizeIndex] = useState(0);

    const handleSize = (event, newAlignment) => {
        if (newAlignment !== null) {
            setSize(newAlignment);
            const newIndex = alignment.indexOf(newAlignment);
            setSizeIndex(newIndex);
        }
    };

    useEffect(() => {
        const newAlignment = getAlignment(index);
        setAlignment(newAlignment);
        setSize(newAlignment[0]);
        setSizeIndex(0);
    }, [index, allSize]);

    useEffect(() => {
        setProductSize(sizeIndex);
    }, [sizeIndex]);

    return (
        <div className="top-0 left-0 flex flex-row z-50">
            <div className="w-2/4 h-full items-start flex flex-row justify-start">
                <ToggleButtonGroup
                    value={size}
                    onChange={handleSize}
                    exclusive
                    aria-label="text alignment"
                >
                    {alignment.map((data, index) => (
                        <CustomToggleButton key={index} value={data} aria-label="left aligned">
                            {data}
                        </CustomToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        </div>
    );
};

export default HaveSize;
