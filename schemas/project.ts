import { defineType, defineField, defineArrayMember } from 'sanity';

import { nameFields } from './common/fields/title';
import { imageField, responsiveImageField } from './common/fields/image';
import {
  externalLinkAnnotation,
  internalLinkAnnotation,
} from './common/blocks/annotations/link';

export const project = defineType({
  name: 'project',
  type: 'document',
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
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [externalLinkAnnotation, internalLinkAnnotation],
          },
        }),
        defineArrayMember({
          name: 'internalLinkBlock',
          type: 'object',
          title: 'Internal link block',
          fields: [
            {
              name: 'reference',
              type: 'reference',
              title: 'Reference',
              to: [{ type: 'project' }],
            },
          ],
          preview: {
            select: {
              title: 'reference.name',
              media: 'reference.thumbnail',
            },
          },
        }),
        responsiveImageField({
          name: 'responsiveImage',
        }),
        {
          name: 'image',
          type: 'image',
          fields: [
            {
              type: 'string',
              name: 'alt',
            },
          ],
        },
      ],
    }),
    defineField({
      title: 'Content',
      name: 'contentAlt',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'richText',
          fields: [
            {
              name: 'content',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  marks: {
                    annotations: [internalLinkAnnotation],
                  },
                }),
              ],
            },
          ],
        }),
        imageField({ name: 'image' }),
        responsiveImageField({ name: 'responsiveImage' }),
      ],
    }),
    defineField({
      title: 'Content',
      name: 'contentShort',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [internalLinkAnnotation],
          },
        }),
      ],
    }),
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
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
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
});
