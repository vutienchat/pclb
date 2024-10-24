import { Stack } from '@mui/material'
import EquipmentBox from './EquipmentBox'
import { TStationType } from '@src/types'
import MMLBox from './MMLBox'
import { useGetIssue } from '@src/queries'

const ISSUE_TYPE: TStationType[] = ['MLL SITE', 'MĐ', 'MFĐ', 'MTC', 'AGG', 'CSG']

const ListIssueReport = () => {
  const { data: issue } = useGetIssue()

  const getCount = (type: TStationType) => {
    switch (type) {
      case 'MLL 2G':
        return issue?.responseData?.['2g'] || 0
      case 'MLL 3G':
        return issue?.responseData?.['3g'] || 0
      case 'MLL 4G':
        return issue?.responseData?.['4g'] || 0
      case 'MLL 5G':
        return issue?.responseData?.['5g'] || 0
      case 'MLL SITE':
        return issue?.responseData?.['site'] || 0
      case 'MĐ':
        return issue?.responseData?.['mdf'] || 0
      case 'MFĐ':
        return issue?.responseData?.['mfd'] || 0
      case 'MTC':
        return issue?.responseData?.['mtc'] || 0
      case 'AGG':
        return issue?.responseData?.['agg'] || 0
      case 'CSG':
        return issue?.responseData?.['csg'] || 0
      default:
        return 0
    }
  }

  return (
    <Stack justifyContent='flex-start' columnGap={2} rowGap={2} flexWrap='wrap' mb={2}>
      <MMLBox
        counts={{
          '2G': issue?.responseData?.['2g'] || 0,
          '3G': issue?.responseData?.['3g'] || 0,
          '4G': issue?.responseData?.['4g'] || 0,
          '5G': issue?.responseData?.['5g'] || 0
        }}
      />
      {ISSUE_TYPE.map((type) => (
        <EquipmentBox key={type} type={type} count={getCount(type)} />
      ))}
    </Stack>
  )
}

export default ListIssueReport
