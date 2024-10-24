import { Box, Grid } from '@mui/material'
import { useIsMutating } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import MBFFormAutocomplete from '@src/components/shared/Form/MBFFormAutocomplete'
import useMasterdata from '@src/hooks/useMasterdata'
import { ERegion, RegionOption, ShowTypeOption } from '@src/constants/common'
import { OverallReportForm } from './TabMenu'

type Props = {}

const SearchingInfluence = (props: Props) => {
  const { provinces, getProvinces } = useMasterdata()
  const isSearching = useIsMutating({
    mutationKey: ['useSearchGroupUser']
  })

  const { watch } = useFormContext<OverallReportForm>()
  const region = watch('region')

  useEffect(() => {
    getProvinces({ keyword: '', regions: [region] as ERegion[] })
  }, [region])

  return (
    <Box mb={1}>
      <Grid container spacing={4}>
        <Grid item xs={6} md={3}>
          <MBFFormAutocomplete name={'region'} options={RegionOption} required label={'Miền'} />
        </Grid>
        <Grid item xs={6} md={3}>
          <MBFFormAutocomplete name={'provinceId'} options={provinces} required label={'Tỉnh/TP'} />
        </Grid>
        <Grid item xs={6} md={3}>
          <MBFFormAutocomplete options={ShowTypeOption} name='state' label='Hiển thị' />
        </Grid>
        <Grid item xs={6} md={3} display='flex' justifyContent='flex-end' alignItems='flex-end' columnGap={2}>
          <MBFActionButton type='submit' loading={Boolean(isSearching)}>
            Tìm kiếm
          </MBFActionButton>
          <MBFActionButton type='button'>Biểu đồ</MBFActionButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchingInfluence
