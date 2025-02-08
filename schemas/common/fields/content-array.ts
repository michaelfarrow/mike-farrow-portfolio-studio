import { defineArrayMember, defineField } from 'sanity';

import { FieldOptions } from '@/schemas/common/fields/field';
import {
  imageField,
  responsiveImageField,
} from '@/schemas/common/fields/image';
import { markdownObjectField } from '@/schemas/common/fields/markdown-object';
import { richTextField } from '@/schemas/common/fields/rich-text';
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
      ...conditionalFields(
        conditionalField(text, () => richTextField({ name: 'richText' })),
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
        ),
        conditionalField(columns, () =>
          defineArrayMember({
            type: 'object',
            name: 'columns',
            fields: [
              defineField({
                name: 'columns',
                type: 'array',
                of: [
                  defineField({
                    name: 'column',
                    type: 'object',
                    fields: [
                      contentArrayField({
                        name: 'content',
                        text,
                        images,
                        videos,
                        columns: false,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        )
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
                  type: 'object',
                  name: 'person',
                  fields: [
                    defineField({
                      type: 'string',
                      name: 'name',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                })
              ),
            ],
          }),
        ],
      }),
    ],
  });
}

export function contentArrayFieldFlat({
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
            initialValue: 1,
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
                  richTextField({ name: 'richText' })
                ),
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
                ),
                conditionalField(columns, () =>
                  defineArrayMember({
                    type: 'object',
                    name: 'columns',
                    fields: [
                      defineField({
                        name: 'columns',
                        type: 'array',
                        of: [
                          defineField({
                            name: 'column',
                            type: 'object',
                            fields: [
                              contentArrayField({
                                name: 'content',
                                text,
                                images,
                                videos,
                                columns: false,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                )
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
                          type: 'object',
                          name: 'person',
                          fields: [
                            defineField({
                              type: 'string',
                              name: 'name',
                              validation: (rule) => rule.required(),
                            }),
                          ],
                        })
                      ),
                    ],
                  }),
                ],
              }),
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
