import { Fragment, useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import PageWrapper from '@src/components/shared/Page/PageWrapper'
import SearchingUsers from './components/SearchingUsers'
import MBFTable from '@src/components/shared/Table'
import type { DialogRef, GroupUser } from '@src/types'
import { useSearchGroupUser } from '@src/queries'
import usePagination from '@src/hooks/usePagination'
import type { SearchingGroupUserParams } from '@src/services'
import useGroupUserTable from './table/columns'
import GroupUserDialog from './components/GroupUserDialog'

export type SearchingUsersFormValues = {
  searchText: string
}

const GroupUserPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [groupUser, setGroupUser] = useState<GroupUser[]>([])
  const {
    paginationStates: { pageNumber, pageSize, total },
    onPageChange,
    onPageSizeChange,
    setPaginationStates
  } = usePagination()

  const groupUserDialogRef = useRef<DialogRef<any>>(null)

  const searchingGroupUser = useSearchGroupUser()

  const handleSearchGroupUser = async (params: SearchingGroupUserParams) => {
    try {
      setLoading(true)
      const res = await searchingGroupUser.mutateAsync(params)

      setGroupUser(res.responseData.content || [])
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

  const form = useForm<SearchingUsersFormValues>({
    mode: 'onChange',
    defaultValues: {
      searchText: ''
    }
  })

  const { searchText } = form.getValues()

  useEffect(() => {
    handleSearchGroupUser({
      searchText: searchText,
      pageNumber: pageNumber,
      pageSize: pageSize
    })
  }, [searchText, pageNumber, pageSize])

  const refresh = async () => {
    try {
      await handleSearchGroupUser({
        searchText: searchText,
        pageNumber: pageNumber,
        pageSize: pageSize
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditGroupUser = (groupUser: GroupUser) => () => {
    groupUserDialogRef?.current?.open('edit', groupUser)
  }

  const handleShowGroupUserDetail = (groupUser: GroupUser) => () => {
    groupUserDialogRef?.current?.open('detail', groupUser)
  }

  const handleDeleteGroupUser = (groupUser: GroupUser) => () => {
    groupUserDialogRef?.current?.open('delete', groupUser)
  }

  const { columns } = useGroupUserTable({
    pageIndex: pageNumber,
    pageSize: pageSize,
    onEdit: handleEditGroupUser,
    onShowDetail: handleShowGroupUserDetail,
    onDelete: handleDeleteGroupUser
  })

  const handleSearchingGroupUser = async (values: SearchingUsersFormValues) => {
    setPaginationStates((prev) => ({
      ...prev,
      pageNumber: 1
    }))

    handleSearchGroupUser({
      searchText: searchText,
      pageNumber: 1,
      pageSize: pageSize
    })
  }

  const handleAddingNewGroupUser = () => {
    groupUserDialogRef?.current?.open('create')
  }

  return (
    <Fragment>
      <PageWrapper title='Quản lý nhóm người dùng'>
        <Typography color='primary.main' fontSize={24} fontWeight={700} mb={2}>
          Quản lý nhóm người dùng
        </Typography>
        <Box
          sx={{
            height: 1,
            display: 'grid',
            gridTemplateRows: 'auto auto 1fr'
          }}
        >
          <MBFFormProvider form={form} onFinish={handleSearchingGroupUser}>
            <SearchingUsers onAddingNewUser={handleAddingNewGroupUser} />
          </MBFFormProvider>
          <Typography fontSize={20} fontWeight={600} mt={2}>
            Danh sách nhóm người dùng
          </Typography>
          <MBFTable<any>
            loading={loading}
            columns={columns}
            data={groupUser}
            pagination={{
              page: pageNumber,
              total: total,
              pageSize: pageSize,
              onPageChange,
              onPageSizeChange
            }}
            initialState={{
              columnPinning: { left: ['fullName'], right: ['actions'] }
            }}
          />
        </Box>
      </PageWrapper>
      <GroupUserDialog ref={groupUserDialogRef} refresh={refresh} />
    </Fragment>
  )
}

export default GroupUserPage
