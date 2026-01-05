'use client'

import React, { useEffect, useRef } from 'react'
import { TextFieldClientComponent } from 'payload'
import { useField, useFormFields, TextInput } from '@payloadcms/ui'

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

    // Only auto-generate if slug matches previous auto-generated value
    const prevSlug = prevNameRef.current?.toString().replace(/ /g, '-').toLowerCase()
    if (prevSlug !== value) return

    prevNameRef.current = nameField.value
    setValue(nameField.value.toString().replace(/ /g, '-').toLowerCase())
  }, [nameField?.value])

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
