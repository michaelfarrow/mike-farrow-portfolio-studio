import { defineField } from 'sanity';

import { FieldOptions } from '@/schemas/common/fields/field';
import { MarkdownInput } from '@/schemas/inputs/markdown';

export function markdownField(options: FieldOptions) {
  const { ...rest } = options;

  return defineField({
    ...rest,
    type: 'markdown',
    components: {
      input: MarkdownInput,
    },
  });
}
