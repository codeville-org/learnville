import { CollectionBeforeChangeHook } from 'payload'

import type { CourseEnrollment } from '@/payload-types'

export const beforeChange: CollectionBeforeChangeHook<CourseEnrollment> = async ({
  data,
  req,
  operation,
  originalDoc,
  context,
}) => {
  // Update progress based on completed lessons
  if (data.completedLessons && data.course) {
    try {
      const id = data.course instanceof Object ? data.course.id : data.course

      const course = await req.payload.findByID({
        collection: 'courses',
        id,
        req,
        draft: true,
      })

      // Count total lessons in course
      let totalLessons = 0
      if (course.chapters) {
        course.chapters.forEach((chapter) => {
          totalLessons += chapter.lessons?.length || 0
        })
      }

      const completedCount = data.completedLessons.length
      data.progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

      // Mark as completed if 100%
      if (data.progress === 100 && data.status !== 'completed') {
        data.status = 'completed'
        data.completedAt = new Date().toISOString()

        // Auto-issue certificate if enabled for this course
        const wasAlreadyCompleted = originalDoc?.status === 'completed'
        if (!wasAlreadyCompleted && !context?.skipCertificateIssuance) {
          try {
            // Check if course has certificate enabled
            if (course.certificateEnabled) {
              // Determine which template to use
              let templateId: number | undefined
              if (course.certificateTemplate) {
                templateId =
                  typeof course.certificateTemplate === 'object'
                    ? course.certificateTemplate.id
                    : course.certificateTemplate
              } else {
                // Find default template
                const { docs: defaultTemplates } = await req.payload.find({
                  collection: 'certificate-templates',
                  where: {
                    and: [{ isDefault: { equals: true } }, { status: { equals: 'active' } }],
                  },
                  limit: 1,
                  req,
                })
                if (defaultTemplates.length > 0) {
                  templateId = defaultTemplates[0].id
                }
              }

              if (templateId) {
                const customerId =
                  typeof data.customer === 'object' ? data.customer.id : data.customer

                // Check if certificate already exists for this enrollment
                const { docs: existingCerts } = await req.payload.find({
                  collection: 'certificates',
                  where: {
                    and: [{ customer: { equals: customerId } }, { course: { equals: id } }],
                  },
                  limit: 1,
                  req,
                })

                if (existingCerts.length === 0) {
                  await req.payload.create({
                    collection: 'certificates',
                    data: {
                      customer: customerId,
                      course: id,
                      enrollment: originalDoc?.id || 0,
                      template: templateId,
                      issuedAt: new Date().toISOString(),
                      totalXPEarned: data.totalXPEarned || 0,
                      completionDate: data.completedAt,
                      // studentName, courseName, instructorName auto-populated by Certificates beforeChange hook
                      studentName: '',
                      courseName: '',
                    },
                    draft: true,
                    req,
                    context: { skipCertificateIssuance: true },
                  })
                }
              }
            }
          } catch (certError) {
            console.error('Error auto-issuing certificate:', certError)
            // Don't fail the enrollment update if certificate fails
          }
        }
      }
    } catch (error) {
      console.error('Error calculating progress:', error)
    }
  }

  return data
}
