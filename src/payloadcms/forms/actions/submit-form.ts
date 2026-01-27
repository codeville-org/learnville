'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Form, Page } from '@/payload-types'

export type SubmitFormResult = {
  success: boolean
  message?: string
  redirectUrl?: string | null
  confirmationMessage?: Form['confirmationMessage']
  error?: string
}

type SubmissionData = Record<string, unknown>

/**
 * Server action to submit a form to Payload CMS form-submissions collection
 */
export async function submitFormAction(
  formId: number,
  data: SubmissionData,
): Promise<SubmitFormResult> {
  try {
    const payload = await getPayload({ config })

    // Fetch the form to get confirmation settings
    const form = await payload.findByID({
      collection: 'forms',
      id: formId,
      depth: 1,
    })

    if (!form) {
      return {
        success: false,
        error: 'Form not found',
      }
    }

    // Transform data to submission format
    const submissionData = Object.entries(data)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([field, value]) => ({
        field,
        value: typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value),
      }))

    // Create form submission
    await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData,
      },
    })

    // Determine redirect URL if confirmation type is redirect
    let redirectUrl: string | null = null

    if (form.confirmationType === 'redirect' && form.redirect) {
      if (form.redirect.type === 'custom' && form.redirect.url) {
        redirectUrl = form.redirect.url
      } else if (form.redirect.type === 'reference' && form.redirect.reference) {
        const pageRef = form.redirect.reference.value
        if (typeof pageRef === 'object' && pageRef !== null) {
          const page = pageRef as Page
          redirectUrl = page.slug ? `/${page.slug}` : '/'
        } else if (typeof pageRef === 'number') {
          // Fetch the page to get the slug
          try {
            const page = await payload.findByID({
              collection: 'pages',
              id: pageRef,
              depth: 0,
            })
            redirectUrl = page?.slug ? `/${page.slug}` : '/'
          } catch {
            redirectUrl = '/'
          }
        }
      }
    }

    return {
      success: true,
      message: 'Form submitted successfully',
      confirmationMessage:
        form.confirmationType === 'message' ? form.confirmationMessage : undefined,
      redirectUrl,
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit form',
    }
  }
}
