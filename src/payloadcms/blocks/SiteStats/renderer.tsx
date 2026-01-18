import React from 'react'

import { BlockRendererProps, SiteStatsBlock } from '../types'
import { fetchSiteStats } from '@/lib/actions/fetch-stats'
import { Card } from '@/components/ui/card'
import { AwardIcon, GraduationCapIcon, PlayCircleIcon, UserStarIcon } from 'lucide-react'
import { TextAnimate } from '@/components/ui/text-animate'

export async function SiteStatsRenderer({}: BlockRendererProps<SiteStatsBlock>) {
  try {
    const { stats } = await fetchSiteStats()

    return (
      <section className="relative w-full bg-white">
        <div className="container px-4 mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <Card className="w-full shadow-none   p-6 flex flex-col gap-0 border border-emerald-300 bg-linear-to-tr from-emerald-300/20 to-amber-300/20">
              <div className="flex items-start gap-3">
                <GraduationCapIcon className="size-16 text-green-400" strokeWidth={1} />

                <div className="space-y-0">
                  <TextAnimate
                    animation="blurIn"
                    className="text-5xl font-bold text-emerald-800 font-heading"
                    delay={0}
                  >
                    {stats?.activeLearners || ''}
                  </TextAnimate>
                  <TextAnimate
                    animation="slideRight"
                    delay={0.1}
                    className="text-lg text-emerald-950/70"
                  >
                    Active Learners
                  </TextAnimate>
                </div>
              </div>
            </Card>

            {/* Stat Card 2 */}
            <Card className="w-full shadow-none   p-6 flex flex-col gap-0 border border-emerald-300 bg-linear-to-tr from-emerald-300/20 to-amber-300/20">
              <div className="flex items-start gap-3">
                <AwardIcon className="size-16 text-green-400" strokeWidth={1} />

                <div className="space-y-0">
                  <TextAnimate
                    animation="blurIn"
                    className="text-5xl font-bold text-emerald-800 font-heading"
                    delay={0.5}
                  >
                    {stats?.certificatesIssued || ''}
                  </TextAnimate>
                  <TextAnimate
                    animation="slideRight"
                    delay={0.6}
                    className="text-lg text-emerald-950/70"
                  >
                    Certificates Issued
                  </TextAnimate>
                </div>
              </div>
            </Card>

            {/* Stat Card 3 */}
            <Card className="w-full shadow-none   p-6 flex flex-col gap-0 border border-emerald-300 bg-linear-to-tr from-emerald-300/20 to-amber-300/20">
              <div className="flex items-start gap-3">
                <PlayCircleIcon className="size-16 text-green-400" strokeWidth={1} />

                <div className="space-y-0">
                  <TextAnimate
                    animation="blurIn"
                    className="text-5xl font-bold text-emerald-800 font-heading"
                    delay={1}
                  >
                    {stats?.coursesAvailable || ''}
                  </TextAnimate>
                  <TextAnimate
                    animation="slideRight"
                    delay={1.1}
                    className="text-lg text-emerald-950/70"
                  >
                    Courses Available
                  </TextAnimate>
                </div>
              </div>
            </Card>

            {/* Stat Card 4 */}
            <Card className="w-full shadow-none   p-6 flex flex-col gap-0 border border-emerald-300 bg-linear-to-tr from-emerald-300/20 to-amber-300/20">
              <div className="flex items-start gap-3">
                <UserStarIcon className="size-16 text-green-400" strokeWidth={1} />

                <div className="space-y-0">
                  <TextAnimate
                    animation="blurIn"
                    className="text-5xl font-bold text-emerald-800 font-heading"
                    delay={1.5}
                  >
                    {stats?.expertInstructors || ''}
                  </TextAnimate>
                  <TextAnimate
                    animation="slideRight"
                    delay={1.6}
                    className="text-lg text-emerald-950/70"
                  >
                    Expert Instructors
                  </TextAnimate>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    return <div></div>
  }
}
