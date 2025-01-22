import { defineField, defineArrayMember } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

import { FieldOptions } from '@/schemas/common/fields/field';
import { videoField } from '@/schemas/common/fields/video';
import {
  imageField,
  responsiveImageField,
} from '@/schemas/common/fields/image';

// import {
//   externalLinkAnnotation,
//   internalLinkAnnotation,
// } from '@/schemas/common/blocks/annotations/link';

interface ContentArrayOptions extends FieldOptions {
  images?: boolean;
  videos?: boolean;
}

export function contentArrayField({
  images,
  videos,
  ...rest
}: ContentArrayOptions) {
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
            imageField({ name: 'image', caption: true }),
            responsiveImageField({ name: 'responsiveImage', caption: true }),
          ]
        : []),
      ...(videos !== false
        ? [videoField({ name: 'video', caption: true })]
        : []),
    ],
  });
}
