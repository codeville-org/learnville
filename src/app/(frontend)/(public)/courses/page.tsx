import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default async function CoursesPage() {
  const payload = await getPayload({ config })

  const courses = await payload.find({
    collection: 'courses',
    overrideAccess: true,
  })

  return (
    <div className="w-full space-y-5">
      <div className="grid grid-cols-2 gap-4">
        {courses.docs.map((course) => (
          <Link
            href={`/courses/${course.slug}`}
            key={course.id}
            className="group cursor-pointer rounded-md space-y-1"
          >
            <Card className="p-0 w-full aspect-video overflow-hidden">
              <Image
                src={course.thumbnail instanceof Object ? `${course?.thumbnail?.url}` : '#'}
                alt={course.title || 'Course Thumbnail'}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </Card>

            <div className="space-y-0.5 px-2">
              <p className="text-sm font-semibold line-clamp-1 group-hover:underline">
                {course.title}
              </p>
              <p className="text-xs text-foreground/60 line-clamp-2">{course.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>

      <p>{courses.totalDocs} courses found.</p>
    </div>
  )
}
