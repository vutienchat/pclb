import { useMemo } from 'react'
import { Box, ListItem, svgIconClasses, Tooltip, Typography } from '@mui/material'

import Index from '@src/components/shared/Table/components/Index'
import useDialog from '@src/hooks/useDialog'
import { getColumnHelper, TableColumn, User, type HeadCell } from '@src/types'
import MBFActionIconButton from '@src/components/shared/Button/MBFActionIconButton'

const columnHelper = getColumnHelper<any>()

const HEAD_CELLS: HeadCell<any> = {
  index: 'STT',

  fullName: 'Tên người dùng',
  mobile: 'Số điện thoại',
  email: 'Địa chỉ email',
  positionName: 'Chức vụ',
  teamName: 'Tổ',
  departmentName: 'Phòng/Đài',
  centerName: 'Đơn vị',

  actions: 'Hành động'
}

interface Props {
  pageIndex: number
  pageSize: number
  onEdit: (user: User) => () => void
  onShowDetail: (user: User) => () => void
  onDelete: (user: User) => () => void
}

const useUserTable = (props: Props) => {
  const { pageIndex, pageSize, onEdit, onShowDetail, onDelete } = props
  const dialog = useDialog()

  const columns: TableColumn<any> = useMemo(() => {
    return [
      Index<any>(pageIndex, pageSize),

      columnHelper.accessor('fullName', {
        id: 'fullName',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.fullName,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.fullName
        }
      }),
      columnHelper.accessor('mobile', {
        id: 'mobile',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.mobile,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.mobile
        }
      }),
      columnHelper.accessor('email', {
        id: 'email',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.email,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.email
        }
      }),
      columnHelper.accessor('positionName', {
        id: 'positionName',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.positionName,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.positionName
        }
      }),
      columnHelper.accessor('teamName', {
        id: 'teamName',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.teamName,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.teamName
        }
      }),

      columnHelper.accessor('departmentName', {
        id: 'departmentName',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.departmentName,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.departmentName
        }
      }),
      columnHelper.accessor('centerName', {
        id: 'centerName',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.centerName,
        cell: (context) => {
          const user: User = context.row.original
          return (
            <Typography>
              {user.region}-{user.centerName}
            </Typography>
          )
        },
        meta: {
          title: HEAD_CELLS.centerName
        }
      }),
      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => HEAD_CELLS.actions,
        cell: (context: any) => {
          const user = context.row.original

          return (
            <ListItem sx={{ pl: 0 }}>
              <Tooltip title='Xem chi tiết'>
                <Box>
                  <MBFActionIconButton actionType='view' onClick={onShowDetail(user)} />
                </Box>
              </Tooltip>
              <Tooltip title='Chỉnh sửa'>
                <Box>
                  <MBFActionIconButton actionType='edit' onClick={onEdit(user)} />
                </Box>
              </Tooltip>
              <Tooltip title='Xóa người dùng'>
                <Box>
                  <MBFActionIconButton actionType='delete' onClick={onDelete(user)} />
                </Box>
              </Tooltip>
            </ListItem>
          )
        },
        meta: {
          title: HEAD_CELLS.actions,
          align: 'center'
        }
      }
    ]
  }, [pageIndex, pageSize, onEdit, onShowDetail, dialog])

  return { columns }
}

export default useUserTable
