import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo.png', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'NoteVue - Task and Note Management App',
        short_name: 'NoteVue',
        description: 'Manage your tasks and notes efficiently with NoteVue, the all-in-one productivity application.',
        theme_color: '#6366f1',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        orientation: 'portrait',
        lang: 'en-US',
        categories: ['productivity', 'utilities', 'lifestyle'],
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        screenshots: [
          {
            src: 'app-screenshot.jpg',
            sizes: '1280x720',
            type: 'image/jpeg',
            label: 'NoteVue Dashboard'
          }
        ],
        shortcuts: [
          {
            name: 'Today\'s Tasks',
            url: '/today',
            description: 'View today\'s tasks'
          },
          {
            name: 'Quick Notes',
            url: '/sticky-wall',
            description: 'View your sticky notes'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
  },
  build: {
    minify: 'terser',
    sourcemap: false,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-components': ['framer-motion'],
        },
      },
    },
  }
})
