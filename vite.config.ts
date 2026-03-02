import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  // root: 'docs',
  // build: {
  //   outDir: '../docs',
  //   emptyOutDir: true,
  // }
})
