import React, { forwardRef } from 'react'
import { Typography,useTheme } from '@mui/material'

const Header = forwardRef((props, ref) => {
  const theme = useTheme();
  return (
    <div className="top-0 left-0 w-full flex flex-col h-96 z-50 items-center justify-center" ref={ref}>
      <Typography variant="h1" component="h2" sx={{fontWeight:'700'}} color={theme.palette.greyText.main}>
        MAKE A MATCH
      </Typography>
    </div>
  )
})

export default Header