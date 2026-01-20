'use client'

import { cn, highlightColorMap } from '@/lib/utils'
import { BlockRendererProps, TabLayoutBlock } from '../types'
import { TextAnimate } from '@/components/ui/text-animate'
import { Highlighter } from '@/components/ui/highlighter'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useState } from 'react'
import { RichTextComponent } from '../RichTextContent/renderer'
import Image from 'next/image'
import { Media } from '@/payload-types'

export function TabLayoutBlockRenderer({ data }: BlockRendererProps<TabLayoutBlock>) {
  const { tabs, ...content } = data
  const [selectedTabID, setSelectedTabID] = useState<string | null>((tabs && tabs[0]?.id) || null)

  const highlightColor =
    (content?.highlightColor && highlightColorMap[content.highlightColor]) || '#f97316'

  const handleTabSwitch = (tabId: string) => {
    setSelectedTabID(tabId)
  }

  return (
    <div className="min-h-fit bg-white w-full overflow-hidden relative">
      <div className="container mx-auto px-4 py-14 md:py-16">
        {/* Header */}
        <div className="text-center mb-8">
          {content?.preHeading && (
            <TextAnimate
              as="h3"
              animation="slideRight"
              className="text-emerald-800 font-medium font-heading text-lg mb-2"
            >
              {content.preHeading}
            </TextAnimate>
          )}

          <div className="flex items-center justify-center text-center gap-4">
            {content?.heading && (
              <TextAnimate
                as="h1"
                animation="slideRight"
                className="text-emerald-950 font-black font-heading text-4xl mb-2"
              >
                {content.heading}
              </TextAnimate>
            )}

            {content?.highlightedText && (
              <h2 className="text-emerald-950 font-black font-heading text-4xl whitespace-nowrap">
                <Highlighter animationDuration={2500} action="underline" color={highlightColor}>
                  {content?.highlightedText}
                </Highlighter>
              </h2>
            )}
          </div>
        </div>

        {/* Tabs */}
        {tabs && tabs?.length > 0 && (
          <div className="space-y-8">
            <div className="mt-12 w-full flex items-center justify-start sm:justify-center">
              <ScrollArea className="w-full sm:w-fit">
                <div className="flex items-center justify-center border-b border-gray-200/70">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id || tab.tabLabel}
                      onClick={() => handleTabSwitch(tab.id!)}
                      className={`relative px-5 py-3 text-lg cursor-pointer font-medium whitespace-nowrap transition-colors bg-transparent ${
                        selectedTabID === tab.id
                          ? 'text-emerald-700'
                          : 'text-gray-600 hover:text-emerald-800/60'
                      }`}
                    >
                      {tab.tabLabel}
                      {tab.id === selectedTabID && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-1.5" />
              </ScrollArea>
            </div>

            <div
              className={cn('max-w-4xl mx-auto flex items-center gap-5', {
                'flex-row-reverse':
                  tabs.find((tab) => tab.id === selectedTabID)?.layout === 'imageLeft',
              })}
            >
              <div className="">
                <RichTextComponent
                  content={tabs.find((tab) => tab.id === selectedTabID)?.content!}
                />
              </div>
              {tabs.find((tab) => tab.id === selectedTabID)?.image instanceof Object && (
                <div className="">
                  <Image
                    src={(tabs.find((tab) => tab.id === selectedTabID)?.image as Media)?.url || ''}
                    alt={(tabs.find((tab) => tab.id === selectedTabID)?.image as Media)?.alt || ''}
                    width={400}
                    height={600}
                    className="rounded-lg object-cover max-w-xs md:max-w-sm h-96"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
