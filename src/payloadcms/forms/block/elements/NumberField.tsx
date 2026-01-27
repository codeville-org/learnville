'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import type { NumberFieldBlock } from '../../types'
import { getPlaceholder } from '../../helpers'

type Props = NumberFieldBlock & {
  className?: string
}

export function NumberField({ name, label, required, defaultValue, className }: Props) {
  const { control } = useFormContext()

  const placeholder = getPlaceholder({ type: 'number' }, label || '')

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
            type="number"
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            aria-required={required ?? false}
            onChange={(e) => {
              const value = e.target.value
              field.onChange(value === '' ? '' : Number(value))
            }}
          />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
