import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => {
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    define: command === 'build' ? {
      'process.env.NODE_ENV': '"production"',
    } : undefined,
    esbuild: command === 'build' ? {
      legalComments: 'none',
      drop: ['console', 'debugger'],
    } : undefined,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: ['es2018', 'chrome64', 'safari11.1', 'firefox62', 'edge79', 'ios11.3'],
      cssTarget: ['chrome60', 'safari11', 'firefox60', 'edge79', 'ios11'],
      minify: 'esbuild',
      cssMinify: true,
      cssCodeSplit: false,
      modulePreload: {
        polyfill: false,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
