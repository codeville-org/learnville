'use client'

import React, { useEffect, useRef } from 'react'
import { TextFieldClientComponent } from 'payload'
import { useField, useFormFields, TextInput } from '@payloadcms/ui'
import slugify from 'slugify'

interface SlugComponentProps {
  trackingField?: string
}

export const SlugComponent: TextFieldClientComponent = (props) => {
  const { value, setValue } = useField<string>({ path: props.path })
  const trackingField = (props as SlugComponentProps)?.trackingField || 'title'
  const nameField = useFormFields(([fields]) => fields[trackingField])

  const prevNameRef = useRef(nameField?.value)
  const stopTrackingRef = useRef(false)

  useEffect(() => {
    if (stopTrackingRef.current || !nameField?.value) return

    const currentName = nameField.value.toString()
    const prevName = prevNameRef.current?.toString() || ''

    // Configure slugify to handle special characters properly
    const slugifyOptions = {
      lower: true,
      strict: true, // Remove special characters
      remove: /[*+~.()'"!:@]/g, // Remove these characters
    }

    // Only auto-generate if:
    // 1. Slug is empty/undefined (new document), OR
    // 2. Slug matches the previous auto-generated value
    const prevSlug = prevName ? slugify(prevName, slugifyOptions) : ''
    const isEmpty = !value || value === ''

    if (!isEmpty && prevSlug !== value) return

    prevNameRef.current = nameField.value
    const slugValue = slugify(currentName, slugifyOptions)

    setValue(slugValue)
  }, [nameField?.value, value, setValue])

  return (
    <TextInput
      path={props.path}
      label="Slug"
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value)
        stopTrackingRef.current = true
      }}
    />
  )
}
