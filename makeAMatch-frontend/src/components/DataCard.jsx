import React, { useState, forwardRef } from 'react'
import { Card, Box, CardContent, Typography, IconButton, CardMedia, Dialog, Slide, Alert, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EditMatch from './EditMatch';
import { deleteMatchApi } from '../api';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DataCard = ({ id, image, name, description,fetchData }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const navigate = useNavigate();
  const handleMatch = (mid) => [
    navigate(`/match/${mid}`)
  ]
  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    handleShowAlert();
    setTimeout(() => {
      fetchData();
      setShowAlert(false);
    }, 3000);
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleDeleteMatch = async () => {
    try {
      await deleteMatchApi(id); // Delete the match
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };
  

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex flex-row items-start justify-end h-0'>
        <IconButton onClick={handleOpenEdit}><Edit /></IconButton>
        <IconButton onClick={handleOpenDelete}><Delete /></IconButton>
      </div>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }} onClick={() => handleMatch(id)}>
        <CardMedia
          component="img"
          sx={{ width: 150, height: 'auto', objectFit: 'cover' }} // Adjust height as needed
          image={`data:image/png;base64,${image}`}
          alt="Product Image"
        />
        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 3, width: { xs: '100%', sm: 'auto' } }}>
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Dialog
        fullScreen
        open={openEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <EditMatch onClose={handleCloseEdit} id={id} fetchMatchData={fetchData}/>
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
          <Button onClick={handleDeleteMatch} autoFocus color='error'>
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
    </div>
  );
}

export default DataCard;
