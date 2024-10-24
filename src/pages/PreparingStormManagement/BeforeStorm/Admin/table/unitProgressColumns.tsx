import { useMemo } from 'react'
import Index from '@src/components/shared/Table/components/Index'
import useDialog from '@src/hooks/useDialog'
import { getColumnHelper, TableColumn, type HeadCell } from '@src/types'
import { Box, ListItem, Tooltip } from '@mui/material'
import MBFActionIconButton from '@src/components/shared/Button/MBFActionIconButton'

const columnHelper = getColumnHelper<any>()

const HEAD_CELLS: HeadCell<any> = {
  index: 'STT',
  unit: 'Phòng/Đài',
  location: 'Tổ',
  prepareTask: 'Số đầu mục cần chuẩn bị',
  completeTask: 'Số đầu mục đã hoàn thành',
  completeRate: 'Tỷ lệ hoàn thành',
  actions: 'Hành động'
}

interface Props {
  pageIndex: number
  pageSize: number
  onShowDetail: (data: any) => () => void
}

const useUnitProgressColummn = (props: Props) => {
  const { pageIndex, pageSize, onShowDetail } = props

  const columns: TableColumn<any> = useMemo(() => {
    return [
      Index<any>(pageIndex, pageSize),
      columnHelper.accessor('unit', {
        id: 'unit',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.unit,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.unit
        }
      }),
      columnHelper.accessor('location', {
        id: 'location',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.location,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.location
        }
      }),
      columnHelper.accessor('prepareTask', {
        id: 'prepareTask',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.prepareTask,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.prepareTask
        }
      }),
      columnHelper.accessor('completeTask', {
        id: 'completeTask',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.completeTask,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.completeTask
        }
      }),
      columnHelper.accessor('completeRate', {
        id: 'completeRate',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.completeRate,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.completeRate
        }
      }),
      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => HEAD_CELLS.actions,
        cell: (context: any) => {
          const data = context.row.original

          return (
            <ListItem sx={{ pl: 0 }}>
              <Tooltip title="Xem chi tiết">
                <Box>
                  <MBFActionIconButton actionType="view" onClick={onShowDetail(data)} />
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
  }, [pageIndex, pageSize, onShowDetail])

  return { columns }
}

export default useUnitProgressColummn
