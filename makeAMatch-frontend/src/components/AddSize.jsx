import React, { useState } from 'react'
import { Typography, styled, Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import Size from './Size';
import { AddProductSizeApi } from '../api';

const QuantityInputWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  padding: 0.5rem;
  width: auto;
`;

const QuantityInputField = styled('input')`
  text-align: center;
  margin: 0 0.5rem;
  border: none;
  outline: none;
  width: 100px;
  height: 20px;
`;

const CustomQuantityButton = styled(Button)`
  min-width: 30px;
  padding: 0;
`;
const DashedButton = styled(Button)`
  border: 2px dashed #000;
  background-color: transparent;
  height: 30px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const AddSize = ({ onClose, id,fetch,isData }) => {
    const [size, setSize] = useState(() => ['S']);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const handelSetSize = (s) => {
        setSize(s);
    }


    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setQuantity(value);
        }
    };
    const handleSave = async() => {
        const childDetail={size,quantity}
        console.log(JSON.stringify(childDetail, null, 2));
        try {
            const result = await AddProductSizeApi(childDetail, id);
            console.log(`Add Product Size successful: at detail id ${id} : ${result}`);
            fetch()
            isData(true)
            onClose();
        } catch (error) {
            console.error('Error Creating Product:', error);
            setError('Invalid Creating Product');
        }
    }

    return (
        <div className='p-2 bg-sky-200 rounded-lg flex flex-col items-center gap-2'>
            <div className='w-full flex flex-col gap-3'>
                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    SIZE
                </Typography>
                <Size size={handelSetSize} />
            </div>
            <div className='w-full flex flex-col gap-1'>
                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    QUANTITY
                </Typography>
                <div className='w-1/2 flex flex-row items-center justify-start gap-3'>
                    <CustomQuantityButton variant="outlined" onClick={handleDecrement}>
                        <Remove />
                    </CustomQuantityButton>
                    <QuantityInputWrapper>
                        <QuantityInputField
                            type="text"
                            value={quantity}
                            onChange={(e) => handleChange(e)}
                        />
                    </QuantityInputWrapper>
                    <CustomQuantityButton variant="outlined" onClick={handleIncrement}>
                        <Add />
                    </CustomQuantityButton>
                </div>
            </div>
            <Button variant='contained' onClick={handleSave}>Save size</Button>
        </div>
    )
}

export default AddSize