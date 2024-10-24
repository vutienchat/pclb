import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const MainLayout = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />
      <Box
        sx={{
          display: 'flex',
          flex: 'auto',
          overflow: 'hidden',
          flexDirection: 'row',
          pt: 8
        }}
      >
        <Sidebar />
        <Box
          sx={(theme) => ({
            display: 'flex',
            flex: 'auto',
            flexDirection: 'column',
            overflow: 'auto',
            height: 1,
            width: 1,
            backgroundColor: '#fafafa',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen
            })
          })}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
