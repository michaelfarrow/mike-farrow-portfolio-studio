import { defineField, defineArrayMember } from 'sanity';
import { titleCase } from 'title-case';
import { ImageIcon, ImagesIcon } from '@sanity/icons';

import { FieldOptions } from './field';

interface ImageFieldOptions extends FieldOptions {
  decorative?: boolean;
  required?: boolean;
  caption?: boolean;
}

export function imageField(options: ImageFieldOptions) {
  const { decorative, required, caption, ...rest } = options;

  return defineField({
    ...rest,
    type: 'image',
    icon: ImageIcon,
    options: {
      hotspot: true,
      metadata: ['blurhash', 'lqip', 'palette', 'image', 'exif', 'location'],
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
        ...(caption
          ? [
              defineField({
                name: 'caption',
                type: 'text',
                rows: 4,
              }),
            ]
          : []),
      ]) ||
      [],
  });
}

interface ResponsiveImageFieldOptions extends FieldOptions {
  caption?: boolean;
}

export function responsiveImageField({
  caption,
  ...rest
}: ResponsiveImageFieldOptions) {
  return defineField({
    ...rest,
    type: 'object',
    icon: ImagesIcon,
    fields: [
      imageField({
        name: 'main',
        title: 'Main Image',
        description:
          'Used across all breakpoints, or highest breakpoints if any alternative images are set',
        caption,
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
        title: 'main.alt',
      },
    },
  });
}
