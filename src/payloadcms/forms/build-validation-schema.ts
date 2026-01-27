import { z } from 'zod'
import type { Form } from '@/payload-types'

type FormField = NonNullable<Form['fields']>[number]

// Define the base schema type for dynamic form validation
export type DynamicFormSchema = z.ZodObject<Record<string, z.ZodTypeAny>>

/**
 * Builds a dynamic Zod schema based on form fields from Payload CMS
 * @param fields - Array of form field configurations from the Form collection
 * @returns Zod schema object for form validation
 */
export function buildValidationSchema(fields: Form['fields']): DynamicFormSchema {
  const schemaShape: Record<string, z.ZodTypeAny> = {}

  if (!fields || fields.length === 0) {
    return z.object(schemaShape)
  }

  for (const field of fields) {
    // Skip message blocks as they don't have input
    if (field.blockType === 'message') {
      continue
    }

    const fieldName = field.name
    if (!fieldName) continue

    let fieldSchema: z.ZodTypeAny

    switch (field.blockType) {
      case 'text':
      case 'textarea':
      case 'state':
      case 'country':
      case 'phone':
        fieldSchema = z.string()
        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            1,
            `${field.label || fieldName} is required`,
          )
        } else {
          fieldSchema = fieldSchema.optional()
        }
        break

      case 'email':
        fieldSchema = z.string().email('Please enter a valid email address')
        if (!field.required) {
          fieldSchema = z.union([fieldSchema, z.literal('')]).optional()
        }
        break

      case 'number':
        if (field.required) {
          fieldSchema = z.coerce
            .number({ message: `${field.label || fieldName} must be a valid number` })
            .refine((val) => val !== undefined && val !== null, {
              message: `${field.label || fieldName} is required`,
            })
        } else {
          // For optional numbers, accept empty string or transform to number
          fieldSchema = z
            .union([z.coerce.number(), z.literal('')])
            .optional()
            .transform((val) => (val === '' ? undefined : val))
        }
        break

      case 'select':
        if (field.options && field.options.length > 0) {
          const values = field.options.map((opt) => opt.value)
          fieldSchema = z.enum(values as [string, ...string[]])
          if (!field.required) {
            fieldSchema = fieldSchema.optional()
          }
        } else {
          fieldSchema = z.string().optional()
        }
        break

      case 'checkbox':
        fieldSchema = z.boolean()
        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodBoolean).refine((val) => val === true, {
            message: `${field.label || fieldName} must be checked`,
          })
        } else {
          fieldSchema = fieldSchema.optional()
        }
        break

      default:
        fieldSchema = z.any()
    }

    schemaShape[fieldName] = fieldSchema
  }

  return z.object(schemaShape)
}

/**
 * Get default values for a form based on field configurations
 * @param fields - Array of form field configurations
 * @returns Object with default values keyed by field name
 */
export function getDefaultValues(fields: Form['fields']): Record<string, unknown> {
  if (!fields || fields.length === 0) {
    return {}
  }

  const defaults: Record<string, unknown> = {}

  for (const field of fields) {
    // Skip message blocks
    if (field.blockType === 'message') {
      continue
    }

    const fieldName = field.name
    if (!fieldName) continue

    switch (field.blockType) {
      case 'checkbox':
        defaults[fieldName] = field.defaultValue ?? false
        break

      case 'number':
        defaults[fieldName] = field.defaultValue ?? ''
        break

      case 'text':
      case 'textarea':
      case 'select':
        defaults[fieldName] = field.defaultValue ?? ''
        break

      case 'phone':
        defaults[fieldName] = field.defaultValue ?? ''
        break

      case 'email':
      case 'state':
      case 'country':
        defaults[fieldName] = ''
        break

      default:
        defaults[fieldName] = ''
    }
  }

  return defaults
}

export type FormValues = z.infer<ReturnType<typeof buildValidationSchema>>
