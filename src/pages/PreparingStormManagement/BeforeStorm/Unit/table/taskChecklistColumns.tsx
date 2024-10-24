import { getColumnHelper, HeadCell, TableColumn } from '@src/types'
import { useMemo } from 'react'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFFormRadio from '@src/components/shared/Form/MBFFormRadio'

const columnHelper = getColumnHelper<Temp>()
const HEAD_CELLS: HeadCell<any> = {
  taskName: 'Tên công việc',
  taskDetail: 'Chi tiết công việc',
  result: 'Khai báo'
}

interface Props {

}

type Temp = {
  mainTaskId: number
  name: string
  description: string
  value: string
  valueType: number
}

const useTaskCheckListTable = () => {
  const columns: TableColumn<any> = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        id: 'name',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.taskName,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.taskName,
          rowSpan: (_, row, rows) => {
            const mainTaskList = rows.filter(i => i.original.mainTaskId === row.original.mainTaskId)
            if (mainTaskList.indexOf(row) === 0) {
              return mainTaskList.length
            }
            return 0
          }
        }
      }),
      columnHelper.accessor('description', {
        id: 'description',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.taskDetail,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.taskDetail
        }
      }),
      columnHelper.accessor('valueType', {
        id: 'valueType',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.result,
        cell: (context) => {
          if (context.getValue() === 0) {
            return (
              <MBFFormInput name={`tasks.${context.row.index}.value`} />
            )
          }
          return (
            <MBFFormRadio name={`tasks.${context.row.index}.value`} options={[
              { label: 'Có', value: '1' },
              { label: 'Không', value: '0' }
            ]} />
          )
        },
        meta: {
          title: HEAD_CELLS.result
        }
      })
    ]
  }, [])

  return { columns }
}
export default useTaskCheckListTable