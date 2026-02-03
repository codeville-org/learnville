import { createLoader, parseAsInteger, createSearchParamsCache } from 'nuqs/server'

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const filterSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1), // Payload CMS uses 1-indexed pages
  limit: parseAsInteger.withDefault(12), // 3 rows × 4 columns grid
})
