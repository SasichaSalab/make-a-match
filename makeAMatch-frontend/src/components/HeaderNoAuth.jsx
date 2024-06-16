import React, { forwardRef } from 'react'
import { Button, Typography,useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const HeaderNoAuth = forwardRef((props, ref) => {
  const theme = useTheme();
  const navigate=useNavigate()
  const handleLogin=()=>{
    navigate('/login')
  }
  const handleRegister=()=>{
    navigate('/register')
  }
  return (
    <div className="top-0 left-0 w-full flex flex-col h-96 z-50 items-center justify-center gap-10" ref={ref}>
      <Typography variant="h1" component="h2" sx={{fontWeight:'700'}} color={theme.palette.greyText.main}>
        MAKE A MATCH
      </Typography>
      <div className='w-full flex flex-row gap-5 justify-center items-center'>
        <Button variant='contained' onClick={handleLogin}>Login</Button>
        <Button variant='outlined' onClick={handleRegister}>Register</Button>
      </div>
    </div>
  )
})

export default HeaderNoAuth