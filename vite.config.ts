import path from "path"
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/',
  publicDir: 'public',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-hook-form'],
          radix: [
            '@radix-ui/react-accordion', '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog', '@radix-ui/react-label',
            '@radix-ui/react-popover', '@radix-ui/react-scroll-area',
            '@radix-ui/react-select', '@radix-ui/react-slider',
            '@radix-ui/react-slot', '@radix-ui/react-switch',
            '@radix-ui/react-tabs', '@radix-ui/react-tooltip'
          ],
          animation: ['framer-motion', 'react-fast-marquee'],
          utils: ['axios', 'clsx', 'fuse.js', 'html-entities', 'tailwind-merge', 'zod'],
          ui: ['lucide-react', 'sonner', 'cmdk'],
          audio: ['howler'],
          validation: ['@hookform/resolvers', 'check-password-strength', 'secure-random-password']
        },
      },
    },
  },
  server: process.env.NODE_ENV === 'development' ? {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
    host: true,
    port: 5173,
  } : undefined,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.test.{ts,tsx,js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      enabled: true,
    },
  },
})