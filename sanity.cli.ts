import tsconfigPaths from 'vite-tsconfig-paths';

import { defineCliConfig } from 'sanity/cli';

import { STUDIO_CONFIG } from '@/lib/env';

export default defineCliConfig({
  api: STUDIO_CONFIG,

  autoUpdates: false,

  vite: {
    plugins: [tsconfigPaths()],
  },
});
