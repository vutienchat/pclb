import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import { useForm } from 'react-hook-form'
import SearchPreparingStorm from './components/SearchPreparingStorm'
import MBFTable from '@src/components/shared/Table'
import { useEffect, useRef, useState } from 'react'
import usePagination from '@src/hooks/usePagination'
import { DialogRef } from '@src/types'
import ConfirmDelete, { ConfirmDeleteRef } from '@src/components/shared/Dialog/ConfirmDelete'
import {
  StormDetailDialogRef
} from '@src/pages/StormManagement/StormInformation/components/StormDetailDialog'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDeleteStorm, useGetStormList } from '@src/queries/storm'
import { StormList } from '@src/types/service/storm'
import useRefresh from '@src/hooks/useRefresh'
import Validation from '@src/utils/Validation'
import DateTime from '@src/utils/DateTime'
import CreateNewPrepareStormDialog
  from '@src/pages/PreparingStormManagement/BeforeStorm/Admin/components/CreateNewPrepareStormDialog'
import EditNewPrepareStormDialog
  from '@src/pages/PreparingStormManagement/BeforeStorm/Admin/components/EditNewPrepareStormDialog'
import PrepareStormDetailDialog
  from '@src/pages/PreparingStormManagement/BeforeStorm/Admin/components/PrepareStormDetailDialog'
import usePreparingStormManagement from '@src/pages/PreparingStormManagement/BeforeStorm/Admin/table/columns'
import useNotification from '@src/hooks/useNotification'
import SendNotificationDialog
  , {
  SendNotificationDialogRef
} from '@src/pages/PreparingStormManagement/BeforeStorm/Admin/components/SendNotificationDialog'

const schema = Validation.shape({
  searchText: Validation.string().trim().notRequired().optional(),
  level: Validation.string().optional().notRequired(),
  startReportingTime: Validation.date().optional().notRequired(),
  endReportingTime: Validation.date().optional().notRequired(),
  completedTime: Validation.date().optional().notRequired()
})
type FormValues = typeof schema.__outputType

const AdminPreparingBeforeStormManagement = () => {
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
  const sendNotyRef = useRef<SendNotificationDialogRef>(null)
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      level: '',
      searchText: '',
      startReportingTime: undefined,
      endReportingTime: undefined
    }
  })
  const getStorm = useGetStormList()
  const deleteStorm = useDeleteStorm()
  const [storms, setStorms] = useState<StormList[]>([])
  const [refresh, reFetch] = useRefresh()
  const notification = useNotification()

  useEffect(() => {
      setLoading(true)
      const { searchText, level, startReportingTime, endReportingTime, completedTime } = form.getValues()
      getStorm.mutate({
          pageNumber: pageNumber,
          pageSize: Number(pageSize),
          searchText: searchText || undefined,
          level: level ? Number(level) : undefined,
          startImpactTime: startReportingTime ? DateTime.StartOfDay(startReportingTime) : undefined,
          endImpactTime: endReportingTime ? DateTime.EndOfDay(endReportingTime) : undefined,
          completedTime: completedTime ? DateTime.ToString(completedTime) : undefined
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
        }
      )
    },
    [pageNumber, refresh]
  )

  const handleCreateNewStorm = () => {
    createNewStormDialogRef.current?.open('create')
  }

  const handleEditUser = (data: any) => () => {
    editNewStormDialogRef?.current?.open(data.id)
  }

  const handleShowUserDetail = (data: any) => () => {
    stormDetailRef.current?.open(data.id)
  }

  const handleSendNotification = (data: any) => () => {
    sendNotyRef.current?.open(data.id)
  }


  const handleDeleteStorm = (data: any) => () => {
    confirmDeleteRef.current?.open(data.id,
      `Bạn có chắc chắn muốn xoá vĩnh viễn khỏi hệ thống?`)
  }

  const { columns } = usePreparingStormManagement({
    pageIndex: pageNumber,
    pageSize: pageSize,
    onEdit: handleEditUser,
    onShowDetail: handleShowUserDetail,
    onDelete: handleDeleteStorm,
    onSendNoti: handleSendNotification
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
        if (res.responseCode === '200') {
          notification({
            message: 'Xoá thông tin chuẩn bị trước bão thành công',
            severity: 'success'
          })
          reFetch()
        } else {
          notification({
            message: res.responseMessage || 'Lỗi hệ thống',
            severity: 'error'
          })
        }


      },
      onError: (error) => {
        //
      }
    })
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
          <SearchPreparingStorm onOpenCreate={handleCreateNewStorm} />
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
      <CreateNewPrepareStormDialog ref={createNewStormDialogRef} reFetch={reFetch} />
      <EditNewPrepareStormDialog ref={editNewStormDialogRef} reFetch={reFetch} />
      <ConfirmDelete title={'Xoá thông tin chuẩn bị trước bão'} onSubmit={onConfirmDelete} ref={confirmDeleteRef} />
      <PrepareStormDetailDialog ref={stormDetailRef} />
      <SendNotificationDialog ref={sendNotyRef} />
    </>
  )
}

export default AdminPreparingBeforeStormManagement
