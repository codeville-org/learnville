'use client'
import React, { useId, useTransition } from 'react'
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
import { type SignupSchema, signupSchema } from '../types'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Button } from '@/components/ui/button'
import { signup } from '../actions/signup.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import { ArrowRightIcon, UserRoundPlusIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  className?: string
}

export default function SignupForm({ className }: Props) {
  const toastId = useId()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: SignupSchema) => {
    startTransition(async () => {
      toast.loading('Creating your account...', { id: toastId })

      const result = await signup(data)

      if (result.success) {
        toast.success('Account created successfully!', { id: toastId })

        router.push(
          `/signin?message=${encodeURIComponent(`Check your email to verify your account.`)}`,
        )
        router.refresh()
      } else {
        toast.error(result.error || 'Signup failed', { id: toastId })

        // Optionally set form errors
        if (result.error === 'Email already exists') {
          form.setError('email', {
            type: 'manual',
            message: result.error,
          })
        }
      }
    })
  }

  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="mb-3 w-full flex flex-col gap-1 items-center justify-center">
        <CardTitle className="text-3xl font-thin tracking-tighter font-heading text-dark-green">
          Get Started
        </CardTitle>
        <CardDescription className="text-sm font-thin font-heading text-cafe-noir/80">
          {`Signup with Learnville to access exclusive course contents`}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-base font-light">First Name</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="John"
                      className="h-11 shadow-none bg-white/30 border-cafe-noir/20 focus:ring-2 focus:ring-hunter-green/60 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-hunter-green/60 focus-visible:ring-offset-0"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-base font-light">Last Name</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Doe"
                      className="h-11 shadow-none bg-white/30 border-cafe-noir/20 focus:ring-2 focus:ring-hunter-green/60 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-hunter-green/60 focus-visible:ring-offset-0"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

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
                  <FieldLabel className="text-base font-light">Password</FieldLabel>
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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-base font-light">Confirm Password</FieldLabel>
                  <PasswordInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your password"
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
            form="signup-form"
            className="w-full group h-12 rounded-lg bg-dark-green hover:bg-dark-green/90 text-khaki hover:text-khaki"
          >
            {isPending && <Spinner className="mr-2" />}
            Create Account
            {!isPending && (
              <ArrowRightIcon className="group-hover:ml-2 transition-all duration-200" />
            )}
          </Button>
        </Field>

        <div className="flex items-center justify-center text-sm text-muted-foreground gap-1">
          <span>Already have an account ?</span>
          <Link href={'/signin'} className="underline text-hunter-green hover:text-dark-green">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
