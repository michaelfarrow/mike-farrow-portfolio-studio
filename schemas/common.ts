import { defineType } from 'sanity';
import { imageField, responsiveImageField } from './common/fields/image';

export const common = defineType({
  name: 'common',
  type: 'object',
  fields: [
    imageField({ name: 'image' }),
    imageField({ name: 'decorativeImage', decorative: true }),
    responsiveImageField({ name: 'responsiveImage' }),
  ],
});
