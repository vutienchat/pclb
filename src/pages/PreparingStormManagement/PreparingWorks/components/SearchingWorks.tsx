import { Box, Grid } from '@mui/material'

import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFFormUserGroupInput from '@src/components/shared/Form/MBFFormUserGroupInput'
import { EUserGroupType } from '@src/types/service/masterdata'
import { useIsMutating } from '@tanstack/react-query'

type Props = {
  onAddingNewUser: () => void
}

const SearchingWorks = ({ onAddingNewUser }: Props) => {
  const isSearching = useIsMutating({
    mutationKey: ['useSearchWork']
  })

  return (
    <Box mb={1}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <MBFFormInput name='searchText' label='Tìm kiếm' placeholder='Nhập để tìm kiếm' />
        </Grid>
        <Grid item xs={12} md={3}>
          <MBFFormUserGroupInput
            name='groupId'
            label='Nhóm người nhận công việc'
            placeholder='Chọn nhóm người nhận công việc'
            userGroupType={EUserGroupType.AssignWork}
          />
        </Grid>
        <Grid item xs={12} md={6} display='flex' justifyContent='flex-end' alignItems='flex-end' columnGap={2}>
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

export default SearchingWorks
