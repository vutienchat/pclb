import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Fragment, useEffect, useRef, useState } from 'react'

import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import PageWrapper from '@src/components/shared/Page/PageWrapper'
import MBFTable from '@src/components/shared/Table'
import SearchingWorks from './components/SearchingWorks'
import usePagination from '@src/hooks/usePagination'
import { DialogRef } from '@src/types'
import useWorksTable from './table/columns'
import WorkingDialog from './components/WorkingDialog'
import { useSearchWork } from '@src/queries'
import { SearchingWorkParams } from '@src/services'

export type SearchingWorksFormValues = {
  searchText: string
  groupId: number | null
}

const PreparingWorks = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [work, setWork] = useState<any[]>([])

  const workDialogRef = useRef<DialogRef<any>>(null)

  const {
    paginationStates: { pageNumber, pageSize, total },
    onPageChange,
    onPageSizeChange,
    setPaginationStates
  } = usePagination()

  const searchingWork = useSearchWork()

  const handleSearchWork = async (params: SearchingWorkParams) => {
    try {
      setLoading(true)
      const res = await searchingWork.mutateAsync(params)

      setWork(res.responseData.content || [])
      setPaginationStates((prev) => ({
        ...prev,
        total: res.responseData.totalElements,
        totalPage: res.responseData.totalPages
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const form = useForm<SearchingWorksFormValues>({
    mode: 'onChange',
    defaultValues: {
      searchText: '',
      groupId: null
    }
  })

  const { searchText, groupId } = form.getValues()

  useEffect(() => {
    handleSearchWork({
      searchText: searchText,
      pageNumber: pageNumber,
      pageSize: pageSize,
      groupId: groupId || null
    })
  }, [searchText, pageNumber, pageSize])

  const refresh = async () => {
    try {
      await handleSearchWork({
        searchText: searchText,
        pageNumber: pageNumber,
        pageSize: pageSize,
        groupId: groupId || null
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditWork = (workId: number) => () => {
    workDialogRef?.current?.open('edit', workId)
  }

  const handleShowWorkDetail = (workId: number) => () => {
    workDialogRef?.current?.open('detail', workId)
  }

  const handleDeleteWork = (workId: number) => () => {
    workDialogRef?.current?.open('delete', workId)
  }

  const handleAddingNewUser = () => {
    workDialogRef?.current?.open('create')
  }

  const { columns } = useWorksTable({
    pageIndex: pageNumber,
    pageSize: pageSize,
    onEdit: handleEditWork,
    onShowDetail: handleShowWorkDetail,
    onDelete: handleDeleteWork
  })

  const handleSearchingWorks = (values: SearchingWorksFormValues) => {
    setPaginationStates((prev) => ({
      ...prev,
      pageNumber: 1
    }))

    handleSearchWork({
      searchText: values.searchText,
      pageNumber: 1,
      pageSize: pageSize,
      groupId: values.groupId
    })
  }

  return (
    <Fragment>
      <PageWrapper title='Quản lý công việc cần thực hiện'>
        <Typography color='primary.main' fontSize={24} fontWeight={700}>
          Quản lý công việc cần thực hiện
        </Typography>
        <Box
          sx={{
            height: 1,
            display: 'grid',
            gridTemplateRows: 'auto auto 1fr'
          }}
        >
          <MBFFormProvider form={form} onFinish={handleSearchingWorks}>
            <SearchingWorks onAddingNewUser={handleAddingNewUser} />
          </MBFFormProvider>
          <Typography fontSize={20} fontWeight={600} mt={2}>
            Danh sách công việc cần thực hiện trước bão lụt
          </Typography>
          <MBFTable<any>
            loading={loading}
            columns={columns}
            data={work}
            pagination={{
              page: pageNumber,
              total: work.length,
              pageSize: pageSize,
              onPageChange,
              onPageSizeChange
            }}
            initialState={{
              columnPinning: { right: ['actions'] }
            }}
          />
        </Box>
      </PageWrapper>
      <WorkingDialog ref={workDialogRef} refresh={refresh} />
    </Fragment>
  )
}

export default PreparingWorks
