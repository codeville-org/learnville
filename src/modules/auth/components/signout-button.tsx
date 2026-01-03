'use client'

import React, { useId, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { LogOutIcon } from 'lucide-react'
import { logout } from '../actions/signout'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Props {
  size?: 'icon' | 'lg' | 'default'
}

export function SignoutButton({ size = 'default' }: Props) {
  const router = useRouter()
  const toastId = useId()
  const [isPending, startTransition] = useTransition()

  const handleSignout = () => {
    startTransition(async () => {
      toast.loading('Signing out...', { id: toastId })

      const result = await logout()

      if (result.success) {
        toast.success('Signed out successfully!', { id: toastId })

        router.refresh()
      } else {
        toast.error(result.error || 'Signin failed', { id: toastId })
      }
    })
  }

  return (
    <Button onClick={handleSignout} disabled={isPending} size={size}>
      {isPending ? <Spinner /> : <LogOutIcon />}
      {size !== 'icon' ? (isPending ? 'Signing out...' : 'Sign Out') : null}
    </Button>
  )
}
