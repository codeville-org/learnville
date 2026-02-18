import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function AuthImage() {
  return (
    <>
      <Image
        src="/assets/auth-bg.webp"
        alt="Background Image"
        className="w-full h-full object-cover"
        width={1280}
        height={1280}
        priority
      />

      <div className="absolute top-5 left-5 z-20">
        <Button variant={'link'} size="sm" className="text-white/60 hover:text-white" asChild>
          <Link href="/">
            <ArrowLeftIcon />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-dark-green to-hunter-green/20" />

      <div className="absolute bottom-0 left-0 text-white p-6">
        <h1 className="text-5xl tracking-tighter font-thin font-heading text-khaki">LearnVille.</h1>
        <p className="text-xs font-heading font-thin text-khaki/50">
          {`Unlock your potential with Learnville - Your gateway to knowledge and growth.`}
        </p>
      </div>
    </>
  )
}

function AuthFooter() {
  return (
    <div className="text-center py-6 shrink-0">
      <p className="text-xs text-gray-600">
        By registering with LearnVille, you agree to our <br />
        <a href="/terms" className="text-hunter-green underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-hunter-green underline">
          Privacy Policy
        </a>
      </p>
    </div>
  )
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-full h-screen overflow-hidden bg-khaki/70 relative lg:flex lg:items-stretch">
      {/* Image panel */}
      {/* Mobile: absolute behind sheet | Desktop: flex child 3/5 */}
      <div className="absolute inset-0 z-0 lg:relative lg:z-auto lg:flex-3/5 lg:h-full lg:p-4 lg:pr-0">
        <div className="w-full h-full relative lg:rounded-xl overflow-hidden">
          <AuthImage />
        </div>
      </div>

      {/* Form panel */}
      {/* Mobile: scrollable overlay sheet | Desktop: flex child 2/5 */}
      <div className="relative z-10 h-full overflow-y-auto pointer-events-none lg:pointer-events-auto lg:flex-2/5 lg:flex lg:flex-col lg:min-h-0">
        {/* Mobile spacer — lets background image peek through */}
        <div className="h-[40vh] shrink-0 lg:hidden" />

        {/* Sheet surface (mobile) / plain container (desktop) */}
        <div className="relative pointer-events-auto min-h-[60vh] bg-khaki/90 backdrop-blur-md rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.08)] lg:min-h-0 lg:flex-1 lg:flex lg:flex-col lg:bg-transparent lg:backdrop-blur-none lg:rounded-none lg:shadow-none">
          {/* Drag indicator — mobile only */}
          <div className="flex justify-center pt-3 pb-1 lg:hidden">
            <div className="w-10 h-1 rounded-full bg-cafe-noir/20" />
          </div>

          {/* Form content */}
          <div className="px-4 sm:px-8 pt-2 pb-4 lg:flex-1 lg:flex lg:items-center lg:justify-center lg:px-8 lg:pt-0 lg:pb-0">
            {children}
          </div>

          <AuthFooter />
        </div>
      </div>
    </div>
  )
}
