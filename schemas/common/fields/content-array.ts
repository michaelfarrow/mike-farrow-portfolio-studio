import { defineField, defineArrayMember } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

import { FieldOptions } from './field';
import { imageField, responsiveImageField } from './image';

// import {
//   externalLinkAnnotation,
//   internalLinkAnnotation,
// } from './common/blocks/annotations/link';

interface ContentArrayOptions extends FieldOptions {
  images?: boolean;
}

export function contentArrayField(options: ContentArrayOptions) {
  const { images, ...rest } = options;

  return defineField({
    ...rest,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'richText',
        icon: DocumentTextIcon,
        fields: [
          defineField({
            name: 'content',
            type: 'array',
            of: [
              defineArrayMember({
                type: 'block',
              }),
            ],
          }),
        ],
      }),
      ...(images !== false
        ? [
            imageField({ name: 'image' }),
            responsiveImageField({ name: 'responsiveImage' }),
          ]
        : []),
    ],
  });
}
