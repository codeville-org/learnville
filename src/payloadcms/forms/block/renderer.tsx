import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { BlockRendererProps, FormBlock } from '@/payloadcms/blocks/types'
import type { Form as FormType } from '@/payload-types'
import { FormRendererClient } from './FormRendererClient'

/**
 * Server component that fetches the full form data and renders the client form
 */
export async function FormBlockRenderer({ data }: BlockRendererProps<FormBlock>) {
  const { form: formRef, layout } = data

  // Get form ID from relationship (can be number or populated Form object)
  const formId = typeof formRef === 'number' ? formRef : formRef?.id

  if (!formId) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="p-4 border border-yellow-400 bg-yellow-50 rounded-lg text-yellow-800">
          <p className="font-medium">Form Block Error</p>
          <p className="text-sm">No form selected. Please select a form in the admin panel.</p>
        </div>
      )
    }
    return null
  }

  try {
    const payload = await getPayload({ config })

    // Fetch the full form with all fields
    const form = await payload.findByID({
      collection: 'forms',
      id: formId,
      depth: 1,
    })

    if (!form) {
      if (process.env.NODE_ENV === 'development') {
        return (
          <div className="p-4 border border-red-400 bg-red-50 rounded-lg text-red-800">
            <p className="font-medium">Form not found</p>
            <p className="text-sm">Form with ID {formId} does not exist.</p>
          </div>
        )
      }
      return null
    }

    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <FormRendererClient form={form as FormType} layout={layout} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error loading form:', error)
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="p-4 border border-red-400 bg-red-50 rounded-lg text-red-800">
          <p className="font-medium">Error loading form</p>
          <p className="text-sm">{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      )
    }
    return null
  }
}
