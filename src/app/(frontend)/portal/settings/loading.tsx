import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

export default function SettingsSkeletonPage({}: Props) {
  return (
    <div className="w-full max-w-xl mx-auto py-8 flex flex-col gap-3">
      <div className="space-y-3">
        <h1 className="font-semibold text-2xl">Settings</h1>
        <p>{`Update user settings here`}</p>
      </div>

      <Skeleton className="p-2 w-full h-52" />
    </div>
  )
}
