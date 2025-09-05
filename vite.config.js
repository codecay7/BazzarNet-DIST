import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: false, // Disable CSS processing for tests
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/main.jsx', // Exclude main entry file
        'src/App.jsx', // Exclude App entry file
        'src/routes/**', // Exclude route definitions
        'src/context/**', // Exclude context files if not directly testing providers
        'src/hooks/**', // Exclude hooks if testing them separately or via components
        'src/services/**', // Exclude API services
        'src/utils/**', // Exclude utilities
        'src/assets/**', // Exclude assets
        'src/components/Loader.jsx', // Exclude Loader component
        'src/components/LoginButton.jsx', // Exclude LoginButton component
        'src/components/SkeletonCard.jsx', // Exclude skeleton components
        'src/components/SkeletonStoreCard.jsx',
        'src/components/SkeletonText.jsx',
      ],
    },
  },
})