import type { Access, Where } from 'payload'

export const certificateRead: Access = ({ req: { user } }) => {
  if (!user) return false

  // Admin and editor can read all certificates
  if (user.collection === 'users') {
    const roles = user.roles as string[] | undefined
    if (roles?.includes('admin') || roles?.includes('editor')) return true
    // Instructors can see certificates for their courses
    if (roles?.includes('instructor')) {
      const where: Where = {
        'course.instructor': { equals: user.id },
      }
      return where
    }
    return false
  }

  // Customers can read their own certificates
  if (user.collection === 'customers') {
    const where: Where = {
      customer: { equals: user.id },
    }
    return where
  }

  return false
}
