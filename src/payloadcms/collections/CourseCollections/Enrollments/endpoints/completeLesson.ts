import type { Endpoint } from 'payload'
import { APIError } from 'payload'

/**
 * Custom endpoint: POST /api/course-enrollments/:id/complete-lesson
 *
 * Marks a lesson as completed for the given enrollment.
 * Body: { lessonId: number }
 *
 * Validates:
 * - User is authenticated as a customer
 * - Customer owns the enrollment
 * - Lesson belongs to the enrollment's course
 * - Lesson is not already in completedLessons
 *
 * The existing beforeChange hook on Enrollments handles
 * progress recalculation and auto-completion automatically.
 */
export const completeLessonEndpoint: Endpoint = {
  path: '/:id/complete-lesson',
  method: 'post',
  handler: async (req) => {
    const { user, payload, routeParams } = req

    // 1. Verify authentication
    if (!user || user.collection !== 'customers') {
      throw new APIError('Authentication required. Please sign in as a student.', 401)
    }

    const enrollmentId = Number(routeParams?.id)
    if (!enrollmentId || isNaN(enrollmentId)) {
      throw new APIError('Valid enrollment ID is required.', 400)
    }

    // 2. Parse request body
    const body = req.json ? await req.json() : {}
    const { lessonId: rawLessonId } = body as { lessonId?: number | string }

    if (!rawLessonId) {
      throw new APIError('lessonId is required in request body.', 400)
    }

    const lessonId = Number(rawLessonId)
    if (isNaN(lessonId)) {
      throw new APIError('lessonId must be a valid number.', 400)
    }

    // 3. Fetch enrollment and verify ownership
    const enrollment = await payload.findByID({
      collection: 'course-enrollments',
      id: enrollmentId,
      depth: 0,
      req,
    })

    const enrollmentCustomerId =
      typeof enrollment.customer === 'object' ? enrollment.customer.id : enrollment.customer

    if (enrollmentCustomerId !== user.id) {
      throw new APIError('You do not have access to this enrollment.', 403)
    }

    if (enrollment.status !== 'active') {
      throw new APIError(
        `Cannot mark lessons as complete. Enrollment status is "${enrollment.status}".`,
        400,
      )
    }

    // 4. Verify lesson belongs to the enrollment's course
    const courseId =
      typeof enrollment.course === 'object' ? enrollment.course.id : enrollment.course

    const lesson = await payload.findByID({
      collection: 'lessons',
      id: lessonId,
      depth: 0,
      req,
      overrideAccess: true,
    })

    const lessonCourseId = typeof lesson.course === 'object' ? lesson.course.id : lesson.course

    if (lessonCourseId !== courseId) {
      throw new APIError('This lesson does not belong to the enrolled course.', 400)
    }

    // 5. Check if lesson is already completed (deduplicate)
    const existingCompleted: number[] = (enrollment.completedLessons || []).map((l) =>
      typeof l === 'object' ? l.id : l,
    )

    if (existingCompleted.includes(lessonId)) {
      return Response.json({
        success: true,
        message: 'Lesson already marked as completed.',
        progress: enrollment.progress,
      })
    }

    // 6. Add lesson to completedLessons and update lastAccessedAt
    // The Enrollments beforeChange hook will auto-calculate progress
    // and auto-complete the course if progress reaches 100%
    const updatedEnrollment = await payload.update({
      collection: 'course-enrollments',
      id: enrollmentId,
      data: {
        completedLessons: [...existingCompleted, lessonId] as number[],
        lastAccessedAt: new Date().toISOString(),
      },
      req,
    })

    return Response.json({
      success: true,
      message:
        updatedEnrollment.status === 'completed'
          ? 'Lesson completed! You have finished the course! 🎉'
          : 'Lesson marked as completed.',
      progress: updatedEnrollment.progress,
      status: updatedEnrollment.status,
      completedLessons: updatedEnrollment.completedLessons,
    })
  },
}
