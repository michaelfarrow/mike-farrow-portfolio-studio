import { defineArrayMember, defineField } from 'sanity';

import { FieldOptions } from '@/schemas/common/fields/field';
import {
  imageField,
  responsiveImageField,
} from '@/schemas/common/fields/image';
import { markdownObjectField } from '@/schemas/common/fields/markdown-object';
import { videoField } from '@/schemas/common/fields/video';
import { conditionalField, conditionalFields } from '@/schemas/common/utils';
import { ContentRowPreview } from '@/schemas/previews/content-row';

// import {
//   externalLinkAnnotation,
//   internalLinkAnnotation,
// } from '@/schemas/common/blocks/annotations/link';

interface ContentArrayOptions extends FieldOptions {
  text?: boolean;
  images?: boolean;
  videos?: boolean;
  columns?: boolean;
}

export function contentArrayField({
  text,
  images,
  videos,
  columns,
  ...rest
}: ContentArrayOptions): any {
  return defineField({
    ...rest,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'item',
        fields: [
          defineField({
            name: 'name',
            type: 'string',
          }),
          defineField({
            name: 'span',
            type: 'number',
            initialValue: 2,
            validation: (rule) => rule.required().integer().min(1).max(2),
            options: {
              layout: 'radio',
              list: [
                { value: 1, title: 'One' },
                { value: 2, title: 'Two' },
              ],
              direction: 'horizontal',
            },
          }),
          defineField({
            name: 'content',
            type: 'array',
            of: [
              ...conditionalFields(
                conditionalField(text, () =>
                  markdownObjectField({ name: 'md', title: 'Markdown' })
                ),
                conditionalField(images, () => [
                  imageField({ name: 'image', required: true, caption: true }),
                  responsiveImageField({
                    name: 'responsiveImage',
                    required: true,
                    caption: true,
                  }),
                ]),
                conditionalField(videos, () =>
                  videoField({ name: 'video', caption: true })
                )
              ),
            ],
          }),
        ],
        preview: {
          select: {
            title: 'name',
            span: 'span',
            content: 'content',
          },
        },
        components: {
          preview: ContentRowPreview,
        },
      }),
    ],
  });
}
