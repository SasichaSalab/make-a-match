import React, { useEffect } from 'react'
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
const ShowSize = ({ allSize,index }) => {
    const [alignment, setAlignment] = React.useState(() => {
        if (!allSize ||!allSize.productSizes) {
          return [];
        }
        const sizes = allSize.productSizes;
        const sizeName = sizes.flatMap(items => items.size);
        return Array.from(new Set(sizeName));
      });

    return (
        <div className="top-0 left-0 flex flex-row z-50">
            <div className="w-2/4 h-full items-start flex flex-row justify-start">
                <ToggleButtonGroup
                    value={alignment}
                    aria-label="text alignment"
                >
                    <CustomToggleButton value="S" aria-label="left aligned">
                        S
                    </CustomToggleButton>
                    <CustomToggleButton value="M" aria-label="centered">
                        M
                    </CustomToggleButton>
                    <CustomToggleButton value="L" aria-label="centered">
                        L
                    </CustomToggleButton>
                    <CustomToggleButton value="XL" aria-label="centered">
                        XL
                    </CustomToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
}

export default ShowSize