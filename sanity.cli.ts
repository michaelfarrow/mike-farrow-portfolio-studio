import { defineCliConfig } from 'sanity/cli';
import tsconfigPaths from 'vite-tsconfig-paths';
import { STUDIO_CONFIG } from '@/lib/env';

export default defineCliConfig({
  api: STUDIO_CONFIG,

  autoUpdates: false,

  vite: {
    plugins: [tsconfigPaths()],
  },
});
