import Link, { LinkProps } from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { ElementType } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const NavLink = <C extends ElementType>(props: LinkProps<C, { component?: C }>) => {
  const { to, children, ...rest } = props
  return (
    <Link component={RouterLink} to={to} underline='none' {...rest}>
      <Typography variant='subtitle2' noWrap>
        {children}
      </Typography>
    </Link>
  )
}

export default NavLink
