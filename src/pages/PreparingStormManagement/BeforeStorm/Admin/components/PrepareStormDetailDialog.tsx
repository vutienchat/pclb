import {
  forwardRef,
  useImperativeHandle,
  useState
} from 'react'
import DialogContainer from '@src/components/shared/Dialog/DialogContainer'
import DialogHeader from '@src/components/shared/Dialog/DialogHeader'
import Grid from '@mui/material/Grid'
import Validation from '@src/utils/Validation'
import {
  useFieldArray,
  useForm
} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {
  useGetDirectHistory,
  useGetStormById
} from '@src/queries/storm'
import MBFButton from '@src/components/shared/Button/MBFButton'
import DialogFooter from '@src/components/shared/Dialog/DialogFooter'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFFormDatePicker from '@src/components/shared/Form/MBFFormDatePicker'
import MBFFormCheckboxGroup from '@src/components/shared/Form/MBFFormCheckboxGroup'
import DialogBody from '@src/components/shared/Dialog/DialogBody'
import Typography from '@mui/material/Typography'
import MBFFormAutocompleteMultiple from '@src/components/shared/Form/MBFFormAutocompleteMultiple'
import StormDirectionHistory from '@src/pages/StormManagement/StormInformation/components/StormDirectionHistory'
import {PrepareStormSchema} from '@src/utils/schema/storm'
import MBFTable from '@src/components/shared/Table'
import usePagination from '@src/hooks/usePagination'
import useUnitProgressColummn from '@src/pages/PreparingStormManagement/BeforeStorm/Admin/table/unitProgressColumns'
import {
  NotificationMethodOption,
  StormStatus
} from '@src/constants/common'
import MBFFormSwitch from '@src/components/shared/Form/MBFFormSwitch'
import useMasterdata from '@src/hooks/useMasterdata'
import {EUserGroupType} from '@src/types/service/masterdata'
import MBFFormUserGroupInput from '@src/components/shared/Form/MBFFormUserGroupInput'
import {Option} from "@src/types";

interface StormDetailDialogProps {
}

export interface StormDetailDialogRef {
  open: (id: number) => void
  close: () => void
}

type FormValues = typeof PrepareStormSchema.__outputType
const PrepareStormDetailDialog = forwardRef<StormDetailDialogRef, StormDetailDialogProps>((props, ref) => {
  const {} = props

  const [open, setOpen] = useState<boolean>(false)
  const getStormData = useGetStormById()
  const getDirect = useGetDirectHistory()
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(PrepareStormSchema),
    defaultValues: PrepareStormSchema.getDefault()
  })
  const {
    paginationStates: {
      pageNumber,
      pageSize,
      total
    },
    onPageChange,
    onPageSizeChange,
    setPaginationStates
  } = usePagination()
  const {
    fields,
    replace
  } = useFieldArray({
    control: form.control,
    name: 'stormDetailsRequests'
  })
  const {provinces} = useMasterdata()
  const [initOptions, setInitOptions] = useState<{
    province: Option<number>[]
    notification: Option<number>[]
    assignTask: Option<number>[]
  }>({
    assignTask: [],
    notification: [],
    province: []
  });

  const handleClose = () => {
    setOpen(false)
    form.reset()
  }

  const handleOpen = (id: number) => {
    getStormData.mutate(id, {
      onSuccess: res => {
        if (res.responseCode === '200' && res.responseData) {
          const data = res.responseData
          form.reset({
            ...res.responseData,
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
          setOpen(true)
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
        }
      },
      onError: error => {
        console.log(error)
      }
    })
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

  const handleViewDetail = (data: any) => () => {

  }

  const {columns} = useUnitProgressColummn({
    pageIndex: pageNumber,
    pageSize,
    onShowDetail: handleViewDetail
  })

  return (
    <DialogContainer open={open}
                     onClose={handleClose}
                     maxWidth="lg"
                     fullWidth>
      <MBFFormProvider<any> form={form}>
        <DialogHeader onClose={handleClose}>Xem chi tiết cơn bão/lụt</DialogHeader>
        <DialogBody disableGutters
                    sx={{
                      overflow: 'auto',
                      maxHeight: '79vh'
                    }}>
          <Grid container
                spacing={2}>
            <Grid item
                  xs={12}
                  md={4}>
              <MBFFormItem>
                <MBFFormInput name="name"
                              label="Tên cơn bão/lụt"
                              required
                              disabled />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={4}>
              <MBFFormItem>
                <MBFFormDatePicker name="startImpactTime"
                                   type={'startDate'}
                                   label="Thời gian ảnh hưởng"
                                   validate={Validation.date()}
                                   disabled />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={4}
                  sx={{alignSelf: 'end'}}>
              <MBFFormItem>
                <MBFFormDatePicker name="endImpactTime"
                                   type={'endDate'}
                                   disabled />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}>
              <MBFFormItem>
                <MBFFormAutocompleteMultiple
                  name={'provinceIds'}
                  options={provinces}
                  required
                  label={'Các tỉnh ảnh hưởng'}
                  initOptions={initOptions.province}
                  disabled
                />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}>
              <StormDirectionHistory fields={fields}
                                     disabled
                                     showFull />
            </Grid>
            <Grid item
                  xs={12}
                  md={6}>
              <MBFFormItem>
                <MBFFormDatePicker name="reportingTime"
                                   disabled
                                   label="Thời gian báo cáo"
                                   validate={Validation.date()} />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}
                  md={6}>
              <MBFFormItem>
                <MBFFormDatePicker name="preparationCompletionTimeBeforeStorm"
                                   disabled
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
                  disabled
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
                  disabled
                  initOption={initOptions.notification}
                  label={'Nhóm người dùng nhận thông báo'}
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
                  disabled
                  initOption={initOptions.assignTask}
                  label={'Nhóm người dùng nhận công việc'}
                  required />
              </MBFFormItem>
            </Grid>
            <Grid item
                  xs={12}>
              <Typography color="primary.main"
                          fontSize={18}
                          fontWeight={500}>
                Tiến độ chuẩn bị của các đơn vị
              </Typography>
            </Grid>
            <Grid item
                  xs={12}>
              <MBFTable<any>
                columns={columns}
                data={[]}
                pagination={{
                  page: pageNumber,
                  total,
                  pageSize: pageSize,
                  onPageChange,
                  onPageSizeChange
                }}
                initialState={{
                  columnPinning: {left: ['username']}
                }}
              />
            </Grid>
          </Grid>
        </DialogBody>
        <DialogFooter>
          <MBFFormItem>
            <MBFFormSwitch disabled
                           name="status"
                           label="Trạng thái cơn bão/lụt"
                           checkedLabel="Trạng thái cơn bão/lụt" />
          </MBFFormItem>
          <MBFButton actionType="cancel"
                     onClick={handleClose}>
            Thoát
          </MBFButton>
        </DialogFooter>
      </MBFFormProvider>
    </DialogContainer>
  )
})
export default PrepareStormDetailDialog