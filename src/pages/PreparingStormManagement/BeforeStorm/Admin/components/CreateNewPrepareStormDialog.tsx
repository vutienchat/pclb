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
  useFieldArray,
  useForm
} from 'react-hook-form'
import {
  DialogRef,
  Option
} from '@src/types'
import Grid from '@mui/material/Grid'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import MBFFormDatePicker from '@src/components/shared/Form/MBFFormDatePicker'
import MBFButton from '@src/components/shared/Button/MBFButton'
import DialogFooter from '@src/components/shared/Dialog/DialogFooter'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import Validation from '@src/utils/Validation'
import {yupResolver} from '@hookform/resolvers/yup'
import MBFFormAutocompleteMultiple from '@src/components/shared/Form/MBFFormAutocompleteMultiple'
import {
  useCreateStorm,
  useEditStorm,
  useGetDirectHistory
} from '@src/queries/storm'
import MBFFormCheckboxGroup from '@src/components/shared/Form/MBFFormCheckboxGroup'
import DateTime from '@src/utils/DateTime'
import {PrepareStormSchema} from '@src/utils/schema/storm'
import useNotification from '@src/hooks/useNotification'
import {
  NotificationMethodOption,
  StormStatus
} from '@src/constants/common'
import useMasterdata from '@src/hooks/useMasterdata'
import MBFFormUserGroupInput from '@src/components/shared/Form/MBFFormUserGroupInput'
import {EUserGroupType} from '@src/types/service/masterdata'
import {removeKeys} from "@src/utils/common";
import MBFFormStormInput from "@src/components/shared/Form/MBFFormStormInput";
import {StormDetail} from "@src/types/service/storm";
import StormDirectionHistory from "@src/pages/StormManagement/StormInformation/components/StormDirectionHistory";
import dayjs from "dayjs";
import MBFFormRegionInput from "@src/components/shared/Form/MBFFormRegionInput";

type TProps = {
  reFetch: React.DispatchWithoutAction
}
type FormValues = typeof PrepareStormSchema.__outputType

const CreateNewPrepareStormDialog = forwardRef<DialogRef<any>, TProps>((props, ref) => {
  const {reFetch} = props
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const createStorm = useCreateStorm()
  const [loading, setLoading] = useState<boolean>(false)
  const notification = useNotification()
  const {
    provinces,
    getProvinces
  } = useMasterdata()
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [initOptions, setInitOptions] = useState<{
    province: Option<number>[]
    notification: Option<number>[]
    assignTask: Option<number>[]
  }>({
    assignTask: [],
    notification: [],
    province: []
  });
  const getDirect = useGetDirectHistory()
  const editStorm = useEditStorm()

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(PrepareStormSchema),
    defaultValues: PrepareStormSchema.getDefault()
  })

  const {
    fields,
    replace
  } = useFieldArray({
    control: form.control,
    name: 'stormDetailsRequests'
  })

  const handleOpen = () => {
    getProvinces()
    setOpenDialog(true)
  }

  const handleClose = () => {
    form.reset(PrepareStormSchema.getDefault())
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
    const value = removeKeys<FormValues, FormValues>(data, ['code'])
    if (isCreate) {
      createStorm.mutate({
        ...value,
        reportingTime: DateTime.ToString(value.reportingTime),
        preparationCompletionTimeBeforeStorm: DateTime.ToString(value.preparationCompletionTimeBeforeStorm),
        startImpactTime: DateTime.StartOfDay(value.startImpactTime),
        endImpactTime: DateTime.EndOfDay(value.endImpactTime),
        status: StormStatus.Active,
        level: Number(value.level),
        stormDetailsRequests: value.stormDetailsRequests.map(i => (
          {
            ...i,
            direction: i.direction?.toString(),
            movingDate: DateTime.ToString(i.movingDate),
          }
        ))
      }, {
        onSuccess: res => {
          if (res.responseCode === '200') {
            reFetch()
            handleClose()
            notification({
              message: 'Thêm mới chuẩn bị cơn bão/lụt thành công',
              severity: 'success'
            })
          } else {
            notification({
              message: res.responseMessage || 'Lỗi hệ thống',
              severity: 'error'
            })
          }
          setLoading(false)
        },
        onError: () => {
          setLoading(false)
        }
      })
    } else {
      editStorm.mutate({
        data: {
          ...value,
          level: Number(value.level),
          startImpactTime: value.startImpactTime.toISOString(),
          endImpactTime: value.endImpactTime.toISOString(),
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
            form.reset(PrepareStormSchema.getDefault())
            notification({
              message: 'Thêm mới chuẩn bị cơn bão/lụt thành công',
              severity: 'success'
            })
          } else {
            notification({
              message: res.responseMessage || 'Lỗi hệ thống',
              severity: 'error'
            })
          }
          setLoading(false)
        },
        onError: () => {
          setLoading(false)
        }
      })
    }

  }

  const handleSelectStorm = (value: StormDetail | null) => {
    if (value && value.id !== 0) {
      setIsCreate(false)
      const data = value;
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
      setInitOptions({
        province: data.provinces.map(i => (
          {
            label: i.name,
            value: i.id
          }
        )),
        notification: data.userGroups.filter(i => i.groupType === EUserGroupType.Notify)
          .map(i => (
            {
              label: i.name,
              value: i.id
            }
          )),
        assignTask: data.userGroups.filter(i => i.groupType === EUserGroupType.AssignWork)
          .map(i => (
            {
              label: i.name,
              value: i.id
            }
          ))
      })
      getDirect.mutate(value.id, {
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
    } else {
      if (!(
        value?.id === 0
      )) {
        form.reset(PrepareStormSchema.getDefault())
      } else {
        form.setValue('name', value.name)
      }
      setIsCreate(true)
    }
  }


  return (
    <DialogContainer open={openDialog}
                     onClose={handleClose}
                     maxWidth="lg"
                     fullWidth>
      <MBFFormProvider<any> form={form}
                            onFinish={handleCreateNewStorm}>
        <DialogHeader onClose={handleClose}>Thêm mới chuẩn bị trước bão lụt</DialogHeader>
        <DialogBody disableGutters
                    loading={form.formState.isSubmitting}>
          <Grid container
                spacing={2}>
            <Grid item
                  xs={12}
                  md={4}>
              <MBFFormItem>
                <MBFFormStormInput
                  name={'id'}
                  label="Tên cơn bão/lụt"
                  required
                  onSelectStorm={handleSelectStorm}
                />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={4}>
              <MBFFormItem>
                <MBFFormDatePicker name="startImpactTime"
                                   type={'startDate'}
                                   label="Thời gian ảnh hưởng"
                                   validate={Validation.date()} />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={4}
                  sx={{alignSelf: 'end'}}>
              <MBFFormItem>
                <MBFFormDatePicker name="endImpactTime"
                                   type={'endDate'} />
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
                  initOptions={initOptions.province}
                  fixedSelect={initOptions.province}
                />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}>
              <StormDirectionHistory fields={fields}
                                     maxHeight={149} />
            </Grid>
            <Grid item
                  xs={12}
                  md={6}>
              <MBFFormItem>
                <MBFFormDatePicker name="reportingTime"
                                   label="Thời gian báo cáo"
                                   validate={Validation.date()} />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={6}>
              <MBFFormItem>
                <MBFFormDatePicker name="preparationCompletionTimeBeforeStorm"
                                   label="Thời gian hoàn thành chuẩn bị trước bão"
                                   validate={Validation.date()} />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}>
              <MBFFormItem>
                <MBFFormCheckboxGroup
                  label={'Hình thức gửi thông báo'}
                  name={'notificationMethods'}
                  options={NotificationMethodOption}
                  required
                />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}>
              <MBFFormItem>
                <MBFFormUserGroupInput
                  name={'receivedNotificationGroups'}
                  userGroupType={EUserGroupType.Notify}
                  multiple
                  label={'Nhóm người dùng nhận thông báo'}
                  initOption={initOptions.notification}
                  required />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}>
              <MBFFormItem>
                <MBFFormUserGroupInput
                  name={'assignedTaskGroups'}
                  userGroupType={EUserGroupType.AssignWork}
                  multiple
                  label={'Nhóm người dùng nhận công việc'}
                  initOption={initOptions.assignTask}
                  required />
              </MBFFormItem>
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

export default CreateNewPrepareStormDialog
