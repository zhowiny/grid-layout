<script>
import GridControlBar from './GridControlBar.svelte'
import {useRAF} from './utils.js'

export let grid = null

$: store = grid?.gridStore
$: gridState = store.gridState
$: layout = $gridState.children
$: cols = $gridState.col.data
$: rows = $gridState.row.data
$: colTemplate = $gridState.colTemplate
$: rowTemplate = $gridState.rowTemplate
$: gap = $gridState.gap

let target
useRAF(() => target = grid?.container?.getBoundingClientRect())

const updateItem = (type, index, data) => {
  store?.updateData(type, index, data)
}
const deleteItem = (type, index) => {
  store?.deleteData(type, index)
}

</script>


<GridControlBar
  style="left:{target?.x}px;top:{target?.y}px;width:{target?.width}px;"
  data={cols}
  template={colTemplate}
  gap={gap}
  on:change={({detail}) => updateItem('col', detail.index, detail.data)}
/>
<GridControlBar
  style="left:{target?.x}px;top:{target?.y}px;height:{target?.height}px;"
  data={rows}
  template={rowTemplate}
  mode="vertical"
  isLimited={false}
  gap={gap}
  on:change={({detail}) => updateItem('row', detail.index, detail.data)}
/>
<div class="mockup-window border bg-base-100 h-screen overflow-y-auto">
  <div class="p-4 pt-0">
    <div class="flex flex-col gap-1 w-full">
      <div class="text-md flex justify-between">
        <span>grid-template-cols</span>
        <button
          class="btn btn-primary btn-outline rounded-sm btn-xs"
          on:click={() => {
            updateItem('col', cols.length, {name: `key-${cols.length}`, value: 100, unit: 'px'})
          }}
        >Add</button>
      </div>
      {#if cols}
        {#each cols as item, i(item.name)}
          <div class="join bordered">
            <input
              value={item.value}
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm"
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('col', i, {...item, value: isNaN(value) ? 0 : value})
              }}
            />
            <select
              class="join-item select select-bordered border-gray-500 select-sm w-20"
              value={item.unit}
              on:change={({target}) => {
                const unit = target.value
                updateItem('col', i, {...item, value: unit === 'px' ? 100 : 1, unit})
              }}
            >
              <option value="px">px</option>
              <option value="fr">fr</option>
              <option value="%">%</option>
            </select>
            <button
              class="join-item btn btn-sm btn-outline"
              on:click={() => deleteItem('col', i)}
            >X</button>
          </div>
        {/each}
      {/if}
    </div>
    <div class="flex flex-col gap-1 w-full mt-2">
      <div class="text-md flex justify-between">
        <span>grid-template-rows</span>
        <button
          class="btn btn-primary btn-outline rounded-sm btn-xs"
          on:click={() => {
            updateItem('row', rows.length, {name: `key-${rows.length}`, value: 24, unit: 'px'})
          }}
        >Add</button>
      </div>
      {#if rows}
        {#each rows as item, i(item.name)}
          <div class="join bordered">
            <input
              value={item.value}
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm"
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('row', i, {...item, value: isNaN(value) ? 0 : value})
              }}
            />
            <select
              class="join-item select select-bordered border-gray-500 select-sm w-20"
              value={item.unit}
              on:change={({target}) => {
                const unit = target.value
                updateItem('row', i, {...item, value: unit === 'px' ? 100 : 1, unit})
              }}
            >
              <option value="px">px</option>
              <option value="fr">fr</option>
              <option value="%">%</option>
            </select>
            <button
              class="join-item btn btn-sm btn-outline"
              on:click={() => deleteItem('row', i)}
            >X</button>
          </div>
        {/each}
      {/if}
    </div>

    <div class="flex flex-col gap-1 w-full mt-2">
      <div class="text-md flex justify-between">
        <span>children grid-area</span>
        <button
          class="btn btn-primary btn-outline rounded-sm btn-xs"
        >Add</button>
      </div>
      {#if layout}
        {#each layout as item, i(item.key)}
          <div class="join bordered">
            <input
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm"
              value={item.x}
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('layout', i, {...item, x: isNaN(value) ? 0 : value})
              }}
            />
            <input
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm"
              value={item.y}
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('layout', i, {...item, y: isNaN(value) ? 0 : value})
              }}
            />
            <input
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm"
              value={item.w}
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('layout', i, {...item, w: isNaN(value) ? 0 : value})
              }}
            />
            <input
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm"
              value={item.h}
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('layout', i, {...item, h: isNaN(value) ? 0 : value})
              }}
            />
            <button
              class="join-item btn btn-sm btn-outline"
            >X</button>
          </div>
        {/each}
      {/if}
    </div>

    <div class="btn btn-sm btn-outline mt-4">btn</div>
  </div>
</div>

<style lang="scss" module></style>
