'use client'

import React, { useState, useTransition } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Form as FormType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

import {
  buildValidationSchema,
  getDefaultValues,
  type DynamicFormSchema,
} from '../build-validation-schema'
import { submitFormAction, type SubmitFormResult } from '../actions'
import { RenderFields } from './field-registry'
import type { z } from 'zod'

interface FormRendererClientProps {
  form: FormType
  enableCompanionText?: boolean | null
  companionText?: FormType['confirmationMessage']
  className?: string
}

export function FormRendererClient({
  form,
  enableCompanionText,
  companionText,
  className,
}: FormRendererClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [submitResult, setSubmitResult] = useState<SubmitFormResult | null>(null)

  // Build validation schema and default values from form fields
  const validationSchema = React.useMemo(() => buildValidationSchema(form.fields), [form.fields])
  const defaultValues = React.useMemo(() => getDefaultValues(form.fields), [form.fields])

  type FormData = z.infer<typeof validationSchema>

  const methods = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues as FormData,
  })

  const onSubmit = (data: Record<string, unknown>) => {
    startTransition(async () => {
      const result = await submitFormAction(form.id, data)
      setSubmitResult(result)

      if (result.success) {
        methods.reset()

        // Handle redirect if specified
        if (result.redirectUrl) {
          router.push(result.redirectUrl)
        }
      }
    })
  }

  // Show success message if form was submitted successfully
  if (submitResult?.success && submitResult.confirmationMessage) {
    return (
      <div className={cn('rounded-lg border border-green-200 bg-green-50 p-6', className)}>
        <div className="prose prose-green max-w-none">
          <RichText data={submitResult.confirmationMessage} />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full',
        enableCompanionText && companionText && 'grid md:grid-cols-2 gap-8 items-start',
        className,
      )}
    >
      {/* Companion Text */}
      {enableCompanionText && companionText && (
        <div className="prose max-w-none">
          <RichText data={companionText} />
        </div>
      )}

      {/* Form */}
      <div className="w-full">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <RenderFields fields={form.fields} />

            {/* Error message */}
            {submitResult?.error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
                {submitResult.error}
              </div>
            )}

            {/* Submit button */}
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? (
                <>
                  <Spinner className="mr-2 size-4" />
                  Submitting...
                </>
              ) : (
                form.submitButtonLabel || 'Submit'
              )}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
