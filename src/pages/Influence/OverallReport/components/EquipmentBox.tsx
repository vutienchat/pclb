import { Box, Typography } from '@mui/material'

import type { TStationType } from '@src/types'

type TProps = {
  type: TStationType
  count: number
}

const EquipmentBox = (props: TProps) => {
  const { count, type } = props

  const isMD = type === 'MĐ' || type === 'AGG'
  const isMFĐ = type === 'MFĐ' || type === 'CSG'

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
        py: 2,
        width: 130,
        height: 120,
        boxShadow: '2px 0px 4px -2px rgb(0 0 0 / 21%)'
      }}
    >
      <Typography
        sx={{
          fontSize: 25,
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        {type}
      </Typography>
      <Typography
        sx={{
          fontSize: 42,
          fontWeight: 'bold',
          color: isMD ? '#E7752F' : isMFĐ ? '#ECB040' : '#ED1C24'
        }}
      >
        {count}
      </Typography>
    </Box>
  )
}

export default EquipmentBox
