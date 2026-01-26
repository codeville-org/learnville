import type { Field } from 'payload'

export function getPlaceholder(field: Field, customPlaceholder?: string): string {
  switch (field.type) {
    case 'text':
      return customPlaceholder || 'Enter text here'

    case 'email':
      return customPlaceholder || 'Enter email address here'

    case 'textarea':
      return customPlaceholder || 'Enter detailed information here'

    case 'number':
      return customPlaceholder || 'Enter number here'

    case 'select':
      return customPlaceholder || 'Select an option'

    default:
      return ''
  }
}

export function getFieldWidthStyle(field: Field): string {
  return 'full'
}
