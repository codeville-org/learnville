import { Customer } from '@/payload-types'
import { z } from 'zod'

// ------- Signup -------
export const signupSchema = z
  .object({
    email: z.email(),
    firstName: z.string(),
    lastName: z.string().optional(),
    password: z.string().min(1, 'Password is required'),
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

// ------- Signin -------
export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
})

export type SigninSchema = z.infer<typeof signinSchema>

export const signinResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
})

export type SigninResponseSchema = z.infer<typeof signinResponseSchema>

export type SigninActionResult = {
  exp?: number
  token?: string
  user?: Customer
}
