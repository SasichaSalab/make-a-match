import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Slide, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Pagination from './Pagination';  // Ensure you have the Pagination component
import { getAdminRefundApi, adminConfirmRefund, adminCancelRefund } from '../api';  // Replace with your actual API call

const columns = (handleConfirm, handleCancel, handleRowClick) => [
  { field: 'orderId', headerName: 'Order ID', width: 90 },
  { field: 'totalPrice', headerName: 'Price', width: 150, editable: true },
  {
    field: 'slip_image',
    headerName: 'Slip Image',
    width: 150,
    renderCell: (params) => (
      <img src={`data:image/png;base64,${params.value}`} alt="slip" style={{ height: '100%', objectFit: 'contain' }} />
    ),
  },
  { field: 'orderDate', headerName: 'Date', width: 150, editable: true },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: 300,
    renderCell: (params) => (
      <div className='w-full h-full gap-2 flex flex-row items-center justify-center'>
        <Button variant="contained" color="primary" size="small" onClick={() => handleConfirm(params.row.orderId)}>
          Confirm
        </Button>
        <Button variant="contained" color="error" size="small" onClick={() => handleCancel(params.row.orderId)}>
          Reject
        </Button>
        <Button variant="contained" color="error" size="small" onClick={() => handleRowClick(params.row)}>
          Open Data
        </Button>
      </div>
    ),
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmRefund = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const fetchData = async () => {
    setLoading(true);
    setPostsPerPage(7);
    try {
      const orders = await getAdminRefundApi();
      setUserData(orders);
      setLoading(false);
    } catch (error) {
      console.error('Error setting data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchData();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await adminConfirmRefund(id);
      setAlertMessage('Order confirmed successfully');
      setAlertSeverity('success');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds
      // Fetch data again
      fetchData();
    } catch (error) {
      console.error('Error confirming order:', error);
      setAlertMessage('Failed to confirm order');
      setAlertSeverity('error');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds
    }
  };

  const handleCancel = async (id) => {
    try {
      await adminCancelRefund(id);
      setAlertMessage('Order rejected successfully');
      setAlertSeverity('success');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds
      // Fetch data again
      fetchData();
    } catch (error) {
      console.error('Error rejecting order:', error);
      setAlertMessage('Failed to reject order');
      setAlertSeverity('error');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = userData.slice(firstPostIndex, lastPostIndex);

  const handleRowClick = (index) => {
    setSelectedRowData(index);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const mappedPosts = currentPosts.map((post, index) => ({
    ...post,
    id: post.orderId || index, // Ensure there's an id field for DataGrid
  }));

  return (
    <div className='w-full bg-slate-200 flex items-center justify-center p-2 h-11/12'>
      <div className="w-full items-start flex flex-col justify-center bg-white rounded-lg p-2 h-full">
        <div className='w-full flex flex-row items-center justify-between text-center gap-3'>
          <div className='w-full flex flex-row items-center text-center gap-3'>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              Confirm Order
            </Typography>
          </div>
        </div>
        <div className="w-full items-center border-t border-gray-400 my-2 opacity-60"></div>
        <div className="w-full items-center flex flex-col justify-center bg-white rounded-lg self-center h-full">
          {showAlert && (
            <div style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              zIndex: 1000 // Ensure it is above other elements
            }}>
              <Alert severity={alertSeverity}>{alertMessage}</Alert>
            </div>
          )}
          <div className='w-full h-full'>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className='flex flex-col items-center'>
                <Box sx={{ width: '100%' }}>
                  <DataGrid
                    rows={mappedPosts}
                    columns={columns(handleConfirm, handleCancel, handleRowClick)}
                    pageSize={postsPerPage}
                    pagination={false} // Disable pagination
                    disableSelectionOnClick
                    hideFooterPagination // Hide the pagination footer
                  />
                </Box>
              </div>
            )}
          </div>
          <Pagination totalPost={userData.length} postPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
      </div>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Order Details"}</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <Typography>Order ID: {selectedRowData?.orderId}</Typography>
          <Typography>Price: {selectedRowData?.totalPrice}</Typography>
          <Typography>Date: {selectedRowData?.orderDate}</Typography>
          <img src={`data:image/png;base64,${selectedRowData?.slip_image}`} alt="slip" style={{ width: '100%', objectFit: 'contain' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmRefund;
