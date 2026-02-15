import type { CollectionBeforeValidateHook } from 'payload'
import { nanoid } from 'nanoid'

export const beforeValidate: CollectionBeforeValidateHook = async ({ data, operation }) => {
  if (operation === 'create' && data) {
    // Auto-generate unique certificate number
    if (!data.certificateNumber) {
      const year = new Date().getFullYear()
      const uniquePart = nanoid(8).toUpperCase()
      data.certificateNumber = `LV-${year}-${uniquePart}`
    }
  }

  return data
}
