import { useState } from 'react'
import { Grid, IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import ZoomInMapOutlinedIcon from '@mui/icons-material/ZoomInMapOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'

import PageWrapper from '@src/components/shared/Page/PageWrapper'
import New from './components/New'
import Map from './components/Map'

type TOpenType = '00' | '01' | '10'

const StormManagementPage = () => {
  const [openType, setOpenType] = useState<TOpenType>('00')

  const toggleOpenWeatherNew = () => {
    setOpenType(openType === '00' ? '01' : '00')
  }

  const toggleOpenWeatherMap = () => {
    setOpenType(openType === '00' ? '10' : '00')
  }

  return (
    <PageWrapper title='Tin cảnh báo thiên tai'>
      <Typography color='primary.main' fontSize={24} fontWeight={700}>
        Tin cảnh báo thiên tai
      </Typography>
      <Grid container spacing={2} height={1}>
        <Grid
          item
          xs={12}
          md={openType === '01' ? 12 : 5}
          sx={{ position: 'relative', display: openType === '10' ? 'none' : 'block' }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 18,
              right: 0,
              color: '#fff'
            }}
            onClick={toggleOpenWeatherNew}
          >
            {openType === '01' ? (
              <ZoomInMapOutlinedIcon color='inherit' fontSize='large' />
            ) : (
              <ZoomOutMapOutlinedIcon color='inherit' fontSize='large' />
            )}
          </IconButton>
          <New />
        </Grid>
        <Grid
          item
          xs={12}
          md={openType === '10' ? 12 : 7}
          sx={{ position: 'relative', display: openType === '01' ? 'none' : 'block' }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 110,
              color: '#fff'
            }}
            onClick={toggleOpenWeatherMap}
          >
            {openType === '10' ? (
              <ZoomInMapOutlinedIcon color='inherit' fontSize='large' />
            ) : (
              <ZoomOutMapOutlinedIcon color='inherit' fontSize='large' />
            )}
          </IconButton>
          <Map />
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default StormManagementPage
