import { defineArrayMember, defineField } from 'sanity';

import { FieldOptions } from '@/schemas/common/fields/field';
import { IconDocumentText } from '@/schemas/common/icons';
import { RichTextPreview } from '@/schemas/previews/rich-text';

export function richTextField(options: FieldOptions) {
  const { ...rest } = options;

  return defineField({
    ...rest,
    type: 'object',
    icon: IconDocumentText,
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
    preview: {
      select: {
        content: 'content',
      },
      prepare: (selection) => ({ ...selection, title: 'Rich Text' }),
    },
    components: {
      preview: RichTextPreview,
    },
  });
}
