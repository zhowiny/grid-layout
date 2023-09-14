<script>
import ControlItem from './ControlItem.svelte'

const min = 10

export let data = null
export let template = null

export let isLimited = true
export let mode = 'horizontal'
$: isVertical = mode === 'vertical'

export let gap = 0

$: gapSum = gap * ($data?.length - 1)

let height = 0
let width = 0
let max = 0

const calcMax = (index) => {
	let sum = isVertical ? height : width

	const other_height = $data.reduce((sum, {value}, i) => {
		if (i === index) return sum
		sum += value
		return sum
	}, 0)
	max = sum - gapSum - other_height
}

const getSize = (val) => {
	val = isLimited ? Math.min(max, val) : val
	return Math.max(val, min)
}

</script>
<div
  class="bar {isVertical ? 'rows' : 'cols'}"
  bind:clientWidth={width}
  bind:clientHeight={height}
  style="{$$restProps.style}; {isVertical ? 'grid-template-rows' : 'grid-template-columns'}:{$template};"
  style:row-gap="{isVertical ? gap : 0}px"
  style:column-gap="{isVertical ? 0 : gap}px"
>
  {#if $data}
    {#each $data as item, i(item.name)}
      <ControlItem
        mode="{mode}"
        detail={item}
        on:start={() => calcMax(i)}
        on:change={({detail}) => {
          const size = getSize(detail)
          if (item.value === size) return
          item.value = size
        }}
      />
    {/each}
  {/if}
</div>

<style lang="scss">
.bar {
  @apply
  grid auto-cols-[minmax(auto,_1fr)] auto-rows-[minmax(auto,_24px)]
  fixed z-50 top-0 left-0
  transform
  text-xs leading-3;
  //transition-property: width, height, left, top;
  &.rows {
    @apply h-full -translate-x-full w-3;
  }
  &.cols {
    @apply w-full -translate-y-full h-3;
  }
}
</style>
