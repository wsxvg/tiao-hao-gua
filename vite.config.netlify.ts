/**
 * Vite config for Netlify deployment
 * 使用: NODE_ENV=production vite build --config vite.config.netlify.ts
 */
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    // Netlify uses root domain or custom domain
    // Remove the /tiao-hao-gua/ base path for simpler deployment
    base: isProduction ? '/' : '/',

    server: {
      host: '0.0.0.0',
      port: 3000,
    },

    plugins: [
      vue(),
      vueJsx(),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    css: {
      preprocessorOptions: {
        less: {},
      },
    },

    build: {
      // Optimize for production
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      // Generate manifest for better caching
      manifest: true,
      // Optimize chunk size
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue'],
          },
        },
      },
    },
  };
});
