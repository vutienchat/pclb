import { useMemo } from 'react'
import Index from '@src/components/shared/Table/components/Index'
import { getColumnHelper, TableColumn, type HeadCell } from '@src/types'

const columnHelper = getColumnHelper<any>()

const HEAD_CELLS: HeadCell<any> = {
  index: 'STT',
  stationName: 'Tên trạm',
  priority: 'Phân lớp ưu tiên',
  lat: 'Lat',
  long: 'Long',
  classify: 'Phân loại',
  cause: 'Nguyên nhân MLL',
  dvt: 'ĐVT',
  tvt: 'TVT',
  mllStart: 'MLL đầu tiên',
  mllEnd: 'MLL hoàn thành',
  network: 'Network',
  level: 'Mức độ',
  networkMll: 'Network MLL',
  address: 'Địa chỉ'
}

interface Props {
  pageIndex: number
  pageSize: number
}

const useStationTable = (props: Props) => {
  const { pageIndex, pageSize } = props

  const columns: TableColumn<any> = useMemo(() => {
    return [
      Index<any>(pageIndex, pageSize),
      columnHelper.accessor('stationName', {
        id: 'stationName',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.stationName,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.stationName
        }
      }),
      columnHelper.accessor('priority', {
        id: 'priority',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.priority,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.priority
        }
      }),
      columnHelper.accessor('lat', {
        id: 'lat',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.lat,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.lat
        }
      }),
      columnHelper.accessor('long', {
        id: 'long',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.long,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.long
        }
      }),
      columnHelper.accessor('classify', {
        id: 'classify',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.classify,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.classify
        }
      }),
      columnHelper.accessor('cause', {
        id: 'cause',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.cause,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.cause
        }
      }),
      columnHelper.accessor('dvt', {
        id: 'dvt',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.dvt,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.dvt
        }
      }),
      columnHelper.accessor('tvt', {
        id: 'tvt',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.tvt,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.tvt
        }
      }),
      columnHelper.accessor('mllStart', {
        id: 'mllStart',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.mllStart,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.mllStart
        }
      }),
      columnHelper.accessor('mllEnd', {
        id: 'mllEnd',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.mllEnd,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.mllEnd
        }
      }),
      columnHelper.accessor('network', {
        id: 'network',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.network,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.network
        }
      }),
      columnHelper.accessor('level', {
        id: 'level',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.level,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.level
        }
      }),
      columnHelper.accessor('networkMll', {
        id: 'networkMll',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.networkMll,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.networkMll
        }
      }),
      columnHelper.accessor('address', {
        id: 'address',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.address,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.address
        }
      }),
    ]
  }, [pageIndex, pageSize])

  return { columns }
}

export default useStationTable
