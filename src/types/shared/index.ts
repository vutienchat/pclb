import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, ColumnPinningState } from '@tanstack/react-table'

export type Dictionary<T = any> = {
  [key: string]: T
}

export type PickUnion<T> = { [K in keyof T]: Pick<T, K> }[keyof T]

export interface TableRef {}

export type TableColumn<D, V = any> = ColumnDef<D, V>[]

export interface ColumnPinning<T> extends ColumnPinningState {
  left?: (keyof T & string)[]
  right?: (keyof T & string)[]
}

export const getColumnHelper = <T>() => createColumnHelper<T>()

export type HeadCell<T> = {
  [Key in keyof T]?: string
} & { [key: string]: any }

export interface PaginationStates {
  pageNumber: number
  pageSize: number
  totalPage: number
  total: number
  lastPage: boolean
  firstPage: boolean
}

export type DialogType = 'create' | 'edit' | 'detail' | 'delete'

export interface DialogRef<T = any> {
  open: (type: DialogType, data?: T) => void
  close: () => void
}

export type Option<T = any> = {
  label: string
  value: T
}