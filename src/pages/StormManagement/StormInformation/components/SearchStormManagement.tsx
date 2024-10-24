import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

import Validation from '@src/utils/Validation'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'

interface Props {
  onCreateNewStorm: () => void
}

const SearchStormManagement = (props: Props) => {
  const { onCreateNewStorm } = props

  return (
    <Box mb={2}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={3}>
          <MBFFormInput
            name='searchText'
            placeholder='Nhập từ khóa'
            label='Tìm kiếm'
            validate={Validation.string().max(200)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MBFFormInput name='level' placeholder='Nhập mức độ' label='Mức độ' validate={Validation.string().max(200)} />
        </Grid>
        <Grid item xs={12} md={6} display='flex' alignItems='flex-end' columnGap={2}>
          <MBFActionButton type='submit'>Tìm kiếm</MBFActionButton>
          <MBFActionButton
            onClick={() => {
              onCreateNewStorm()
            }}
          >
            Thêm mới
          </MBFActionButton>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', mt: 3, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontSize={20} fontWeight={600}>
          Danh sách cơn bão
        </Typography>
        <FormControlLabel
          value='start'
          control={<Switch color='primary' />}
          label={<Typography color={'primary.main'}>Tự động khởi tạo cơn bão</Typography>}
          labelPlacement='start'
        />
      </Box>
    </Box>
  )
}

export default SearchStormManagement
