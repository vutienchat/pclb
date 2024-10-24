import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Validation from '@src/utils/Validation'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import MBFFormDatePicker from '@src/components/shared/Form/MBFFormDatePicker'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import Stack from '@mui/material/Stack'

interface UnitSearchPreparingStormProps {
  onOpenCreate: () => void
}

const UnitSearchPreparingStorm = (props: UnitSearchPreparingStormProps) => {
  const {onOpenCreate} = props
  return (
    <Box mb={2}>
      <Typography mb={1}
                  fontSize={20}
                  fontWeight={600}>
        Tìm kiếm
      </Typography>
      <Grid container
            spacing={4}>
        <Grid item
              xs={12}
              md={2}>
          <MBFFormInput label={'Tìm kiếm'}
                        name="searchText"
                        placeholder="Nhập từ khóa"
                        validate={Validation.string()
                          .max(200)} />
        </Grid>
        <Grid item
              xs={12}
              md={2}>
          <MBFFormInput label={'Mức độ'}
                        name="level"
                        placeholder="Nhập mức độ"
                        validate={Validation.string()
                          .max(200)} />
        </Grid>
        <Grid item
              xs={12}
              md={2}>
          <MBFFormItem>
            <MBFFormDatePicker name="startImpactTime"
                               label="Thời gian ảnh hưởng"
                               validate={Validation.date()} />
          </MBFFormItem>
        </Grid>
        <Grid item
              xs={12}
              md={2}
              sx={{alignSelf: 'end'}}>
          <MBFFormItem>
            <MBFFormDatePicker name="endImpactTime" />
          </MBFFormItem>
        </Grid>
        <Grid item
              xs={12}
              md={2}
              display="flex"
              justifyContent="flex-end"
              alignItems={'flex-end'}
              columnGap={2}>
          <MBFActionButton type="submit">Tìm kiếm</MBFActionButton>
        </Grid>
      </Grid>
      <Box sx={{
        display: 'flex',
        mt: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography fontSize={20}
                    fontWeight={600}>
          Danh sách công việc thực hiện trước bão lụt
        </Typography>
        <Stack>
          <MBFActionButton onClick={(e) => {
            e.preventDefault()
            onOpenCreate()
          }}>Thêm mới</MBFActionButton>
        </Stack>
      </Box>
    </Box>
  )
}

export default UnitSearchPreparingStorm
