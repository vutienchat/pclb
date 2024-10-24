import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate } from 'react-router-dom'

import { toggleMobileOpen, toggleSidebarOpen } from '@src/slices/menu'
import { useTypedDispatch } from '@src/store'
import Account from './Account'
import Image from '@src/components/core/Image'
import logoUrl from '@src/assets/images/logo.png'
import { EndPoints } from '@src/constants/paths'

const Header = () => {
  const theme = useTheme()
  const dispatch = useTypedDispatch()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  const navigate = useNavigate()

  const handleToggleMobileOpen = () => {
    dispatch(toggleMobileOpen())
  }

  const handleToggleSideBar = () => {
    dispatch(toggleSidebarOpen())
  }

  const gotoHome = () => {
    navigate(EndPoints.home)
  }

  return (
    <AppBar position='fixed' enableColorOnDark>
      <Toolbar>
        {lgUp ? (
          <Stack justifyContent='space-between'>
            <Image alt='logo' src={logoUrl} height={54} width={220} onClick={gotoHome} sx={{ cursor: 'pointer' }} />
            <IconButton size='medium' edge='start' onClick={handleToggleSideBar}>
              <MenuIcon sx={{ fill: '#ffffff' }} fontSize='large' />
            </IconButton>
          </Stack>
        ) : (
          <IconButton size='medium' edge='start' onClick={handleToggleMobileOpen}>
            <MenuIcon sx={{ fill: '#ffffff' }} fontSize='large' />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Stack>
          <Account />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
