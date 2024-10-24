import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import MBFTable from '@src/components/shared/Table'
import PageWrapper from '@src/components/shared/Page/PageWrapper'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import SearchStormManagement from './components/SearchStormManagement'
import useStormManagementTable from './table/columns'
import { DialogRef } from '@src/types'
import CreateNewStormDialog from './components/CreateNewStormDialog'
import EditNewStormDialog from './components/EditNewStormDialog'
import usePagination from '@src/hooks/usePagination'
import { useDeleteStorm, useGetStormList } from '@src/queries/storm'
import ConfirmDelete, { ConfirmDeleteRef } from '@src/components/shared/Dialog/ConfirmDelete'
import StormDetailDialog, {
  StormDetailDialogRef
} from '@src/pages/StormManagement/StormInformation/components/StormDetailDialog'
import { StormList } from '@src/types/service/storm'
import Validation from '@src/utils/Validation'
import { yupResolver } from '@hookform/resolvers/yup'
import useRefresh from '@src/hooks/useRefresh'
import StationInfoDialog, {
  StationInfoDialogRef
} from '@src/pages/StormManagement/StormInformation/components/StationInfoDialog'
import { ConveyingEquipmentType, StationType } from '@src/constants/common'
import ConveyingEquipmentInfoDialog
  , {
  ConveyingEquipmentInfoDialogRef
} from '@src/pages/StormManagement/StormInformation/components/ConveyingEquipmentInfoDialog'
import useNotification from '@src/hooks/useNotification'

const schema = Validation.shape({
  searchText: Validation.string().trim().notRequired().optional().default(''),
  level: Validation.string().optional().notRequired()
})
type FormValues = typeof schema.__outputType

const StormManagementPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const {
    paginationStates: { pageNumber, pageSize, total },
    onPageChange,
    onPageSizeChange,
    setPaginationStates
  } = usePagination()
  const createNewStormDialogRef = useRef<DialogRef<any>>(null)
  const editNewStormDialogRef = useRef<StormDetailDialogRef>(null)
  const confirmDeleteRef = useRef<ConfirmDeleteRef>(null)
  const stormDetailRef = useRef<StormDetailDialogRef>(null)
  const stationInfoDialogRef = useRef<StationInfoDialogRef>(null)
  const conveyingEquipmentDialogRef = useRef<ConveyingEquipmentInfoDialogRef>(null)
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  })
  const getStorm = useGetStormList()
  const deleteStorm = useDeleteStorm()
  const [storms, setStorms] = useState<StormList[]>([])
  const [refresh, reFetch] = useRefresh()
  const notification = useNotification()

  useEffect(() => {
    setLoading(true)
    const { searchText, level } = form.getValues()
    getStorm.mutate({
      pageNumber: pageNumber,
      pageSize: Number(pageSize),
      searchText: searchText || undefined,
      level: level ? Number(level) : undefined
    }, {
      onSuccess: (res) => {
        setLoading(false)
        setStorms(res.responseData.content)
        setPaginationStates(prev => ({
          ...prev,
          total: res.responseData.totalElements
        }))
      },
      onError: (error) => {
        console.log(error)
        setLoading(false)
      }
    })
  }, [pageNumber, refresh])

  const handleCreateNewStorm = () => {
    createNewStormDialogRef.current?.open('create')
    // stormDetailRef.current?.open(1)
  }

  const handleEditUser = (data: any) => () => {
    editNewStormDialogRef?.current?.open(data.id)
  }

  const handleShowUserDetail = (data: any) => () => {
    stormDetailRef.current?.open(data.id)
    // userDialogRef?.current?.open('detail', user)
  }

  const handleDeleteStorm = (data: any) => () => {
    confirmDeleteRef.current?.open(data.id,
      `Bạn có chắc chắn muốn xoá cơn bão/lụt ${data.name}?`)
  }

  const { columns } = useStormManagementTable({
    pageIndex: pageNumber,
    pageSize: pageSize,
    onEdit: handleEditUser,
    onShowDetail: handleShowUserDetail,
    onDelete: handleDeleteStorm
  })

  const handleSearching = (value: any) => {
    if (pageNumber === 1) {
      reFetch()
    } else {
      onPageChange(1)
    }
  }

  const onConfirmDelete = (id: number) => {
    deleteStorm.mutate(id, {
      onSuccess: (res) => {
        notification({
          message: 'Xoá cơn bão/lụt thành công',
          severity: 'success'
        })
        reFetch()
      },
      onError: (error) => {
        //
      }
    })
  }

  const onOpenStationInfoDialog = (id: number, type: StationType) => {
    stationInfoDialogRef.current?.open(id, type)
  }

  const onOpenConveyingEquipmentInfoDialog = (id: number, type: ConveyingEquipmentType) => {
    conveyingEquipmentDialogRef.current?.open(id, type)
  }

  return (
    <PageWrapper title="Quản lý thông tin cơn bão">
      <Typography color="primary.main" fontSize={24} fontWeight={700}>
        Quản lý cơn bão
      </Typography>
      <Box
        sx={{
          height: 1,
          display: 'grid',
          gridTemplateRows: 'auto 1fr'
        }}
      >
        <MBFFormProvider form={form} onFinish={handleSearching}>
          <SearchStormManagement onCreateNewStorm={handleCreateNewStorm} />
        </MBFFormProvider>
        <MBFTable<any>
          loading={loading}
          columns={columns}
          data={storms}
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
      <CreateNewStormDialog ref={createNewStormDialogRef} reFetch={reFetch} />
      <EditNewStormDialog ref={editNewStormDialogRef} reFetch={reFetch} />
      <ConfirmDelete title={'Xoá cơn bão/lụt'} onSubmit={onConfirmDelete} ref={confirmDeleteRef} />
      <StormDetailDialog ref={stormDetailRef}
                         onOpenConveyingEquipmentInfoDialog={onOpenConveyingEquipmentInfoDialog}
                         onOpenStationInfoDialog={onOpenStationInfoDialog} />
      <StationInfoDialog ref={stationInfoDialogRef} />
      <ConveyingEquipmentInfoDialog ref={conveyingEquipmentDialogRef} />
    </PageWrapper>
  )
}

export default StormManagementPage
