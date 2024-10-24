import { getColumnHelper, HeadCell, TableColumn } from '@src/types'
import { useMemo } from 'react'
import Index from '@src/components/shared/Table/components/Index'
import { Box, ListItem, Tooltip } from '@mui/material'
import MBFActionIconButton from '@src/components/shared/Button/MBFActionIconButton'

const columnHelper = getColumnHelper<any>()
const HEAD_CELLS: HeadCell<any> = {
  index: 'STT',

  stormName: 'Tên bão lũ',
  date: 'Thời gian ảnh hưởng',
  prepareTask: 'Số đầu mục cần chuẩn bị',
  completedTask: 'Số đầu mục hoàn thành',
  completeRate: 'Tỉ lệ hoàn thành',
  file: 'File đính kèm',
  actions: 'Hành động'
}

interface Props {
  pageIndex: number
  pageSize: number
  onEdit: (user: any) => () => void
  onShowDetail: (user: any) => () => void
  onDelete: (user: any) => () => void
}

const useUnitPrepareStormTable = (props: Props) => {
  const { pageIndex, pageSize, onEdit, onShowDetail, onDelete} = props

  const columns: TableColumn<any> = useMemo(() => {
    return [
      Index<any>(pageIndex, pageSize),
      columnHelper.accessor('stormName', {
        id: 'stormName',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.stormName,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.stormName
        }
      }),
      columnHelper.accessor('date', {
        id: 'date',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.date,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.date
        }
      }),
      columnHelper.accessor('prepareTask', {
        id: 'prepareTask',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.prepareTask,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.prepareTask
        }
      }),
      columnHelper.accessor('completedTask', {
        id: 'completedTask',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.completedTask,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.completedTask
        }
      }),
      columnHelper.accessor('completeRate', {
        id: 'completeRate',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.completeRate,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.completeRate
        }
      }),
      columnHelper.accessor('file', {
        id: 'file',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.file,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.file
        }
      }),
      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => HEAD_CELLS.actions,
        cell: (context: any) => {
          const storm = context.row.original

          return (
            <ListItem sx={{ pl: 0 }}>
              <Tooltip title="Xem chi tiết">
                <Box>
                  <MBFActionIconButton actionType="view" onClick={onShowDetail(storm)} />
                </Box>
              </Tooltip>
              <Tooltip title="Chỉnh sửa">
                <Box>
                  <MBFActionIconButton actionType="edit" onClick={onEdit(storm)} />
                </Box>
              </Tooltip>
              <Tooltip title="Xóa người dùng">
                <Box>
                  <MBFActionIconButton actionType="delete" onClick={onDelete(storm)} />
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
  }, [pageIndex, pageSize])

  return { columns }
}
export default useUnitPrepareStormTable