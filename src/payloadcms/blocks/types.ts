import type { Page, Lesson } from '@/payload-types'
import type {
  HydratedCourseData,
  HydratedCategoryData,
  HydratedFeaturedBlogData,
} from '@/lib/hydrate-page-blocks'

/**
 * Extract block type from Page content sections
 */
export type PageBlock = NonNullable<NonNullable<Page['content']>['sections']>[number]

/**
 * Extract specific block type by blockType discriminator
 */
export type ExtractBlockType<T extends PageBlock['blockType']> = Extract<
  PageBlock,
  { blockType: T }
>

/**
 * List of Block Types
 */
export type HeroBlock = ExtractBlockType<'hero'>
export type AboutBlock = ExtractBlockType<'about'>
export type CTABlock = ExtractBlockType<'ctaBlock'>
export type SiteStatsBlock = ExtractBlockType<'siteStatsBlock'>
export type RichTextContentBlock = ExtractBlockType<'richTextContent'>

// Hydrated block types (with lightweight data from hydration)
export type TopCategoriesBlock = Omit<ExtractBlockType<'topCategories'>, 'topCategories'> & {
  topCategories?: HydratedCategoryData[] | null
}
export type FeaturedCoursesBlock = Omit<ExtractBlockType<'featuredCourses'>, 'featuredCourses'> & {
  featuredCourses?: HydratedCourseData[] | null
}
export type FeaturedBlogsBlock = Omit<ExtractBlockType<'featuredBlogs'>, 'featuredBlogs'> & {
  featuredBlogs?: HydratedFeaturedBlogData[] | null
}

/**
 * Lesson Block Types (if used in Pages or separate Lesson collection)
 */
export type LessonBlock = NonNullable<Lesson['curriculum']>[number]

export type LessonVideoBlock = Extract<LessonBlock, { blockType: 'lessonVideo' }>
export type LessonContentBlock = Extract<LessonBlock, { blockType: 'lessonContent' }>
export type LessonMaterialsBlock = Extract<LessonBlock, { blockType: 'lessonMaterials' }>
export type LessonQuizBlock = Extract<LessonBlock, { blockType: 'lessonQuiz' }>

/**
 * Generic block renderer props
 */
export interface BlockRendererProps<T> {
  data: T
}
