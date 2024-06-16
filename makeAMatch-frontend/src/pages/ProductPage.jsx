import React, { useState, useEffect,forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import HeadTitle from '../components/HeadTitle'
import { Typography,styled, Button, IconButton, Box,Slide, MobileStepper, useTheme, Alert, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from '@mui/material';
import ColorSelector from '../components/ColorSelector'
import { FavoriteOutlined,Remove,Add } from '@mui/icons-material';
import { fetchProductByIdApi, getFavoriteIdApi, isFavoriteApi, addFavoriteApi, deleteFavoriteApi, addToCartApi } from '../api'
import HaveSize from '../components/HaveSize';
import BuyNowOrder from '../components/BuyNowOrder';
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

const ProductPage = () => {
  const theme = useTheme();

  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState([])
  const [fav, setFav] = useState(false)
  const [favId, setFavId] = useState('')
  const [size, setSize] = useState('')
  const [detailsId, setDetailsId] = useState(0)
  const [dialogSize,setDialogSize]=useState(null)
  const [dialogColor,setDialogColor]=useState(null)
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState(false)
  const [orderData,setOrderData]=useState({})
  // Get the ID parameter from the route path
  const { id } = useParams();

  const [selectedColorDetail, setSelectedColorDetail] = useState([])
  const handelSetDetailsIdFromColor = (index) => {
    setDetailsId(index)
  }
  // productData.details is defined and has elements
  const maxSteps = productData?.details?.length ?? 0;
  const [activeStep, setActiveStep] = useState();
  useEffect(() => {
    setActiveStep(0); // BAD: infinite recursion
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  };
  const truncateText = (text) => {
    if (text === undefined) {
      return '';
    }
    const isTextLong = text.length > 9;
    return isTextLong ? text.substring(0, 9) : text;
  };
  const fetchData = async (productId) => {
    setLoading(true);
    try {
      const products = await fetchProductByIdApi(productId);
      setProductData(products);
      const c = [...new Set(products.details.flatMap(item => item.color))];
      setSelectedColorDetail(c)
      setProductDetail(products.details)
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(id);
    handleIsFavorite()
    handleAddToFavoritegetIdForDelete()
  }, [id, detailsId, fav]);
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
  const handleAddToCart = async () => {
    const cartData = { detailId: productDetail[detailsId].productSizes[size].product_size_id, amount: 1 }
    try {
      const products = await addToCartApi(cartData); // Fetch data from the API
      console.log('Add to cart success:', products);
      handleshowCartAlert();
      setTimeout(() => {
        setshowCartAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Error fetching favorite:', error);
    }
  };
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
      console.log(favId)
      const products = await deleteFavoriteApi(favId); // Fetch data from the API
      handleIsFavorite()
      fetchData(id);
    } catch (error) {
      console.error('Error delete product from favorite:', error);
    }
  }
  const [showCartAlert, setshowCartAlert] = useState(false);
  const handleshowCartAlert = () => {
    setshowCartAlert(true);
  };
  const [openBuy, setOpenBuy] = useState(false);
  const handleOpenBuy = (color,size) => {
    setDialogColor(color)
    setDialogSize(size)
    setOpenBuy(true);
  };
  const handleCloseBuy = () => {
    setOpenBuy(false);
  };
  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };
  const handleOpenOrder = async () => {
    try {
      setOrder(true);
    } catch (error) {
      console.error("Error in handleOpenOrder: ", error);
    }
  };
  const handleCloseOrder = () => {
    setOrder(false)
  }
  return (
    <div className='top-0 left-0 w-full h-screen flex flex-col z-50 items-start justify-start'>
      <HeadTitle backPath={'/products'} />
      {loading ? (
        <div>Loading... // Show loading indicator while data is being fetched</div>
      ) : (
        <div className='w-full flex flex-row items-center justify-center ' style={{ height: '80vh' }}>
          <Box sx={{ flexGrow: 1, }} className='w-5/12 h-full'>
            <div className='w-full h-full flex-row flex overflow-hidden'>
              {productData?.details?.map((step, index) => (
                <div
                  className={`w-full h-full m-2 block overflow-hidden ${activeStep === index ? 'active' : 'inactive'
                    }`}
                  key={index}
                >
                  <Box
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%'
                    }}
                    src={`data:image/png;base64,${step.product_image}`}
                  />
                </div>
              ))}
            </div>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {/* Your icon here */}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {/* Your icon here */}
                  Back
                </Button>
              }
            />
          </Box>
          <div className='h-full w-1/12 flex flex-col items-start justify-between z-50 bg-transparent'>
            <Typography variant="h5" style={{ textTransform: "uppercase", fontWeight: "bold", letterSpacing: "0.5em" }}>
              {productData.tag}
            </Typography>
            <div className="flex items-start justify-start text-gray-200" style={{ writingMode: "vertical-rl", transform: "rotate(-180deg)" }}>
              <Typography variant='h1' style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                {truncateText(productData.productName)}
              </Typography>
            </div>
          </div>
          <div className='w-6/12 flex flex-col items-start justify-start gap-2 pt-10 p-5'>
            <Typography variant="h4" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              #{productData.id}
            </Typography>
            <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              name
            </Typography>
            <Typography variant="h4" style={{ textTransform: "uppercase", fontWeight: "bold", marginLeft: 20 }}>
              {productData.productName}
            </Typography>
            <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              description
            </Typography>
            <Typography variant="h6" style={{ marginLeft: 20 }}>
              {productData.productDescription}
            </Typography>
            <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              color
            </Typography>
            <div className='ml-4'><ColorSelector colors={selectedColorDetail} defaultColor={selectedColorDetail[0]} func={handelSetDetailsIdFromColor} /></div>
            <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              selected color
            </Typography>
            <Box
              sx={{
                backgroundColor: selectedColorDetail[detailsId],
                height: 50,
                width: 50,
                border: '2px solid black',
                borderRadius: '50%', // Add this property
              }}
            />
            <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              size
            </Typography>
            <div className='ml-4'><HaveSize allSize={productDetail} index={detailsId} setProductSize={setSize} /></div>
            <div className='w-full gap-1 flex flex-row justify-between items-start'>
              <div className='w-3/5 flex flex-col justify-center items-start'>
                <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  note
                </Typography>
                <Typography variant="h6">
                  In the case that you have already purchased clothes from us You can request an exchange only if you ordered the wrong size.
                </Typography>
              </div>
              <div className='w-2/5 flex flex-col justify-center items-start gap-3'>
                <Typography variant="h6" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  PRICE : {productData.productPrice} $
                </Typography>
                <div className='flex flex-row justify-between items-center w-full'>
                  <IconButton aria-label="add to favorites" onClick={() => {
                    fav ? handleDeleteToFavorite() : handleAddToFavorite();
                  }}>
                    {fav ? <FavoriteOutlined style={{ color: 'red', fontSize: 35 }} /> : <FavoriteOutlined style={{ color: 'grey', fontSize: 35 }} />}
                  </IconButton>
                  <Button variant="outlined" className='w-3/4' onClick={handleAddToCart}>ADD TO CART</Button>
                </div>
                <Button variant="contained" className='w-full' onClick={()=>{handleOpenBuy(selectedColorDetail[detailsId],size);}}>BUY NOW</Button>
              </div>
            </div>
          </div>
        </div>)}
      {showCartAlert && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000 // Ensure it is above other elements
        }}>
          <Alert severity="success">Add to cart Successfully</Alert>
        </div>
      )}
      <Dialog
        open={openBuy}
        onClose={handleCloseBuy}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Please check the product details and tell us the quantity you need.`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className='flex flex-col items-start gap-1'>
              <Typography>Name :{productData.productName}</Typography>
              <Typography>Size :{productDetail[detailsId]?.productSizes[size]?.size}</Typography>
              <Typography>Color :{productDetail[detailsId]?.color}</Typography>
              <QuantityInputWrapper>
                    <CustomQuantityButton onClick={handleDecrement}>
                      <Remove />
                    </CustomQuantityButton>
                    <QuantityInputField
                      type='number'
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                    <CustomQuantityButton onClick={handleIncrement}>
                      <Add />
                    </CustomQuantityButton>
                  </QuantityInputWrapper>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBuy} color='error'>Cancel</Button>
          <Button onClick={handleOpenOrder} autoFocus variant='contained'>
            Buy Now
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={order}
        onClose={handleCloseOrder}
        TransitionComponent={Transition}
      >
        <BuyNowOrder onClose={handleCloseOrder} sizeId={productDetail[detailsId]?.productSizes[size]?.product_size_id} amount={quantity} sizeName={productDetail[detailsId]?.productSizes[size]?.size} />
      </Dialog>
    </div>
  );
};

export default ProductPage;
