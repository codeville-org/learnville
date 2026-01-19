import { Block } from 'payload'

export const RichTextContentBlock: Block = {
  slug: 'richTextContent',
  labels: {
    singular: 'Rich Text Content Section',
    plural: 'Rich Text Content Sections',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
    },
  ],
}
