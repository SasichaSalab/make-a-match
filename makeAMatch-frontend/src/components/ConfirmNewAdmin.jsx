import React, { useState, forwardRef, useEffect } from 'react';
import { Button, Dialog, Slide, Typography, Chip, Box } from '@mui/material';
import AddAdmin from './AddAdmin';
import Pagination from './Pagination';
import { DataGrid } from '@mui/x-data-grid';
import { getAllAdminByRole, getAllUser, getAllUserByRole } from '../api';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 110,
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Address',
        sortable: false,
        width: 500,
    },
];

const ConfirmNewAdmin = () => {
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('all');
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            let data;
            if (selectedRole === 'user') {
                data = await getAllUserByRole();
            } else if (selectedRole === 'admin') {
                data = await getAllAdminByRole();
            } else {
                data = await getAllUser();
            }
            console.log(data)
            setUserData(data);
        } catch (error) {
            console.error('Error setting data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [selectedRole]);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = userData.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='w-full bg-slate-200 flex items-center justify-center p-2'>
            <div className="w-full items-start flex flex-col justify-center bg-white rounded-lg p-2">
                <div className='w-full flex flex-row items-center justify-between text-center gap-3'>
                    <div className='w-full flex flex-row items-center text-center gap-3'>
                        <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
                            List of Members
                        </Typography>
                    </div>
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        color="primary"
                        sx={{ width: 200 }}
                    >
                        Add New Admin
                    </Button>
                </div>
                <div className="w-full items-center border-t border-gray-400 my-2 opacity-60"></div>
                <div className="w-full items-center flex flex-row justify-start rounded-lg mb-3 self-center gap-3">
                    <Chip
                        label="All"
                        value='all'
                        color="primary"
                        sx={{ fontSize: 15 }}
                        onClick={() => setSelectedRole('all')}
                        variant={selectedRole === 'all' ? 'contained' : 'outlined'}
                    />
                    <Chip
                        label="User"
                        value='user'
                        color="primary"
                        sx={{ fontSize: 15 }}
                        onClick={() => setSelectedRole('user')}
                        variant={selectedRole === 'user' ? 'contained' : 'outlined'}
                    />
                    <Chip
                        label="Admin"
                        value='admin'
                        color="primary"
                        sx={{ fontSize: 15 }}
                        onClick={() => setSelectedRole('admin')}
                        variant={selectedRole === 'admin' ? 'contained' : 'outlined'}
                    />
                </div>
                <div className="w-full items-center flex flex-col justify-center bg-white rounded-lg self-center h-full">
                    <div className='w-full h-full'>
                        <div className='flex flex-col items-center'>
                            <Box sx={{ width: '100%' }}>
                                {loading ? (
                                    <Typography>Loading...</Typography>
                                ) : (
                                    <DataGrid
                                        rows={currentPosts}
                                        columns={columns}
                                        pageSize={postsPerPage}
                                        disableSelectionOnClick
                                        hideFooterPagination
                                    />
                                )}
                            </Box>
                        </div>
                    </div>
                    <Pagination
                        totalPost={userData.length}
                        postPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AddAdmin onClose={handleClose} />
            </Dialog>
        </div>
    );
};

export default ConfirmNewAdmin;
