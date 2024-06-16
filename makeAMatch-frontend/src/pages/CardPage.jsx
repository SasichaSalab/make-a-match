import React, { useState,useEffect } from 'react'
import { Avatar, Typography ,useMediaQuery} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom';
import Cart from '../components/Cart';
import WaitingOrder from '../components/WaitingOrder'
import SendingOrder from '../components/SendingOrder'
import SuccessOrder from '../components/SuccessOrder'
import CanceledOrder from '../components/CanceledOrder'
import WaitingRefund from '../components/WaitingRefund'
import SuccessRefund from '../components/SuccessRefund'
import CanceledRefund from '../components/CanceledRefund'
import CartNavBar from '../components/CartNavBar';
import HeadTitle from '../components/HeadTitle';
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
const CartPage = ({ section }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(section);
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setSelectedTab(path);
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    navigate(`/order/${tab}`);
  };

  const handleLogout = () => {
    navigate('/');
  };


  const renderComponent = () => {
    switch (selectedTab) {
      case 'cart':
        return <Cart/>
      case 'waiting_order':
        return <WaitingOrder/>; // Replace with your actual Admin component
      case 'sending_order':
        return <SendingOrder />;
      case 'success_order':
        return <SuccessOrder />;
      case 'canceled_order':
        return <CanceledOrder />;
        case 'waiting_refund':
        return <WaitingRefund />; // Replace with your actual Admin component
      case 'success_refund':
        return <SuccessRefund />;
      case 'canceled_refund':
        return <CanceledRefund />;
      default:
        return <Cart />;
    }
  };
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  return (
    <div className='flex flex-col w-full justify-start bg-slate-200 min-h-screen'>
      <HeadTitle backPath={'/'}/>
      <div className='flex flex-row items-start justify-between m-2 gap-3 h-full -mt-4'>
        <div className={`h-screen items-start flex flex-col justify-start gap-3 min-w-28 fixed w-1/5`}>
          <div className="w-full h-4/5 items-center flex flex-row justify-start rounded-lg gap-3">
          <CartNavBar selectedTab={selectedTab} setSelectedTab={handleTabChange} handleLogout={handleLogout} /></div>
        </div>
        <div className='w-1/5 rounded-lg p-4 min-w-28'></div>
        <div className='w-4/5 bg-white rounded-lg p-4 min-w-64'>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default CartPage;