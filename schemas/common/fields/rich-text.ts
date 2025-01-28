import { defineField, defineArrayMember } from 'sanity';

import { FieldOptions } from '@/schemas/common/fields/field';
import { DocumentTextIcon } from '@/schemas/common/icons';

import { RichTextPreview } from '@/schemas/previews/rich-text';

export function richTextField(options: FieldOptions) {
  const { ...rest } = options;

  return defineField({
    ...rest,
    type: 'object',
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
    preview: {
      select: {
        content: 'content',
      },
      prepare: (props) => ({ title: 'Rich Text', ...props }),
    },
    components: {
      preview: RichTextPreview,
    },
  });
}
