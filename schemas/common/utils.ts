import type { defineField } from 'sanity';

export function conditionalField(
  condition: boolean | undefined,
  field: ReturnType<typeof defineField> | ReturnType<typeof defineField>[]
) {
  return condition !== false ? field : undefined;
}

export function conditionalFields(
  ...fields: ReturnType<typeof conditionalField>[]
) {
  return fields.filter((f) => !!f).flat();
}
