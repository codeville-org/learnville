'use client'
import React, { useEffect, useId, useState, useTransition } from 'react'
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
  resetPasswordSchema,
  ResetPasswordSchema,
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
import { AlertCircleIcon, ArrowRightIcon, BellIcon, EditIcon, LogInIcon } from 'lucide-react'
import Link from 'next/link'
import { forgotPassword } from '../actions/forgot-password.action'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { resetPassword } from '../actions/reset-password'

type Props = {
  className?: string
  token?: string
}

export function ResetPasswordForm({ token }: Props) {
  const toastId = useId()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: '',
    },
  })

  useEffect(() => {
    if (token) form.reset({ ...form.getValues(), token })
  }, [token])

  const onSubmit = (data: ResetPasswordSchema) => {
    startTransition(async () => {
      toast.loading('Updating your password...', { id: toastId })

      const result = await resetPassword(data)

      if (result.success) {
        toast.success('Password reset successfully!', { id: toastId })

        router.push(
          `/signin?message=${encodeURIComponent('Your password has been reset successfully. Please sign in with your new password.')}`,
        )
        router.refresh()
      } else {
        toast.error(result.error || 'Password reset failed', { id: toastId })
        setError(result.error || 'Password reset failed')
      }
    })
  }

  return (
    <Card className="w-full shadow-none border-none bg-transparent">
      <CardHeader className="mb-3 w-full flex flex-col gap-1 items-center justify-center">
        <CardTitle className="text-3xl font-thin tracking-tighter font-heading text-dark-green">
          Reset Password
        </CardTitle>
        <CardDescription className="text-sm font-thin font-heading text-cafe-noir/80">{`Enter new password you expect to use`}</CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert className="mb-4" variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-base font-light">New Password</FieldLabel>
                  <PasswordInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your new password"
                    autoComplete="new-password"
                    className="h-11 shadow-none bg-white/30 border-cafe-noir/20 focus:ring-2 focus:ring-hunter-green/60 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-hunter-green/60 focus-visible:ring-offset-0"
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
            form="reset-password-form"
            className="w-full group h-12 rounded-lg bg-dark-green hover:bg-dark-green/90 text-khaki hover:text-khaki"
          >
            {isPending && <Spinner className="mr-2" />}
            Reset Password
            {!isPending && (
              <ArrowRightIcon className="group-hover:ml-2 transition-all duration-200" />
            )}
          </Button>
        </Field>

        <div className="flex items-center justify-center text-sm text-muted-foreground gap-1">
          <span>Don't have an account ?</span>
          <Link href={'/signup'} className="underline text-hunter-green hover:text-dark-green">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
