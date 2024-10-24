import { Fragment } from 'react'
import { Box } from '@mui/material'

import Navigation from './Navigation'
import SidebarMobile from './SidebarMobile'
import { useTypedSelector } from '@src/store'

const Sidebar = () => {
  const { sidebarOpen } = useTypedSelector((state) => state.menu)
  return (
    <Fragment>
      <SidebarMobile />
      <Box
        sx={({ config, palette, transitions }) => ({
          width: config.sidebarWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRightWidth: 1,
          borderRightStyle: 'solid',
          borderRightColor: palette.primary.main,
          height: `calc(100vh - 64px)`,
          display: { xs: 'none', lg: sidebarOpen ? 'block' : 'none' },
          '& .MuiDrawer-paper': {
            width: config.sidebarWidth,
            overflowX: 'hidden'
          },
          transition: transitions.create('display', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.leavingScreen
          })
        })}
      >
        <Navigation />
      </Box>
    </Fragment>
  )
}

export default Sidebar
