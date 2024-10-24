import DialogContainer from '@src/components/shared/Dialog/DialogContainer'
import { forwardRef, useImperativeHandle, useState } from 'react'
import DialogHeader from '@src/components/shared/Dialog/DialogHeader'
import Validation from '@src/utils/Validation'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DialogFooter from '@src/components/shared/Dialog/DialogFooter'
import MBFButton from '@src/components/shared/Button/MBFButton'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import DialogBody from '@src/components/shared/Dialog/DialogBody'
import Typography from '@mui/material/Typography'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import { mockTask } from '@src/constants/tempData'
import UnitTaskTable from '@src/pages/PreparingStormManagement/BeforeStorm/Unit/components/UnitTaskTable'

interface UnitTaskCheckListDialogProps {

}

export interface UnitTaskCheckListDialogRef {
  open: (id: number) => void
}

const schema = Validation.shape({
  taskId: Validation.array().notRequired().default([]),
  id: Validation.number().notRequired().default(0),
  tasks: Validation.array().of(
    Validation.shape({
      name: Validation.string().optional().notRequired().default(''),
      description: Validation.string().optional().notRequired().default(''),
      valueType: Validation.number().notRequired().default(0),
      mainTaskId: Validation.number().notRequired().default(0),
      value: Validation.string().optional().notRequired().default('')
    })
  ).default([])
})
type FormValue = typeof schema.__outputType
const UnitTaskCheckListDialog = forwardRef<UnitTaskCheckListDialogRef, UnitTaskCheckListDialogProps>((props, ref) => {
  const form = useForm<FormValue>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  })
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { fields, replace } = useFieldArray({
    control: form.control,
    name: 'tasks'
  })

  const onOpen = (id: number) => {
    setOpen(true)
    form.setValue('id', id)
    replace(mockTask)
    console.log(mockTask)
  }

  const onClose = () => {
    console.log(form.formState)
    setOpen(false)
    form.reset()
  }

  useImperativeHandle(ref, () => ({
    open: onOpen
  }))

  const onSubmit = (data: FormValue) => {
    console.log(data)
  }

  return (
    <DialogContainer open={open} onClose={onClose} maxWidth={'lg'}>
      <MBFFormProvider<FormValue> form={form} onFinish={onSubmit}>
        <DialogHeader onClose={onClose}>
          Các công việc cần chuẩn bị trước bão lụt
        </DialogHeader>
        <DialogBody disableGutters loading={form.formState.isSubmitting}>
          <Typography fontSize={20} fontWeight={500}>
            [PCLB] Bạn nhận được yêu cầu hoàn thành checklist công việc chuẩn bị trước bão
            dành cho quản lý trạm (cơn bão số xx)
          </Typography>
          <Typography>
            Các công việc cần chuẩn bị
          </Typography>
          <UnitTaskTable fields={fields} />
        </DialogBody>
        <DialogFooter>
          <MBFButton actionType="cancel" onClick={onClose}>
            Huỷ
          </MBFButton>
          <MBFActionButton type="submit" loading={loading}>
            Xác nhận
          </MBFActionButton>
        </DialogFooter>
      </MBFFormProvider>
    </DialogContainer>
  )
})
export default UnitTaskCheckListDialog