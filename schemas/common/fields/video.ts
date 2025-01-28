import getYouTubeID from 'get-youtube-id';

import { defineField } from 'sanity';

import { FieldOptions } from '@/schemas/common/fields/field';
import { imageField } from '@/schemas/common/fields/image';
import { VideoIcon } from '@/schemas/common/icons';
import { DocumentPreview } from '@/schemas/previews/document';

interface VideoFieldOptions extends FieldOptions {
  caption?: boolean;
}

export function videoField(options: VideoFieldOptions) {
  const { caption, ...rest } = options;

  return defineField({
    ...rest,
    type: 'object',
    icon: VideoIcon,
    fields: [
      defineField({
        name: 'url',
        type: 'url',
        validation: (rule) =>
          rule
            .required()
            .custom(
              (value) =>
                (getYouTubeID(value || '') && true) || 'Invalid YouTube url'
            ),
      }),
      imageField({
        name: 'poster',
        decorative: true,
      }),
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
    ],
    preview: {
      select: {
        media: 'poster',
        title: 'alt',
        subtitle: 'caption',
      },
    },
    components: {
      preview: DocumentPreview,
    },
  });
}
