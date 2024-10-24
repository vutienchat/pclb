import { Stack } from '@mui/material'
import { TStationType } from '@src/types'
import EquipmentBox from './EquipmentBox'

const EQUIPMENT_TYPES: TStationType[] = ['MLL SITE', 'MĐ', 'MFĐ']

const StationReport = () => {
  return (
    <Stack justifyContent='flex-start' spacing={4} flexWrap='wrap'>
      {EQUIPMENT_TYPES.map((type) => (
        <EquipmentBox key={type} type={type} count={6} />
      ))}
    </Stack>
  )
}

export default StationReport
