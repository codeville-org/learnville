import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function CoursesPageLayout({ children }: Props) {
  return (
    <div className="w-full max-w-xl mx-auto py-8">
      <h2 className="mb-3">Courses</h2>

      <div className="w-full">{children}</div>
    </div>
  )
}
