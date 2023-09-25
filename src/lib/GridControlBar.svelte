<script>
import {createEventDispatcher} from 'svelte'
import ControlItem from './ControlItem.svelte'
import {PXToFR, PXToPCT, toFixed} from './utils.js';

const dispatch = createEventDispatcher()

const min = 10

export let dataSource = null
export let isLimited = true
export let mode = 'horizontal'

export let width = 0
let max = 0

$: isVertical = mode === 'vertical'

$: gap = dataSource?.gap ?? 0
$: template = dataSource?.template
$: gapSum = dataSource?.gapSum ?? 0

$: units = dataSource?.units

$: sumFR = units.get('fr') ?? 0
$: sumPX = units.get('px') ?? 0
$: sumPCT = units.get('%') ?? 0

const calcWidth = (w, px, fr, pct, gap) => {
  return w - px - (fr * 10) - (w * pct / 100) - gap
}
const getMaxSize = (value, unit, width) => {
  const getSum = (type) => {
    const t = units.get(type)
    if (!t) return 0
    return t - (type === unit ? value : 0)
  }

  const result = calcWidth(width, getSum('px'), getSum('fr'), getSum('%'), gapSum)
  switch (unit) {
    case 'fr':
      return toFixed(result * 0.1)
    case '%':
      return toFixed(result / width * 100)
    case 'px':
    default:
      return result
  }
}
const getVal = (val, max, min) => {
  return Math.max(Math.min(max, val), min)
}
const getSizeByUnit = (val, unit = 'px', width) => {
  switch (unit) {
    case 'fr':
      const fr = PXToFR(val, calcWidth(width, sumPX, 0, sumPCT, gapSum), Math.max(sumFR, 1))
      return getVal(fr, sumFR > 1 ? max : 1, 0.1)
    case '%':
      return getVal(PXToPCT(val, width), max, 1)
    case 'px':
    default:
      return getVal(val, isLimited ? max : Infinity, min)
  }
}
const handleSizeChange = (item, index, detail) => {
  const size = getSizeByUnit(detail, item.unit, width)
  if (item.value === size) return
  const unit = ['fr', 'px', '%'].includes(item.unit) ? item.unit : 'px'
  dispatch('change', {index, data: {...item, value: size, unit}})
}

</script>
<div
  class="contents"
>
  {#each dataSource.data as item, i(item.name)}
    <ControlItem
      mode="{mode}"
      detail={item}
      style="grid-area: {isVertical ? `${i + 1}/1` : `1/${i + 1}`};"
      on:start={() => {
        max = getMaxSize(item.value, item.unit, width)
      }}
      on:change={({detail}) => {
        handleSizeChange(item, i, detail)
      }}
    />
  {/each}
</div>

<style lang="scss">

</style>
