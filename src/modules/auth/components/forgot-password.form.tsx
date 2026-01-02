'use client'
import React, { useId, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
  type SigninSchema,
  signinSchema,
} from '../types'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import { AlertCircleIcon, BellIcon, LogInIcon, SendIcon } from 'lucide-react'
import Link from 'next/link'
import { forgotPassword } from '../actions/forgot-password.action'
import { Alert, AlertTitle } from '@/components/ui/alert'

type Props = {
  className?: string
}

export function ForgotPasswordForm({}: Props) {
  const toastId = useId()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: ForgotPasswordSchema) => {
    startTransition(async () => {
      toast.loading('Sending password reset email...', { id: toastId })

      const result = await forgotPassword(data)

      if (result.success) {
        toast.success('Password reset email sent successfully!', { id: toastId })

        router.push(
          `/signin?message=${encodeURIComponent('Please check your email for password reset instructions.')}`,
        )
        router.refresh()
      } else {
        toast.error(result.error || 'Password reset failed', { id: toastId })
        setError(result.error || 'Signin failed')
      }
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold font-heading">Forgot Password</CardTitle>
        <CardDescription>{`Enter your email to receive password reset link`}</CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert className="mb-4" variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    type="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="w-full flex flex-col gap-3">
        <Field orientation="horizontal" className="w-full">
          <Button
            disabled={isPending}
            size="lg"
            type="submit"
            form="signin-form"
            className="w-full"
          >
            {isPending ? <Spinner /> : <SendIcon />}
            Send Password Reset Link
          </Button>
        </Field>

        <div className="flex items-center justify-center text-sm text-muted-foreground gap-1">
          <span>Don't have an account ?</span>
          <Link href={'/signup'} className="underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
