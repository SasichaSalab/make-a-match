import React, { useEffect, useState } from 'react';
import { Typography, Button, Chip, useMediaQuery } from '@mui/material';
import { ShoppingBasket, CurrencyExchange, HourglassTop, LocalShipping, CheckCircle, Cancel, ShoppingBag, ShoppingCart } from '@mui/icons-material';
import { getUserCount } from '../api';
const CartNavBar = ({ selectedTab, setSelectedTab, handleLogout }) => {
  const [count, setCount] = useState(null)
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const handleCount = async () => {
    try {
      const count = await getUserCount();
      console.log(count)
      setCount(count)
    } catch (error) {
      console.error('Error loading count:', error);
    }
  };
  useEffect(() => {
    handleCount()
  }, [])
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const isSmallNav = useMediaQuery('(max-width:1200px)');
  return (
    <div className="w-full h-full items-center flex flex-col justify-start bg-white rounded-lg p-2 gap-2">
      <div className="w-full items-center flex flex-col justify-start bg-white rounded-lg">
        <div className='flex flex-row w-full items-center justify-between'>
          <div className='flex flex-row items-center gap-3'>
            <ShoppingBasket />
            {isSmallScreen ? "" :
              <Typography variant="h6" component="h7" sx={{ fontWeight: 'bold' }}>
                MY Cart
              </Typography>}
          </div>
        </div>
        <div className='pl-4 w-full mt-1 space-y-2'>
          <Button
            sx={{ width: '100%' }}
            variant={selectedTab === 'cart' ? 'contained' : 'text'}
            onClick={() => handleTabChange('cart')}
          >
            <div className='flex flex-row items-center justify-start gap-3 w-full'>
              <ShoppingCart />
              {isSmallNav ? "" :
                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                  Cart
                </Typography>}
            </div>
            {count?.cart > 0 && (
                <Chip label={count?.cart} color="primary" sx={{ fontSize: 10 }} />
              )}
          </Button>
        </div>
      </div>
      <div className="w-full h-full items-center flex flex-col justify-start bg-white rounded-lg">
        <div className='flex flex-row w-full items-center justify-between'>
          <div className='flex flex-row items-center gap-3'>
            <ShoppingBag />
            {isSmallScreen ? "" :
              <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
                MY Order
              </Typography>}
          </div>
        </div>
        <div className='pl-4 w-full mt-1 space-y-2'>
          <Button
            sx={{ width: '100%' }}
            variant={selectedTab === 'waiting_order' ? 'contained' : 'text'}
            onClick={() => handleTabChange('waiting_order')}
          >
            <div className='flex flex-row items-center justify-between w-full'>
              <div className='flex flex-row items-center gap-3'>
                <HourglassTop />
                {isSmallNav ? "" :
                  <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    Watting Order
                  </Typography>}
              </div>
              {count?.waiting_order > 0 && (
                <Chip label={count?.waiting_order} color="primary" sx={{ fontSize: 10 }} />
              )}
            </div>
          </Button>
          <Button
            sx={{ width: '100%' }}
            variant={selectedTab === 'sending_order' ? 'contained' : 'text'}
            onClick={() => handleTabChange('sending_order')}
          >
            <div className='flex flex-row items-center justify-between w-full'>
              <div className='flex flex-row items-center gap-3'>
                <LocalShipping />
                {isSmallNav ? "" :
                  <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    Sending Order
                  </Typography>}
              </div>
              {count?.sending_order > 0 && (
                <Chip label={count?.sending_order} color="primary" sx={{ fontSize: 10 }} />
              )}
            </div>
          </Button>
          <Button
            sx={{ width: '100%' }}
            variant={selectedTab === 'success_order' ? 'contained' : 'text'}
            onClick={() => handleTabChange('success_order')}
          >
            <div className='flex flex-row items-center justify-between w-full'>
              <div className='flex flex-row items-center gap-3'>
                <CheckCircle />
                {isSmallNav ? "" :
                  <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    Success Order
                  </Typography>}
              </div>
            </div>
          </Button>
          <Button
            sx={{ width: '100%' }}
            variant={selectedTab === 'canceled_order' ? 'contained' : 'text'}
            onClick={() => handleTabChange('canceled_order')}
          >
            <div className='flex flex-row items-center justify-between w-full'>
              <div className='flex flex-row items-center gap-3'>
                <Cancel />
                {isSmallNav ? "" :
                  <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    Canceled Order
                  </Typography>}
              </div>
            </div>
          </Button></div></div>
      <div className="w-full h-full items-center flex flex-col justify-start bg-white rounded-lg">
        <div className='flex flex-row w-full items-center justify-between'>
          <div className='flex flex-row items-center gap-3'>
            <CurrencyExchange />
            {isSmallScreen ? "" :
              <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
                Refund
              </Typography>}
          </div>
        </div>
        <div className='pl-4 w-full mt-1 space-y-2'>
          <Button
            sx={{ width: '100%' }}
            variant={selectedTab === 'waiting_refund' ? 'contained' : 'text'}
            onClick={() => handleTabChange('waiting_refund')}
          >
            <div className='flex flex-row items-center justify-between w-full'>
              <div className='flex flex-row items-center gap-3'>
                <HourglassTop />
                {isSmallNav ? "" :
                  <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    Waiting Refund
                  </Typography>}
              </div>
              {count?.waiting_refund> 0 && (<Chip label={count?.waiting_refund} color="primary" sx={{ fontSize: 10 }} />
              )}
            </div>
          </Button>
          <Button
            sx={{ width: '100%' }}
            variant={selectedTab === 'success_refund' ? 'contained' : 'text'}
            onClick={() => handleTabChange('success_refund')}
          >
            <div className='flex flex-row items-center justify-between w-full'>
              <div className='flex flex-row items-center gap-3'>
                <CheckCircle />
                {isSmallNav ? "" :
                  <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    Success Refund
                  </Typography>}
              </div>
            </div>
          </Button>
          <Button
            sx={{ width: '100%' }}
            variant={selectedTab === 'canceled_refund' ? 'contained' : 'text'}
            onClick={() => handleTabChange('canceled_refund')}
          >
            <div className='flex flex-row items-center justify-between w-full'>
              <div className='flex flex-row items-center gap-3'>
                <Cancel />
                {isSmallNav ? "" :
                  <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                    Canceled Refund
                  </Typography>}
              </div>
            </div>
          </Button></div></div>
      <Button variant='contained' onClick={handleLogout} sx={{ fontSize: 11, width: '100%' }}>
        Logout
      </Button>
    </div>
  );
};

export default CartNavBar;
