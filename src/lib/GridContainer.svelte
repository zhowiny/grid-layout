<svelte:options accessors/>
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

export const gridStore = createGridStore({
  layout,
  cols,
  rows,
  gap,
  width,
  height,
})
setContext(GRID_STORE_KEY, gridStore)

$: gridStore.reset(layout, cols, rows)
$: gridStore.updateSize(width, height)

</script>

<div
  bind:this={container}
  class="wrapper {wrapperClass}"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
<!--  style={`width:${width}px; height:${height}px;`}-->

  <GridMain
    class="{$$restProps.class}"
    layout="{layout}"
    gap={gap}
  >
    <slot></slot>
  </GridMain>
</div>

<style lang="scss" module>
.wrapper {
  @apply relative;
}
</style>
