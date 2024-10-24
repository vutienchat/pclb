import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { ElementType, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import type { LinkProps } from '@mui/material/Link'
import type { MouseEvent } from '@src/types/app/react'

const RouteLink = <C extends ElementType>(props: LinkProps<C, { component?: C }>) => {
  const { to, children, ...rest } = props
  const [overflow, setOverFlow] = useState<boolean>(false)

  const handleMouseEnter: MouseEvent<HTMLInputElement> = (event) => {
    const { scrollWidth, clientWidth } = event.target as HTMLAnchorElement
    if (scrollWidth > clientWidth) {
      setOverFlow(true)
    } else {
      setOverFlow(false)
    }
  }

  const handleMouseLeave: MouseEvent<HTMLInputElement> = () => {
    setOverFlow(false)
  }

  return (
    <Tooltip title={children} open={overflow}>
      <Link component={RouterLink} to={to} underline='none' {...rest}>
        <Typography variant='subtitle2' noWrap onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </Typography>
      </Link>
    </Tooltip>
  )
}

export default RouteLink
