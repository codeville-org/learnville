import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function SingleBlogPageLayout({ children }: Props) {
  return <div className="w-full">{children}</div>
}
