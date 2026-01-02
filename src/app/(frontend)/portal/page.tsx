import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { SignoutButton } from '@/modules/auth/components/signout-button'

type Props = {}

export default async function PortalPage({}: Props) {
  return (
    <div>
      PortalPage
      <SignoutButton />
    </div>
  )
}
