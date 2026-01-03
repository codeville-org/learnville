'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

import type { SignupSchema, SignupResponseSchema } from '../types'

export async function signup(data: SignupSchema): Promise<SignupResponseSchema> {
  try {
    const { email, password, firstName, lastName, confirmPassword } = data

    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match' }
    }

    const payload = await getPayload({ config })

    const existingRecords = await payload.find({
      collection: 'customers',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existingRecords.totalDocs === 0) {
      try {
        await payload.create({
          collection: 'customers',
          data: {
            email,
            password,
            firstName,
            lastName,
          },
        })

        return { success: true }
      } catch (error) {
        return { success: false, error: 'Failed to create new account' }
      }
    } else return { success: false, error: 'Email already exists' }
  } catch (error) {
    console.error(`[SIGNUP ACTION ERROR] \n ----- \n ${error} \n -----`)

    return { success: false, error: 'An unexpected error occurred' }
  }
}
