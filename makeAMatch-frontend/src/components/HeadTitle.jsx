// src/components/HeadTitle.js

import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HeadTitle = ({ title, backPath }) => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(backPath);
    };
  return (
    <div className='mb-20 w-full'>
    <div className="flex flex-row items-center w-full top-0 left-0 h-20 z-50 fixed">
      <button onClick={handleBack} className="mr-4 ml-8 text-gray-700">
        <ArrowBack fontSize="medium" />
      </button>
      <h1 className="text-xl font-bold text-gray-800 ">{title}</h1>
    </div></div>
  );
};

export default HeadTitle;
