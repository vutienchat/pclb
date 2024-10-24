import styled from '@emotion/styled'
import { Box, type BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { DEFAULT_COLUMN_SIZE } from '@src/constants/table'
import useScrollbar from '@src/hooks/useScrollbar'
import type { ColumnPinning, TableColumn, TableRef } from '@src/types'
import { ColumnPinningState, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { ForwardedRef, useRef, useState } from 'react'
import MBFTableCell from './MBFTableCell'
import MBFTablePagination from './MBFTablePagination'
import NoRowsOverlay from './components/NoRowsOverlay'
import LoadingOverlay from './components/LoadingOverlay'

interface InitialState<T> {
  hiddenColumns?: (keyof T)[]
  hiddenFilterActions?: boolean
  hiddenRefresh?: boolean
  columnPinning?: ColumnPinning<T>
  scroll?: boolean
}

interface TProps<T> {
  pagination?: any
  data: T[]
  title?: string
  loading?: boolean
  columns: TableColumn<T>
  initialState?: InitialState<T>
  BoxProps?: BoxProps
  scroll?: boolean
}

const MBFTable = <T extends object>(props: TProps<T>, tableRef: ForwardedRef<TableRef>) => {
  const {
    data,
    pagination,
    title,
    loading,
    columns,
    initialState = {
      hiddenColumns: [],
      hiddenFilterActions: true,
      hiddenRefresh: true,
      scroll: false,
      columnPinning: {
        left: [],
        right: []
      }
    },
    BoxProps
  } = props

  const scrollbar = useScrollbar()
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableHeadRef = useRef<HTMLTableSectionElement>(null)

  const [scroll] = useState<boolean>(() => {
    const { scroll } = initialState
    if (typeof scroll === 'boolean') {
      return scroll
    }
    return true
  })

  // Pinning state
  const [columnPinning, onColumnPinningChange] = useState<ColumnPinningState>(() => {
    const { left = [] } = initialState.columnPinning || {}
    return {
      left: ['selection', 'index', ...left],
      right: ['actions']
    }
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnPinning: true,
    state: {
      columnPinning
    },
    onColumnPinningChange,
    enableMultiSort: false,
    defaultColumn: {
      size: 150
      // minSize: 150,
      // maxSize: 150,
    }
  })

  const { getHeaderGroups, getRowModel } = table

  return (
    <>
      <TableWrapper>
        <TableContainer
          ref={tableContainerRef}
          sx={{
            height: 1,
            minHeight: 120,
            overflow: 'auto',
            position: 'relative',
            border: 1,
            borderRadius: '8px',
            borderColor: 'divider',
            ...scrollbar
          }}
        >
          <Table
            stickyHeader
            sx={{
              minWidth: 'max-content',
              ...(scroll && {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              })
            }}
          >
            <TableHead ref={tableHeadRef}>
              {getHeaderGroups().map((headerGroup) => {
                return (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const leftOffset = header.column.getStart('left')
                      const rightOffset = header.column.getStart('right')
                      const isGrouped = header.column.getIsGrouped()

                      const maxWidth = header.column.columnDef.maxSize || DEFAULT_COLUMN_SIZE
                      const minWidth = header.column.columnDef.minSize || DEFAULT_COLUMN_SIZE
                      const width = header.column.columnDef.size || DEFAULT_COLUMN_SIZE
                      const align = header.column.columnDef.meta?.header?.align
                      const colSpanFnOrValue = header.column.columnDef.meta?.colSpan

                      const justifyContent =
                        align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'

                      const colSpan =
                        typeof colSpanFnOrValue === 'number'
                          ? colSpanFnOrValue
                          : colSpanFnOrValue?.(header.getContext(), getRowModel().rows)

                      if (colSpan === 0) {
                        return null
                      }

                      return (
                        <MBFTableCell
                          key={header.id}
                          header
                          align={align}
                          leftOffset={leftOffset}
                          rightOffset={rightOffset}
                          fixed={header.column.getIsPinned()}
                          isGrouped={isGrouped}
                          sx={{
                            width,
                            maxWidth,
                            minWidth,
                            backgroundColor: 'primary.light',
                            py: 2,
                            fontWeight: 700,
                            color: 'primary.contrastText'
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent
                            }}
                          >
                            {header.column.columnDef.meta?.title || ''}
                          </Box>
                        </MBFTableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableHead>
            <TableBody>
              {getRowModel().rows.map((row) => {
                const selected = row.getIsSelected()
                return (
                  <TableRow key={row.id} hover tabIndex={-1} selected={selected}>
                    {row.getVisibleCells().map((cell) => {
                      const leftOffset = cell.column.getStart('left')
                      const rightOffset = cell.column.getStart('right')
                      const maxWidth = cell.column.columnDef.maxSize
                      const fixed = cell.column.getIsPinned()
                      const align = cell.column.columnDef.meta?.align
                      const rowSpan = typeof cell.column.columnDef.meta?.rowSpan === 'number' ?
                        cell.column.columnDef.meta?.rowSpan :
                        cell.column.columnDef.meta?.rowSpan?.(cell.getValue(), row, getRowModel().rows)
                      const colSpan = undefined

                      if (rowSpan === 0) {
                        return null
                      }

                      return (
                        <MBFTableCell
                          key={cell.id}
                          fixed={fixed}
                          align={align}
                          selected={selected}
                          leftOffset={leftOffset}
                          rightOffset={rightOffset}
                          isGrouped={false}
                          rowSpan={rowSpan}
                          colSpan={colSpan}
                          sx={{ maxWidth: maxWidth }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </MBFTableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <NoRowsOverlay
            root={tableContainerRef}
            head={tableHeadRef}
            scroll
            visible={!loading && pagination?.total === 0}
          />
          <LoadingOverlay visible={loading} root={tableContainerRef} head={tableHeadRef} />
        </TableContainer>
        {pagination ? <MBFTablePagination {...pagination} /> : <Box />}
      </TableWrapper>
    </>
  )
}

const TableWrapper = styled(Box)({
  display: 'grid',
  gridTemplateRows: 'minmax(0, 1fr) auto',
  height: '100%'
})

export default MBFTable
