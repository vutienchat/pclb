import {
  forwardRef,
  useImperativeHandle,
  useState
} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import DialogBody from '@src/components/shared/Dialog/DialogBody'
import DialogHeader from '@src/components/shared/Dialog/DialogHeader'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import DialogContainer from '@src/components/shared/Dialog/DialogContainer'
import {
  useFieldArray,
  useForm
} from 'react-hook-form'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFFormDatePicker from '@src/components/shared/Form/MBFFormDatePicker'
import MBFButton from '@src/components/shared/Button/MBFButton'
import DialogFooter from '@src/components/shared/Dialog/DialogFooter'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import MBFFormSwitch from '@src/components/shared/Form/MBFFormSwitch'
import {yupResolver} from '@hookform/resolvers/yup'
import {
  useEditStorm,
  useGetDirectHistory,
  useGetStormById
} from '@src/queries/storm'
import {StormDetailDialogRef} from '@src/pages/StormManagement/StormInformation/components/StormDetailDialog'
import MBFFormAutocompleteMultiple from '@src/components/shared/Form/MBFFormAutocompleteMultiple'
import dayjs from 'dayjs'
import useNotification from '@src/hooks/useNotification'
import DateTime from '@src/utils/DateTime'
import {
  StormDetailRequestSchema,
  StormSchema
} from '@src/utils/schema/storm'
import StormDirectionHistory from '@src/pages/StormManagement/StormInformation/components/StormDirectionHistory'
import {
  StormStatus
} from '@src/constants/common'
import useMasterdata from '@src/hooks/useMasterdata'
import {removeKeys} from '@src/utils/common'
import {StormDetail} from '@src/types/service/storm'
import {EUserGroupType} from "@src/types/service/masterdata";
import {Option} from "@src/types";
import MBFFormRegionInput from "@src/components/shared/Form/MBFFormRegionInput";

type TProps = {
  reFetch: React.DispatchWithoutAction
}

type FormValues = typeof StormSchema.__outputType

const EditNewStormDialog = forwardRef<StormDetailDialogRef, TProps>((props, ref) => {
  const {reFetch} = props
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const getStormData = useGetStormById()
  const getDirect = useGetDirectHistory()
  const editStorm = useEditStorm()
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(StormSchema),
    defaultValues: StormSchema.getDefault()
  })
  const notification = useNotification()
  const {provinces} = useMasterdata()
  const [initProvince, setInitProvince] = useState<Option<number>[]>([]);
  const {getProvinces} = useMasterdata()

  const {
    fields,
    append,
    replace
  } = useFieldArray({
    control: form.control,
    name: 'stormDetailsRequests'
  })

  const handleOpen = (id: number) => {
    getProvinces()
    getStormData.mutate(id, {
      onSuccess: res => {
        if (res.responseCode === '200' && res.responseData) {
          const data = res.responseData
          form.reset({
            ...data,
            provinceIds: data.provinces.map(item => item.id),
            receivedNotificationGroups: data.userGroups.filter(i => i.groupType === EUserGroupType.Notify)
              .map(item => item.id),
            assignedTaskGroups: data.userGroups.filter(i => i.groupType === EUserGroupType.AssignWork)
              .map(item => item.id),
            notificationMethods: data.notificationMethods.map(i => i.toString()),
            startImpactTime: new Date(data.startImpactTime),
            endImpactTime: new Date(data.endImpactTime),
            preparationCompletionTimeBeforeStorm: data.preparationCompletionTimeBeforeStorm ?
              new Date(data.preparationCompletionTimeBeforeStorm) : undefined,
            reportingTime: data.reportingTime ? new Date(data.reportingTime) : undefined,
            stormDetailsRequests: form.getValues('stormDetailsRequests'),
            status: data.status === StormStatus.Active
          })
          setInitProvince(
            data.provinces.map(i => (
              {
                label: i.name,
                value: i.id
              }
            ))
          )
          setOpenDialog(true)
        } else {
          notification({
            message: res.responseMessage || 'Lỗi hệ thống',
            severity: 'error'
          })
        }
      },
      onError: error => {
        console.log(error)
      }
    })
    getDirect.mutate(id, {
      onSuccess: res => {
        if (res.responseCode === '200' && res.responseData) {
          replace(
            res.responseData.map(i => (
              {
                ...i,
                movingDate: i.movingDate ? new Date(i.movingDate) : undefined
              }
            ))
          )
        } else {
          notification({
            message: res.responseMessage || 'Lỗi hệ thống',
            severity: 'error'
          })
        }
      },
      onError: error => {
        console.log(error)
      }
    })
  }

  const handleClose = async () => {
    setOpenDialog(false)
    form.reset()
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

  const handleCreateNewStorm = (data: StormDetail) => {
    setLoading(true)
    const value = removeKeys<StormDetail, FormValues>(data, ['provinces', 'userGroups'])
    editStorm.mutate({
      data: {
        ...value,
        level: Number(value.level),
        startImpactTime: DateTime.StartOfDay(value.startImpactTime),
        endImpactTime: DateTime.EndOfDay(value.endImpactTime),
        notificationMethods: [],
        preparationCompletionTimeBeforeStorm: dayjs(value.preparationCompletionTimeBeforeStorm)
          .toISOString(),
        reportingTime: dayjs(value.reportingTime)
          .toISOString(),
        status: value.status ? StormStatus.Active : StormStatus.Inactive,
        stormDetailsRequests: value.stormDetailsRequests.map(i => (
          {
            ...i,
            direction: i.direction?.toString(),
            movingDate: DateTime.ToString(i.movingDate)
          }
        ))
      },
      id: value.id!
    }, {
      onSuccess: res => {
        if (res.responseCode === '200') {
          handleClose()
          reFetch()
          notification({
            message: 'Lưu cơn bão/lụt thành công',
            severity: 'success'
          })
        }
        setLoading(false)
      },
      onSettled: () => {
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
        <DialogHeader onClose={handleClose}>Cập nhật cơn bão/lụt</DialogHeader>
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
                                   label="Thời gian ảnh hưởng" />
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
                  initOptions={initProvince}
                  fixedSelect={initProvince}
                />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}>
              <StormDirectionHistory fields={fields} />
            </Grid>

          </Grid>
          <Button variant="text"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{mt: 1}}
                  onClick={() => append(StormDetailRequestSchema.getDefault())}>
            Thêm dòng
          </Button>
          <DialogFooter>
            <MBFFormItem>
              <MBFFormSwitch name="status"
                             label="Trạng thái cơn bão/lụt"
                             checkedLabel="Trạng thái cơn bão/lụt" />
            </MBFFormItem>
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

export default EditNewStormDialog
