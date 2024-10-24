import { useEffect, useState } from 'react'
import { Box, Stack, TextField, Typography } from '@mui/material'

import MBFTable from '@src/components/shared/Table'
import useMemberTable from '../table/member'
import usePagination from '@src/hooks/usePagination'
import { useSearchUser } from '@src/queries'
import { SearchingUserParams } from '@src/services'
import { DialogType, User } from '@src/types'
import MBFButton from '@src/components/shared/Button/MBFButton'

type TProps = {
  type: DialogType | null
  addedUserIds: number[]
  onChangeAddedUserIds: (id: number) => void
}

const MemberTable = (props: TProps) => {
  const { type, addedUserIds, onChangeAddedUserIds } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [searchText, setSearchText] = useState<string>('')

  const { columns: memberColumns } = useMemberTable({
    pageIndex: 1,
    pageSize: 10,
    addedUserIds,
    onChangeAddedUserIds,
    isDisabled: type === 'detail'
  })
  const {
    paginationStates: { pageNumber, pageSize, total },
    onPageChange,
    onPageSizeChange,
    setPaginationStates
  } = usePagination()

  const searchingUsers = useSearchUser()

  const handleSearchUsers = async (params: SearchingUserParams) => {
    setLoading(true)
    const res = await searchingUsers.mutateAsync(params)

    setUsers(res.responseData.content || [])
    setPaginationStates((prev) => ({
      ...prev,
      total: res.responseData.totalElements,
      totalPage: res.responseData.totalPages
    }))
    setLoading(false)
  }

  useEffect(() => {
    handleSearchUsers({
      searchText: searchText,
      centerId: null,
      positionId: null,
      pageNumber: pageNumber,
      pageSize: pageSize
    })
  }, [pageNumber, pageSize])

  const onchangeSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (value !== searchText) {
      setSearchText(value)
    }
  }

  const handleSearchingUsers = () => {
    setPaginationStates((prev) => ({
      ...prev,
      pageNumber: 1
    }))

    handleSearchUsers({
      searchText: searchText,
      centerId: null,
      positionId: null,
      pageNumber: 1,
      pageSize: pageSize
    })
  }

  return (
    <Box
      sx={{
        height: '80%'
      }}
    >
      <Typography color='primary.main' mt={2} component='h6'>
        Danh sách người dùng
      </Typography>
      <Stack justifyContent='flex-start' alignItems='flex-end' mb={1}>
        <TextField
          value={searchText}
          onChange={onchangeSearchUser}
          placeholder='Nhập từ khóa'
          sx={{ minWidth: 200, maxWidth: 300 }}
        />
        <MBFButton actionType='search' onClick={handleSearchingUsers}>
          Tìm kiếm
        </MBFButton>
      </Stack>
      <MBFTable<any>
        loading={loading}
        columns={memberColumns}
        data={users}
        pagination={{
          page: pageNumber,
          total: total,
          pageSize: pageSize,
          onPageChange,
          onPageSizeChange
        }}
      />
    </Box>
  )
}

export default MemberTable
