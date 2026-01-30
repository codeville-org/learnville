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
import { countries } from '@/lib/data/countries'
import type { CountryFieldBlock } from '../../types'

type Props = CountryFieldBlock & {
  className?: string
}

export function CountryField({ name, label, required, className }: Props) {
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
              className="w-full shadow-none bg-white h-11 rounded-md"
              aria-invalid={fieldState.invalid}
              aria-required={required ?? false}
            >
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
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
