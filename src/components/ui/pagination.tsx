'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQueryStates, parseAsInteger } from 'nuqs'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface PaginationProps {
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function Pagination({ totalPages, currentPage, hasNextPage, hasPrevPage }: PaginationProps) {
  const router = useRouter()
  const [, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(12),
  })

  const handlePageChange = async (newPage: number) => {
    await setSearchParams({ page: newPage })
    router.refresh()
  }

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5 // Show max 5 page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  //   if (totalPages <= 1) return null

  const pages = getPageNumbers()

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="gap-1 h-9 shadow-none"
      >
        <ChevronLeft />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <div
              key={`ellipsis-${index}`}
              className="flex size-9 items-center justify-center text-muted-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </div>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handlePageChange(page)}
              className={cn(
                'size-9',
                page === currentPage && 'bg-emerald-950 hover:bg-emerald-900 text-white',
              )}
            >
              {page}
            </Button>
          ),
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="gap-1 h-9 shadow-none"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight />
      </Button>
    </nav>
  )
}
