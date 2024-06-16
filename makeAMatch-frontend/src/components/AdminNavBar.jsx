import React, { useState, useEffect } from 'react';
import { Typography, Button, Chip, useMediaQuery } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { FormatListBulleted, LineAxis, PersonAddAlt1, ShoppingBasket, ProductionQuantityLimits, CurrencyExchange } from '@mui/icons-material';
import { getAdminCount } from '../api';
const AdminNavBar = ({ selectedTab, setSelectedTab, handleLogout }) => {
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const [count, setCount] = useState(null)
  const handleCount = async () => {
    try {
      const count = await getAdminCount();
      console.log(count)
      setCount(count)
    } catch (error) {
      console.error('Error loading count:', error);
    }
  };
  useEffect(() => {
    handleCount()
  }, [])
  const { logout } = useAuth();
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  return (
    <div className="w-full h-full items-center flex flex-col justify-start bg-white rounded-lg p-2 py-5">
      <div className='flex flex-row w-full items-center justify-between'>
        <div className='flex flex-row items-center gap-3'>
          <FormatListBulleted />
          {isSmallScreen ? "" :
            <Typography variant="h6" component="h7" sx={{ fontWeight: 'bold' }}>
              Task
            </Typography>}
        </div>
      </div>
      <div className='pl-4 w-full mt-4 space-y-4'>
        <Button
          sx={{ width: '100%' }}
          variant={selectedTab === 'dashboard' ? 'contained' : 'text'}
          onClick={() => handleTabChange('dashboard')}
        >
          <div className='flex flex-row items-center justify-start gap-3 w-full'>
            <LineAxis />
            {isSmallScreen ? "" :
              <Typography variant="h8" component="h7" sx={{ fontWeight: 'bold' }}>
                Dashboard
              </Typography>}
          </div>
        </Button>
        <Button
          sx={{ width: '100%' }}
          variant={selectedTab === 'admin' ? 'contained' : 'text'}
          onClick={() => handleTabChange('admin')}
        >
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-row items-center gap-3'>
              <PersonAddAlt1 />
              {isSmallScreen ? "" :
              <Typography variant="h8" component="h7" sx={{ fontWeight: 'bold' }}>
                New admin
              </Typography>}
            </div>
          </div>
        </Button>
        <Button
          sx={{ width: '100%' }}
          variant={selectedTab === 'product' ? 'contained' : 'text'}
          onClick={() => handleTabChange('product')}
        >
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-row items-center gap-3'>
              <ShoppingBasket />
              {isSmallScreen ? "" :
              <Typography variant="h8" component="h7" sx={{ fontWeight: 'bold' }}>
                Product Management
              </Typography>}
            </div>
          </div>
        </Button>
        <Button
          sx={{ width: '100%' }}
          variant={selectedTab === 'order' ? 'contained' : 'text'}
          onClick={() => handleTabChange('order')}
        >
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-row items-center gap-3'>
              <ProductionQuantityLimits />
              {isSmallScreen ? "" :
              <Typography variant="h8" component="h7" sx={{ fontWeight: 'bold' }}>
                Order Confirmation
              </Typography>}
            </div>
            {count?.order > 0 && (
              <Chip label={count?.order} color="primary" sx={{ fontSize: 10 }} />
            )}
          </div>
        </Button>
        <Button
          sx={{ width: '100%' }}
          variant={selectedTab === 'refund' ? 'contained' : 'text'}
          onClick={() => handleTabChange('refund')}
        >
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-row items-center gap-3'>
              <CurrencyExchange />
              {isSmallScreen ? "" :
              <Typography variant="h8" component="h7" sx={{ fontWeight: 'bold' }}>
                Refund Confirmation
              </Typography>}
            </div>
            {count?.refund > 0 && (
              <Chip label={count?.refund} color="primary" sx={{ fontSize: 10 }} />
            )}
          </div>
        </Button>
        <Button variant='contained' onClick={logout} sx={{ fontSize: 10, width: '100%' }}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminNavBar;
