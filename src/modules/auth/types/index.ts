import { z } from 'zod'

// ------- Signup -------
export const signupSchema = z
  .object({
    email: z.email(),
    firstName: z.string(),
    lastName: z.string().optional(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupSchema = z.infer<typeof signupSchema>

export const signupResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
})

export type SignupResponseSchema = z.infer<typeof signupResponseSchema>
