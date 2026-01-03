'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { forgotPassword } from '@/modules/auth/actions/forgot-password.action'
import { SignoutButton } from '@/modules/auth/components/signout-button'
import { Customer } from '@/payload-types'
import React, { useId, useState, useTransition } from 'react'
import { toast } from 'sonner'

type Props = {
  user: Customer | null
}

export function UpdatePassword({ user }: Props) {
  const toastId = useId()
  const [email, setEmail] = useState(user?.email || '')
  const [success, setSuccess] = useState<boolean>(false)
  const [pending, startTransition] = useTransition()

  const handleSendPasswordLink = () => {
    startTransition(async () => {
      setSuccess(false)
      toast.loading('Sending password reset email...', { id: toastId })

      const result = await forgotPassword({ email })

      if (result.success) {
        toast.success('Password reset email sent successfully!', {
          id: toastId,
          description: 'Please logout before reset password',
        })
        setSuccess(true)
      } else {
        toast.error(result.error || 'Password reset failed', { id: toastId })
        setSuccess(false)
      }
    })
  }

  return (
    <>
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Password reset link sent</DialogTitle>
            <DialogDescription>
              {`You need to logged out before reset your password. Please check your email inbox for the password reset link.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <SignoutButton />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="p-0 flex flex-col gap-0">
        <CardHeader className="p-4 flex flex-col gap-1">
          <CardTitle className="font-bold text-xl font-heading">Update Password</CardTitle>
          <CardDescription className="">
            {`To change your password, please enter your email to send the password reset link. You may need to logged out before reset the password`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2 pb-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10"
            placeholder="Enter your current email"
          />
        </CardContent>
        <CardFooter className="p-4 py-3 bg-secondary/50 flex justify-end">
          <Button onClick={handleSendPasswordLink} disabled={pending}>
            {pending && <Spinner />}
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
