'use client'

import React, { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NuqsAdapter>
  )
}
