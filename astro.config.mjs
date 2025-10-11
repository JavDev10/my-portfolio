// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://javiercamano.netlify.app/', 
  integrations: [sitemap()],
  image: {
    // Enable built-in image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Externalize JavaScript for better caching
          manualChunks: {
            'navigation': ['./src/pages/index.astro', './src/pages/sobre-mi.astro', './src/pages/proyectos.astro', './src/pages/blog.astro']
          }
        }
      }
    }
  }
});
