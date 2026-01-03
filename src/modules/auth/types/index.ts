import { Customer } from '@/payload-types'
import { email, z } from 'zod'

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

// ------- Forgot Password -------
export const forgotPasswordSchema = z.object({
  email: z.email().min(1, 'Email is required'),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export const forgotPasswordResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
})

export type ForgotPasswordResponseSchema = z.infer<typeof forgotPasswordResponseSchema>

// ------- Reset Password -------
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(1, 'Password is required'),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export const resetPasswordResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
})

export type ResetPasswordResponseSchema = z.infer<typeof resetPasswordResponseSchema>

// ------- Logout -------
export const logoutResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
})

export type LogoutResponseSchema = z.infer<typeof logoutResponseSchema>

// ------- Update Settings -------
export const updateSchema = z.object({
  email: z.email(),
  firstName: z.string(),
  lastName: z.string().optional(),
})

export type UpdateSchema = z.infer<typeof updateSchema>

export const updateResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
})

export type UpdateResponseSchema = z.infer<typeof updateResponseSchema>
