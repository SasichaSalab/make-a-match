import React, { useEffect } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkroom, RollerSkating, Transgender } from '@mui/icons-material';
import { faTshirt, faUserNinja } from '@fortawesome/free-solid-svg-icons';
import ColorSelector from './ColorSelector'
import Size from './Size';

const ProductFilter = ({ valueFilter }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        valueFilter(value)
    }, [value])

    return (
        <div className='w-full h-full flex flex-col pl-7'>
            <Typography variant="h6" >FILTER</Typography>
            <Typography variant="h7">CATEGORY</Typography>
            <Box display="flex">
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    className='w-full'
                >
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-2">
                                <Checkroom />
                                <Typography variant="h7">ALL PRODUCTS</Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-2">
                                <FontAwesomeIcon icon={faUserNinja} />
                                <Typography variant="h7">HAT</Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-2">
                                <FontAwesomeIcon icon={faTshirt} />
                                <Typography variant="h7">SHIRT</Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-2">
                                <Transgender />
                                <Typography variant="h7">PANTS</Typography>
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div className="flex flex-col items-center gap-2">
                                <RollerSkating />
                                <Typography variant="h7">SHOES</Typography>
                            </div>
                        }
                    />
                </Tabs>
            </Box>
        </div>
    );
};

export default ProductFilter;
