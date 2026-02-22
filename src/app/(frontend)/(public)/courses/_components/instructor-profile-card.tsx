import { Card } from '@/components/ui/card'
import { HydratedCourseData } from '@/lib/hydrate-page-blocks'
import Image from 'next/image'
import React from 'react'
import { CourseRating } from './course-rating'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  ArrowUpRightFromSquareIcon,
  BriefcaseIcon,
  GithubIcon,
  GlobeIcon,
  GraduationCapIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Course } from '@/payload-types'

type Props = {
  course: Course
}

export function InstructorProfileCard({ course }: Props) {
  if (
    course.instructor &&
    course.instructor instanceof Object &&
    course.instructor.instructorProfile?.isPublicProfile
  ) {
    return (
      <Card className="p-4 shadow-none border-foreground/20">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-start gap-6">
            {course.instructor.avatar instanceof Object && (
              <Image
                src={course.instructor.avatar.url!}
                alt={
                  course.instructor.avatar.alt ||
                  course.instructor.instructorProfile?.displayName ||
                  'Instructor'
                }
                className="size-16 rounded-full object-cover"
                width={200}
                height={200}
              />
            )}

            <div className="flex-1">
              <p className="text-xs text-foreground/80 tracking-wider">Course Created By,</p>

              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-emerald-950">
                    {course.instructor.instructorProfile?.displayName}
                  </h3>
                  {`•`}
                  <p className="text-sm text-foreground/80">
                    {course.instructor.instructorProfile?.tagline}
                  </p>
                </div>

                <CourseRating rating={course.instructor.instructorStats?.averageRating || 0} />
              </div>
              <p className="mt-3 text-sm text-foreground/80 line-clamp-2">
                {course.instructor.instructorProfile?.bio}
              </p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant={'link'}
                    size="sm"
                    className="px-0 w-fit mt-2 text-emerald-700 hover:text-emerald-800"
                  >
                    View Profile <ArrowUpRightFromSquareIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl max-h-[90vh] grid-rows-[auto_1fr] overflow-hidden">
                  <DialogHeader>
                    <div className="flex items-center gap-4">
                      {course.instructor.avatar instanceof Object && (
                        <Image
                          src={course.instructor.avatar.url!}
                          alt={
                            course.instructor.avatar.alt ||
                            course.instructor.instructorProfile?.displayName ||
                            'Instructor'
                          }
                          className="size-12 rounded-full object-cover"
                          width={200}
                          height={200}
                        />
                      )}

                      <div className="space-y-1">
                        <DialogTitle>{course.instructor.instructorProfile.displayName}</DialogTitle>
                        <DialogDescription>
                          {course.instructor.instructorProfile.tagline}
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>

                  <ScrollArea className="min-h-0 overflow-hidden">
                    <div className="space-y-6 pr-4 pb-6">
                      {/* Bio */}
                      {course.instructor.instructorProfile?.bio && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-emerald-950">About</h4>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {course.instructor.instructorProfile.bio}
                          </p>
                        </div>
                      )}

                      <Separator />

                      {/* Experience & Expertise */}
                      <div className="space-y-3">
                        {course.instructor.instructorProfile?.yearsExperience && (
                          <div className="flex items-center gap-2 text-sm text-foreground/80">
                            <BriefcaseIcon className="size-4 text-emerald-700" />
                            <span>
                              {course.instructor.instructorProfile.yearsExperience}+ years of
                              professional experience
                            </span>
                          </div>
                        )}

                        {course.instructor.instructorProfile?.expertise &&
                          course.instructor.instructorProfile.expertise.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-emerald-950">Expertise</h4>
                              <div className="flex flex-wrap gap-2">
                                {course.instructor.instructorProfile.expertise.map(
                                  (item) =>
                                    item instanceof Object && (
                                      <Badge
                                        key={item.id}
                                        className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-200"
                                      >
                                        {item.name}
                                      </Badge>
                                    ),
                                )}
                              </div>
                            </div>
                          )}
                      </div>

                      {/* Qualifications */}
                      {course.instructor.instructorProfile?.qualifications &&
                        course.instructor.instructorProfile.qualifications.length > 0 && (
                          <>
                            <Separator />
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-emerald-950">
                                Qualifications
                              </h4>
                              <div className="space-y-2">
                                {course.instructor.instructorProfile.qualifications.map((qual) => (
                                  <div
                                    key={qual.id}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                                  >
                                    <GraduationCapIcon className="size-5 text-emerald-700 mt-0.5 shrink-0" />
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-foreground">
                                        {qual.title}
                                      </p>
                                      <p className="text-xs text-foreground/60">
                                        {qual.institution}
                                        {qual.year ? ` · ${qual.year}` : ''}
                                      </p>
                                      {qual.type && (
                                        <Badge
                                          variant="outline"
                                          className="mt-1 text-[10px] capitalize px-1.5 py-0"
                                        >
                                          {qual.type}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                      {/* Social Links */}
                      {course.instructor.instructorProfile?.socialLinks && (
                        <>
                          <Separator />
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-emerald-950">Connect</h4>
                            <div className="flex flex-wrap gap-2">
                              {course.instructor.instructorProfile.socialLinks.website && (
                                <a
                                  href={course.instructor.instructorProfile.socialLinks.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5 text-foreground/70 hover:text-emerald-700 hover:border-emerald-300"
                                  >
                                    <GlobeIcon className="size-4" />
                                    Website
                                  </Button>
                                </a>
                              )}
                              {course.instructor.instructorProfile.socialLinks.linkedin && (
                                <a
                                  href={course.instructor.instructorProfile.socialLinks.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5 text-foreground/70 hover:text-emerald-700 hover:border-emerald-300"
                                  >
                                    <LinkedinIcon className="size-4" />
                                    LinkedIn
                                  </Button>
                                </a>
                              )}
                              {course.instructor.instructorProfile.socialLinks.twitter && (
                                <a
                                  href={course.instructor.instructorProfile.socialLinks.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5 text-foreground/70 hover:text-emerald-700 hover:border-emerald-300"
                                  >
                                    <TwitterIcon className="size-4" />
                                    Twitter
                                  </Button>
                                </a>
                              )}
                              {course.instructor.instructorProfile.socialLinks.github && (
                                <a
                                  href={course.instructor.instructorProfile.socialLinks.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5 text-foreground/70 hover:text-emerald-700 hover:border-emerald-300"
                                  >
                                    <GithubIcon className="size-4" />
                                    GitHub
                                  </Button>
                                </a>
                              )}
                              {course.instructor.instructorProfile.socialLinks.youtube && (
                                <a
                                  href={course.instructor.instructorProfile.socialLinks.youtube}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5 text-foreground/70 hover:text-emerald-700 hover:border-emerald-300"
                                  >
                                    <YoutubeIcon className="size-4" />
                                    YouTube
                                  </Button>
                                </a>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </Card>
    )
  } else return <></>
}
