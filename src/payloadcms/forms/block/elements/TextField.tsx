'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field'
import type { TextFieldBlock, PhoneFieldBlock } from '../../types'
import { getPlaceholder } from '../../helpers'

type Props = (TextFieldBlock | PhoneFieldBlock) & {
  className?: string
}

export function TextField({ name, label, required, defaultValue, className }: Props) {
  const { control } = useFormContext()

  const placeholder = getPlaceholder({ type: 'text' }, label || '')

  if (!name) return null

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
