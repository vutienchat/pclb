import { Fragment, useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import PageWrapper from '@src/components/shared/Page/PageWrapper'
import SearchingUsers from './components/SearchingUsers'
import MBFTable from '@src/components/shared/Table'
import UserDialog from './components/UserDialog'
import type { DialogRef, User } from '@src/types'
import useUserTable from './table/columns'
import { useSearchUser } from '@src/queries'
import usePagination from '@src/hooks/usePagination'
import type { SearchingUserParams } from '@src/services'

export type SearchingUsersFormValues = {
  searchText: string
  centerId: number | null
  positionId: number | null
}

const Users = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const {
    paginationStates: { pageNumber, pageSize, total },
    onPageChange,
    onPageSizeChange,
    setPaginationStates
  } = usePagination()

  const userDialogRef = useRef<DialogRef<any>>(null)

  const searchingUsers = useSearchUser()

  const handleSearchUsers = async (params: SearchingUserParams) => {
    try {
      setLoading(true)
      const res = await searchingUsers.mutateAsync(params)

      setUsers(res.responseData.content || [])
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
      searchText: '',
      centerId: 0,
      positionId: 0
    }
  })

  const { centerId, positionId, searchText } = form.getValues()

  useEffect(() => {
    handleSearchUsers({
      searchText: searchText,
      centerId: centerId || null,
      positionId: positionId || null,
      pageNumber: pageNumber,
      pageSize: pageSize
    })
  }, [searchText, positionId, centerId, pageNumber, pageSize])

  const refresh = async () => {
    try {
      await handleSearchUsers({
        searchText: searchText,
        centerId: centerId || null,
        positionId: positionId || null,
        pageNumber: pageNumber,
        pageSize: pageSize
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditUser = (user: User) => () => {
    userDialogRef?.current?.open('edit', user)
  }

  const handleShowUserDetail = (user: User) => () => {
    userDialogRef?.current?.open('detail', user)
  }

  const handleDeleteUser = (user: User) => () => {
    userDialogRef?.current?.open('delete', user)
  }

  const { columns } = useUserTable({
    pageIndex: pageNumber,
    pageSize: pageSize,
    onEdit: handleEditUser,
    onShowDetail: handleShowUserDetail,
    onDelete: handleDeleteUser
  })

  const handleSearchingUsers = async (values: SearchingUsersFormValues) => {
    setPaginationStates((prev) => ({
      ...prev,
      pageNumber: 1
    }))

    handleSearchUsers({
      searchText: searchText,
      centerId: centerId || null,
      positionId: positionId || null,
      pageNumber: 1,
      pageSize: pageSize
    })
  }

  const handleAddingNewUser = () => {
    userDialogRef?.current?.open('create')
  }

  return (
    <Fragment>
      <PageWrapper title='Thông tin người dùng'>
        <Typography color='primary.main' fontSize={24} fontWeight={700} mb={2}>
          Thông tin người dùng
        </Typography>
        <Box
          sx={{
            height: 1,
            display: 'grid',
            gridTemplateRows: 'auto auto 1fr'
          }}
        >
          <MBFFormProvider form={form} onFinish={handleSearchingUsers}>
            <SearchingUsers onAddingNewUser={handleAddingNewUser} />
          </MBFFormProvider>
          <Typography fontSize={20} fontWeight={600} mt={2}>
            Danh sách người dùng
          </Typography>
          <MBFTable<any>
            loading={loading}
            columns={columns}
            data={users}
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
      <UserDialog ref={userDialogRef} refresh={refresh} />
    </Fragment>
  )
}

export default Users
