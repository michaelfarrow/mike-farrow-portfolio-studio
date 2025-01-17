import { defineField, defineArrayMember } from 'sanity';
import { titleCase } from 'title-case';

import { FieldOptions } from './field';

interface ImageFieldOptions extends FieldOptions {
  decorative?: boolean;
  required?: boolean;
}

export function imageField(options: ImageFieldOptions) {
  const { decorative, required, ...rest } = options;

  return defineField({
    ...rest,
    type: 'image',
    options: {
      hotspot: true,
    },
    validation: required ? (rule) => rule.required() : undefined,
    fields:
      (!decorative && [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ]) ||
      [],
  });
}

export function responsiveImageField({ ...rest }: FieldOptions) {
  return defineField({
    ...rest,
    type: 'object',
    fields: [
      imageField({
        name: 'main',
        title: 'Main Image',
        description:
          'Used across all breakpoints, or highest breakpoints if any alternative images are set',
      }),
      defineField({
        name: 'alternative',
        title: 'Alternative Images',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              imageField({
                name: 'image',
                decorative: true,
              }),
              defineField({
                name: 'breakpoint',
                type: 'string',
                options: {
                  list: ['mobile', 'tablet'],
                },
                validation: (rule) => rule.required(),
              }),
            ],
            preview: {
              select: {
                breakpoint: 'breakpoint',
                media: 'image',
              },
              prepare(selection) {
                const { media, breakpoint } = selection;
                return {
                  media,
                  title:
                    (breakpoint && titleCase(breakpoint)) ||
                    '[No breakpoint selected]',
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
      prepare(selection) {
        const { media } = selection;
        return {
          media,
          title: (media && 'Desktop') || 'None',
        };
      },
    },
  });
}
