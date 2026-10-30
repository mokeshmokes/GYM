import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';
import { projectId, dataset } from './src/sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'vst-fitness-world-studio',
  title: 'VST Fitness World Management Studio',
  projectId: projectId || 'demo-project-id',
  dataset: dataset || 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
