import { Avatar, Box, Divider, Drawer, Stack, Typography } from '@mui/material'
import { useTypedDispatch, useTypedSelector } from '@src/store'
import { toggleMobileOpen } from '@src/slices/menu'
import Navigation from './Navigation'
import Image from '@src/components/core/Image'

const SidebarMobile = () => {
  const dispatch = useTypedDispatch()
  const mobileOpen = useTypedSelector((state) => state.menu.mobileOpen)

  const handleToggleMobileOpen = () => {
    dispatch(toggleMobileOpen(!mobileOpen))
  }

  return (
    <Drawer
      open={mobileOpen}
      onClose={handleToggleMobileOpen}
      sx={({ config, transitions }) => ({
        width: config.sidebarWidth,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',

        '& .MuiDrawer-paper': {
          width: config.sidebarWidth,
          transition: transitions.create('width', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen
          }),
          overflowX: 'hidden'
        }
      })}
    >
      <Stack justifyContent='center' alignItems='center' flexDirection='column' py={2} gap={1}>
        <Avatar></Avatar>
        <Typography>Supper Admin</Typography>
      </Stack>
      <Divider />
      <Navigation />
    </Drawer>
  )
}

export default SidebarMobile
