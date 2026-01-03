'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

import { UpdateResponseSchema, type UpdateSchema, updateSchema } from '../types'
import { getUser } from './get-user.action'

export async function update(data: UpdateSchema): Promise<UpdateResponseSchema> {
  try {
    const payload = await getPayload({ config })
    const user = await getUser()

    if (!user) throw new Error('User not authenticated')

    await payload.update({
      collection: 'customers',
      id: user.id,
      data: updateSchema.parse(data),
    })

    return { success: true }
  } catch (error) {
    console.error('Error updating user settings:', error)
    return { success: false, error: (error as Error)?.message || 'Unknown error' }
  }
}
