import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { MockServerConfig } from 'mock-config-server'
import { startMockServer } from 'mock-config-server/dist/src'
import { mockServerConfig } from './mock-server.config'

startMockServer(mockServerConfig)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src"
    }
  }
})

