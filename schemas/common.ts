import { defineType } from 'sanity';
import { imageField, responsiveImageField } from './common/fields/image';

export const common = defineType({
  name: 'common',
  type: 'object',
  fields: [
    imageField({ name: 'image', caption: true }),
    imageField({ name: 'decorativeImage', decorative: true }),
    responsiveImageField({ name: 'responsiveImage', caption: true }),
  ],
});
