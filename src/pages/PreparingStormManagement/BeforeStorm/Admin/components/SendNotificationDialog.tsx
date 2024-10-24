import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState
} from 'react'
import DialogContainer from '@src/components/shared/Dialog/DialogContainer'
import Validation from '@src/utils/Validation'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import DialogHeader from '@src/components/shared/Dialog/DialogHeader'
import MBFButton from '@src/components/shared/Button/MBFButton'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import DialogFooter from '@src/components/shared/Dialog/DialogFooter'
import DialogBody from '@src/components/shared/Dialog/DialogBody'
import MBFFormCheckboxGroup from '@src/components/shared/Form/MBFFormCheckboxGroup'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import {NotificationMethodOption} from '@src/constants/common'
import useNotification from "@src/hooks/useNotification";

interface SendNotificationDialogProps {

}

export interface SendNotificationDialogRef {
  open: (id: number) => void
}

const schema = Validation.shape({
  id: Validation.number()
    .default(0),
  notificationMethods: Validation.array()
    .min(1, 'Chọn ít nhất 1 phương thức thông báo')
    .default([])
})
type FormValue = typeof schema.__outputType

const SendNotificationDialog = forwardRef<SendNotificationDialogRef, SendNotificationDialogProps>((props, ref) => {
  const [open, setOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const notification = useNotification()

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: schema.getDefault()
  })

  const onOpen = (id: number) => {
    form.setValue('id', id)
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
    setStep(1)
    form.reset()
  }

  const onSendNotify = (value: FormValue) => {
    if (step === 1) {
      setStep(2)
    } else {
      setLoading(false)
      onClose()
      notification({
        message: 'Gửi thông báo thành công',
        severity: 'success'
      })
    }
  }

  const title = useMemo(() => {
    if (step === 1) {
      return 'Hình thức gửi thông báo'
    }
    return 'Gửi thông tin chuẩn bị trước bão'
  }, [step])

  useImperativeHandle(
    ref,
    () => (
      {
        open: onOpen
      }
    )
  )

  return (
    <DialogContainer open={open}
                     onClose={onClose}>
      <MBFFormProvider<any> form={form}
                            onFinish={onSendNotify}>
        <DialogHeader onClose={onClose}>{title}</DialogHeader>
        <DialogBody disableGutters
                    loading={form.formState.isSubmitting}>
          {step === 1 && (
            <MBFFormItem>
              <MBFFormCheckboxGroup
                label={'Lựa chọn các hình thức gửi thông báo'}
                name={'notificationMethods'}
                options={NotificationMethodOption}
                itemLayout={'vertical'}
              />
            </MBFFormItem>
          )}
          {step === 2 && (
            <Stack direction={'column'}
                   alignItems={'center'}>
              <SendIcon sx={{
                fontSize: 70,
                color: '#4ECA5B'
              }} />
              <Typography color={'error.main'}
                          fontSize={16}
                          fontWeight={500}>
                Bạn chắc chắn muốn gửi thông báo chuẩn bị ?
              </Typography>
            </Stack>
          )}
        </DialogBody>
        <DialogFooter>
          <MBFButton actionType="cancel"
                     onClick={onClose}>
            Huỷ
          </MBFButton>
          <MBFActionButton type="submit"
                           loading={loading}>Đồng ý</MBFActionButton>
        </DialogFooter>
      </MBFFormProvider>
    </DialogContainer>
  )
})
export default SendNotificationDialog