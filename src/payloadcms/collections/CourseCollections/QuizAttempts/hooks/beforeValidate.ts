import { APIError, CollectionBeforeValidateHook } from 'payload'
import type { QuizAttempt } from '@/payload-types'

/**
 * Validates quiz attempt integrity:
 * 1. Verifies the customer matches the authenticated user
 * 2. Verifies the enrollment belongs to that customer
 * 3. Verifies the lesson belongs to the enrollment's course
 * 4. Prevents duplicate quiz attempts for the same quiz block
 */
export const beforeValidate: CollectionBeforeValidateHook<QuizAttempt> = async ({
  data,
  req,
  operation,
}) => {
  if (operation !== 'create') return data

  const { user } = req

  // Only validate for customer users (admin/instructors can manage freely)
  if (!user || user.collection !== 'customers') return data

  if (!data?.customer || !data?.enrollment || !data?.lesson || !data?.quizBlockId) {
    return data // Let required field validation handle missing fields
  }

  const customerId = typeof data.customer === 'object' ? data.customer.id : data.customer
  const enrollmentId = typeof data.enrollment === 'object' ? data.enrollment.id : data.enrollment
  const lessonId = typeof data.lesson === 'object' ? data.lesson.id : data.lesson

  // 1. Verify customer matches authenticated user
  if (customerId !== user.id) {
    throw new APIError('You can only submit quiz attempts for your own account.', 403)
  }

  // 2. Verify enrollment belongs to the customer and is active
  const enrollment = await req.payload.findByID({
    collection: 'course-enrollments',
    id: enrollmentId,
    depth: 0,
    req,
  })

  const enrollmentCustomerId =
    typeof enrollment.customer === 'object' ? enrollment.customer.id : enrollment.customer

  if (enrollmentCustomerId !== customerId) {
    throw new APIError('This enrollment does not belong to you.', 403)
  }

  if (enrollment.status !== 'active' && enrollment.status !== 'completed') {
    throw new APIError('Your enrollment is not active. Please resume your enrollment first.', 400)
  }

  // 3. Verify lesson belongs to the enrollment's course
  const lesson = await req.payload.findByID({
    collection: 'lessons',
    id: lessonId,
    depth: 0,
    req,
    overrideAccess: true,
  })

  const lessonCourseId = typeof lesson.course === 'object' ? lesson.course.id : lesson.course
  const enrollmentCourseId =
    typeof enrollment.course === 'object' ? enrollment.course.id : enrollment.course

  if (lessonCourseId !== enrollmentCourseId) {
    throw new APIError('This lesson does not belong to the enrolled course.', 400)
  }

  // 4. Prevent duplicate quiz attempts for the same quiz block
  const existingAttempts = await req.payload.find({
    collection: 'quiz-attempts',
    where: {
      and: [
        { customer: { equals: customerId } },
        { lesson: { equals: lessonId } },
        { quizBlockId: { equals: data.quizBlockId } },
        { passed: { equals: true } },
      ],
    },
    limit: 1,
    depth: 0,
    req,
  })

  if (existingAttempts.totalDocs > 0) {
    throw new APIError(
      'You have already passed this quiz. Duplicate attempts for passed quizzes are not allowed.',
      409,
    )
  }

  return data
}
