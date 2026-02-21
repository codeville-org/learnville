import React from 'react'
import { notFound } from 'next/navigation'

import config from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { generateMeta } from '@/lib/seo/generateMetadata'
import { TextAnimate } from '@/components/ui/text-animate'
import { GridPattern } from '@/components/ui/grid-pattern'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { CourseRating } from '../_components/course-rating'
import {
  ArrowRightCircle,
  AwardIcon,
  BadgeDollarSignIcon,
  BadgeQuestionMarkIcon,
  Calendar,
  CalendarIcon,
  CheckCircle2Icon,
  CheckIcon,
  InfinityIcon,
  LogInIcon,
  Share2Icon,
  SmartphoneIcon,
  UsersRoundIcon,
  VideoIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RichTextComponent } from '@/payloadcms/blocks/RichTextContent/renderer'
import { Card } from '@/components/ui/card'

type Props = {
  params: Promise<{ slug?: string }>
}

// NextJS Incremental Static Regeneration (ISR) revalidation time
export const revalidate = 3600

async function getCourseBySlug(slug: string, isDraftMode: boolean) {
  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'courses',
    limit: 1,
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    draft: isDraftMode,
    overrideAccess: true,
    pagination: false,
  })

  if (res.totalDocs === 0) return null

  return res.docs[0]
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const courses = await payload.find({
    collection: 'courses',
    limit: 100,
    where: {
      slug: { exists: true },
      _status: { equals: 'published' },
    },
    select: { slug: true },
    pagination: false,
  })

  return courses.docs
    .filter((course) => course.slug)
    .map((course) => ({
      slug: course.slug!,
    }))
}

export default async function SingleCoursePage({ params }: Props) {
  const { slug } = await params

  if (!slug) notFound()

  const { isEnabled: isDraftMode } = await draftMode()
  const course = await getCourseBySlug(slug, isDraftMode)

  if (!course) notFound()

  return (
    <div>
      {/* Course Page Header */}
      <div className="w-full overflow-hidden relative bg-linear-to-tr from-emerald-900 to-emerald-700">
        <div className="container px-4 mx-auto">
          <div className="py-8 lg:pr-[430px] min-h-[380px] flex flex-col justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="text-white/80 hover:text-white/80 hover:underline">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/80" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/courses"
                      className="text-white/80 hover:text-white/80 hover:underline"
                    >
                      Courses
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/80" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">{course.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div>
              <TextAnimate
                as={'h1'}
                animation="blurIn"
                delay={0}
                className="text-4xl font-bold text-emerald-100 mb-2"
              >
                {course.title}
              </TextAnimate>
              <TextAnimate
                as={'p'}
                animation="blurIn"
                delay={0.5}
                className="text-lg text-emerald-100/80"
              >
                {course.shortDescription || course?.meta?.description || ''}
              </TextAnimate>

              <div className="mt-4 flex items-center gap-5">
                {/* Level Badge */}
                <Badge className="bg-cyan-300 text-cyan-950">
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </Badge>

                {/* Total XP Badge */}
                <Badge className="bg-yellow-300 text-yellow-950">{course.totalXP} XP</Badge>

                {/* Course Rating */}
                <CourseRating rating={course.overallRating || 0} />
              </div>

              <div className="mt-9 flex items-center gap-5">
                {course.instructor instanceof Object && (
                  <p className="text-sm text-emerald-100">
                    Created By {course.instructor.instructorProfile?.displayName}
                  </p>
                )}

                {course.updatedAt && (
                  <p className="text-sm text-emerald-100/80 flex items-center gap-1">
                    <CalendarIcon className="size-4" />
                    Last updated {new Date(course.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <GridPattern className=" opacity-20 max-h-full" />
      </div>

      {/* Course Content + Sticky Sidebar */}
      <div className="container px-4 py-8 mx-auto">
        <div className="lg:flex lg:gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-6">
            <div className="space-y-1">
              {/* Learning Outcomes */}
              <div className="border rounded-xl border-foreground/20 p-4 space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-emerald-950">Learning Outcomes</h2>
                  <p className="text-sm text-foreground/60">
                    By the end of this course, you'll be able to:
                  </p>
                </div>

                <div className="w-full grid grid-cols-2 gap-3">
                  {course.learningOutcomes?.map(({ outcome }, index) => (
                    <Card
                      key={index}
                      className="p-3 shadow-none flex flex-row items-start gap-3 bg-linear-to-tr from-emerald-200/20 to-amber-200/30 border-foreground/10"
                    >
                      <div className="size-5">
                        <CheckCircle2Icon className="size-5 min-w-5 text-emerald-900/80" />
                      </div>

                      <div className="line-clamp-2 text-emerald-950">{outcome}</div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Course Description */}
              {course.description && <RichTextComponent content={course.description} />}
            </div>
          </div>

          {/* Sticky Right Sidebar (Udemy-style) */}
          <div className="hidden lg:block w-[400px] shrink-0 -mt-[350px]">
            <div className="sticky top-32">
              <div className="bg-white rounded-xl shadow-xl border p-1">
                {/* Course thumbnail */}
                <div className="relative">
                  {course.thumbnail instanceof Object && (
                    <Image
                      src={course.thumbnail.url!}
                      alt={course.thumbnail.alt || course.title}
                      className="w-full aspect-video object-cover rounded-xl"
                      width={600}
                      height={325}
                    />
                  )}

                  <div className="absolute top-2 left-2">
                    {course.pricingType === 'free' && (
                      <Badge className="bg-green-600 text-green-50 hover:bg-green-700 hover:text-green-50 border-2 border-green-300">
                        <BadgeDollarSignIcon />
                        Enroll for Free !
                      </Badge>
                    )}
                    {course.pricingType === 'premium' && (
                      <Badge className="bg-purple-600 text-purple-50 hover:bg-purple-700 hover:text-purple-50 border-2 border-purple-300">
                        <BadgeDollarSignIcon />
                        Premium Course
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {course.pricingType === 'premium' && course.price && course.price > 0 && (
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xl font-black text-emerald-700">
                        {`$${course.price?.toFixed(2)}`}
                      </p>

                      <p className="text-xs text-secondary-foreground/80">
                        {`100% Money-Back Guarantee`}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      size={'lg'}
                      className={cn(
                        'flex-1 w-full hover:bg-emerald-900 bg-emerald-950 hover:text-emerald-50 text-emerald-100 h-12 rounded-lg',
                      )}
                    >
                      Enroll Now
                      <ArrowRightCircle />
                    </Button>
                    <Button
                      size={'lg'}
                      className={cn(
                        'flex-1 w-full hover:bg-emerald-900/20 bg-emerald-950/20 hover:text-emerald-800 text-emerald-900 h-12 rounded-lg',
                      )}
                    >
                      Add to Wishlist
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <h1 className="text-lg font-semibold text-emerald-950">This course includes</h1>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-7">
                          <VideoIcon className="size-4" />
                        </div>
                        {course.estimatedDuration} hours on-demand video
                      </div>

                      {course.certificateEnabled && (
                        <div className="flex items-center gap-2 text-sm text-foreground/80">
                          <div className="w-7">
                            <AwardIcon className="size-4" />
                          </div>
                          Certificate of completion
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-7">
                          <BadgeQuestionMarkIcon className="size-4" />
                        </div>
                        Interactive quizzes
                      </div>

                      <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-7">
                          <SmartphoneIcon className="size-4" />
                        </div>
                        Access on mobile
                      </div>

                      <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-7">
                          <InfinityIcon className="size-4" />
                        </div>
                        Lifetime access
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-foreground/80 text-sm hover:underline cursor-pointer">
                      <div className="w-7">
                        <Share2Icon className="size-4" />
                      </div>
                      Share this Course
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (!slug) return {}

  const { isEnabled: isDraftMode } = await draftMode()
  const course = await getCourseBySlug(slug, isDraftMode)

  if (!course) return {}

  return generateMeta({ doc: course })
}
