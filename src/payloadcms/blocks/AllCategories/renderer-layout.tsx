import React, { Suspense } from 'react'
import { AllCategoriesBlock, BlockRendererProps } from '../types'
import { AllCategoriesRendererClient } from './renderer-client'
import { AllCategoriesSkeleton } from './skeleton'

export function AllCategoriesBlockRenderer({
  data,
  searchParams,
}: BlockRendererProps<AllCategoriesBlock>) {
  const {} = data

  return (
    <div className="w-full overflow-hidden min-h-[400px] relative">
      <div className="container mx-auto px-4">
        <div className="py-2">
          <Suspense fallback={<AllCategoriesSkeleton />}>
            <AllCategoriesRendererClient searchParams={searchParams!} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
