import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '@/payload-types'

type PageBlock = NonNullable<NonNullable<Page['content']>['sections']>[number]

/**
 * Block Hydration System
 *
 * This module provides selective hydration for page blocks that need
 * deeper relationship data than the initial page query provides.
 *
 * To add support for a new block type:
 * 1. Create a hydrator function following the pattern below
 * 2. Register it in the blockHydrators map
 * 3. Export any custom data types if needed
 */

// ============================================================================
// HYDRATED DATA TYPES
// ============================================================================

export interface HydratedCategoryData {
  id: number
  name: string
  slug: string
  description?: string | null
  icon: {
    url?: string | null
    alt?: string | null
  } | null
}

export interface HydratedCourseData {
  id: number
  title: string
  slug: string
  shortDescription?: string | null
  thumbnail: {
    url?: string | null
    alt?: string | null
  } | null
  overallRating: number
  lessonCount: number
  level: 'beginner' | 'intermediate' | 'advanced'
  pricingType: 'free' | 'premium'
  price: number
  instructor: {
    id: number
    displayName?: string | null
    avatarUrl?: string | null
  } | null
  estimatedDuration?: number | null
  category: string | null
}

export interface HydratedFeaturedBlogData {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  featuredImage: {
    url?: string | null
    alt?: string | null
  } | null
  author: string | null
  category: string | null
  publishedAt: string | null
  readTimeMinutes?: number | null
}

export interface HydratedMediaData {
  id: number
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

// ============================================================================
// BLOCK HYDRATORS
// ============================================================================

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>

/**
 * Hydrate TopCategories block with full category and media data
 */
async function hydrateTopCategoriesBlock(
  block: Extract<PageBlock, { blockType: 'topCategories' }>,
  payload: PayloadInstance,
): Promise<any> {
  if (!block.topCategories || block.topCategories.length === 0) return block

  // Collect category IDs
  const categoryIds = block.topCategories
    .map((cat) => (typeof cat === 'object' ? cat.id : cat))
    .filter((id): id is number => id !== undefined)

  if (categoryIds.length === 0) return block

  // Fetch categories with icons
  const categoriesResult = await payload.find({
    collection: 'categories',
    where: { id: { in: categoryIds } },
    depth: 1, // Get media relationship
    limit: categoryIds.length,
    overrideAccess: true,
  })

  // Create hydrated category data
  const categoryMap = new Map<number, HydratedCategoryData>()
  categoriesResult.docs.forEach((category) => {
    const icon =
      typeof category.icon === 'object' && category.icon
        ? { url: category.icon.url, alt: category.icon.alt }
        : null

    categoryMap.set(category.id, {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon,
    })
  })

  return {
    ...block,
    topCategories: block.topCategories
      .map((cat) => {
        const id = typeof cat === 'object' ? cat.id : cat
        return categoryMap.get(id!) || cat
      })
      .filter(Boolean),
  }
}

/**
 * Hydrate FeaturedCourses block with lightweight course data
 */
async function hydrateFeaturedCoursesBlock(
  block: Extract<PageBlock, { blockType: 'featuredCourses' }>,
  payload: PayloadInstance,
): Promise<any> {
  if (!block.featuredCourses || block.featuredCourses.length === 0) return block

  // Collect course IDs
  const courseIds = block.featuredCourses
    .map((course) => (typeof course === 'object' ? course.id : course))
    .filter((id): id is number => id !== undefined)

  if (courseIds.length === 0) return block

  // Fetch courses with only needed fields
  const coursesResult = await payload.find({
    collection: 'courses',
    where: { id: { in: courseIds } },
    depth: 2,
    limit: courseIds.length,
    select: {
      title: true,
      slug: true,
      shortDescription: true,
      thumbnail: true,
      overallRating: true,
      level: true,
      pricingType: true,
      price: true,
      instructor: true,
      chapters: {
        lessons: true,
      },
      estimatedDuration: true,
      category: true,
    },
    overrideAccess: true,
  })

  // Create hydrated course data
  const courseMap = new Map<number, HydratedCourseData>()
  coursesResult.docs.forEach((course) => {
    // Count lessons
    let lessonCount = 0
    if (course.chapters) {
      course.chapters.forEach((chapter) => {
        lessonCount += chapter.lessons?.length || 0
      })
    }

    const thumbnail =
      typeof course.thumbnail === 'object' && course.thumbnail
        ? { url: course.thumbnail.url, alt: course.thumbnail.alt }
        : null

    const instructor =
      typeof course.instructor === 'object' && course.instructor
        ? {
            id: course.instructor.id,
            displayName:
              course.instructor.instructorProfile?.displayName || course.instructor.email,
            avatarUrl:
              course.instructor.avatar instanceof Object ? course.instructor.avatar.url : null,
          }
        : null

    courseMap.set(course.id, {
      id: course.id,
      title: course.title,
      slug: course.slug,
      shortDescription: course.shortDescription,
      thumbnail,
      overallRating: course.overallRating || 0,
      lessonCount,
      level: course.level,
      pricingType: course.pricingType,
      price: course.price || 0,
      instructor,
      estimatedDuration: course.estimatedDuration,
      category: course.category instanceof Object ? course.category.name : null,
    })
  })

  return {
    ...block,
    featuredCourses: block.featuredCourses
      .map((course) => {
        const id = typeof course === 'object' ? course.id : course
        return courseMap.get(id!) || course
      })
      .filter(Boolean),
  }
}

/**
 * Hydrate Hero block with media data
 */
async function hydrateHeroBlock(
  block: Extract<PageBlock, { blockType: 'hero' }>,
  payload: PayloadInstance,
): Promise<any> {
  // Check if image.media needs hydration
  if (!block.image?.media) return block

  const mediaId = typeof block.image.media === 'object' ? block.image.media.id : block.image.media

  if (!mediaId) return block

  // If already hydrated (has url), skip
  if (typeof block.image.media === 'object' && block.image.media.url) {
    return block
  }

  try {
    const media = await payload.findByID({
      collection: 'media',
      id: mediaId,
      depth: 0,
    })

    return {
      ...block,
      image: {
        ...block.image,
        media: media,
      },
    }
  } catch {
    return block
  }
}

/**
 * Hydrate About block with media data
 */
async function hydrateAboutBlock(
  block: Extract<PageBlock, { blockType: 'about' }>,
  payload: PayloadInstance,
): Promise<any> {
  // Check if content.sectionImage needs hydration
  if (!block.content?.sectionImage) return block

  const mediaId =
    typeof block.content.sectionImage === 'object'
      ? block.content.sectionImage.id
      : block.content.sectionImage

  if (!mediaId) return block

  // If already hydrated (has url), skip
  if (typeof block.content.sectionImage === 'object' && block.content.sectionImage.url) {
    return block
  }

  try {
    const media = await payload.findByID({
      collection: 'media',
      id: mediaId,
      depth: 0,
    })

    return {
      ...block,
      content: {
        ...block.content,
        sectionImage: media,
      },
    }
  } catch {
    return block
  }
}

/**
 * Hydrate Featured Blogs block with media data
 */
async function hydrateFeaturedBlogsBlock(
  block: Extract<PageBlock, { blockType: 'featuredBlogs' }>,
  payload: PayloadInstance,
): Promise<any> {
  if (!block.featuredBlogs || block.featuredBlogs.length === 0) return block

  // Collect blog IDs
  const blogIds = block.featuredBlogs
    .map((blog) => (typeof blog === 'object' ? blog.id : blog))
    .filter((id): id is number => id !== undefined)

  if (blogIds.length === 0) return block

  // Fetch blogs with only needed fields
  const blogsResult = await payload.find({
    collection: 'blog',
    where: { id: { in: blogIds } },
    depth: 2,
    limit: blogIds.length,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      author: true,
      category: true,
      publishedAt: true,
      readTime: true,
    },
    overrideAccess: true,
  })

  // Create hydrated blogs data
  const blogsMap = new Map<number, HydratedFeaturedBlogData>()
  blogsResult.docs.forEach((blog) => {
    const featuredImage =
      typeof blog === 'object' && blog.featuredImage && blog.featuredImage instanceof Object
        ? { url: blog.featuredImage.url, alt: blog.featuredImage.alt }
        : null

    blogsMap.set(blog.id, {
      title: blog.title,
      slug: blog.slug,
      author: blog.author instanceof Object ? blog.author.email : null,
      category: blog.category instanceof Object ? blog.category.name : null,
      publishedAt: blog.publishedAt,
      readTimeMinutes: blog.readTime,
      id: blog.id,
      excerpt: blog.excerpt,
      featuredImage,
    })
  })

  return {
    ...block,
    featuredBlogs: block.featuredBlogs.map((blog) => {
      const id = typeof blog === 'object' ? blog.id : blog
      return blogsMap.get(id!) || blog
    }),
  }
}

// ============================================================================
// HYDRATOR REGISTRY
// ============================================================================

/**
 * Registry of block hydrators by block type
 * Add new hydrators here as you create new block types
 */
const blockHydrators: Record<string, (block: any, payload: PayloadInstance) => Promise<any>> = {
  topCategories: hydrateTopCategoriesBlock,
  featuredCourses: hydrateFeaturedCoursesBlock,
  hero: hydrateHeroBlock,
  about: hydrateAboutBlock,
  featuredBlogs: hydrateFeaturedBlogsBlock,
}

// ============================================================================
// MAIN HYDRATION FUNCTION
// ============================================================================

/**
 * Hydrate all blocks in a page with their required relationship data
 *
 * This function processes all blocks and applies the appropriate hydrator
 * for each block type that needs deeper data.
 *
 * @param blocks - Array of page blocks to hydrate
 * @returns Hydrated blocks with full relationship data
 *
 * @example
 * ```ts
 * const page = await payload.find({ collection: 'pages', depth: 0 })
 * page.content.sections = await hydratePageBlocks(page.content.sections)
 * ```
 */
export async function hydratePageBlocks(
  blocks: PageBlock[] | null | undefined,
): Promise<PageBlock[] | null | undefined> {
  if (!blocks || blocks.length === 0) return blocks

  const payload = await getPayload({ config })

  // Process all blocks in parallel
  const hydratedBlocks = await Promise.all(
    blocks.map(async (block) => {
      const hydrator = blockHydrators[block.blockType]

      if (hydrator) {
        return hydrator(block, payload)
      }

      return block
    }),
  )

  return hydratedBlocks as PageBlock[]
}

// ============================================================================
// RE-EXPORTS FOR BACKWARD COMPATIBILITY
// ============================================================================

// Keep the old function name working for existing code
export const hydrateFeaturedCourses = hydratePageBlocks

// Export individual types for block renderers
export type { HydratedCourseData as FeaturedCourseData }
