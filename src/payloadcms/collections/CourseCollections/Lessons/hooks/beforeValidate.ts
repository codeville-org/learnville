import { APIError, CollectionBeforeValidateHook } from 'payload'
import type { Lesson } from '@/payload-types'

export const beforeValidate: CollectionBeforeValidateHook<Lesson> = async ({
  data,
  req,
  operation,
}) => {
  // Validate course is selected (required even for drafts)
  if (!data?.course) {
    throw new APIError('Course is required. Please select a course before saving.', 400)
  }

  // If course is selected, fetch and set the instructor
  try {
    const courseId = typeof data.course === 'object' ? data.course.id : data.course

    const course = await req.payload.findByID({
      collection: 'courses',
      id: courseId,
      depth: 1,
      draft: true,
      req, // Pass req for transaction safety
      overrideAccess: true,
    })

    if (course && course.instructor) {
      // Set the instructor from the course
      const instructorId =
        typeof course.instructor === 'object' ? course.instructor.id : course.instructor

      data.instructor = instructorId
    } else {
      throw new APIError('Selected course does not have an instructor assigned.', 400)
    }
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    console.error('Error fetching course instructor:', error)
    throw new APIError('Failed to fetch course information. Please try again.', 500)
  }

  return data
}
