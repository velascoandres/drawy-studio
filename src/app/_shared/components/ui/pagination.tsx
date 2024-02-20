import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from './button'

interface Props {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}


export const Pagination = ({
  page: initialPage,
  totalPages,
  onPageChange
}: Props) => {
  const [page, setPage] = useState(initialPage)

  const nextPage = () => {
    const newPage = page + 1

    if (newPage > totalPages) {
      return
    }

    setPage(newPage)
    onPageChange(newPage)
  }

  const previousPage = () => {
    const newPage = page - 1

    if (newPage <= 0) {
      return
    }

    setPage(newPage)
    onPageChange(newPage)
  }

  return (
    <div className="flex flex-row justify-between gap-4 items-center">
      <Button variant="secondary" disabled={page === 1} onClick={previousPage}>
        <ChevronLeft />
      </Button>

      <span className="text-md font-semibold">
                Page: {page} / {totalPages}
      </span>

      <Button variant="secondary" disabled={page === totalPages} onClick={nextPage}>
        <ChevronRight />
      </Button>
    </div>
  )
}