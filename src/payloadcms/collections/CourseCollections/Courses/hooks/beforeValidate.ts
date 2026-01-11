// src/payloadcms/collections/CourseCollections/Courses/hooks/beforeValidate.ts
import { CollectionBeforeValidateHook } from 'payload'
import type { Course, User } from '@/payload-types'
import { checkRole } from '@/payloadcms/collections/Users/access/check-role'

export const beforeValidate: CollectionBeforeValidateHook<Course> = async ({
  data,
  req,
  operation,
}) => {
  const { user } = req

  // Auto-set instructor to current user if creating as instructor
  if (operation === 'create' && user && data && !data?.instructor) {
    if (checkRole(['instructor'], user as User)) {
      data.instructor = user.id
    }
  }

  return data
}
