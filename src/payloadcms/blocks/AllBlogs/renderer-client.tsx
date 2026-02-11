import React from 'react'
import { getPayload, PaginatedDocs } from 'payload'
import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import type { SearchParams } from 'nuqs/server'

import { filterSearchParamsCache } from '@/lib/seachparams'
import { Blog } from '@/payload-types'
import { Pagination } from '@/components/ui/pagination'
import { Card, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { DEFAULT_BLOG_PAGE_SLUG } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import Image from 'next/image'
import { fetchMediaImageUrl } from '@/lib/utils'

interface Props {
  searchParams: Promise<SearchParams>
}

async function fetchBlogs(page: number, limit: number): Promise<PaginatedDocs<Blog> | null> {
  try {
    const headers = await getHeaders()

    const payload = await getPayload({ config })

    const { user } = await payload.auth({ headers })

    const res = await payload.find({
      collection: 'blog',
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

export async function AllBlogsRendererClient({ searchParams }: Props) {
  const { page, limit } = filterSearchParamsCache.parse(await searchParams)

  const blogsRes = await fetchBlogs(page, limit)

  if (blogsRes === null || blogsRes.totalDocs === 0) {
    return <div>No blogs found.</div>
  }

  const { docs, totalPages, hasNextPage, hasPrevPage } = blogsRes

  // Filter features + first three posts and rest,
  const featuredArticles = docs.length > 3 ? docs.slice(0, 3) : null
  const restArticles = featuredArticles ? docs.slice(3) : docs

  const [firstBlog, secondBlog, thirdBlog] = featuredArticles || []

  return (
    <>
      <div className="mt-12">
        {featuredArticles ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {firstBlog && (
              <Card className="shadow-none p-4 w-full">
                <Link
                  href={`/${DEFAULT_BLOG_PAGE_SLUG}/${firstBlog.slug}`}
                  className="space-y-3 w-full h-full group"
                >
                  <div className="w-full aspect-video relative overflow-hidden rounded-md">
                    <Badge className="absolute top-2 left-2 z-10 text-sm py-1 px-2 rounded-md font-semibold bg-amber-500 text-emerald-900">
                      <ClockIcon /> {firstBlog.readTime}
                      <span className="text-xs font-medium">min read</span>
                    </Badge>
                    <Image
                      src={fetchMediaImageUrl(firstBlog.featuredImage).url}
                      alt={fetchMediaImageUrl(firstBlog.featuredImage).alt || firstBlog.title}
                      fill
                      className="object-cover rounded-md group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-1 px-2">
                    <h2 className="text-xl font-semibold text-emerald-950 font-heading group-hover:underline">
                      {firstBlog.title}
                    </h2>
                    <p className="text-emerald-950/60 text-sm line-clamp-3">{firstBlog.excerpt}</p>
                  </div>

                  <div className="mt-4 px-2 flex items-center gap-3">
                    <p className="flex text-sm items-center gap-1 text-emerald-950/70">
                      <CalendarIcon className="size-4" />
                      {firstBlog.publishedAt &&
                        new Date(firstBlog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </p>
                  </div>
                </Link>
              </Card>
            )}

            {secondBlog && thirdBlog && (
              <Card className="shadow-none p-4 col-span-2 flex flex-col gap-4">
                {/* Second Blog - Row Layout */}
                <Link
                  href={`/${DEFAULT_BLOG_PAGE_SLUG}/${secondBlog.slug}`}
                  className="flex gap-4 group flex-1 items-center"
                >
                  <div className="w-1/3 h-full relative overflow-hidden rounded-md flex-shrink-0">
                    <Badge className="absolute top-2 left-2 z-10 text-xs py-1 px-2 rounded-md font-semibold bg-amber-500 text-emerald-900">
                      <ClockIcon className="size-3" /> {secondBlog.readTime}
                      <span className="text-xs font-medium">min</span>
                    </Badge>
                    <Image
                      src={fetchMediaImageUrl(secondBlog.featuredImage)?.url}
                      alt={fetchMediaImageUrl(secondBlog.featuredImage)?.alt || secondBlog.title}
                      fill
                      className="object-cover rounded-md group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2 className="text-lg font-semibold text-emerald-950 font-heading group-hover:underline line-clamp-2">
                      {secondBlog.title}
                    </h2>
                    <p className="text-emerald-950/60 text-sm line-clamp-2">{secondBlog.excerpt}</p>
                    <p className="flex text-sm items-center gap-1 text-emerald-950/70">
                      <CalendarIcon className="size-4" />
                      {secondBlog.publishedAt &&
                        new Date(secondBlog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </p>
                  </div>
                </Link>

                {/* Third Blog - Row Layout */}
                <Link
                  href={`/${DEFAULT_BLOG_PAGE_SLUG}/${thirdBlog.slug}`}
                  className="flex gap-4 group flex-1 items-center"
                >
                  <div className="w-1/3 h-full relative overflow-hidden rounded-md flex-shrink-0">
                    <Badge className="absolute top-2 left-2 z-10 text-xs py-1 px-2 rounded-md font-semibold bg-amber-500 text-emerald-900">
                      <ClockIcon className="size-3" /> {thirdBlog.readTime}
                      <span className="text-xs font-medium">min</span>
                    </Badge>
                    <Image
                      src={fetchMediaImageUrl(thirdBlog.featuredImage)?.url}
                      alt={fetchMediaImageUrl(thirdBlog.featuredImage)?.alt || thirdBlog.title}
                      fill
                      className="object-cover rounded-md group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2 className="text-lg font-semibold text-emerald-950 font-heading group-hover:underline line-clamp-2">
                      {thirdBlog.title}
                    </h2>
                    <p className="text-emerald-950/60 text-sm line-clamp-2">{thirdBlog.excerpt}</p>
                    <p className="flex text-sm items-center gap-1 text-emerald-950/70">
                      <CalendarIcon className="size-4" />
                      {thirdBlog.publishedAt &&
                        new Date(thirdBlog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </p>
                  </div>
                </Link>
              </Card>
            )}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {restArticles.map((article) => (
              <Card className="shadow-none p-4 w-full">
                <Link
                  href={`/${DEFAULT_BLOG_PAGE_SLUG}/${article.slug}`}
                  className="space-y-3 w-full h-full group"
                >
                  <div className="w-full aspect-video relative overflow-hidden rounded-md">
                    <Badge className="absolute top-2 left-2 z-10 text-sm py-1 px-2 rounded-md font-semibold bg-amber-500 text-emerald-900">
                      <ClockIcon /> {article.readTime}
                      <span className="text-xs font-medium">min read</span>
                    </Badge>
                    <Image
                      src={fetchMediaImageUrl(article.featuredImage).url}
                      alt={fetchMediaImageUrl(article.featuredImage).alt || article.title}
                      fill
                      className="object-cover rounded-md group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-1 px-2">
                    <h2 className="text-xl font-semibold text-emerald-950 font-heading group-hover:underline">
                      {article.title}
                    </h2>
                    <p className="text-emerald-950/60 text-sm line-clamp-3">{article.excerpt}</p>
                  </div>

                  <div className="mt-4 px-2 flex items-center gap-3">
                    <p className="flex text-sm items-center gap-1 text-emerald-950/70">
                      <CalendarIcon className="size-4" />
                      {article.publishedAt &&
                        new Date(article.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="pb-6">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </div>
    </>
  )
}
