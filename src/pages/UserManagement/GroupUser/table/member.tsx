import { useMemo } from 'react'
import { Checkbox, Stack } from '@mui/material'

import { getColumnHelper, TableColumn, type HeadCell } from '@src/types'

const columnHelper = getColumnHelper<any>()

const HEAD_CELLS: HeadCell<any> = {
  id: 'Chọn',
  fullName: 'Tên thành viên',
  email: 'Email',
  mobile: 'Số điện thoại'
}

interface Props {
  pageIndex: number
  pageSize: number
  addedUserIds: number[]
  onChangeAddedUserIds: (id: number) => void
  isDisabled?: boolean
}

const useMemberTable = (props: Props) => {
  const { pageIndex, pageSize, onChangeAddedUserIds, addedUserIds, isDisabled } = props

  const columns: TableColumn<any> = useMemo(() => {
    return [
      columnHelper.accessor('id', {
        id: 'id',
        size: 30,
        enableSorting: true,
        header: () => HEAD_CELLS.id,
        cell: (context) => {
          const id: number = context.renderValue()
          return (
            <Stack alignItems='center' justifyContent='center'>
              <Checkbox
                disabled={!!isDisabled}
                checked={addedUserIds.includes(id)}
                onClick={() => {
                  onChangeAddedUserIds(id)
                }}
              />
            </Stack>
          )
        },
        meta: {
          title: HEAD_CELLS.id
        }
      }),
      columnHelper.accessor('fullName', {
        id: 'fullName',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.fullName,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.fullName
        }
      }),
      columnHelper.accessor('email', {
        id: 'email',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.email,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.email
        }
      }),
      columnHelper.accessor('mobile', {
        id: 'mobile',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.mobile,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.mobile
        }
      })
    ]
  }, [pageIndex, pageSize, addedUserIds, isDisabled])

  return { columns }
}

export default useMemberTable
