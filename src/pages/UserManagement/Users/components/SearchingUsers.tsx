import { Box, Grid } from '@mui/material'

import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import MBFFormAutocomplete from '@src/components/shared/Form/MBFFormAutocomplete'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import { useTypedSelector } from '@src/store'
import { useIsMutating } from '@tanstack/react-query'

type Props = {
  onAddingNewUser: () => void
}

const SearchingUsers = ({ onAddingNewUser }: Props) => {
  const { centers, positions } = useTypedSelector((state) => state.metadata)

  const isSearching = useIsMutating({
    mutationKey: ['useSearchUser']
  })

  return (
    <Box mb={1}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <MBFFormInput name='searchText' label='Tìm kiếm' placeholder='Nhập để tìm kiếm' />
        </Grid>
        <Grid item xs={12} md={3}>
          <MBFFormAutocomplete
            name='centerId'
            label='Đơn vị'
            placeholder='Nhập đơn vị'
            options={centers.map((c) => ({
              value: c.id,
              label: `${c.region}-${c.name}`
            }))}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MBFFormAutocomplete
            name='positionId'
            label='Chức vụ'
            placeholder='Nhập chức vụ'
            options={positions.map((p) => ({
              value: p.id,
              label: p.name
            }))}
          />
        </Grid>
        <Grid item xs={12} md={3} display='flex' justifyContent='flex-end' alignItems='flex-end' columnGap={2}>
          <MBFActionButton type='submit' loading={Boolean(isSearching)}>
            Tìm kiếm
          </MBFActionButton>
          <MBFActionButton type='button' onClick={onAddingNewUser}>
            Thêm mới
          </MBFActionButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchingUsers
