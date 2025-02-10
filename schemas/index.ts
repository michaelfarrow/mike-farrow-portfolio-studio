import { album } from '@/schemas/album';
import { category } from '@/schemas/category';
import { common } from '@/schemas/common';
import { contact } from '@/schemas/contact';
import { link } from '@/schemas/link';
import { project } from '@/schemas/project';

export const schemas = [
  common,
  category,
  contact,
  project,
  link,
  album,
] as const;

export type Schemas = (typeof schemas)[number];
export type SchemaType = Schemas['name'];
