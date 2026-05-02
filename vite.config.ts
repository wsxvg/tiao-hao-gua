/**
 * @file vite 配置
 * @author Yangholmes 2024-08-20
 */

import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    // Netlify 部署使用根路径
    // GitHub Pages 部署使用 '/tiao-hao-gua/'
    base: mode === 'development' ? '' : '/',
    server: {
      host: '0.0.0.0',
      https: {} as any
    },
    plugins: [
      vue(), vueJsx(),
      basicSsl()
    ],
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      ]
    },
    css: {
      preprocessorOptions: {
        less: {}
      }
    }
  };
});
