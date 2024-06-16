import React, { useState,useEffect } from 'react'
import { Avatar, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom';
import DashBoard from '../components/DashBoard'
import ManageProduct from '../components/ManageProduct'
import ConfirmOrder from '../components/ConfirmOrder'
import ConfirmRefund from '../components/ConfirmRefund'
import ConfirmNewAdmin from '../components/ConfirmNewAdmin';
import AdminNavBar from '../components/AdminNavBar';
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
const HomeAdmin = ({ section }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(section);
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setSelectedTab(path);
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    navigate(`/admin/${tab}`);
  };

  const handleLogout = () => {
    navigate('/');
  };


  const renderComponent = () => {
    switch (selectedTab) {
      case 'dashboard':
        return <DashBoard />;
      case 'admin':
        return <ConfirmNewAdmin />; // Replace with your actual Admin component
      case 'product':
        return <ManageProduct />;
      case 'order':
        return <ConfirmOrder />;
      case 'refund':
        return <ConfirmRefund />;
      default:
        return <DashBoard />;
    }
  };

  return (
    <div className='flex flex-col h-screen w-full justify-start bg-slate-200'>
      <div className='flex flex-row items-start justify-between m-2 gap-3 h-full '>
        <div className="w-1/5 items-center flex flex-col justify-center gap-3 min-w-28">
          <AdminNavBar selectedTab={selectedTab} setSelectedTab={handleTabChange} handleLogout={handleLogout} />
        </div>
        <div className='w-4/5 bg-white rounded-lg p-4  min-w-96'>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;