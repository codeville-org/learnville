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
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { update } from '@/modules/auth/actions/update.action'
import { updateSchema, UpdateSchema } from '@/modules/auth/types'
import { Customer } from '@/payload-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useId, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  user: Customer | null
}

export function UpdateInformation({ user }: Props) {
  const toastId = useId()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const form = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      })
    }
  }, [user])

  const handleUpdate = (data: UpdateSchema) => {
    startTransition(async () => {
      toast.loading('Updating user information...', { id: toastId })

      const result = await update(data)

      if (result.success) {
        toast.success('User information updated successfully!', {
          id: toastId,
        })
        router.refresh()
      } else {
        toast.error(result.error || 'User information update failed', { id: toastId })
      }
    })
  }

  return (
    <Card className="p-0 flex flex-col gap-0">
      <CardHeader className="p-4 flex flex-col gap-1">
        <CardTitle className="font-bold text-xl font-heading">Update User Information</CardTitle>
        <CardDescription className="">
          {`
              Update your account details including email, name etc.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-6">
        <form id="signin-form" onSubmit={form.handleSubmit(handleUpdate)}>
          <FieldGroup className="gap-4">
            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>First Name</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your first name"
                      type="text"
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
                    <FieldLabel>Last Name</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your last name"
                      type="text"
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
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    type="email"
                    disabled
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="p-4 py-3 bg-secondary/50 flex justify-end">
        <Field orientation="horizontal" className="w-fit">
          <Button disabled={pending} type="submit" form="signin-form" className="w-fit">
            {pending ? <Spinner /> : <EditIcon />}
            Update Information
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
