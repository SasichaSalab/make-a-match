import React, { forwardRef, useState, useEffect } from 'react'
import HeadTitle from '../components/HeadTitle'
import { useParams } from 'react-router-dom'
import { Typography, Button, Dialog, styled, Slide, Alert, Box, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@mui/material'
import EditMatch from '../components/EditMatch'
import { useNavigate } from 'react-router-dom'
import { getMatchByIdApi } from '../api'
import HaveSize from '../components/HaveSize'
import ColorSelector from '../components/ColorSelector'
import { Add, Remove } from '@mui/icons-material'
import { addToCartApi } from '../api'
import UserOrder from '../components/UserOrder'
import BuyByMatch from '../components/BuyByMatch'
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

const Match = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [openEdit, setOpenEdit] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [matchData, setMatchData] = useState(null)
  const [matchDetails, setMatchDetails] = useState(null)
  const [allSize, setAllSize] = useState([]);
  const [details, setDetails] = useState(null)
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [colors, setColors] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [data, setData] = useState([]);
  const handelSetDetailsIdFromColor = (groupIndex, colorIndex) => {
    setSelectedIndexes(prevIndexes => {
      const newIndexes = [...prevIndexes];
      newIndexes[groupIndex] = colorIndex;
      return newIndexes;
    });
  };
  const handleQuantityChange = (event, groupIndex) => {
    const value = parseInt(event.target.value, 10);
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[groupIndex] = value > 0 ? value : 1;
      return newQuantities;
    });
  };

  const handleIncrement = (groupIndex) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[groupIndex] += 1;
      return newQuantities;
    });
  };

  const handleDecrement = (groupIndex) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[groupIndex] = Math.max(newQuantities[groupIndex] - 1, 1);
      return newQuantities;
    });
  };
  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }
  const handleCloseCart = () => {
    setOpenCart(false)
  }
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    handleShowAlert();
    setTimeout(() => {
      setShowAlert(false);
      navigate('/matches')
    }, 3000);
    setOpenDelete(false);
  };
  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
  };
  const [showBuyAlert, setShowBuyAlert] = useState(false);
  const handleShowBuyAlert = () => {
    setShowBuyAlert(true);
  };
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const handleShowSuccessAlert = () => {
    setShowSuccessAlert(true);
  };
  const fetchData = async () => {
    try {
      const products = await getMatchByIdApi(id);
      setMatchData(products);
      setMatchDetails(products.details)
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleOpenCart = async () => {
    try {
      // Fetch matchProductSize for all matchDetails
      const matchProductSizePromises = matchDetails.map(detail => detail.matchProductSize);
      const matchProductSize = await Promise.all(matchProductSizePromises);

      // Fetch details for each matchProductSize
      const detailsPromises = matchProductSize.map(mps => mps.details);
      const detail = await Promise.all(detailsPromises);
      setDetails(detail)
      const extractedColors = detail.map(detailGroup =>
        detailGroup.map(detail => detail.color)
      );
      setColors(extractedColors);
      const initialIndexes = detail.map(detailGroup => 0);
      setSelectedIndexes(initialIndexes);
      const initialQuantities = detail.map(() => 1);
      setQuantities(initialQuantities);
      const initialSize = detail.map(() => 0);
      setSize(initialSize);
      setOpenCart(true)
    } catch (error) {
      console.error('Error fetching sizes:', error);
    }
  };
  const [size, setSize] = useState(null);
  const [sizeIndexIndexCart, setSizeIndexCart] = useState(null);
  const handleAddToCart = async () => {
    for (let i = 0; i < details.length; i++) {
      const productData = { detailId: details[i][selectedIndexes[i]].productSizes[size[i]].product_size_id, amount: quantities[i] }
      try {
        const products = await addToCartApi(productData);
        console.log(products);
        handleShowSuccessAlert();
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
        handleCloseCart();
      } catch (error) {
        console.error('Error add to cart:', error);
      }
    }
  }

  // Define the wrapper function
  const setSizeForIndex = (sizeIndex, detailIndex) => {
    setSize(prevSize => {
      const newSize = [...prevSize]; // Create a copy of the previous size array
      newSize[detailIndex] = sizeIndex; // Update the size at the specified index
      return newSize; // Return the new size array
    });
  };
  const [order, setOrder] = useState(false)
  const [name, setName] = useState([])
  const handleOpenOrder = async () => {
    try {
      let formattedData = []; // Initialize an empty array to store the formatted data
      let formattedImage = [];
      for (let i = 0; i < details?.length; i++) {
        const productData = {
          productSizeId: details[i][selectedIndexes[i]].productSizes[size[i]].product_size_id,
          quantity: quantities[i]
        };
        formattedData.push(productData); // Push the product data into the array
        formattedImage.push(details[i][selectedIndexes[i]].productSizes[size[i]].size)
      }

      // Construct the final object
      const finalData = {
        details: formattedData,
        slip_image: "" // Add the slip_image property here if needed
      };
      setData(finalData)
      setName(formattedImage)
      setOrder(true)
    } catch (error) {
      console.error("Error in handleOpenOrder: ", error);
    }
  };
  const handleCloseOrder = () => {
    setOrder(false)
  }
  return (

    <div className='top-0 left-0 w-full min-h-screen flex flex-col items-center justify-start bg-slate-100'>
      <HeadTitle title={`Match ID : ${id}`} backPath={"/matches"} />
      <div className='w-11/12 h-full flex flex-row items-start justify-start'>
        <div className='w-full h-full flex flex-row items-start justify-between gap-4 z-10 fixed'>
          <div className='w-4/12 flex flex-col items-start justify-start gap-4 z-10'>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {matchData?.name}
            </Typography>
            <Typography variant="h7" sx={{ fontWeight: 'bold', marginTop: 2 }}>
              DESCRIPTION
            </Typography>
            <Typography variant="h7">
              {matchData?.description}
            </Typography>
            <Button variant='outlined' onClick={handleOpenEdit}>EDIT THIS MATCH</Button>
          </div>
          <div className='w-3/12 h-full flex flex-col items-start justify-between pb-28'>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              MATCHED LOOK
            </Typography>
            <div className='w-4/5 flex flex-col items-start justify-between gap-2'>
              <Button variant='outlined' sx={{ width: '100%' }} onClick={handleOpenCart}>ADD ALL TO CART</Button>
              <Button variant='contained' sx={{ width: '100%' }} onClick={handleOpenCart}>BUY NOW</Button>
            </div>
          </div>
        </div>
        <div className='w-6/12 h-screen flex flex-col items-start justify-start gap-4 z-0 fixed ml-80 top-0 left-0'>
          <div className='w-full h-full rounded-full overflow-hidden bg-gray-200'></div>
        </div>
        <div className='w-3/12 h-5'></div>
        <div className='w-6/12 flex flex-wrap items-center justify-center z-0'>
          {matchDetails?.map((item, index) => (
            <div key={index} className="p-1">
              <img
                src={`data:image/png;base64,${item?.matchProductSize?.details?.[0]?.product_image}`}
                alt={`match ${index + 1}`}
                className="object-cover max-h-60"
              />
            </div>
          ))}
        </div>
      </div>
      <Dialog
        fullScreen
        open={openEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <EditMatch onClose={handleCloseEdit} id={id} />
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this product?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please make sure before deleting as the item cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleCloseDelete} autoFocus color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {showAlert && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000 // Ensure it is above other elements
        }}>
          <Alert severity="success">Delete Successful</Alert>
        </div>
      )}
      {showSuccessAlert && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000 // Ensure it is above other elements
        }}>
          <Alert severity="success">Add To Cart Successful</Alert>
        </div>
      )}
      {showBuyAlert && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000 // Ensure it is above other elements
        }}>
          <Alert severity="success">Already bought</Alert>
        </div>
      )}
      <Dialog
        open={openCart}
        onClose={handleCloseCart}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select color and size to add to your cart"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {details?.map((detailGroup, index) => {
              return (<div key={index} className='flex flex-row items-start gap-2 mb-3'>
                <img style={{ height: '150px' }} src={`data:image/png;base64,${detailGroup[selectedIndexes[index]].product_image}`} alt="Your Image" />
                <div className='flex flex-col items-start gap-2 mb-3'>
                  <ColorSelector
                    colors={colors[index]}
                    defaultColor={colors[index][selectedIndexes[0]]}
                    func={(colorIndex) => { handelSetDetailsIdFromColor(index, colorIndex); setSizeForIndex(0, index); }}
                  />
                  <div className='flex flex-row items-center gap-4'>
                    <Typography style={{ textTransform: "uppercase", fontWeight: "bold", fontSize: 10 }}>
                      selected color
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: colors[index][selectedIndexes[index]],
                        height: 20,
                        width: 50,
                        border: '2px solid black',
                      }}
                    /></div>
                  <HaveSize
                    allSize={detailGroup}
                    index={selectedIndexes[index]}
                    setProductSize={(sizeIndex) => setSizeForIndex(sizeIndex, index)}
                  />
                  <QuantityInputWrapper>
                    <CustomQuantityButton onClick={() => handleDecrement(index)}>
                      <Remove />
                    </CustomQuantityButton>
                    <QuantityInputField
                      type='number'
                      value={quantities[index]}
                      onChange={(event) => handleQuantityChange(event, index)}
                    />
                    <CustomQuantityButton onClick={() => handleIncrement(index)}>
                      <Add />
                    </CustomQuantityButton>
                  </QuantityInputWrapper>
                </div></div>)
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCart} color='error'>Cancel</Button>
          <Button onClick={handleAddToCart} autoFocus variant='contained'>
            Add to cart
          </Button>
          <Button onClick={handleOpenOrder} autoFocus variant='contained'>
            Buy
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={order}
        onClose={handleCloseOrder}
        TransitionComponent={Transition}
      >
        <BuyByMatch onClose={handleCloseOrder} dataa={data} sizeName={name} />
      </Dialog>
    </div>
  )
}

export default Match