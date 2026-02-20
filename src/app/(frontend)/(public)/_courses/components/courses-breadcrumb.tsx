'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export function CoursesBreadcrumb() {
  const pathname = usePathname()
  const isCoursePage = pathname === '/courses'

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {isCoursePage ? (
            <BreadcrumbPage>Courses</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/courses">Courses</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
