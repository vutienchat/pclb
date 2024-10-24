import {
  forwardRef,
  useImperativeHandle,
  useState
} from 'react'
import DialogContainer from '@src/components/shared/Dialog/DialogContainer'
import DialogHeader from '@src/components/shared/Dialog/DialogHeader'
import Grid from '@mui/material/Grid'
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
import MBFFormSwitch from '@src/components/shared/Form/MBFFormSwitch'
import MBFFormDatePicker from '@src/components/shared/Form/MBFFormDatePicker'
import MBFFormCheckboxGroup from '@src/components/shared/Form/MBFFormCheckboxGroup'
import DialogBody from '@src/components/shared/Dialog/DialogBody'
import Stack from '@mui/material/Stack'
import WeatherForecastMap from '@src/pages/StormManagement/StormInformation/components/WeatherForecastMap'
import {
  ConveyingEquipmentType,
  NotificationMethodOption,
  StationType,
  StormStatus
} from '@src/constants/common'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import MBFFormAutocompleteMultiple from '@src/components/shared/Form/MBFFormAutocompleteMultiple'
import useNotification from '@src/hooks/useNotification'
import {StormSchema} from '@src/utils/schema/storm'
import StormDirectionHistory from '@src/pages/StormManagement/StormInformation/components/StormDirectionHistory'
import {SxProps} from '@mui/material'
import styled from '@emotion/styled'
import useMasterdata from '@src/hooks/useMasterdata'
import MBFFormUserGroupInput from '@src/components/shared/Form/MBFFormUserGroupInput'
import {EUserGroupType} from '@src/types/service/masterdata'
import {Option} from "@src/types";
import MBFFormRegionInput from "@src/components/shared/Form/MBFFormRegionInput";

interface StormDetailDialogProps {
  onOpenStationInfoDialog: (id: number, type: StationType) => void
  onOpenConveyingEquipmentInfoDialog: (id: number, type: ConveyingEquipmentType) => void
}

export interface StormDetailDialogRef {
  open: (id: number) => void
  close: () => void
}

type FormValues = typeof StormSchema.__outputType

const infoBox: SxProps = {
  borderStyle: 'solid',
  borderColor: 'primary.main',
  borderWidth: 1,
  borderRadius: 2
}

const StormDetailDialog = forwardRef<StormDetailDialogRef, StormDetailDialogProps>((props, ref) => {
  const {
    onOpenStationInfoDialog,
    onOpenConveyingEquipmentInfoDialog
  } = props
  const notification = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const getStormData = useGetStormById()
  const getDirect = useGetDirectHistory()
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(StormSchema),
    defaultValues: StormSchema.getDefault()
  })
  const {provinces} = useMasterdata()
  const [initProvince, setInitProvince] = useState<Option<number>[]>([]);

  const {
    fields,
    replace
  } = useFieldArray({
    control: form.control,
    name: 'stormDetailsRequests'
  })

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
          setOpen(true)
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

  return (
    <DialogContainer open={open}
                     onClose={handleClose}
                     maxWidth="xl"
                     fullWidth>
      <MBFFormProvider<any> form={form}>
        <DialogHeader onClose={handleClose}>Xem chi tiết cơn bão/lụt</DialogHeader>
        <DialogBody>
          <Grid container
                spacing={1}>
            <Grid item
                  xs={12}
                  md={8}>
              <Grid container
                    spacing={1}>
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
                    <MBFFormDatePicker disabled
                                       name="startImpactTime"
                                       label="Thời gian ảnh hưởng" />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={12}
                      md={4}
                      sx={{alignSelf: 'end'}}>
                  <MBFFormItem>
                    <MBFFormDatePicker disabled
                                       name="endImpactTime" />
                  </MBFFormItem>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MBFFormItem>
                    <MBFFormRegionInput
                      name={'regions'}
                      required
                      label={'Các miền ảnh hưởng'}
                      multiple
                      disabled
                    />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={12} md={6}>
                  <MBFFormItem>
                    <MBFFormAutocompleteMultiple
                      name={'provinceIds'}
                      options={provinces}
                      disabled
                      label={'Các tỉnh ảnh hưởng'}
                      initOptions={initProvince}
                      required />
                  </MBFFormItem>
                </Grid>

                <Grid item
                      xs={12}>
                  <StormDirectionHistory disabled
                                         fields={fields} />
                </Grid>
                <Grid item
                      xs={12}>
                  <MBFFormItem>
                    <MBFFormCheckboxGroup
                      label={'Hình thức gửi thông báo'}
                      name={'notificationMethods'}
                      disabled
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
                      disabled
                      label={'Nhóm người dùng nhận thông báo'}
                      required />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={12}>
                  <Typography color="primary.main"
                              fontSize={24}
                              fontWeight={500}>
                    Kết quả chuẩn bị của các đơn vị
                  </Typography>
                </Grid>
                <Grid item
                      xs={12}
                      md={4}>
                  <MBFFormItem>
                    <MBFFormInput name={'numberOfSubTasks'}
                                  disabled
                                  label={'Số đầu mục cần chuẩn bị'} />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={12}
                      md={4}>
                  <MBFFormItem>
                    <MBFFormInput name={'numberOfCompleteTasks'}
                                  disabled
                                  label={'Số đầu mục hoàn thành'} />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={12}
                      md={4}>
                  <MBFFormItem>
                    <MBFFormInput name={'percentageOfCompleteTasks'}
                                  disabled
                                  label={'Tỷ lệ hoàn thành'} />
                  </MBFFormItem>
                </Grid>
                <Grid item
                      xs={12}>
                  <Link>Xem chi tiết thông tin chuẩn bị của các đơn vị</Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item
                  xs={12}
                  md={4}>
              <Stack spacing={1}
                     direction={'column'}
                     height={1}>
                <Typography color="primary.main"
                            fontSize={18}
                            fontWeight={500}>Lịch sử ảnh hưởng</Typography>
                <Grid container
                      spacing={1}
                      sx={{
                        paddingTop: 0,
                        marginTop: 0
                      }}>
                  <Grid item
                        xs={12}>
                    <Typography>Trạm ảnh hưởng</Typography>
                  </Grid>
                  <Grid item
                        xs={4}>
                    <Stack direction={'column'}
                           alignItems={'center'}
                           sx={infoBox}>
                      <InfoTitle color={'#ED1C24'}>
                        MLL
                      </InfoTitle>
                      <InfoStats color={'#ED1C24'}>
                        0
                      </InfoStats>
                      <Link
                        fontSize={14}
                        onClick={() => onOpenStationInfoDialog(0, StationType.MLL)}>Chi tiết</Link>
                    </Stack>
                  </Grid>
                  <Grid item
                        xs={4}>
                    <Stack direction={'column'}
                           alignItems={'center'}
                           sx={infoBox}>
                      <InfoTitle color={'#E7752F'}>MĐ</InfoTitle>
                      <InfoStats color={'#E7752F'}>0</InfoStats>
                      <Link fontSize={14}
                            onClick={() => onOpenStationInfoDialog(0, StationType.MD)}>Chi tiết</Link>
                    </Stack>
                  </Grid>
                  <Grid item
                        xs={4}>
                    <Stack direction={'column'}
                           alignItems={'center'}
                           sx={infoBox}>
                      <InfoTitle color={'#ECB040'}>MFĐ</InfoTitle>
                      <InfoStats color={'#ECB040'}>0</InfoStats>
                      <Link fontSize={14}
                            onClick={() => onOpenStationInfoDialog(0, StationType.MFD)}>Chi tiết</Link>
                    </Stack>
                  </Grid>
                  <Grid item
                        xs={12}>
                    <Typography>Thiết bị dẫn truyền ảnh hưởng</Typography>
                  </Grid>
                  <Grid item
                        xs={4}>
                    <Stack direction={'column'}
                           alignItems={'center'}
                           sx={infoBox}>
                      <InfoTitle color={'#ED1C24'}>MTC</InfoTitle>
                      <InfoStats color={'#ED1C24'}>0</InfoStats>
                      <Link fontSize={14}
                            onClick={() => onOpenConveyingEquipmentInfoDialog(0, ConveyingEquipmentType.MTC)}>Chi
                        tiết</Link>
                    </Stack>
                  </Grid>
                  <Grid item
                        xs={4}>
                    <Stack direction={'column'}
                           alignItems={'center'}
                           sx={infoBox}>
                      <InfoTitle color={'#E7752F'}>AGG</InfoTitle>
                      <InfoStats color={'#E7752F'}>0</InfoStats>
                      <Link fontSize={14}
                            onClick={() => onOpenConveyingEquipmentInfoDialog(0, ConveyingEquipmentType.AGG)}>Chi
                        tiết</Link>
                    </Stack>
                  </Grid>
                  <Grid item
                        xs={4}>
                    <Stack direction={'column'}
                           alignItems={'center'}
                           sx={infoBox}>
                      <InfoTitle color={'#ECB040'}>CSG</InfoTitle>
                      <InfoStats color={'#ECB040'}>0</InfoStats>
                      <Link fontSize={14}
                            onClick={() => onOpenConveyingEquipmentInfoDialog(0, ConveyingEquipmentType.CSG)}>Chi
                        tiết</Link>
                    </Stack>
                  </Grid>
                </Grid>
                <Typography fontSize={18}
                            fontWeight={500}
                            color={'primary.main'}>Tiến trình cơn bão/lụt</Typography>
                <WeatherForecastMap />
              </Stack>
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
          {/*<MBFActionButton type="submit">Lưu</MBFActionButton>*/}
        </DialogFooter>
      </MBFFormProvider>
    </DialogContainer>
  )
})
export default StormDetailDialog

const InfoTitle = styled(
  Typography,
  {
    shouldForwardProp: (prop) => !['color'].includes(prop)
  }
)<{ color: string }>(
  ({color}) => (
    {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: '25px',
      color: color
    }
  ))
const InfoStats = styled(
  Typography,
  {
    shouldForwardProp: (prop) => !['color'].includes(prop)
  }
)<{ color: string }>(
  ({color}) => (
    {
      fontSize: 50,
      fontWeight: 600,
      lineHeight: '35px',
      color: color
    }
  ))