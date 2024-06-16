import React, { useState, useEffect } from 'react'
import { Typography, useMediaQuery } from '@mui/material'
import { AutoGraph, GroupAdd, StackedBarChart } from '@mui/icons-material';
import { Gauge, BarChart } from '@mui/x-charts';
import { getProductSum, getProductSumAll } from '../api'

const DashBoard = () => {
  const props = {
    width: 800,
    height: 300,
    xAxis: [{ data: ['HAT', 'SHIRT', 'PANTS', 'SHOES'], scaleType: 'band' }],
  };
  const [countAll, setCountAll] = useState(null)
  const [countShirt, setCountShirt] = useState(null)
  const [countShoes, setCountShoes] = useState(null)
  const [countPants, setCountPants] = useState(null)
  const [countHat, setCountHat] = useState(null)
  const handleCount = async () => {
    try {
      const all = await getProductSumAll();
      const shirt = await getProductSum('shirt');
      const shoes = await getProductSum('shoes');
      const pants = await getProductSum('pants');
      const hat = await getProductSum('hat');
      setCountAll(all)
      setCountShirt(shirt)
      setCountShoes(shoes)
      setCountPants(pants)
      setCountHat(hat)
    } catch (error) {
      console.error('Error loading count:', error);
    }
  };
  useEffect(() => {
    handleCount()
  }, [])
  const isSmallScreen = useMediaQuery('(max-width:1100px)');
  return (
    <div className="w-full items-center flex flex-col justify-center gap-3">
      <div className="w-full items-center flex flex-row justify-center gap-3">
        <div className="w-full items-start flex flex-col justify-between bg-white rounded-lg p-3">
          <div className='w-1/5 flex flex-row items-center text-center gap-3'>
            <div className='w-1/5 flex flex-row items-center text-center gap-3'>
              <AutoGraph />
              <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
                SALES
              </Typography>
            </div>
          </div>
          <div className="w-full border-t border-gray-400 my-1 opacity-60"></div>
          <div className={`w-full items-center flex ${isSmallScreen ? 'flex-col' : 'flex-row'} justify-center gap-3`}>
            <div className="w-3/4 items-center flex flex-row justify-center bg-white rounded-lg mt-3">
              <div className='w-full flex flex-col items-center justify-center text-center'>
                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                  ALL
                </Typography>
                <Typography variant="h8" component="h4">
                  Sales are {countAll} pieces
                </Typography>
                <Gauge width={150} height={150} value={countAll / 30} />
                <Typography variant="h8" component="h4">
                  pieces / month
                </Typography>
              </div>
            </div>
            <div className="w-3/4 items-center flex flex-row justify-center bg-white rounded-lg mt-3">
              <div className='w-full flex flex-col items-center justify-center text-center'>
                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                  HAT
                </Typography>
                <Typography variant="h8" component="h4">
                  Sales are {countHat} pieces
                </Typography>
                <Gauge width={150} height={150} value={countHat / 30} />
                <Typography variant="h8" component="h4">
                  pieces / month
                </Typography>
              </div>
            </div>
            <div className="w-3/4 items-center flex flex-row justify-center bg-white rounded-lg mt-3">
              <div className='w-full flex flex-col items-center justify-center text-center'>
                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                  SHIRT
                </Typography>
                <Typography variant="h8" component="h4">
                  Sales are {countShirt} pieces
                </Typography>
                <Gauge width={150} height={150} value={countShirt / 30} />
                <Typography variant="h8" component="h4">
                  pieces / month
                </Typography>
              </div>
            </div>
            <div className="w-3/4 items-center flex flex-row justify-center bg-white rounded-lg mt-3">
              <div className='w-full flex flex-col items-center justify-center text-center'>
                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                  PANTS
                </Typography>
                <Typography variant="h8" component="h4">
                  Sales are {countPants} pieces
                </Typography>
                <Gauge width={150} height={150} value={countPants / 30} />
                <Typography variant="h8" component="h4">
                  pieces / month
                </Typography>
              </div>
            </div>
            <div className="w-3/4 items-center flex flex-row justify-center bg-white rounded-lg mt-3">
              <div className='w-full flex flex-col items-center justify-center text-center'>
                <Typography variant="h7" component="h4" sx={{ fontWeight: 'bold' }}>
                  SHOES
                </Typography>
                <Typography variant="h8" component="h4">
                  Sales are {countShoes} pieces
                </Typography>
                <Gauge width={150} height={150} value={countShoes / 30} />
                <Typography variant="h8" component="h4">
                  pieces / month
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full items-center flex flex-col justify-center bg-white rounded-lg p-2">
        <div className='w-full flex flex-row items-center text-center gap-3'>
          <StackedBarChart />
          <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
            Graph of sales
          </Typography>
        </div>
        <div className="w-full items-center border-t border-gray-400 my-2 opacity-60"></div>
        <div style={{ width: '100%', height: 300 }}>
            <BarChart
              {...props}
              series={[
                {
                  data: [countHat, countShirt, countPants, countShoes],
                  label: 'label 1',
                  color: 'primary', // Change the color here
                },
              ]}
            />
        </div>
      </div>
    </div>
  )
}

export default DashBoard
