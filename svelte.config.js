import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import {asMarkupPreprocessor}  from 'svelte-as-markup-preprocessor'
import cssModules from 'svelte-preprocess-cssmodules'
import sveltePreprocess from 'svelte-preprocess'

// -D svelte-preprocess-cssmodules svelte-as-markup-preprocessor
export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    asMarkupPreprocessor([
      sveltePreprocess()
    ]),
    cssModules(),
  ],
}
