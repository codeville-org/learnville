import type { Metadata } from 'next'

import type { Course, Config, Media } from '@/payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from '../get-url'

export const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + `/`

  if (image && typeof image === 'object' && url in image) {
    const ogURL = image.url
    url = ogURL ? serverUrl + ogURL : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: { doc: Partial<Course> }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage = getImageURL(doc?.meta?.image)
  const title = doc.meta?.title ? doc.meta.title + '| LearnVille' : 'LearnVille'
  const description = doc.meta?.description ? doc.meta.description : ''

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    }),
  }
}
