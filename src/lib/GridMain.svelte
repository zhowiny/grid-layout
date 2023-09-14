<script>
import {getContext} from 'svelte'
import {GRID_STORE_KEY} from '../store/index.js'

const {layoutStore, rowTemplate, colTemplate} = getContext(GRID_STORE_KEY)
export let gap = {x: 0, y: 0}

$: gapX = typeof gap === 'number' ? gap : gap.x
$: gapY = typeof gap === 'number' ? gap : gap.y

function childArea(node, layout) {
  updateChildArea(layout)

  function updateChildArea(layout = []) {
    if (!layout.length) return
    const children = node.children
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (!layout[i]) {
				child.dataset.grid && (child.style.gridArea = child.dataset.grid)
			} else {
				const {x, y, w, h} = layout[i] || {}
				child.style.gridArea = `${y}/${x}/span ${h}/span ${w}`
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
  style="grid-template-columns: {$colTemplate};grid-template-rows: {$rowTemplate};column-gap: {gapX}px;row-gap: {gapY}px;"
>
  <slot></slot>
</div>

<style lang="scss" module>
.grid-container {
  @apply grid;
  > * {
    overflow: auto;
  }
}

</style>
