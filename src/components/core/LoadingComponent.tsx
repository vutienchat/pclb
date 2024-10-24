import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  visible?: boolean
}

const LoadingComponent = (props: Props) => {
  const { visible } = props

  if (!visible) {
    return null
  }

  return (
    <Box
      sx={{
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingComponent
