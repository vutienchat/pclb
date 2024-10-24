import {
  forwardRef,
  useImperativeHandle,
  useState
} from 'react'
import DialogBody from '@src/components/shared/Dialog/DialogBody'
import DialogHeader from '@src/components/shared/Dialog/DialogHeader'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import DialogContainer from '@src/components/shared/Dialog/DialogContainer'
import {
  useForm
} from 'react-hook-form'
import type {DialogRef} from '@src/types'
import Grid from '@mui/material/Grid'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFFormDatePicker from '@src/components/shared/Form/MBFFormDatePicker'
import MBFButton from '@src/components/shared/Button/MBFButton'
import DialogFooter from '@src/components/shared/Dialog/DialogFooter'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import Validation from '@src/utils/Validation'
import {yupResolver} from '@hookform/resolvers/yup'
import MBFFormAutocompleteMultiple from '@src/components/shared/Form/MBFFormAutocompleteMultiple'
import {useCreateStorm} from '@src/queries/storm'
import useNotification from '@src/hooks/useNotification'
import DateTime from '@src/utils/DateTime'
import {StormSchema} from '@src/utils/schema/storm'
import MBFFormDateTimePicker from '@src/components/shared/Form/MBFFormDateTimePicker'
import Typography from '@mui/material/Typography'
import MBFFormSelect from '@src/components/shared/Form/MBFFormSelect'
import {
  DirectionOption,
  StormStatus
} from '@src/constants/common'
import useMasterdata from '@src/hooks/useMasterdata'
import {removeKeys} from "@src/utils/common";
import MBFFormRegionInput from "@src/components/shared/Form/MBFFormRegionInput";

type TProps = {
  reFetch: React.DispatchWithoutAction
}

type FormValues = typeof StormSchema.__outputType

const CreateNewStormDialog = forwardRef<DialogRef<any>, TProps>((props, ref) => {
  const {reFetch} = props
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const createStorm = useCreateStorm()
  const [loading, setLoading] = useState<boolean>(false)
  const notification = useNotification()
  const {provinces} = useMasterdata()

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(StormSchema),
    defaultValues: StormSchema.getDefault()
  })

  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    form.reset()
    setOpenDialog(false)
  }

  useImperativeHandle(
    ref,
    () => (
      {
        open: handleOpen,
        close: handleClose
      }
    )
  )

  const handleCreateNewStorm = (data: FormValues) => {
    setLoading(true)
    const value = removeKeys<FormValues, FormValues>(data, ['id', 'code'])
    createStorm.mutate({
      ...value,
      reportingTime: '',
      preparationCompletionTimeBeforeStorm: '',
      level: Number(value.level),
      startImpactTime: DateTime.StartOfDay(value.startImpactTime),
      endImpactTime: DateTime.EndOfDay(value.endImpactTime),
      status: StormStatus.Active,
      stormDetailsRequests: value.stormDetailsRequests.map(i => (
        {
          ...i,
          direction: i.direction?.toString(),
          movingDate: DateTime.ToString(i.movingDate)
        }
      ))
    }, {
      onSuccess: res => {
        if (res.responseCode === '200') {
          reFetch()
          handleClose()
          notification({
            message: 'Thêm mới cơn bão/lụt thành công',
            severity: 'success'
          })
        }
        setLoading(false)
      },
      onError: () => {
        setLoading(false)
      }
    })
  }

  return (
    <DialogContainer open={openDialog}
                     onClose={handleClose}
                     maxWidth="lg"
                     fullWidth>
      <MBFFormProvider<any> form={form}
                            onFinish={handleCreateNewStorm}>
        <DialogHeader onClose={handleClose}>Thêm mới cơn bão/lụt</DialogHeader>
        <DialogBody disableGutters
                    loading={form.formState.isSubmitting}>
          <Grid container
                spacing={2}>
            <Grid item
                  xs={12}
                  md={4}>
              <MBFFormItem>
                <MBFFormInput name="name"
                              label="Tên cơn bão/lụt"
                              required />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={4}>
              <MBFFormItem>
                <MBFFormDatePicker name="startImpactTime"
                                   onSelect={() => form.trigger('endImpactTime')}
                                   label="Thời gian ảnh hưởng"
                                   validate={Validation.date()} />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={4}
                  sx={{alignSelf: 'end'}}>
              <MBFFormItem>
                <MBFFormDatePicker name="endImpactTime" />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={6}>
              <MBFFormItem>
                <MBFFormRegionInput
                  name={'regions'}
                  required
                  label={'Các miền ảnh hưởng'}
                  multiple
                />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={6}>
              <MBFFormItem>
                <MBFFormAutocompleteMultiple
                  name={'provinceIds'}
                  options={provinces}
                  required
                  label={'Các tỉnh ảnh hưởng'}
                />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}>
              <Grid container
                    spacing={1}
                    columns={17}>
                <Grid item
                      xs={17}>
                  <Typography fontSize={18}
                              fontWeight={500}
                              color={'primary.main'}>
                    Tiến trình cơn bão/lụt
                  </Typography>
                </Grid>
                <Grid item
                      xs={17}
                      md={3}>
                  <MBFFormItem>
                    <MBFFormDateTimePicker
                      name={'stormDetailsRequests[0].movingDate'}
                      label={'Thời gian'}
                    />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={17}
                      md={2}>
                  <MBFFormItem>
                    <MBFFormInput name="stormDetailsRequests[0].level"
                                  label="Mức độ"
                                  type={'number'} />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={17}
                      md={2}>
                  <MBFFormItem>
                    <MBFFormInput name="stormDetailsRequests[0].longitude"
                                  label="Kinh độ"
                                  type={'number'} />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={17}
                      md={2}>
                  <MBFFormItem>
                    <MBFFormInput name="stormDetailsRequests[0].latitude"
                                  label="Vĩ độ"
                                  type={'number'} />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={17}
                      md={2}>
                  <MBFFormItem>
                    <MBFFormInput name="stormDetailsRequests[0].windStrength"
                                  label="Sức gió"
                                  type={'number'} />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={17}
                      md={2}>
                  <MBFFormItem>
                    <MBFFormInput name="stormDetailsRequests[0].gusts"
                                  label="Sức giật"
                                  type={'number'} />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={17}
                      md={2}>
                  <MBFFormItem>
                    <MBFFormSelect
                      name="stormDetailsRequests[0].direction"
                      label="Hướng"
                      options={DirectionOption}
                    />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={16}
                      md={2}>
                  <MBFFormItem>
                    <MBFFormInput name="stormDetailsRequests[0].velocity"
                                  label="Vận tốc (km/h)"
                                  type={'number'} />
                  </MBFFormItem>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <DialogFooter sx={{marginTop: 3}}>
            <MBFButton actionType="cancel"
                       onClick={handleClose}>
              Thoát
            </MBFButton>
            <MBFActionButton type="submit"
                             loading={loading}>Lưu</MBFActionButton>
          </DialogFooter>
        </DialogBody>
      </MBFFormProvider>
    </DialogContainer>
  )
})

export default CreateNewStormDialog
