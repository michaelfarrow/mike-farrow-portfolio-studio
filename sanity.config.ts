import { mapValues } from 'lodash';

import { googleMapsInput } from '@sanity/google-maps-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import {
  defineDocuments,
  defineLocations,
  presentationTool,
} from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import {
  APP_BASE_URL,
  STUDIO_CONFIG,
  STUDIO_GOOGLE_MAPS_KEY,
  STUDIO_TITLE,
} from '@/lib/env';
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
      resolve: {
        locations: mapValues(resolve, ({ select, locations, href }) =>
          defineLocations({
            select,
            resolve: (doc: any) => ({
              locations: locations(doc, href),
            }),
          })
        ),
        mainDocuments: defineDocuments(
          Object.values(resolve).map((test) => test.document)
        ),
      },
      previewUrl: {
        origin: APP_BASE_URL,
        previewMode: {
          enable: `${APP_BASE_URL}/api/draft-mode/enable`,
        },
      },
    }),
    googleMapsInput({
      apiKey: STUDIO_GOOGLE_MAPS_KEY,
      defaultLocale: 'en-GB',
      defaultLocation: {
        lat: 54.5,
        lng: -4.5,
      },
      defaultZoom: 6,
    }),
  ],

  schema: {
    types: schemas,
  },
});
