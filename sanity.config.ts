'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';
import { projectId, dataset } from './src/sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'vst-fitness-world-studio',
  title: 'VST Fitness World Management Studio',
  projectId: projectId || '3j25esiw',
  dataset: dataset || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content Manager')
          .items([
            S.listItem()
              .title('Gym & Contact Information')
              .id('gymSettings')
              .child(
                S.document()
                  .schemaType('gymSettings')
                  .documentId('gymSettings')
                  .title('Gym & Contact Information')
              ),
            S.divider(),
            S.listItem()
              .title('Announcement & Pop-up Alert')
              .id('announcement')
              .child(
                S.document()
                  .schemaType('announcement')
                  .documentId('announcement')
                  .title('Announcement & Pop-up Alert')
              ),
            S.divider(),
            S.documentTypeListItem('package').title('Membership Packages & Pricing'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
