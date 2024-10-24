import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import DialogContainer from '@src/components/shared/Dialog/DialogContainer'
import DialogHeader from '@src/components/shared/Dialog/DialogHeader'
import DialogBody from '@src/components/shared/Dialog/DialogBody'
import DialogFooter from '@src/components/shared/Dialog/DialogFooter'
import Typography from '@mui/material/Typography'
import Validation from '@src/utils/Validation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import Grid from '@mui/material/Grid'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import MBFTable from '@src/components/shared/Table'
import usePagination from '@src/hooks/usePagination'
import useRefresh from '@src/hooks/useRefresh'
import MBFButton from '@src/components/shared/Button/MBFButton'
import { ConveyingEquipmentType, StationType } from '@src/constants/common'
import Box from '@mui/material/Box'
import useConveyingEquipmentTable from '@src/pages/StormManagement/StormInformation/table/conveyingEquipmentColumns'

interface ConveyingEquipmentInfoDialogProps {

}

export interface ConveyingEquipmentInfoDialogRef {
  open: (id: number, type: ConveyingEquipmentType) => void
  close: () => void
}

const schema = Validation.shape({
  search: Validation.string().notRequired().default('')
})

const ConveyingEquipmentInfoDialog = forwardRef<ConveyingEquipmentInfoDialogRef, ConveyingEquipmentInfoDialogProps>((props, ref) => {

  const [open, setOpen] = useState<boolean>(false)
  const [type, setType] = useState<ConveyingEquipmentType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [refresh, reFetch] = useRefresh()
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      search: ''
    }
  })
  const {
    paginationStates: { pageNumber, pageSize, total },
    onPageChange,
    onPageSizeChange,
    setPaginationStates
  } = usePagination()

  useEffect(() => {

  }, [pageNumber, pageSize, refresh])


  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = (id: number, type: ConveyingEquipmentType) => {
    setType(type)
    setOpen(true)
  }

  const handleSearch = () => {
    if (pageNumber === 1) {
      reFetch()
    } else {
      onPageChange(1)
    }
  }

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose
  }))

  const { columns } = useConveyingEquipmentTable({
    pageIndex: pageNumber,
    pageSize
  })

  return (
    <DialogContainer open={open} onClose={handleClose} maxWidth={'lg'}>
      <DialogHeader onClose={handleClose}>Thông tin thiết bị dẫn truyền</DialogHeader>
      <DialogBody>
        <Typography color="primary.main" fontSize={24} fontWeight={700}>
          Danh sách thiết bị dẫn truyền {type ? `${type}`.toUpperCase() : ''}
        </Typography>
        <Box
          sx={{
            height: 1,
            display: 'grid',
            gridTemplateRows: 'auto 1fr'
          }}
        >
          <MBFFormProvider form={form} onFinish={handleSearch}>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={3}>
                <MBFFormInput
                  name="search"
                  placeholder="Nhập từ khóa"
                  label="Tìm kiếm"
                  validate={Validation.string().max(200)}
                />
              </Grid>
              <Grid item xs={12} md={6} display="flex" alignItems={'flex-end'} columnGap={2}>
                <MBFActionButton type="submit">Tìm kiếm</MBFActionButton>
              </Grid>
            </Grid>
          </MBFFormProvider>
          <MBFTable<any>
            loading={loading}
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
              columnPinning: { left: ['username'] }
            }}
          />
        </Box>
      </DialogBody>
      <DialogFooter>
        <MBFButton actionType="cancel" onClick={handleClose}>
          Thoát
        </MBFButton>
      </DialogFooter>

    </DialogContainer>
  )
})
export default ConveyingEquipmentInfoDialog

