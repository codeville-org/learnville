import type { Metadata } from 'next'
import { getServerSideURL } from '../get-url'

export const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  title: 'LearnVille',
  siteName: 'LearnVille',
  description: 'Exclusive EdTech E-Learning LMS Platform by CodeVille ',
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return { ...defaultOpenGraph, ...og, images: og?.images || defaultOpenGraph.images }
}
