import { CollectionConfig } from 'payload'
import admin from '../../Users/access/admin'
import instructor from '../../Users/access/instructor'

export const CertificateTemplates: CollectionConfig = {
  slug: 'certificate-templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', '_status', 'isDefault', 'updatedAt'],
    group: 'Certificates',
    description: 'Design and manage certificate templates for course completions',
  },
  access: {
    read: instructor,
    create: admin,
    update: admin,
    delete: admin,
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Template name (e.g. "Classic Gold", "Modern Blue")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this template',
      },
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as the default template for new courses',
      },
    },
    {
      name: 'canvasWidth',
      type: 'number',
      required: true,
      defaultValue: 1122,
      admin: {
        description: 'Certificate width in pixels (A4 landscape @ 96dpi = 1122)',
      },
    },
    {
      name: 'canvasHeight',
      type: 'number',
      required: true,
      defaultValue: 793,
      admin: {
        description: 'Certificate height in pixels (A4 landscape @ 96dpi = 793)',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Background image/texture for the certificate',
      },
    },
    {
      name: 'designer',
      type: 'ui',
      admin: {
        components: {
          Field:
            'src/payloadcms/collections/CourseCollections/CertificateTemplates/components/CertificateDesigner.tsx#CertificateDesigner',
        },
      },
    },
    {
      name: 'canvasData',
      type: 'json',
      required: true,
      admin: {
        hidden: true,
        description: 'Canvas state data (auto-managed by the certificate designer)',
      },
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Auto-generated preview thumbnail',
        readOnly: true,
      },
    },
  ],
}
