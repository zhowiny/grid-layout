<script>
import {createEventDispatcher} from 'svelte'
import ControlItem from './ControlItem.svelte'
import {PXToFR, PXToPCT} from './utils.js';

const dispatch = createEventDispatcher()

const min = 10

export let data = null
export let template = null

export let isLimited = true
export let mode = 'horizontal'
$: isVertical = mode === 'vertical'

export let gap = 0

$: gapSum = gap * (data?.length - 1)

let height = 0
let width = 0
let max = 0

$: units = data?.reduce((m, {unit, value}) => {
  if (!m.has(unit)) m.set(unit, 0)
  const sum = m.get(unit)
  m.set(unit, parseFloat((sum + value).toFixed(2)))
  return m
}, new Map())
$: sumFR = units.get('fr') ?? 0
$: sumPX = units.get('px') ?? 0
$: sumPCT = units.get('%') ?? 0

const getSizeByUnit = (val, unit = 'px', width) => {
  switch (unit) {
    case 'fr':
      const w = width - sumPX - (width * sumPCT / 100) - gapSum
      const fr = PXToFR(val, w, Math.max(sumFR, 1))
      val = Math.min(sumFR > 1 ? max : 1, fr)
      return Math.max(val, 0.1)
    case '%':
      val = Math.min(max, PXToPCT(val, width))
      return Math.max(val, 1)
    case 'px':
    default:
      val = isLimited ? Math.min(max, val) : val
      return Math.max(val, min)
  }
}
const getMaxSize = (value, unit, width) => {
  const calcMaxWidth = (w, px, fr, pct, gap) => {
    return w - px - (fr * 10) - (w * pct / 100) - gap
  }
  const getSum = (type) => {
    return units.get(type) - (type === unit ? value : 0)
  }

  const result = calcMaxWidth(width, getSum('px'), getSum('fr'), getSum('%'), gapSum)

  switch (unit) {
    case 'fr':
      return result * 0.1
    case '%':
      return result / width * 100
    case 'px':
    default:
      return result
  }
}

const handleSizeChange = (item, index, detail) => {
  const size = getSizeByUnit(detail, item.unit, (isVertical ? height : width))
  if (item.value === size) return
  dispatch('change', {index, data: {...item, value: size}})
}

</script>
<div
  class="bar {isVertical ? 'rows' : 'cols'}"
  bind:clientWidth={width}
  bind:clientHeight={height}
  style="{$$restProps.style}; {isVertical ? 'grid-template-rows' : 'grid-template-columns'}:{template};"
  style:row-gap="{isVertical ? gap : 0}px"
  style:column-gap="{isVertical ? 0 : gap}px"
>
  {#if data}
    {#each data as item, i(item.name)}
      <ControlItem
        mode="{mode}"
        detail={item}
        on:start={() => {
          max = getMaxSize(item.value, item.unit, (isVertical ? height : width))
        }}
        on:change={({detail}) => {
          handleSizeChange(item, i, detail)
        }}
      />
<!--       item.value = size -->
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
