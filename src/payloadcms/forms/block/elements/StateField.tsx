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
import { usStates } from '@/lib/data/us-states'
import type { StateFieldBlock } from '../../types'

type Props = StateFieldBlock & {
  className?: string
}

export function StateField({ name, label, required, className }: Props) {
  const { control } = useFormContext()

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
              className="w-full"
              aria-invalid={fieldState.invalid}
              aria-required={required ?? false}
            >
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {usStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
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
