import { Block } from 'payload'

export const LessonMaterialsBlock: Block = {
  slug: 'lessonMaterials',
  labels: {
    singular: 'Lesson Materials',
    plural: 'Lesson Materials',
  },
  fields: [
    {
      name: 'materialsTitle',
      type: 'text',
      defaultValue: 'Downloadable Resources',
    },
    {
      name: 'materials',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'materialName',
          type: 'text',
          required: true,
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'fileType',
          type: 'select',
          options: [
            { label: 'PDF', value: 'pdf' },
            { label: 'Document', value: 'doc' },
            { label: 'Spreadsheet', value: 'sheet' },
            { label: 'Code', value: 'code' },
            { label: 'Archive', value: 'archive' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
