import { useMemo } from 'react'
import { Box, ListItem, Tooltip } from '@mui/material'

import Index from '@src/components/shared/Table/components/Index'
import useDialog from '@src/hooks/useDialog'
import { getColumnHelper, TableColumn, type HeadCell } from '@src/types'
import MBFActionIconButton from '@src/components/shared/Button/MBFActionIconButton'

const columnHelper = getColumnHelper<any>()

const HEAD_CELLS: HeadCell<any> = {
  index: 'STT',

  roleCode: 'Mã vai trò',
  roleName: 'Tên vai trò',
  description: 'Mô tả',

  actions: 'Hành động'
}

interface Props {
  pageIndex: number
  pageSize: number
  onEdit: (permission: any) => () => void
  onShowDetail: (permission: any) => () => void
}

const usePermissionTable = (props: Props) => {
  const { pageIndex, pageSize, onEdit, onShowDetail } = props
  const dialog = useDialog()

  const columns: TableColumn<any> = useMemo(() => {
    return [
      Index<any>(pageIndex, pageSize),

      columnHelper.accessor('roleCode', {
        id: 'roleCode',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.roleCode,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.roleCode
        }
      }),
      columnHelper.accessor('roleName', {
        id: 'roleName',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.roleName,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.roleName
        }
      }),
      columnHelper.accessor('description', {
        id: 'description',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.description,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.description
        }
      }),
      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => HEAD_CELLS.actions,
        cell: (context: any) => {
          const permission = context.row.original

          return (
            <ListItem sx={{ pl: 0 }}>
              <Tooltip title='Xem chi tiết'>
                <Box>
                  <MBFActionIconButton actionType='view' onClick={onShowDetail(permission)} />
                </Box>
              </Tooltip>
              <Tooltip title='Chỉnh sửa'>
                <Box>
                  <MBFActionIconButton actionType='edit' onClick={onEdit(permission)} />
                </Box>
              </Tooltip>
              <Tooltip title='Phân quyền'>
                <Box>
                  <MBFActionIconButton actionType='settings' onClick={onEdit(permission)} />
                </Box>
              </Tooltip>
              <Tooltip title='Xóa vai trò'>
                <Box>
                  <MBFActionIconButton actionType='delete' onClick={onEdit(permission)} />
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

export default usePermissionTable
