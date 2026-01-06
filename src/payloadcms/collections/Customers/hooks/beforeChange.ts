import { CollectionBeforeChangeHook } from 'payload'

import type { Customer } from '@/payload-types'

export const beforeChange: CollectionBeforeChangeHook<Customer> = async ({ data, req }) => {
  // Calculate level based on XP (example: level = XP / 100)
  if (data?.totalXP) {
    data.level = Math.floor(data.totalXP / 100) + 1
  }

  return data
}
