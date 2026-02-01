import React from 'react'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'

import { BlockRendererProps, CTABlock } from '../types'
import { GridPattern } from '@/components/ui/grid-pattern'
import { TextAnimate } from '@/components/ui/text-animate'
import { Highlighter } from '@/components/ui/highlighter'
import { cn, getCTAHref, getNavigationLinkHref, highlightColorMap } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightIcon, GraduationCapIcon, UserSquare2Icon } from 'lucide-react'
import { Card } from '@/components/ui/card'

export async function CTARenderer({ data }: BlockRendererProps<CTABlock>) {
  try {
    const headers = await getHeaders()

    const payload = await getPayload({ config })

    const { user } = await payload.auth({ headers })

    const ctaData = await payload.findGlobal({
      slug: 'cta',
      overrideAccess: Boolean(user),
      draft: Boolean(user),
    })

    const highlightColor =
      (ctaData?.content?.highlightColor && highlightColorMap[ctaData?.content.highlightColor]) ||
      '#f97316'

    return (
      <section className="min-h-[500px] relative w-full bg-linear-to-tr bg-emerald-900 to-emerald-700 ">
        <div className="container px-4 mx-auto py-12 md:py-20">
          <div className="">
            {/* Header */}
            <div className="text-center">
              {ctaData?.content?.preHeading && (
                <TextAnimate
                  as="h3"
                  animation="slideRight"
                  className="text-emerald-200/90 font-medium font-heading text-lg mb-2"
                >
                  {ctaData?.content.preHeading}
                </TextAnimate>
              )}

              {ctaData?.content?.heading && (
                <TextAnimate
                  animation="blurIn"
                  as="h2"
                  className="text-emerald-100 font-medium font-heading text-3xl sm:text-5xl"
                >
                  {`${ctaData?.content?.heading}`}
                </TextAnimate>
              )}

              {ctaData?.content?.highlightedText && (
                <h2 className="text-emerald-100 font-black font-heading text-3xl sm:text-5xl whitespace-nowrap">
                  <Highlighter animationDuration={2500} action="highlight" color={highlightColor}>
                    {ctaData?.content?.highlightedText}
                  </Highlighter>
                </h2>
              )}

              {ctaData?.content?.description && (
                <TextAnimate
                  as="p"
                  animation="blurIn"
                  className="mt-6 px-6 text-sm text-emerald-50/60 max-w-2xl mx-auto"
                >
                  {ctaData?.content.description}
                </TextAnimate>
              )}
            </div>

            {/* Information */}
            {ctaData?.info && ctaData?.info?.length > 0 && (
              <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {ctaData?.info.map((infoItem, index) => {
                  const image = infoItem?.icon instanceof Object ? infoItem?.icon : null

                  return (
                    <div
                      key={index}
                      className={cn(
                        'text-center flex flex-col items-center justify-center px-0 sm:px-2',
                        {
                          //   'border-l border-emerald-200': index % 2 !== 0,
                        },
                      )}
                    >
                      {image && (
                        <Image
                          alt={image?.alt || 'Icon'}
                          src={image?.url || ''}
                          width={image?.width || 200}
                          height={image?.height || 200}
                          className="size-16 mb-2 object-contain"
                        />
                      )}

                      {infoItem?.title && (
                        <h2 className="text-emerald-50 font-medium text-sm sm:text-base font-heading">
                          {infoItem?.title}
                        </h2>
                      )}
                      {infoItem?.description && (
                        <h2 className="text-emerald-50/70 text-xs sm:text-sm line-clamp-3">
                          {infoItem?.description}
                        </h2>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* CTA Actions */}
            <div className="w-full flex items-center">
              {data?.type === 'buttons' && (
                <div className="pt-14 w-full flex flex-col sm:flex-row items-center justify-center gap-5">
                  {ctaData?.instructorCTA && (
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl bg-green-600 hover:bg-green-700 text-green-100 hover:text-green-50"
                    >
                      <Link href={getCTAHref(ctaData?.instructorCTA)}>
                        <UserSquare2Icon className="size-6" />

                        {ctaData?.instructorCTA.buttonLabel || 'Become an Instructor'}
                      </Link>
                    </Button>
                  )}
                  {ctaData?.studentCTA && (
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-100 hover:text-emerald-50"
                    >
                      <Link href={getCTAHref(ctaData?.instructorCTA)}>
                        <GraduationCapIcon className="size-6" />

                        {ctaData?.studentCTA.buttonLabel || 'Become a Student'}
                      </Link>
                    </Button>
                  )}
                </div>
              )}

              {data?.type === 'cards' && (
                <div className="h-fit sm:h-18 mt-16 sm:mt-0 w-full flex items-center justify-center">
                  <div className="flex sm:absolute z-10 mx-auto bottom-0 sm:-bottom-16">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      {ctaData?.instructorCTA && (
                        <Card className="max-w-full sm:max-w-md rounded-xl shadow-none h-40 flex flex-row items-center gap-0 overflow-hidden relative">
                          <div className="pl-6 pt-3">
                            <Image
                              alt={
                                ctaData?.instructorCTA?.image instanceof Object
                                  ? ctaData?.instructorCTA?.image?.alt
                                  : 'Instructor CTA Image'
                              }
                              src={
                                ctaData?.instructorCTA?.image instanceof Object
                                  ? ctaData?.instructorCTA?.image?.url || ''
                                  : ''
                              }
                              width={100}
                              height={150}
                              className="object-cover z-40 min-w-28 h-full"
                            />
                          </div>

                          <div className="p-5">
                            <h1 className="font-heading text-emerald-800 text-xl font-semibold">
                              {ctaData?.instructorCTA?.title}
                            </h1>
                            <p className="text-emerald-950/60 text-sm mt-1 line-clamp-2">
                              {ctaData?.instructorCTA?.description}
                            </p>

                            <Button
                              asChild
                              className="mt-2 rounded-xl bg-green-600 hover:bg-green-700 text-green-100 hover:text-green-50"
                            >
                              <Link href={getNavigationLinkHref(ctaData?.instructorCTA)}>
                                {ctaData?.instructorCTA.buttonLabel || 'Become an Instructor'}

                                <ArrowRightIcon className="size-4" />
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      )}
                      {ctaData?.studentCTA && (
                        <Card className="max-w-full sm:max-w-md rounded-xl shadow-none h-40 flex flex-row items-center gap-0 overflow-hidden relative">
                          <div className="pl-6 pt-3">
                            <Image
                              alt={
                                ctaData?.studentCTA?.image instanceof Object
                                  ? ctaData?.studentCTA?.image?.alt
                                  : 'Student CTA Image'
                              }
                              src={
                                ctaData?.studentCTA?.image instanceof Object
                                  ? ctaData?.studentCTA?.image?.url || ''
                                  : ''
                              }
                              width={100}
                              height={150}
                              className="object-cover z-40 min-w-28 h-full"
                            />
                          </div>

                          <div className="p-5">
                            <h1 className="font-heading text-emerald-800 text-xl font-semibold">
                              {ctaData?.studentCTA?.title}
                            </h1>
                            <p className="text-emerald-950/60 text-sm mt-1 line-clamp-2">
                              {ctaData?.studentCTA?.description}
                            </p>

                            <Button
                              asChild
                              className="mt-2 rounded-xl bg-green-600 hover:bg-green-700 text-green-100 hover:text-green-50"
                            >
                              <Link href={getNavigationLinkHref(ctaData?.studentCTA)}>
                                {ctaData?.studentCTA.buttonLabel || 'Become an Student'}

                                <ArrowRightIcon className="size-4" />
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <GridPattern className="opacity-20" />
      </section>
    )
  } catch (error) {
    return <div></div>
  }
}
