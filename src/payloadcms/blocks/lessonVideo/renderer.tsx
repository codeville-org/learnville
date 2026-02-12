import React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

import type { BlockRendererProps, LessonVideoBlock } from '../types'

export function LessonVideoRenderer({ data }: BlockRendererProps<LessonVideoBlock>) {
  const thumbnailData = typeof data.thumbnail === 'object' ? data.thumbnail : null
  const videoData = typeof data.video === 'object' ? data.video : null

  // The Bunny Stream plugin populates the upload doc with a `url` pointing to the stream
  const videoURL = videoData?.url || null

  return (
    <div className="space-y-6">
      {/* Video Title */}
      {data.videoTitle && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{data.videoTitle}</h2>
          {data.videoDuration && (
            <p className="text-sm text-gray-600 mt-1">
              Duration: {Math.floor(data.videoDuration / 60)} min {data.videoDuration % 60} sec
            </p>
          )}
        </div>
      )}

      {/* Video Player */}
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {videoURL ? (
          <iframe
            src={videoURL}
            title={data.videoTitle || 'Lesson Video'}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : thumbnailData ? (
          <div className="relative w-full h-full group cursor-pointer">
            <Image
              src={thumbnailData.url || ''}
              alt={thumbnailData.alt || 'Video thumbnail'}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-gray-900 ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <p>No video available</p>
          </div>
        )}
      </div>

      {/* Transcript */}
      {data.transcript && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            {/* Rich text content - you'll need to render this with your rich text renderer */}
            <div>{JSON.stringify(data.transcript)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
