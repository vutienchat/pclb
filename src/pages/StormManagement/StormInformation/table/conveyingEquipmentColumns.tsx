import { useMemo } from 'react'
import Index from '@src/components/shared/Table/components/Index'
import { getColumnHelper, TableColumn, type HeadCell } from '@src/types'

const columnHelper = getColumnHelper<any>()

const HEAD_CELLS: HeadCell<any> = {
  index: 'STT',
  name: 'Tên thiết bị dẫn truyền',
  date: 'Thời gian down'
}

interface Props {
  pageIndex: number
  pageSize: number
}

const useConveyingEquipmentTable = (props: Props) => {
  const { pageIndex, pageSize } = props

  const columns: TableColumn<any> = useMemo(() => {
    return [
      Index<any>(pageIndex, pageSize),
      columnHelper.accessor('name', {
        id: 'name',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.name,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.name
        }
      }),
      columnHelper.accessor('date', {
        id: 'date',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.date,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.date
        }
      })
    ]
  }, [pageIndex, pageSize])

  return { columns }
}

export default useConveyingEquipmentTable
