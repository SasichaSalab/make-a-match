import React, { useState, useEffect, forwardRef } from 'react';
import { Button, Typography, Checkbox, Box, styled, Dialog, Slide } from '@mui/material';
import CartCard from './CartCard';
import { Remove, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getProductBySizeApi, getImageByDetailApi, getDetailIdBySizeApi, getColorByDetailApi, UpdateAmountApi, deleteCartApi, getProductSizeIdByCartIdApi } from '../api';
import UserOrder from './UserOrder';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const ListofCardCartAddBtn = ({ carts, fetchData }) => {
  const navigate = useNavigate()
  const [quantities, setQuantities] = useState({});

  const [product, setProduct] = useState([]);
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');
  useEffect(() => {
    let isMounted = true; // To handle cleanup in case the component unmounts during an async operation

    async function fetchAndSetData() {
      const newProducts = [];
      const newColors = [];
      const newImages = [];
      const newQuantities = {};

      for (const cart of carts) {
        try {
          const size = await getProductBySizeApi(cart.cartProductSize.product_size_id);
          newProducts.push(size);

          const detail = await getDetailIdBySizeApi(cart.cartProductSize.product_size_id);
          const colors = await getColorByDetailApi(detail);
          newColors.push(colors);

          const images = await getImageByDetailApi(detail);
          newImages.push(images);

          newQuantities[cart.cart_id] = cart.amount;
        } catch (error) {
          console.error('Error fetching data', error);
        }
      }

      if (isMounted) {
        setProduct(newProducts);
        setColor(newColors);
        setImage(newImages);
        setQuantities(newQuantities);
      }
    }

    fetchAndSetData();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates if the component unmounts
    };
  }, [carts]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const selectedItemsList = carts.map((cart) => cart.cart_id);
      setSelectedItems(selectedItemsList);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (cartId) => {
    if (selectedItems.includes(cartId)) {
      setSelectedItems(selectedItems.filter((id) => id !== cartId));
    } else {
      setSelectedItems([...selectedItems, cartId]);
    }
  };

  const handleQuantityChange = (cartId, event) => {
    const newAmount = parseInt(event.target.value, 10);
    if (newAmount > 0) {
      setQuantities((prevQuantities) => ({ ...prevQuantities, [cartId]: newAmount }));
      console.log(newAmount)
      updateAmount(cartId, { amount: newAmount });
    }
  };

  const handleIncrement = (cartId) => {
    setQuantities((prevQuantities) => ({ ...prevQuantities, [cartId]: (prevQuantities[cartId] || 0) + 1 }));
    updateAmount(cartId, { amount: quantities[cartId] + 1 });
    console.log({ amount: quantities[cartId] + 1 })
  };

  const handleDecrement = (cartId) => {
    if ((quantities[cartId] || 0) > 1) {
      setQuantities((prevQuantities) => ({ ...prevQuantities, [cartId]: (prevQuantities[cartId] || 0) - 1 }));
      updateAmount(cartId, { amount: quantities[cartId] - 1 });
      console.log({ amount: quantities[cartId] - 1 })
    }
  };

  const updateAmount = async (cartId, newAmount) => {
    try {
      const products = await UpdateAmountApi(cartId, newAmount);
      console.log('Update cart success:', products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteCart = async (cartId) => {
    try {
      const products = await deleteCartApi(cartId);
      console.log('Delete cart success:', products);
      fetchData();
      setSelectedItems([])
      setSelectAll(false)
    } catch (error) {
      console.error('Error Delete cart:', error);
    }
  };
  const [sizeId, setSizeId] = useState(0)
  const [order, setOrder] = useState(false)
  const [details, setDetails] = useState(null);
  const getProductIdSizeByCartId = async (cartId) => {
    try {
      const products = await getProductSizeIdByCartIdApi(cartId);
      return products
    } catch (error) {
      console.error('Error Delete cart:', error);
    }
  };

  const handleOpenOrder = async () => {
    try {
      console.log("quantities : ", quantities);

      // Using Promise.all to resolve all promises in parallel
      const productSizeIds = await Promise.all(selectedItems.map(cartId => getProductIdSizeByCartId(cartId)));
      const quantitiesValue = await Promise.all(selectedItems.map(cartId => cartId));

      // Constructing the details array
      const details = productSizeIds.map((productSizeId, index) => ({
        productSizeId: productSizeId, // Here, productSizeId is resolved
        quantity: quantities[quantitiesValue[index]]
      }));

      setDetails(details);
      setOrder(true);
    } catch (error) {
      console.error("Error in handleOpenOrder: ", error);
    }
  };




  const handleCloseOrder = () => {
    setOrder(false)
  }
  return (
    <div className='flex flex-col w-full items-start justify-start'>
      <Box className='w-full flex flex-col gap-3 mt-4'>
        <div className='flex flex-row w-full gap-5 items-center justify-between'>
          <div className='flex flex-row items-center'>
            <Checkbox
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <Typography variant='h7'>Select All</Typography>
          </div>
          <div className='flex flex-row items-center gap-5'>
            <Button variant='contained' onClick={handleOpenOrder}>Order</Button>
          </div>
        </div>
        {carts.map((cart, index) => {
          return (
            <div key={index} className='flex flex-row w-full gap-5 items-center justify-start'>
              <Checkbox
                checked={selectedItems.includes(cart.cart_id)}
                onChange={() => handleSelectItem(cart.cart_id)}
              />
              <CartCard
                name={product[index]?.productName}
                description={product[index]?.productDescription}
                price={product[index]?.productPrice}
                image={image[index]}
                len={product[index]}
                size={cart.cartProductSize.size}
                color={color[index]}
              >
                <div className='w-full flex flex-col items-center justify-center gap-1'>
                  <QuantityInputWrapper>
                    <CustomQuantityButton onClick={() => handleDecrement(cart.cart_id)}>
                      <Remove />
                    </CustomQuantityButton>
                    <QuantityInputField
                      type='number'
                      value={quantities[cart.cart_id] || cart.amount}
                      onChange={(event) => handleQuantityChange(cart.cart_id, event)}
                    />
                    <CustomQuantityButton onClick={() => handleIncrement(cart.cart_id)}>
                      <Add />
                    </CustomQuantityButton>
                  </QuantityInputWrapper>
                  <div className='w-full flex flex-row items-center justify-center gap-1'>
                    <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: </Typography>
                    <Typography variant='h7'> {product[index]?.productPrice}x {(quantities[cart.cartProductSize.product_size_id] || cart.amount)}</Typography>
                    <Typography variant='h7'> = </Typography>
                    <Typography variant='h7' sx={{ fontWeight: 'bold' }}>
                      {product[index]?.productPrice * (quantities[cart.cartProductSize.product_size_id] || cart.amount)} $
                    </Typography>
                  </div></div>
                <Button sx={{ width: '70%' }} variant='contained' color='error' onClick={() => { deleteCart(cart.cart_id) }}>DELETE</Button>
              </CartCard>
            </div>
          );
        })}
      </Box>
      <Dialog
        fullScreen
        open={order}
        onClose={handleCloseOrder}
        TransitionComponent={Transition}
      >
        <UserOrder onClose={handleCloseOrder} fetchData={fetchData} data={details} selectedCart={selectedItems} setSelectAll={setSelectAll}/>
      </Dialog>
    </div>
  );
};

export default ListofCardCartAddBtn;
