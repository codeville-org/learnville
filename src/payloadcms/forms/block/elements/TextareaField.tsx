'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import type { TextareaFieldBlock } from '../../types'
import { getPlaceholder } from '../../helpers'

type Props = TextareaFieldBlock & {
  className?: string
}

export function TextareaField({ name, label, required, defaultValue, className }: Props) {
  const { control } = useFormContext()

  const placeholder = getPlaceholder({ type: 'textarea' }, label || '')

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          {label && (
            <FieldLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>
          )}
          <Textarea
            {...field}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            aria-required={required ?? false}
            rows={4}
            className="shadow-none bg-white rounded-md"
          />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
