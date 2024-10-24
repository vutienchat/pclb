import { useMemo } from 'react'
import { Box, ListItem, Tooltip } from '@mui/material'

import Index from '@src/components/shared/Table/components/Index'
import useDialog from '@src/hooks/useDialog'
import { getColumnHelper, TableColumn, type HeadCell } from '@src/types'
import MBFActionIconButton from '@src/components/shared/Button/MBFActionIconButton'
import { StormList } from '@src/types/service/storm'
import Typography from '@mui/material/Typography'
import { StormStatus, StormStatusLabel } from '@src/constants/common'

const columnHelper = getColumnHelper<StormList>()

const HEAD_CELLS: HeadCell<any> = {
  index: 'STT',

  stormName: 'Tên bão lũ',
  level: 'Cấp độ',
  affectedProvinces: 'Các tỉnh ảnh hưởng',
  timeInfluenceail: 'Thời gian ảnh hưởng',
  reportTime: 'Thời gian báo cáo',
  completeTime: 'Thời gian hoàn thành',
  notifyGroup: 'Nhóm người nhận thông báo',
  status: 'Trạng thái',
  actions: 'Hành động'
}

interface Props {
  pageIndex: number
  pageSize: number
  onEdit: (user: any) => () => void
  onShowDetail: (user: any) => () => void
  onDelete: (user: any) => () => void
  onSendNoti: (user: any) => () => void
}

const usePreparingStormManagement = (props: Props) => {
  const { pageIndex, pageSize, onEdit, onShowDetail, onDelete, onSendNoti } = props
  const dialog = useDialog()

  const columns: TableColumn<any> = useMemo(() => {
    return [
      Index<any>(pageIndex, pageSize),

      columnHelper.accessor('name', {
        id: 'stormName',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.stormName,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.stormName
        }
      }),
      columnHelper.accessor('level', {
        id: 'level',
        size: 50,
        enableSorting: true,
        header: () => HEAD_CELLS.level,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.level
        }
      }),
      columnHelper.accessor('provinces', {
        id: 'provinces',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.affectedProvinces,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.affectedProvinces
        }
      }),
      columnHelper.display({
        id: 'timeInfluenceail',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.timeInfluenceail,
        cell: (context) => {
          const row = context.row.original
          return `${row.startImpactTime} - ${row.endImpactTime}`
        },
        meta: {
          title: HEAD_CELLS.timeInfluenceail
        }
      }),
      columnHelper.accessor('reportingTime', {
        id: 'reportingTime',
        size: 100,
        enableSorting: true,
        header: () => HEAD_CELLS.reportTime,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.reportTime
        }
      }),
      columnHelper.accessor('preparationCompletionTimeBeforeStorm', {
        id: 'preparationCompletionTimeBeforeStorm',
        size: 100,
        enableSorting: true,
        header: () => HEAD_CELLS.completeTime,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.completeTime
        }
      }),
      columnHelper.accessor('groupNames', {
        id: 'groupNames',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.notifyGroup,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.notifyGroup
        }
      }),
      columnHelper.accessor('status', {
        id: 'status',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.status,
        cell: (context) => (
          <Typography color={context.getValue() === StormStatus.Active ? 'success.main' : 'error.main'}>
            {StormStatusLabel[context.getValue() as StormStatus]}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.status
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
              <Tooltip title="Gửi thông báo">
                <Box>
                  <MBFActionIconButton actionType="send" onClick={onSendNoti(storm)} />
                </Box>
              </Tooltip>
              <Tooltip title="Xóa">
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
  }, [pageIndex, pageSize, onEdit, onShowDetail, dialog, onDelete, onSendNoti])

  return { columns }
}

export default usePreparingStormManagement
