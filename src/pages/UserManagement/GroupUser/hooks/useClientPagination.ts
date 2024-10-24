import { useState } from 'react'

const useClientPagination = <D = any>(data: D[]) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const maxPage = Math.ceil(data?.length / itemsPerPage)

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data?.slice(begin, end)
  }

  function onChangePage(page: number) {
    setCurrentPage(page)
  }

  function onChangePageSize(size: number) {
    setCurrentPage(1)
    setItemsPerPage(size)
  }

  return { onChangePage, currentData, onChangePageSize, itemsPerPage, currentPage, maxPage }
}

export default useClientPagination
