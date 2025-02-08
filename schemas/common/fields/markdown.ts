import { defineField } from 'sanity';

import { FieldOptions } from '@/schemas/common/fields/field';
import { IconDocumentText } from '@/schemas/common/icons';
import { MarkdownInput } from '@/schemas/inputs/markdown';
import { MarkdownPreview } from '@/schemas/previews/markdown';

export function markdownField(options: FieldOptions) {
  const { ...rest } = options;

  return defineField({
    ...rest,
    type: 'object',
    icon: IconDocumentText,
    fields: [
      defineField({
        name: 'content',
        type: 'markdown',
        components: {
          input: MarkdownInput,
        },
      }),
    ],
    preview: {
      select: {
        content: 'content',
      },
      prepare: (selection) => ({ ...selection, title: 'Markdown' }),
    },
    components: {
      preview: MarkdownPreview,
    },
  });
}
