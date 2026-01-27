import type { Form } from '@/payload-types'

/**
 * Type for a single form field from the Form collection
 */
export type FormFieldBlock = NonNullable<Form['fields']>[number]

/**
 * Extract specific field type by blockType discriminator
 */
export type ExtractFieldType<T extends FormFieldBlock['blockType']> = Extract<
  FormFieldBlock,
  { blockType: T }
>

/**
 * Common props passed to all field components
 */
export interface BaseFieldProps {
  name: string
  label?: string | null
  width?: number | null
  required?: boolean | null
}

/**
 * Specific field types for type safety
 */
export type TextFieldBlock = ExtractFieldType<'text'>
export type TextareaFieldBlock = ExtractFieldType<'textarea'>
export type EmailFieldBlock = ExtractFieldType<'email'>
export type NumberFieldBlock = ExtractFieldType<'number'>
export type SelectFieldBlock = ExtractFieldType<'select'>
export type CheckboxFieldBlock = ExtractFieldType<'checkbox'>
export type CountryFieldBlock = ExtractFieldType<'country'>
export type StateFieldBlock = ExtractFieldType<'state'>
export type MessageFieldBlock = ExtractFieldType<'message'>
export type PhoneFieldBlock = ExtractFieldType<'phone'>
