import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';

import { STUDIO_CONFIG, STUDIO_TITLE, APP_BASE_URL } from '@/lib/env';

import { schemas } from '@/schemas';
import { resolve } from '@/presentation/resolve';

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
