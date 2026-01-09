import React from 'react'
import { CoursesBreadcrumb } from './components/courses-breadcrumb'

interface Props {
  children: React.ReactNode
}

export default function CoursesPageLayout({ children }: Props) {
  return (
    <div className="w-full max-w-xl mx-auto py-8">
      <CoursesBreadcrumb />

      <div className="w-full">{children}</div>
    </div>
  )
}
