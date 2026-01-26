import { TextField } from '@payloadcms/plugin-form-builder/types'
import React from 'react'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { getPlaceholder } from '../../helpers'

type Props = {
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  register: UseFormRegister<any & FieldValues>
} & TextField & {
    /* any additional props */
    placeholder?: string
  }

export function FormTextField(props: Props) {
  const {
    name,
    errors,
    register,
    label,
    required: requiredFromProps,
    blockType,
    width,
    placeholder: customPlaceholder,
  } = props

  const placeholder = getPlaceholder({ type: 'text' }, customPlaceholder || label || '')

  return <div>TextField</div>
}
