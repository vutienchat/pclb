import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'

import MBFTable from '@src/components/shared/Table'
import useMemberTable from '../table/member'
import { User } from '@src/types'
import useClientPagination from '../hooks/useClientPagination'

type TProps = {
  addedUsers: User[]
}

const DetailMemberTable = (props: TProps) => {
  const { addedUsers } = props

  const { columns: memberColumns } = useMemberTable({
    pageIndex: 1,
    pageSize: 10,
    addedUserIds: addedUsers.map((user) => user.id),
    onChangeAddedUserIds: () => {},
    isDisabled: true
  })
  const {
    currentData,
    currentPage: pageNumber,
    itemsPerPage: pageSize,
    onChangePage: onPageChange,
    onChangePageSize: onPageSizeChange
  } = useClientPagination(addedUsers)

  const users = useMemo(() => {
    return currentData()
  }, [addedUsers, pageNumber, pageSize])

  return (
    <Box
      sx={{
        height: '80%'
      }}
    >
      <Typography color='primary.main' mt={2} component='h6'>
        Danh sách người dùng
      </Typography>
      <MBFTable<any>
        columns={memberColumns}
        data={users}
        pagination={{
          page: pageNumber,
          total: addedUsers.length,
          pageSize: pageSize,
          onPageChange,
          onPageSizeChange
        }}
      />
    </Box>
  )
}

export default DetailMemberTable
