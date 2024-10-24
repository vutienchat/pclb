import { Box, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { useIsMutating } from '@tanstack/react-query'

import MBFFormAutocomplete from '@src/components/shared/Form/MBFFormAutocomplete'
import useMasterdata from '@src/hooks/useMasterdata'
import { ERegion, RegionOption } from '@src/constants/common'
import { DEVICE_TYPE, PRIORITIES } from '@src/constants/data'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import { DigitalMapForm } from './TabMenu'

type Props = {
  onSearching: () => void
}

const SearchingSite = (props: Props) => {
  const { onSearching } = props
  const { provinces, getProvinces } = useMasterdata()

  const { watch } = useFormContext<DigitalMapForm>()
  const region = watch('region')

  const isSearching = useIsMutating({
    mutationKey: ['useGetMapSite']
  })

  useEffect(() => {
    if (region) {
      getProvinces({ keyword: '', regions: [region] as ERegion[] })
    }
  }, [region])

  return (
    <Box mb={2}>
      <Grid container spacing={4}>
        <Grid item xs={4} md={2.5}>
          <MBFFormAutocomplete name={'region'} options={RegionOption} required label={'Miền'} placeholder='Miền' />
        </Grid>
        <Grid item xs={4} md={2.5}>
          <MBFFormAutocomplete
            name={'provinceId'}
            options={provinces}
            required
            label={'Tỉnh/TP'}
            placeholder='Tỉnh/TP'
          />
        </Grid>
        <Grid item xs={4} md={2.5}>
          <MBFFormAutocomplete options={DEVICE_TYPE} name='status' label='Loại CB' placeholder='Loại CB' />
        </Grid>
        <Grid item xs={4} md={2.5}>
          <MBFFormAutocomplete options={PRIORITIES} name='priority' label='Mức ưu tiên' placeholder='Mức ưu tiên' />
        </Grid>
        <Grid item xs={4} md={2} display='flex' justifyContent='flex-end' alignItems='flex-end' columnGap={2}>
          <MBFActionButton type='button' onClick={onSearching} loading={Boolean(isSearching)}>
            Tìm kiếm
          </MBFActionButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchingSite
