<svelte:options
  accessors
  customElement='grid-layout'
/>
<script>
import {setContext} from 'svelte'
import GridMain from './GridMain.svelte'
import {createGridStore, GRID_STORE_KEY} from '../store'

export let cols = 2
export let rows = 0

export let layout = []
export let wrapperClass = ''
export let gap = 4

export let width = 0
export let height = 0
export let container

$: dataset = Object.entries(container?.parentNode?.host?.dataset ?? {})
  .reduce((r, [key, valueString]) => {
    r[key] = Function(`return ${valueString}`)()
    return r
  }, {})

$: options = {
  layout,
  cols,
  rows,
  gap,
  ...dataset,
}

export let gridStore = createGridStore()
setContext(GRID_STORE_KEY, gridStore)

$: gridStore.init(options)
$: gridStore.updateSize(width, height)

</script>

<div
  bind:this={container}
  class="wrapper {wrapperClass}"
  part="wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <GridMain
    class="{$$restProps.class}"
    layout="{options.layout}"
    gap={options.gap}
  >
    <slot>content</slot>
  </GridMain>
</div>

<style lang="scss" module>
  :host {
    @apply block;
  }

  .wrapper {
    @apply relative h-full;
  }
</style>
