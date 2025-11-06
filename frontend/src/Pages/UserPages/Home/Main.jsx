import React from 'react'
import RecentNews from './RecentNews'
import Heading from './Heading'
import { Box, Grid } from '@mui/material'

const Main = () => {
  return (
    <Box sx={{ p: 1, flexGrow: 1 }}>
      <Grid container>
        {/* Left side: RecentNews */}
        <Grid item xs={12} md={7}>
          <RecentNews />
        </Grid>

        {/* Right side: Heading */}
        <Grid item xs={12} md={5}>
          <Heading />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Main