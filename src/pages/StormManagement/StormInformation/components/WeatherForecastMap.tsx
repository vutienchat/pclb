import { Box } from '@mui/material'

const WeatherForecastMap = () => {
  return (
    <Box sx={{ width: 1, height: 1 }}>
      <iframe
        id="forecast-map"
        style={{
          border: 'none',
          width: '100%',
          height: '100%'
        }}
        src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=15.522&lon=105.442"
      ></iframe>
    </Box>
  )
}

export default WeatherForecastMap
