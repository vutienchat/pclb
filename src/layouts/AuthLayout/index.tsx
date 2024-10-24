import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1,
        display: 'grid',
        gridTemplateRows: '1fr auto',
        gap: 3,
        p: 3
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Outlet />
      </Box>
      <Copyright />
    </Box>
  )
}

const Copyright = () => {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {/* {'Copyright © '} {new Date().getFullYear()}{' '}
      <Link color='primary.main' href='https://www.mobifone.vn/'>
        Mobifone
      </Link>
      {'.'} All Rights Reserved. */}
    </Typography>
  )
}

export default AuthLayout
