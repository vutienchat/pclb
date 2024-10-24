import Search from '@mui/icons-material/Search'
import { Box, Grid, Icon, InputAdornment, Stack } from '@mui/material'

import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import MBFActionIconButton from '@src/components/shared/Button/MBFActionIconButton'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import Validation from '@src/utils/Validation'

const SearchingPermissions = () => {
  return (
    <Box mb={2}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={4}>
          <MBFFormInput
            name='role'
            placeholder='Tên/Mã vai trò'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon>
                    <Search />
                  </Icon>
                </InputAdornment>
              )
            }}
            validate={Validation.string().max(200)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction='row' spacing={2} justifyContent='flex-start'>
            <MBFActionIconButton
              actionType='reset'
              sx={{
                width: 48,
                height: 36,
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white'
                }
              }}
            />
            <MBFActionButton type='submit'>Tìm kiếm</MBFActionButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchingPermissions
