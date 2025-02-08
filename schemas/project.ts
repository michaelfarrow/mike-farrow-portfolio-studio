import { defineArrayMember, defineField, defineType } from 'sanity';

import { contentArrayField } from '@/schemas/common/fields/content-array';
import { imageField } from '@/schemas/common/fields/image';
import { markdownField } from '@/schemas/common/fields/markdown';
import { nameFields } from '@/schemas/common/fields/title';
import { IconProject } from '@/schemas/common/icons';

export const project = defineType({
  name: 'project',
  type: 'document',
  icon: IconProject,
  fieldsets: [
    {
      name: 'details',
    },
    {
      name: 'content',
    },
    {
      name: 'links',
    },
    {
      name: 'settings',
    },
  ],
  fields: [
    ...nameFields({
      fieldset: 'details',
    }),
    defineField({
      name: 'date',
      type: 'date',
      fieldset: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      fieldset: 'details',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'category' }] }),
      ],
    }),
    imageField({ name: 'thumbnail', required: true }),
    defineField({
      name: 'description',
      type: 'text',
      fieldset: 'content',
      rows: 5,
    }),
    markdownField({
      name: 'descriptionLong',
    }),
    contentArrayField({ name: 'content' }),
    defineField({
      name: 'client',
      type: 'reference',
      fieldset: 'links',
      to: [{ type: 'contact' }],
    }),
    defineField({
      name: 'attributions',
      type: 'array',
      fieldset: 'links',
      of: [
        defineArrayMember({
          name: 'attribution',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'contacts',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'reference',
                  to: [{ type: 'contact' }],
                }),
              ],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              contacts: 'contacts',
            },
            prepare: (selection) => {
              const { contacts } = selection;
              const photoCount = Object.values(contacts || {}).length;
              return {
                ...selection,
                subtitle: `${photoCount} contact${photoCount !== 1 ? 's' : ''}`,
                icon: false,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'hideFromSearchEngines',
      type: 'boolean',
      fieldset: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'private',
      type: 'boolean',
      fieldset: 'settings',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'client.name',
      media: 'thumbnail.asset',
    },
  },
});
