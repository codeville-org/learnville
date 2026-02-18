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
    <div className="w-full h-screen overflow-hidden bg-khaki/70">
      {/* ─── Desktop layout (lg+): side-by-side ─── */}
      <div className="hidden lg:flex w-full h-full items-stretch overflow-hidden">
        <div className="flex-3/5 h-full p-4 pr-0">
          <div className="h-full w-full relative rounded-xl overflow-hidden shrink-0">
            <AuthImage />
          </div>
        </div>

        <div className="flex-2/5 overflow-y-auto w-full h-full flex flex-col min-h-0">
          <div className="flex-1 flex items-center justify-center px-8">{children}</div>
          <AuthFooter />
        </div>
      </div>

      {/* ─── Mobile layout (<lg): bottom sheet over background image ─── */}
      <div className="lg:hidden w-full h-full relative">
        {/* Background image — fixed behind the sheet */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full relative">
            <AuthImage />
          </div>
        </div>

        {/* Scrollable sheet container */}
        <div className="relative z-10 h-full overflow-y-auto">
          {/* Spacer — lets the background image peek through */}
          <div className="h-[40vh] shrink-0 pointer-events-none" />

          {/* Sheet surface */}
          <div className="relative min-h-[60vh] bg-khaki/90 backdrop-blur-md rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
            {/* Drag indicator */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-cafe-noir/20" />
            </div>

            {/* Form content */}
            <div className="px-4 sm:px-8 pt-2 pb-4">{children}</div>

            <AuthFooter />
          </div>
        </div>
      </div>
    </div>
  )
}
