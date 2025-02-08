import { defineField } from 'sanity';

import { FieldOptions } from '@/schemas/common/fields/field';
import { markdownField } from '@/schemas/common/fields/markdown';
import { IconDocumentText } from '@/schemas/common/icons';
import { MarkdownPreview } from '@/schemas/previews/markdown';

export function markdownObjectField(options: FieldOptions) {
  const { ...rest } = options;

  return defineField({
    ...rest,
    type: 'object',
    icon: IconDocumentText,
    fields: [markdownField({ name: 'content' })],
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
