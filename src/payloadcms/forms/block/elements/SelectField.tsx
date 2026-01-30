'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import type { SelectFieldBlock } from '../../types'
import { getPlaceholder } from '../../helpers'

type Props = SelectFieldBlock & {
  className?: string
}

export function SelectField({
  name,
  label,
  required,
  options,
  placeholder: customPlaceholder,
  className,
}: Props) {
  const { control } = useFormContext()

  const placeholder = getPlaceholder({ type: 'select' }, customPlaceholder || label || '')

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
          <Select name={field.name} value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              className="w-full shadow-none bg-white h-11 rounded-md"
              aria-invalid={fieldState.invalid}
              aria-required={required ?? false}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
