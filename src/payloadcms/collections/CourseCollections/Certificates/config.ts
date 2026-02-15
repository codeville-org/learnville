import { CollectionConfig } from 'payload'
import admin from '../../Users/access/admin'
import { certificateRead } from './access/certificateRead'
import { beforeValidate } from './hooks/beforeValidate'
import { beforeChange } from './hooks/beforeChange'
import { downloadCertificateEndpoint } from './endpoints/downloadCertificate'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    useAsTitle: 'certificateNumber',
    defaultColumns: ['certificateNumber', 'studentName', 'courseName', 'issuedAt'],
    group: 'Certificates',
    description: 'Issued certificates for course completions',
  },
  access: {
    read: certificateRead,
    create: admin,
    update: admin,
    delete: admin,
  },
  endpoints: [downloadCertificateEndpoint],
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'enrollment',
      type: 'relationship',
      relationTo: 'course-enrollments',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'certificate-templates',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'certificateNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Unique certificate identifier (auto-generated)',
      },
    },
    {
      name: 'issuedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'studentName',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
        description: 'Snapshot of student name at time of issue',
      },
    },
    {
      name: 'courseName',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
        description: 'Snapshot of course title at time of issue',
      },
    },
    {
      name: 'instructorName',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Snapshot of instructor name at time of issue',
      },
    },
    {
      name: 'completionDate',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Date the course was completed',
      },
    },
    {
      name: 'totalXPEarned',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Total XP earned in the course',
      },
    },
  ],
  hooks: {
    beforeValidate: [beforeValidate],
    beforeChange: [beforeChange],
  },
}
