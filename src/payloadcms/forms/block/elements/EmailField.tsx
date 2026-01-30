'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import type { EmailFieldBlock } from '../../types'
import { getPlaceholder } from '../../helpers'

type Props = EmailFieldBlock & {
  className?: string
}

export function EmailField({ name, label, required, className }: Props) {
  const { control } = useFormContext()

  const placeholder = getPlaceholder({ type: 'email' }, label || '')

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
          <Input
            {...field}
            type="email"
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            aria-required={required ?? false}
            className="shadow-none bg-white h-11 rounded-md"
          />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
