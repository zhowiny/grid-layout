<script>
import {createEventDispatcher} from 'svelte'
import {resizable} from './resizable'

export let mode = 'horizontal'
export let detail

$: isVertical = mode === 'vertical'

const dispatch = createEventDispatcher()

let w = 0
let h = 0
let oldValue = 0

const handleResize = ({type, detail}) => {
  const {dx = 0, dy = 0} = detail
  const val = Math.max(8, oldValue + (isVertical ? dy : dx))
  if (type === 'start') {
		oldValue = isVertical ? h : w
  }
	dispatch(type, val)
}

</script>

<div
  class="control-item {isVertical ? '[writing-mode:vertical-lr]' : ''}"
  bind:clientWidth={w}
  bind:clientHeight={h}
  style="background: hsl(10,5%,26%);"
>
  {detail.value}{detail.unit}
  <div
    use:resizable
    on:start={handleResize}
    on:change={handleResize}
    on:end={handleResize}
    class="resize-bar {isVertical ? 'vertical' : 'horizontal'}"
  ></div>
</div>

<style lang="scss" module>
.control-item {
  @apply relative select-none overflow-x-hidden;
}
.resize-bar {
  @apply
  absolute z-10 right-0
  bg-gray-300
  box-content bg-clip-content
  transform;
  &.horizontal {
    @apply top-0 w-px h-full px-0.5 translate-x-1/2 cursor-ew-resize;
  }
  &.vertical {
    @apply bottom-0 w-full h-px py-0.5 translate-y-1/2 cursor-ns-resize;
  }
}
</style>
