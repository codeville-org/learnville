'use client'

import React, { useId, useState, useTransition } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Form as FormType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import type { FormBlock } from '@/payloadcms/blocks/types'

import {
  buildValidationSchema,
  getDefaultValues,
  type DynamicFormSchema,
} from '../build-validation-schema'
import { submitFormAction, type SubmitFormResult } from '../actions'
import { RenderFields } from './field-registry'
import type { z } from 'zod'
import { TextAnimate } from '@/components/ui/text-animate'
import { Highlighter } from '@/components/ui/highlighter'
import { toast } from 'sonner'

interface FormRendererClientProps {
  form: FormType
  headingEnabled?: boolean | null
  className?: string
  layout?: FormBlock['layout']
}

export function FormRendererClient({
  form,
  headingEnabled = true,
  className,
  layout,
}: FormRendererClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [submitResult, setSubmitResult] = useState<SubmitFormResult | null>(null)
  const toastId = useId()

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
      toast.loading('Submitting form...', { id: toastId })
      const result = await submitFormAction(form.id, data)
      setSubmitResult(result)

      if (result.success) {
        methods.reset()
        toast.success('Form submitted successfully!', { id: toastId })

        // Handle redirect if specified
        if (result.redirectUrl) {
          router.push(result.redirectUrl)
        }
      } else {
        toast.error(result.error || 'There was an error submitting the form.', { id: toastId })
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
        layout && layout === 'twoColumn' && 'grid md:grid-cols-2 gap-8 items-start',
        layout && layout === 'constrained' && 'max-w-3xl mx-auto',
        className,
      )}
    >
      {/* Companion Text */}
      {headingEnabled && (
        <div className={cn('mb-12', layout === 'constrained' && 'text-center')}>
          {form?.subheading && (
            <TextAnimate
              as="h3"
              animation="slideRight"
              className="text-emerald-800 font-medium font-heading text-lg mb-2"
            >
              {form.subheading}
            </TextAnimate>
          )}

          <div className="space-y-2">
            {form?.heading && (
              <h1 className="text-3xl sm:text-4xl font-semibold text-emerald-950 font-heading">
                <Highlighter animationDuration={2500} action="underline" color={'#08a16e'}>
                  {form.heading}
                </Highlighter>
              </h1>
            )}
          </div>

          {form?.description && <p className="mt-4 text-emerald-950/60">{form?.description}</p>}
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
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto h-11 rounded-md bg-emerald-800 hover:bg-emerald-900"
            >
              {isPending ? (
                <>
                  <Spinner />
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
