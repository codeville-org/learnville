import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import React from 'react'

type Props = {
  rating: number
}

export function CourseRating({ rating }: Props) {
  return (
    <div className="flex items-center gap-3">
      <p className="text-amber-500 text-sm font-medium">{rating.toFixed(1)}</p>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1
          return (
            <StarIcon
              key={index}
              className={cn(
                'size-4',
                starValue <= Math.round(rating) ? 'text-amber-500' : 'text-amber-500/80',
              )}
              fill={starValue <= Math.round(rating) ? 'currentColor' : 'none'}
            />
          )
        })}
      </div>
    </div>
  )
}
