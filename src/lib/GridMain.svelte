<script>
import {getContext} from 'svelte'
import {GRID_STORE_KEY} from '../store/index.js'
import {getChildren} from './utils.js'

const {layoutStore, gridState} = getContext(GRID_STORE_KEY)
export let gap = {x: 0, y: 0}

$: gapX = typeof gap === 'number' ? gap : gap.x
$: gapY = typeof gap === 'number' ? gap : gap.y

$: colTemplate = $gridState.colTemplate
$: rowTemplate = $gridState.rowTemplate

function childArea(node, layout) {
  updateChildArea(layout)

  function updateChildArea(layout = []) {
    const children = getChildren(node)
    if (!children.length) return
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (!layout[i]) {
				child.dataset.grid && (child.style.gridArea = child.dataset.grid)
			} else {
				const {x, y, w, h} = layout[i] || {}
				child.style.gridArea = `${y + 1}/${x + 1}/span ${h}/span ${w}`
      }
    }
  }

  return {
    update: updateChildArea,
  }
}

</script>
<div
  use:childArea={$layoutStore}
  class="grid-container {$$restProps.class || ''}"
  style="grid-template-columns: {colTemplate};grid-template-rows: {rowTemplate};column-gap: {gapX}px;row-gap: {gapY}px;"
>
  <slot>zzzzz</slot>
</div>

<style lang="scss" module>
.grid-container {
  @apply grid w-full h-full;
  & > ::slotted(div) {
    overflow: auto;
  }
}

</style>
