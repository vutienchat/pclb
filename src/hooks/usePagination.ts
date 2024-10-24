import type { PaginationStates } from '@src/types'
import { useState } from 'react'

const usePagination = () => {
  const [paginationStates, setPaginationStates] = useState<PaginationStates>({
    pageNumber: 1,
    pageSize: 10,
    firstPage: true,
    lastPage: true,
    total: 0,
    totalPage: 0
  })

  const onPageChange = (pageNumber: number) => {
    setPaginationStates((state) => ({
      ...state,
      pageNumber
    }))
  }

  const onPageSizeChange = (pageSize: number) => {
    setPaginationStates((state) => ({
      ...state,
      pageSize
    }))
  }

  return {
    paginationStates,
    onPageChange,
    onPageSizeChange,
    setPaginationStates
  }
}

export default usePagination
