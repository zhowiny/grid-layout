<script>
import {createEventDispatcher} from 'svelte'
import {resizable} from './resizable'

export let mode = 'horizontal'
export let detail
export let length = 0

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
  class="control-item {$$restProps.class} {isVertical ? 'vertical' : 'horizontal'}"
  bind:clientWidth={w}
  bind:clientHeight={h}
  style="{$$restProps.style}"
  data-size={`${detail.value ?? ''}${detail.unit}`}
>
  <div
    use:resizable
    on:start={handleResize}
    on:change={handleResize}
    on:end={handleResize}
    class="resize-bar"
  ></div>
</div>

<style lang="scss" module>
.control-item {
  @apply
  pointer-events-auto
  relative select-none
  overflow-visible
  text-xs leading-3
  transform
  before:absolute before:bg-gray-600
  before:content-[attr(data-size)] before:overflow-auto;

  .resize-bar {
    @apply
    absolute z-10 right-0
    bg-gray-300
    box-content bg-clip-content
    transform;
  }

  &.horizontal {
    @apply h-0 -translate-y-3 before:w-full before:h-3;
    .resize-bar {
      @apply top-0 w-px h-3 px-0.5 translate-x-1/2 cursor-ew-resize;
    }
  }
  &.vertical {
    @apply [writing-mode:vertical-lr] w-0 -translate-x-3 before:h-full before:w-3;
    .resize-bar {
      @apply bottom-0 w-3 h-px py-0.5 translate-y-1/2 translate-x-full cursor-ns-resize;
    }
  }
}

</style>
