import { Fragment, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'

import useAuthState from '@src/hooks/useAuthState'
import useDialog from '@src/hooks/useDialog'
import Logger from '@src/utils/Logger'
import sleep from '@src/utils/sleep'
import { EndPoints } from '@src/constants/paths'
import Image from '@src/components/core/Image'
import { __URL_SERVICE__ } from '@src/config'

const Account = () => {
  const { logout } = useAuthState()
  const { user } = useAuthState()
  const anchor = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const dialog = useDialog()

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleLogout = async () => {
    handleClose()
    await sleep(350)

    dialog({
      headline: 'Đăng xuất',
      supportingText: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
      icon: <LogoutIcon fontSize='large' sx={{ fill: '#1264AF' }} />,
      onConfirm: async () => {
        try {
          await logout()
        } catch (error) {
          Logger.log(error)
        }
      }
    })
  }

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 4 }}>
        <NotificationsActiveOutlinedIcon sx={{ width: 32, height: 32, cursor: 'pointer' }} />
        <ButtonBase onClick={handleOpen} ref={anchor}>
          <Stack
            spacing={2}
            sx={{ alignItems: 'center', borderRadius: 9999, backgroundColor: '#ffffff', overflow: 'hidden' }}
          >
            <Image
              src={user?.avatarUrl ? `${__URL_SERVICE__.__CDN_URL__}${user.avatarUrl.slice(1)}` : ''}
              width={32}
              height={32}
              alt='avatar'
            />
          </Stack>
        </ButtonBase>
      </Box>
      <Popover
        anchorEl={anchor.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: 260, mt: 2 } }}
      >
        <Box sx={{ my: 2 }}>
          <MenuItem component={RouterLink} to={EndPoints.account} onClick={handleClose}>
            <ListItemIcon>
              <BadgeOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary='Thông tin cá nhân'
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: 600
                }
              }}
            />
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary='Đăng xuất'
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: 600
                }
              }}
            />
          </MenuItem>
        </Box>
      </Popover>
    </Fragment>
  )
}

export default Account
