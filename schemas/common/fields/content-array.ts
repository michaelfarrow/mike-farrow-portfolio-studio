import { defineArrayMember, defineField } from 'sanity';

import { FieldOptions } from '@/schemas/common/fields/field';
import {
  imageField,
  responsiveImageField,
} from '@/schemas/common/fields/image';
import { richTextField } from '@/schemas/common/fields/rich-text';
import { videoField } from '@/schemas/common/fields/video';
import { conditionalField, conditionalFields } from '@/schemas/common/utils';

// import {
//   externalLinkAnnotation,
//   internalLinkAnnotation,
// } from '@/schemas/common/blocks/annotations/link';

interface ContentArrayOptions extends FieldOptions {
  text?: boolean;
  images?: boolean;
  videos?: boolean;
}

export function contentArrayField({
  text,
  images,
  videos,
  ...rest
}: ContentArrayOptions) {
  return defineField({
    ...rest,
    type: 'array',
    of: [
      ...conditionalFields(
        conditionalField(text, richTextField({ name: 'richText' })),
        conditionalField(images, [
          imageField({ name: 'image', required: true, caption: true }),
          responsiveImageField({
            name: 'responsiveImage',
            required: true,
            caption: true,
          }),
        ]),
        conditionalField(videos, videoField({ name: 'video', caption: true }))
      ),
      defineArrayMember({
        type: 'object',
        name: 'temp',
        fields: [
          defineField({
            type: 'array',
            name: 'names',
            validation: (rule) => rule.required(),
            of: [
              defineArrayMember(
                defineField({
                  type: 'string',
                  name: 'name',
                  validation: (rule) => rule.required(),
                })
              ),
            ],
          }),
        ],
      }),
    ],
  });
}
