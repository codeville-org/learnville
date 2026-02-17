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
import { type SigninSchema, signinSchema } from '../types'
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
import {
  AlertCircleIcon,
  ArrowRightCircleIcon,
  ArrowRightIcon,
  BellIcon,
  LogInIcon,
} from 'lucide-react'
import Link from 'next/link'
import { signin } from '../actions/signin.action'
import { Alert, AlertTitle } from '@/components/ui/alert'

type Props = {
  className?: string
  message?: string
}

export default function SigninForm({ message }: Props) {
  const toastId = useId()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: SigninSchema) => {
    startTransition(async () => {
      toast.loading('Signing in...', { id: toastId })

      const result = await signin(data)

      if (result.success) {
        toast.success('Signed in successfully!', { id: toastId })

        router.push(`/portal`)
        router.refresh()
      } else {
        toast.error(result.error || 'Signin failed', { id: toastId })
        setError(result.error || 'Signin failed')
      }
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-none border-none bg-transparent">
      <CardHeader className="mb-3 w-full flex flex-col gap-1 items-center justify-center">
        <CardTitle className="text-3xl font-thin tracking-tighter font-heading text-dark-green">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-sm font-thin font-heading text-cafe-noir/80">{`Signin with Learnville account to explore your portal`}</CardDescription>
      </CardHeader>

      <CardContent>
        {message && (
          <Alert className="mb-4">
            <BellIcon />
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        )}
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
                  <FieldLabel className="text-base font-light">Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    type="email"
                    className="h-11 shadow-none bg-white/30 border-cafe-noir/20 focus:ring-2 focus:ring-hunter-green/60 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-hunter-green/60 focus-visible:ring-offset-0"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="w-full flex items-center justify-between">
                    <FieldLabel className="text-base font-light">Password</FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-raw-umber/90 hover:text-raw-umber underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
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
            form="signin-form"
            className="w-full group h-12 rounded-lg bg-dark-green hover:bg-dark-green/90 text-khaki hover:text-khaki"
          >
            {isPending && <Spinner className="mr-2" />}
            Sign in
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
