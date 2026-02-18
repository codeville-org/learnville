import { parseAsString } from 'nuqs'
import { createLoader, parseAsInteger, createSearchParamsCache } from 'nuqs/server'

const filterParams = {
  category: parseAsString,
  page: parseAsInteger.withDefault(1), // Payload CMS uses 1-indexed pages
  limit: parseAsInteger.withDefault(12), // 3 rows × 4 columns grid
}

// Legacy cache-based parser (used by AllBlogs / AllCategories blocks)
export const filterSearchParamsCache = createSearchParamsCache(filterParams)

// Recommended loader — always returns fresh parsed values per request
export const loadFilterParams = createLoader(filterParams)

/** Parse search params with safe defaults */
export function parseSearchParams(raw: Record<string, string | string[] | undefined>) {
  const DEFAULT_PAGE = 1
  const DEFAULT_LIMIT = 10
  const category = typeof raw.category === 'string' ? raw.category : null

  const page =
    typeof raw.page === 'string'
      ? Math.max(1, parseInt(raw.page, 10) || DEFAULT_PAGE)
      : DEFAULT_PAGE

  const limit =
    typeof raw.limit === 'string'
      ? Math.max(1, parseInt(raw.limit, 10) || DEFAULT_LIMIT)
      : DEFAULT_LIMIT

  return { category, page, limit }
}
