import { Box, Grid } from '@mui/material'
import { useIsMutating } from '@tanstack/react-query'

import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'

type Props = {
  onAddingNewUser: () => void
}

const SearchingUsers = ({ onAddingNewUser }: Props) => {
  const isSearching = useIsMutating({
    mutationKey: ['useSearchGroupUser']
  })

  return (
    <Box mb={1}>
      <Grid container spacing={4}>
        <Grid item xs={6} md={3}>
          <MBFFormInput name='searchText' label='Tìm kiếm' placeholder='Nhập để tìm kiếm' />
        </Grid>
        <Grid item xs={0} md={6} />
        <Grid item xs={6} md={3} display='flex' justifyContent='flex-end' alignItems='flex-end' columnGap={2}>
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
