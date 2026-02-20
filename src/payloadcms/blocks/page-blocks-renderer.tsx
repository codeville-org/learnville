import React from 'react'
import { SearchParams } from 'nuqs/server'

import { HeroBlockRenderer } from './Hero/renderer'
import { TopCategoriesBlockRenderer } from './TopCategories/renderer'
import { AboutBlockRenderer } from './About/renderer'
import { FeaturedCoursesBlockRenderer } from './FeaturedCourses/renderer'
import { FeaturedBlogsRenderer } from './FeaturedBlogs/renderer'
import type { PageBlock } from './types'
import { CTARenderer } from './CTA/renderer'
import { SiteStatsRenderer } from './SiteStats/renderer'
import { RichTextContentBlockRenderer } from './RichTextContent/renderer'
import { TabLayoutBlockRenderer } from './TabLayout/renderer'
import { FormBlockRenderer } from '../forms/block/renderer'
import { AllCategoriesBlockRenderer } from './AllCategories/renderer-layout'
import { AllBlogsBlockRenderer } from './AllBlogs/renderer-layout'
import { AllCoursesBlockRenderer } from './AllCourses/renderer-layout'

/**
 * Central registry mapping block types to their renderer components
 * Currently only includes Page blocks (for landing pages)
 * Lesson blocks are handled separately in the course/lesson pages
 */
export const blockRenderers = {
  hero: HeroBlockRenderer,
  topCategories: TopCategoriesBlockRenderer,
  about: AboutBlockRenderer,
  featuredCourses: FeaturedCoursesBlockRenderer,
  ctaBlock: CTARenderer,
  featuredBlogs: FeaturedBlogsRenderer,
  siteStatsBlock: SiteStatsRenderer,
  richTextContent: RichTextContentBlockRenderer,
  tabLayoutBlock: TabLayoutBlockRenderer,
  formBlock: FormBlockRenderer,
  allCategories: AllCategoriesBlockRenderer,
  allBlogs: AllBlogsBlockRenderer,
  allCourses: AllCoursesBlockRenderer,
} as const

/**
 * Type-safe block renderer component for Page content blocks
 * Automatically renders blocks based on blockType with proper error handling
 */
interface RenderBlocksProps {
  blocks: PageBlock[] | null | undefined
  searchParams?: Promise<SearchParams>
}

export function RenderPageBlocks({ blocks, searchParams }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        const blockType = block.blockType as keyof typeof blockRenderers

        // Get the appropriate renderer
        const Renderer = blockRenderers[blockType]

        // Handle missing renderer
        if (!Renderer) {
          console.warn(`No renderer found for block type: ${blockType}`)
          if (process.env.NODE_ENV === 'development') {
            return (
              <div key={block.id || index} className="border-2 border-red-500 bg-red-50 p-4">
                <p className="text-red-700 font-semibold">Missing Renderer</p>
                <p className="text-red-600 text-sm">
                  No renderer found for block type: {blockType}
                </p>
                <pre className="mt-2 text-xs overflow-auto bg-white p-2 rounded">
                  {JSON.stringify(block, null, 2)}
                </pre>
              </div>
            )
          }
          return null
        }

        // Render the block with type assertion
        // TypeScript can't narrow union types in this pattern, so we assert the type is correct
        // @ts-ignore
        return <Renderer key={block.id || index} data={block as any} searchParams={searchParams} />
      })}
    </>
  )
}
