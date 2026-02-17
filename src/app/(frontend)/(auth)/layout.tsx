import Image from 'next/image'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-full h-screen overflow-hidden bg-khaki/70 flex items-center justify-center">
      <div className="flex w-full h-full items-stretch overflow-hidden">
        <div className="flex-3/5 h-full p-4 pr-0">
          <div className="flex-2/3 h-full w-full relative rounded-xl overflow-hidden shrink-0">
            <Image
              src="/assets/auth-bg.webp"
              alt="Background Image"
              className="w-full h-full object-cover"
              width={1280}
              height={1280}
            />

            <div className="absolute inset-0 bg-linear-to-t from-dark-green to-hunter-green/20" />

            <div className="absolute bottom-0 left-0 text-white p-6">
              <h1 className="text-5xl tracking-tighter font-thin font-heading text-khaki">
                LearnVille.
              </h1>
              <p className="text-xs font-heading font-thin text-khaki/50">
                {`Unlock your potential with Learnville - Your gateway to knowledge and growth.`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-2/5 overflow-y-auto w-full h-full flex flex-col min-h-0">
          <div className="flex-1 flex items-center justify-center px-8">{children}</div>

          <div className="text-center pb-6 shrink-0">
            <p>{``}</p>
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
        </div>
      </div>
    </div>
  )
}
