import type { Access } from 'payload'
import { checkRole } from './check-role'
import { User } from '@/payload-types'

const instructorOwn: Access = ({ req: { user } }) => {
  if (!user) return false

  // Admins and editors can see all courses
  if (checkRole(['admin', 'editor'], user as User)) {
    return true
  }

  // Instructors can only see their own courses
  if (checkRole(['instructor'], user as User)) {
    return {
      instructor: {
        equals: user.id,
      },
    }
  }

  // Regular users follow the existing 'anyone' logic
  return false
}

export default instructorOwn
