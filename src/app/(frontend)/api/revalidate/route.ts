import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { secret, collection, slug, global: globalSlug } = body

    // Validate secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return Response.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate based on what changed
    if (globalSlug) {
      // Global changed (header/footer) — revalidate entire layout
      revalidatePath('/(frontend)/(public)', 'layout')
    } else if (collection === 'pages') {
      if (slug) {
        // Specific page changed
        revalidatePath(`/(frontend)/(public)/${slug}`, 'page')
      } else {
        // Homepage changed
        revalidatePath('/(frontend)/(public)', 'page')
      }
    }

    return Response.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    return Response.json({ message: 'Error revalidating', error: String(error) }, { status: 500 })
  }
}
