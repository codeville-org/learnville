import { CollectionConfig } from 'payload'
import customer from '../../Users/access/customer'
import admin from '../../Users/access/admin'
import { afterChange } from './hooks/afterChange'
import { afterDelete } from './hooks/afterDelete'
import { reviewsRead } from './access/reviewsRead'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['customer', 'course', 'rating', 'createdAt'],
    group: 'Learning',
  },
  access: {
    read: reviewsRead,
    create: customer,
    update: customer,
    delete: admin,
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      hasMany: false,
      admin: {
        description: 'Customer who submitted the review',
      },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      hasMany: false,
      admin: {
        description: 'Course being reviewed',
      },
    },
    {
      name: 'enrollment',
      type: 'relationship',
      relationTo: 'course-enrollments',
      required: true,
      hasMany: false,
      admin: {
        description: 'Enrollment associated with this review',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: 'Rating from 1 to 5 stars',
      },
    },
    {
      name: 'title',
      type: 'text',
      maxLength: 100,
      admin: {
        description: 'Review title (optional)',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      maxLength: 2000,
      admin: {
        description: 'Review content (optional)',
      },
    },
    {
      name: 'isVerifiedPurchase',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        readOnly: true,
        description: 'Automatically set based on enrollment verification',
      },
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Admin can moderate reviews',
      },
    },
  ],
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
}
