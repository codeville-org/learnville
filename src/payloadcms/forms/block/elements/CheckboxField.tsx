'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import type { CheckboxFieldBlock } from '../../types'

type Props = CheckboxFieldBlock & {
  className?: string
}

export function CheckboxField({ name, label, required, defaultValue, className }: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} orientation="horizontal" className={className}>
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.invalid}
            aria-required={required ?? false}
          />
          {label && (
            <FieldLabel htmlFor={name} className="cursor-pointer">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>
          )}
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
