import { defineField, defineType } from 'sanity';

import { imageField } from '@/schemas/common/fields/image';
import { nameFields } from '@/schemas/common/fields/title';

export const album = defineType({
  name: 'album',
  type: 'document',
  fields: [
    ...nameFields(),
    defineField({
      name: 'date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'geopoint',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photos',
      type: 'array',
      of: [
        imageField({
          name: 'photo',
          caption: true,
          fields: [
            defineField({
              name: 'location',
              type: 'geopoint',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
      options: {
        layout: 'grid',
      },
    }),
  ],
});
