import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://danmarshall.github.io',
  base: '/google-font-to-svg-path',
  vite: {
    build: {
      minify: false
    }
  }
});
