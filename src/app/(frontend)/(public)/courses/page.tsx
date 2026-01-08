import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export default async function CoursesPage() {
  const payload = await getPayload({ config })

  const courses = await payload.find({
    collection: 'courses',
    overrideAccess: true,
  })

  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {courses.docs.map((course) => (
          <Card className="p-0 w-full aspect-video overflow-hidden" key={course.id}>
            <Image
              src={course.thumbnail instanceof Object ? `${course?.thumbnail?.url}` : '#'}
              alt={course.title || 'Course Thumbnail'}
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </Card>
        ))}
      </div>

      <p>{courses.totalDocs} courses found.</p>
    </div>
  )
}
