import { Field } from 'payload'

export const slugField = (trackingField: string = 'title'): Field => {
  return {
    name: 'slug',
    type: 'text',
    unique: true,
    required: true,
    admin: {
      //   position: 'sidebar',
      components: {
        Field: {
          path: 'src/payloadcms/fields/Slug/Component.tsx#SlugComponent',
          clientProps: {
            trackingField,
          },
        },
      },
    },
  }
}
