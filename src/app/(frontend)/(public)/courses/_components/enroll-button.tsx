'use client'

import React, { useEffect } from 'react'

import { useAuthStatus } from '@/modules/auth/hooks/use-auth-status'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRightCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'

type Props = {
  // TODO: Define props for course information and user information (if needed) to handle enrollment logic.
}

export function CourseEnrollButton({}: Props) {
  const router = useRouter()

  // TODO: Create new hook for get
  //    - Authentication status
  //    - course enrollment state with
  //    - Previous lead information (if any)
  // at once.
  const { isAuthenticated, isLoading } = useAuthStatus()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="flex-1 w-full rounded-lg h-12" />
        <Skeleton className="flex-1 w-full rounded-lg h-12" />
      </div>
    )
  }

  const handleEnroll = () => {
    if (!isAuthenticated) router.push('/signin')

    /**
     * TODO: Implement lead functionality
     * - Build following collections in payload
     *      - Leads (to store the lead information)
     *      - Affiliates (to store the affiliates)
     * - When the user click enroll button and authenticated,
     * -
     * - If the user is authenticated (and not enrolled),
     *   *      - Check if there are any previous lead information for the user with the course information.
     *   *      - Create a lead with the course information, user information, affiliate information and other relevant information.
     */
  }

  const handleAddToWishlist = () => {}

  return (
    <div className="flex items-center gap-2">
      <Button
        size={'lg'}
        className={cn(
          'flex-1 w-full hover:bg-emerald-900 bg-emerald-950 hover:text-emerald-50 text-emerald-100 h-12 rounded-lg',
        )}
        onClick={handleEnroll}
      >
        Enroll Now
        <ArrowRightCircle />
      </Button>

      <Button
        size={'lg'}
        className={cn(
          'flex-1 w-full hover:bg-emerald-800/20 bg-emerald-700/20 hover:text-emerald-800 text-emerald-900 h-12 rounded-lg',
        )}
        onClick={handleAddToWishlist}
      >
        Add to Wishlist
      </Button>
    </div>
  )
}
