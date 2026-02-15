import type { CollectionBeforeChangeHook } from 'payload'

export const beforeChange: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation === 'create') {
    // Snapshot student name, course title, instructor name at time of issue
    if (data.customer && typeof data.customer === 'number') {
      try {
        const customer = await req.payload.findByID({
          collection: 'customers',
          id: data.customer,
          depth: 0,
          req,
        })
        if (customer) {
          data.studentName =
            [customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.email
        }
      } catch {
        // Keep existing studentName if lookup fails
      }
    }

    if (data.course && typeof data.course === 'number') {
      try {
        const course = await req.payload.findByID({
          collection: 'courses',
          id: data.course,
          depth: 1,
          req,
        })
        if (course) {
          data.courseName = course.title
          // Get instructor name
          if (course.instructor && typeof course.instructor === 'object') {
            const instructor = course.instructor as {
              instructorProfile?: { displayName?: string | null }
              email?: string
            }
            data.instructorName =
              instructor.instructorProfile?.displayName || instructor.email || ''
          } else if (course.instructor && typeof course.instructor === 'number') {
            try {
              const instructorDoc = await req.payload.findByID({
                collection: 'users',
                id: course.instructor,
                depth: 0,
                req,
              })
              if (instructorDoc) {
                data.instructorName =
                  (instructorDoc.instructorProfile as { displayName?: string | null })
                    ?.displayName ||
                  instructorDoc.email ||
                  ''
              }
            } catch {
              // Keep existing instructorName
            }
          }
        }
      } catch {
        // Keep existing courseName if lookup fails
      }
    }

    // Set completion date from enrollment
    if (data.enrollment && typeof data.enrollment === 'number') {
      try {
        const enrollment = await req.payload.findByID({
          collection: 'course-enrollments',
          id: data.enrollment,
          depth: 0,
          req,
        })
        if (enrollment) {
          data.completionDate = enrollment.completedAt || new Date().toISOString()
          data.totalXPEarned = enrollment.totalXPEarned || 0
        }
      } catch {
        // Keep defaults
      }
    }
  }

  return data
}
