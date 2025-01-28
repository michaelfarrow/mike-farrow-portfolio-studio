import { defineType } from 'sanity';

import {
  imageField,
  responsiveImageField,
} from '@/schemas/common/fields/image';
import { videoField } from '@/schemas/common/fields/video';

export const common = defineType({
  name: 'common',
  type: 'object',
  fields: [
    imageField({ name: 'image', caption: true }),
    imageField({ name: 'decorativeImage', decorative: true }),
    responsiveImageField({ name: 'responsiveImage', caption: true }),
    videoField({ name: 'video', caption: true }),
  ],
});
