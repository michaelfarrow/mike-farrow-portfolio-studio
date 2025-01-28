import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import { APP_BASE_URL, STUDIO_CONFIG, STUDIO_TITLE } from '@/lib/env';
import { resolve } from '@/presentation/resolve';
import { schemas } from '@/schemas';

export default defineConfig({
  ...STUDIO_CONFIG,

  name: 'default',
  title: STUDIO_TITLE,

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: `${APP_BASE_URL}/api/draft-mode/enable`,
        },
      },
    }),
  ],

  schema: {
    types: schemas,
  },
});
