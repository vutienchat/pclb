import Typography from '@mui/material/Typography'
import Validation from '@src/utils/Validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import useUnitPrepareStormTable from '@src/pages/PreparingStormManagement/BeforeStorm/Unit/table/columns'
import usePagination from '@src/hooks/usePagination'
import Box from '@mui/material/Box'
import useRefresh from '@src/hooks/useRefresh'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import MBFTable from '@src/components/shared/Table'
import UnitSearchPreparingStorm
  from '@src/pages/PreparingStormManagement/BeforeStorm/Unit/components/UnitSearchPreparingStorm'
import UnitTaskCheckListDialog
  , {
  UnitTaskCheckListDialogRef
} from '@src/pages/PreparingStormManagement/BeforeStorm/Unit/components/UnitTaskCheckListDialog'

const schema = Validation.shape({
  keyword: Validation.string().optional(),
  level: Validation.number().optional().notRequired(),
  startImpactTime: Validation.date().optional().default(undefined),
  endImpactTime: Validation.date().optional().default(undefined),
})
type FormValue = typeof schema.__outputType;
const ManagePreparingBeforeStormPage = () => {
  const form = useForm<FormValue>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  })
  const {
    paginationStates: { pageNumber, pageSize, total },
    onPageChange,
    onPageSizeChange
  } = usePagination()
  const [loading, setLoading] = useState<boolean>(false)
  const [refresh, reFetch] = useRefresh()
  const taskCheckListRef = useRef<UnitTaskCheckListDialogRef>(null)

  const handleEdit = (data: any) => () => {

  }

  const { columns } = useUnitPrepareStormTable({
    pageIndex: pageNumber,
    pageSize,
    onEdit: handleEdit,
    onDelete: handleEdit,
    onShowDetail: handleEdit
  })

  const handleCreate = () => {
    taskCheckListRef.current?.open(1)
  }

  const handleSearching = (value: any) => {
    if (pageNumber === 1) {
      reFetch()
    } else {
      onPageChange(1)
    }
  }

  return (
    <>
      <Typography color="primary.main" fontSize={24} fontWeight={700}>
        Quản lý thông tin chuẩn bị trước bão
      </Typography>
      <Box
        sx={{
          height: 1,
          display: 'grid',
          gridTemplateRows: 'auto 1fr'
        }}
      >
        <MBFFormProvider form={form} onFinish={handleSearching}>
          <UnitSearchPreparingStorm onOpenCreate={handleCreate} />
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
            columnPinning: { left: ['username'], right: ['actions'] }
          }}
        />
      </Box>
      <UnitTaskCheckListDialog ref={taskCheckListRef} />
    </>
  )
}

export default ManagePreparingBeforeStormPage
