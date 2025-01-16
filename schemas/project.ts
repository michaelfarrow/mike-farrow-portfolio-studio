import { defineType, defineField, defineArrayMember } from 'sanity';
import { nameFields } from './common/fields/title';
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
    defineField({
      name: 'thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
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
        defineArrayMember({
          name: 'responsiveImage',
          type: 'object',
          title: 'Responsive Image',
          fields: [
            defineField({
              name: 'main',
              type: 'image',
              options: {
                hotspot: true,
              },
              description:
                'Used across all breakpoints, or highest breakpoints if any other images are set',
            }),
            defineField({
              name: 'additional',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'maxWidth',
                      type: 'string',
                      options: {
                        list: ['mobile', 'tablet'],
                      },
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      maxWidth: 'maxWidth',
                      media: 'image.asset',
                    },
                    prepare({ media, maxWidth }) {
                      return {
                        media,
                        title:
                          (maxWidth && String(maxWidth).toUpperCase()) ||
                          '[Unknown]',
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              media: 'main.asset',
            },
            prepare({ media }) {
              return {
                media,
                title: 'Main',
              };
            },
          },
        }),
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
