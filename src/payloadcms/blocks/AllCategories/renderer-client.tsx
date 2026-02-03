import React from 'react'
import { getPayload, PaginatedDocs } from 'payload'
import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import type { SearchParams } from 'nuqs/server'

import { filterSearchParamsCache } from '@/lib/seachparams'
import { Category } from '@/payload-types'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Pagination } from '@/components/ui/pagination'

interface Props {
  searchParams: Promise<SearchParams>
}

async function fetchCategories(
  page: number,
  limit: number,
): Promise<PaginatedDocs<Category> | null> {
  try {
    const headers = await getHeaders()

    const payload = await getPayload({ config })

    const { user } = await payload.auth({ headers })

    const res = await payload.find({
      collection: 'categories',
      page,
      limit,
      depth: 2,
      overrideAccess: Boolean(user),
      pagination: true,
    })

    return res
  } catch (error) {
    return null
  }
}

export async function AllCategoriesRendererClient({ searchParams }: Props) {
  const { page, limit } = filterSearchParamsCache.parse(await searchParams)

  const categoriesRes = await fetchCategories(page, limit)

  if (categoriesRes === null || categoriesRes.totalDocs === 0) {
    return <div>No categories found.</div>
  }

  const { docs, totalPages, hasNextPage, hasPrevPage } = categoriesRes

  return (
    <>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-4">
        {docs.map((category) => (
          <Link key={category.id} href={`/courses?category=${category.slug}`}>
            <Card className="p-4 group cursor-pointer shadow-none flex flex-row items-center gap-2 bg-linear-to-t from-emerald-50/30 to-white hover:shadow-sm">
              {category.icon && category.icon instanceof Object && category.icon.url && (
                <Image
                  alt={category.icon.alt || category.name}
                  src={category.icon.url}
                  className="size-11 object-cover"
                  width={96}
                  height={96}
                />
              )}

              <div className="space-y-0">
                <h3 className="text-lg group-hover:underline font-medium text-emerald-950">
                  {category.name}
                </h3>
                <p className="text-xs text-emerald-950/60 line-clamp-1">{category.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </>
  )
}
