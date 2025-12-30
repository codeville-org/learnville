import { z } from 'zod'

// ------- Signup -------
export const signupSchema = z.object({
  email: z.email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string().optional(),
})

export type SignupSchema = z.infer<typeof signupSchema>

export const signupResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
})

export type SignupResponseSchema = z.infer<typeof signupResponseSchema>
