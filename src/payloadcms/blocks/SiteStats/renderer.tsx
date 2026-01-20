import React from 'react'

import { BlockRendererProps, SiteStatsBlock } from '../types'
import { fetchSiteStats } from '@/lib/actions/fetch-stats'
import { Card } from '@/components/ui/card'
import { AwardIcon, GraduationCapIcon, PlayCircleIcon, UserStarIcon } from 'lucide-react'
import { TextAnimate } from '@/components/ui/text-animate'
import { cn } from '@/lib/utils'

export async function SiteStatsRenderer({ data }: BlockRendererProps<SiteStatsBlock>) {
  try {
    const { variant } = data
    const { stats } = await fetchSiteStats()

    return (
      <section
        className={cn('relative w-full', {
          'bg-gray-200': variant === 'secondary',
          'bg-linear-to-tr from-emerald-600 to-emerald-700': variant === 'primary',
        })}
      >
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4">
            {/* Stat Card 1 */}
            <div className="w-full p-6 flex flex-col gap-0">
              <div className="flex items-start gap-2">
                <GraduationCapIcon
                  className={cn('size-12', {
                    'text-emerald-300/60': variant === 'primary',
                    'text-gray-600/60': variant === 'secondary',
                  })}
                  strokeWidth={1}
                />

                <div className="space-y-0">
                  <TextAnimate
                    animation="blurIn"
                    className={cn('text-5xl font-medium font-heading', {
                      'text-white': variant === 'primary',
                      'text-gray-700': variant === 'secondary',
                    })}
                    delay={0}
                  >
                    {stats?.activeLearners || ''}
                  </TextAnimate>
                  <TextAnimate
                    animation="slideRight"
                    delay={0.1}
                    className={cn('text-lg', {
                      'text-white/70': variant === 'primary',
                      'text-gray-500': variant === 'secondary',
                    })}
                  >
                    Active Learners
                  </TextAnimate>
                </div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="w-full p-6 flex flex-col gap-0">
              <div className="flex items-start gap-2">
                <AwardIcon
                  className={cn('size-12', {
                    'text-emerald-300/60': variant === 'primary',
                    'text-gray-600/60': variant === 'secondary',
                  })}
                  strokeWidth={1}
                />

                <div className="space-y-0">
                  <TextAnimate
                    animation="blurIn"
                    className={cn('text-5xl font-medium font-heading', {
                      'text-white': variant === 'primary',
                      'text-gray-700': variant === 'secondary',
                    })}
                    delay={0.5}
                  >
                    {stats?.certificatesIssued || ''}
                  </TextAnimate>
                  <TextAnimate
                    animation="slideRight"
                    delay={0.6}
                    className={cn('text-lg', {
                      'text-white/70': variant === 'primary',
                      'text-gray-500': variant === 'secondary',
                    })}
                  >
                    Certificates Issued
                  </TextAnimate>
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="w-full p-6 flex flex-col gap-0">
              <div className="flex items-start gap-2">
                <PlayCircleIcon
                  className={cn('size-12', {
                    'text-emerald-300/60': variant === 'primary',
                    'text-gray-600/60': variant === 'secondary',
                  })}
                  strokeWidth={1}
                />

                <div className="space-y-0">
                  <TextAnimate
                    animation="blurIn"
                    className={cn('text-5xl font-medium font-heading', {
                      'text-white': variant === 'primary',
                      'text-gray-700': variant === 'secondary',
                    })}
                    delay={1}
                  >
                    {stats?.coursesAvailable || ''}
                  </TextAnimate>
                  <TextAnimate
                    animation="slideRight"
                    delay={1.1}
                    className={cn('text-lg', {
                      'text-white/70': variant === 'primary',
                      'text-gray-500': variant === 'secondary',
                    })}
                  >
                    Courses Available
                  </TextAnimate>
                </div>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="w-full p-6 flex flex-col gap-0">
              <div className="flex items-start gap-2">
                <UserStarIcon
                  className={cn('size-12', {
                    'text-emerald-300/60': variant === 'primary',
                    'text-gray-600/60': variant === 'secondary',
                  })}
                  strokeWidth={1}
                />

                <div className="space-y-0">
                  <TextAnimate
                    animation="blurIn"
                    className={cn('text-5xl font-medium font-heading', {
                      'text-white': variant === 'primary',
                      'text-gray-700': variant === 'secondary',
                    })}
                    delay={1.5}
                  >
                    {stats?.expertInstructors || ''}
                  </TextAnimate>
                  <TextAnimate
                    animation="slideRight"
                    delay={1.6}
                    className={cn('text-lg', {
                      'text-white/70': variant === 'primary',
                      'text-gray-500': variant === 'secondary',
                    })}
                  >
                    Expert Instructors
                  </TextAnimate>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    return <div></div>
  }
}
