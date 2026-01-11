import { CollectionBeforeChangeHook } from 'payload'

export const ensureSingleHomepage: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  if (data?.isHomepage === true) {
    const wasHomepage = originalDoc?.isHomepage === true

    if (!wasHomepage) {
      const existingHomepage = await req.payload.find({
        collection: 'pages',
        where: {
          isHomepage: {
            equals: true,
          },
        },
        limit: 1,
        req,
      })

      if (existingHomepage.totalDocs > 0) {
        const oldHomepage = existingHomepage.docs[0]

        await req.payload.update({
          collection: 'pages',
          id: oldHomepage.id,
          data: {
            isHomepage: false,
          },
          req,
          context: {
            skipHomepageCheck: true,
          },
        })
      }
    }
  }

  return data
}
