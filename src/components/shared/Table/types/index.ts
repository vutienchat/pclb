import type { TableCellProps } from '@mui/material/TableCell'
import '@tanstack/react-table'
import type { RowData, Row, HeaderContext, CellContext } from '@tanstack/react-table'

type RowSpanUpdater<T> = (value: any,row: Row<T>, rows: Row<T>[]) => number | undefined

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue = unknown> {
    title?: string
    info?: string
    align?: TableCellProps['align']
    type?: 'text' | 'date' | 'select' | 'img'
    editable?: boolean | ((row: TData) => boolean)
    rowSpan?: number | RowSpanUpdater<TData>
    colSpan?: (context: HeaderContext<TData, any>, rows: Row<TData>[]) => number | null
    hidden?: boolean | ((row: TData) => boolean)
    required?: boolean
    action?: boolean
    header?: {
      align?: TableCellProps['align']
    }
  }

  interface TableMeta<TData extends RowData> {}
}
