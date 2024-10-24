import { Box, Stack, Typography } from '@mui/material'

type TProps = {
  counts: {
    '2G': number
    '3G': number
    '4G': number
    '5G': number
  }
}

const MMLBox = (props: TProps) => {
  const { counts } = props

  const total = Object.values(counts).reduce((acc, cur) => acc + cur, 0)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'primary.main',
        borderRadius: 4,
        height: 120,
        px: 1,
        boxShadow: '2px 0px 4px -2px rgb(0 0 0 / 21%)'
      }}
    >
      <Typography
        sx={{
          fontSize: 25,
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 1
        }}
      >
        MLL :{' '}
        <Typography component={'span'} sx={{ color: '#ED1C24', fontSize: 25, fontWeight: 700 }}>
          {total}
        </Typography>
      </Typography>
      <Stack direction='row' spacing={2}>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          2G:{' '}
          <Typography sx={{ color: '#ED1C24', fontSize: 15, fontWeight: 700 }} component={'span'}>
            {counts['2G']}
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          3G:{' '}
          <Typography sx={{ color: '#ED1C24', fontSize: 15, fontWeight: 700 }} component={'span'}>
            {counts['3G']}
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          4G:{' '}
          <Typography sx={{ color: '#ED1C24', fontSize: 15, fontWeight: 700 }} component={'span'}>
            {counts['4G']}
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          5G:{' '}
          <Typography sx={{ color: '#ED1C24', fontSize: 15, fontWeight: 700 }} component={'span'}>
            {counts['5G']}
          </Typography>
        </Typography>
      </Stack>
    </Box>
  )
}

export default MMLBox
