import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUser } from '@/modules/auth/actions/get-user.action'
import React from 'react'
import { UpdatePassword } from './_components/update-password'

type Props = {}

export default async function SettingsPage({}: Props) {
  const user = await getUser()

  return (
    <div className="w-full max-w-xl mx-auto py-8 flex flex-col gap-3">
      <div className="space-y-2">
        <h1 className="font-semibold text-2xl">Settings</h1>
        <p>{`Update user settings here`}</p>
      </div>

      <UpdatePassword user={user} />

      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  )
}
