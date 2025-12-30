// Customized Brevo Email Adapter for Payload CMS
import nodemailer from 'nodemailer'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { EmailAdapter } from 'payload'

const customBrevoTransport = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER!,
    pass: process.env.BREVO_SMTP_PASSWORD!,
  },
})

export default function brevoAdapter(): Promise<EmailAdapter> {
  const adapter = nodemailerAdapter({
    defaultFromName: process.env.BREVO_SENDER_NAME!,
    defaultFromAddress: process.env.BREVO_SENDER_EMAIL!,
    transport: customBrevoTransport,
  })

  return adapter
}
