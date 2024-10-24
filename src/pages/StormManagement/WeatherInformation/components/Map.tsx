import { Box } from '@mui/material'

const Map = () => {
  return (
    <Box
      sx={{
        height: '100%',
        maxHeight: 'calc(100vh - 64px)'
      }}
    >
      <iframe
        id='forecast-map'
        style={{
          border: 'none',
          width: '100%',
          height: '100%'
        }}
        src='https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=temp&product=ecmwf&level=surface&lat=17.309&lon=105.864&detailLat=21.029&detailLon=105.853&detail=true&pressure=true&message=true'
      ></iframe>
    </Box>
  )
}

export default Map
