import {defineConfig} from 'vite'
import {svelte, vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import {resolve} from 'node:path'
import {asMarkupPreprocessor} from 'svelte-as-markup-preprocessor';
import sveltePreprocess from 'svelte-preprocess';
import cssModules from 'svelte-preprocess-cssmodules';

const [, mode] = process.argv.find(k => k.includes('--mode'))?.split('=') ?? []
const libOptions = mode === 'lib' ? {
  lib: {
    entry: resolve(__dirname, 'src/lib/GridContainer.svelte'),
    formats: ['es'],
    fileName: 'grid-layout',
  },
} :{}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    configFile: false,
    preprocess: [
      vitePreprocess(),
      asMarkupPreprocessor([
        sveltePreprocess()
      ]),
      cssModules(),
    ],
    compilerOptions: {
      customElement: true
    }
  })],
  build: {
    ...libOptions,
  },
})
