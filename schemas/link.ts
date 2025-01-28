import { defineField, defineType } from 'sanity';

import { nameFields } from '@/schemas/common/fields/title';
import { IconLink } from '@/schemas/common/icons';

export const link = defineType({
  name: 'link',
  type: 'document',
  icon: IconLink,
  fields: [
    ...nameFields({ slug: false }),
    defineField({
      name: 'shortName',
      type: 'string',
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
    },
  },
});
