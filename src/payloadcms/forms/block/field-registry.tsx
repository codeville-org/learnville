'use client'

import React from 'react'
import type { FormFieldBlock } from '../types'
import {
  TextField,
  TextareaField,
  EmailField,
  NumberField,
  SelectField,
  CheckboxField,
  CountryField,
  StateField,
  MessageBlock,
  FieldWrapper,
} from './elements'

/**
 * Registry mapping field block types to their React components
 */
const fieldRegistry = {
  text: TextField,
  textarea: TextareaField,
  email: EmailField,
  number: NumberField,
  select: SelectField,
  checkbox: CheckboxField,
  country: CountryField,
  state: StateField,
  message: MessageBlock,
  phone: TextField, // Phone uses the same component as text
} as const

type FieldBlockType = keyof typeof fieldRegistry

/**
 * Renders a single form field based on its blockType
 */
interface RenderFieldProps {
  field: FormFieldBlock
  index: number
}

export function RenderField({ field, index }: RenderFieldProps) {
  const blockType = field.blockType as FieldBlockType
  const FieldComponent = fieldRegistry[blockType]

  if (!FieldComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`No field component found for block type: ${blockType}`)
    }
    return null
  }

  // Get width properties based on field type
  const width = 'width' in field ? field.width : undefined
  const fieldWidth = 'fieldWidth' in field ? field.fieldWidth : undefined
  const hidden = 'hidden' in field ? field.hidden : undefined

  // For message blocks, don't wrap in FieldWrapper (they handle their own layout)
  if (blockType === 'message') {
    return (
      <FieldWrapper key={field.id || index} width={width} fieldWidth={fieldWidth} hidden={hidden}>
        <MessageBlock {...(field as any)} />
      </FieldWrapper>
    )
  }

  return (
    <FieldWrapper key={field.id || index} width={width} fieldWidth={fieldWidth} hidden={hidden}>
      <FieldComponent {...(field as any)} />
    </FieldWrapper>
  )
}

/**
 * Renders all form fields
 */
interface RenderFieldsProps {
  fields: FormFieldBlock[] | null | undefined
}

export function RenderFields({ fields }: RenderFieldsProps) {
  if (!fields || fields.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-4 items-start">
      {fields.map((field, index) => (
        <RenderField key={field.id || index} field={field} index={index} />
      ))}
    </div>
  )
}
