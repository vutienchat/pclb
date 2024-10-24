import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import SaveIcon from '@mui/icons-material/Save'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined'
import { svgIconClasses } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SendIcon from '@mui/icons-material/Send';

const icons = {
  delete: DeleteIcon,
  edit: EditOutlinedIcon,
  save: SaveIcon,
  cancel: CloseIcon,
  sub: IndeterminateCheckBoxOutlinedIcon,
  view: VisibilityOutlinedIcon,
  more: MoreHorizIcon,
  reset: RotateLeftOutlinedIcon,
  settings: SettingsOutlinedIcon,
  send: SendIcon
} as const

const colors: { [x in keyof typeof icons]: string } = {
  cancel: '#DE3B40',
  delete: '#DE3B40',
  save: '#1264af',
  reset: '#1DD75B',
  sub: '#1DD75B',
  view: '#1264af',
  send: '#1264af',
  edit: '#1DD75B',
  more: '#1DD75B',
  settings: '#F06A6A'
}

interface Props extends IconButtonProps {
  actionType?: keyof typeof icons
}

const MBFActionIconButton = (props: Props) => {
  const { actionType, children, ...rest } = props

  const Icon = actionType && icons[actionType]

  return (
    <IconButton
      sx={{
        [`.${svgIconClasses.root}`]: {
          fill: colors[actionType || 'save']
        }
      }}
      {...rest}
    >
      {Icon ? <Icon /> : children}
    </IconButton>
  )
}

export default MBFActionIconButton
