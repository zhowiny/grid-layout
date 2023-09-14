<script>
import {onMount} from 'svelte'
import GridControlBar from './GridControlBar.svelte'

const useRAF = (callback = () => {}, condition = () => false) => {
	const fn = (t) => {
		if (condition()) return
		callback()
		requestAnimationFrame(fn)
	}
	requestAnimationFrame(fn)
}

export let grid = null

$: colsStore = grid?.gridStore?.colsStore
$: colTemplate = grid?.gridStore?.colTemplate
$: rowsStore = grid?.gridStore?.rowsStore
$: rowTemplate = grid?.gridStore?.rowTemplate
$: layoutStore = grid?.gridStore?.layoutStore

let target
useRAF(() => target = grid?.container.getBoundingClientRect())


// $: console.log(target?.y)

const updateItem = (dataSource, data, index) => {
	dataSource.update(d => {
		d[index] = data
    return d
  })
}
const deleteItem = (dataSource, index) => {
	dataSource.update(d => {
		d.splice(index, 1)
		return d
	})
}

const addCol = () => {
	const len = $colsStore.length
	updateItem(colsStore, {name: `key-${len}`, value: 100, unit: 'px'}, len)
}
const addRow = () => {
	const len = $rowsStore.length
	updateItem(rowsStore, {name: `key-${len}`, value: 24, unit: 'px'}, len)
}

// onMount(() => {
// 	console.log(111)
// 	rect = container?.getBoundingClientRect()
// })

// $: console.log(target?.x, target?.y)

</script>


<GridControlBar
  style="left:{target?.x}px;top:{target?.y}px;width:{target?.width}px;"
  data={colsStore}
  template={colTemplate}
  gap={1}
/>
<GridControlBar
  style="left:{target?.x}px;top:{target?.y}px;height:{target?.height}px;"
  data={rowsStore}
  template={rowTemplate}
  mode="vertical"
  isLimited={false}
  gap={1}
/>
<div class="mockup-window border bg-base-100 h-screen overflow-y-auto">
  <div class="p-4 pt-0">
    <div class="flex flex-col gap-1 w-full">
      <div class="text-md flex justify-between">
        <span>grid-template-cols</span>
        <button
          class="btn btn-primary btn-outline rounded-sm btn-xs"
          on:click={addCol}
        >Add</button>
      </div>
      {#if $colsStore}
        {#each $colsStore as item, i(item.name)}
          <div class="join bordered">
            <input bind:value={item.value} type="number" class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm" />
            <select
              class="join-item select select-bordered border-gray-500 select-sm w-20"
              bind:value={item.unit}
              on:change={({target}) => {
								if (target.value === 'px') {
									item.value = 100
								} else if (target.value === 'fr') {
									item.value = 1
								}
              }}
            >
              <option value="px">px</option>
              <option value="fr">fr</option>
              <option value="%">%</option>
            </select>
            <button
              class="join-item btn btn-sm btn-outline"
              on:click={() => deleteItem(colsStore, i)}
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
          on:click={addRow}
        >Add</button>
      </div>
      {#if $rowsStore}
        {#each $rowsStore as item, i(item.name)}
          <div class="join bordered">
            <input bind:value={item.value} type="number" class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm" />
            <select
              class="join-item select select-bordered border-gray-500 select-sm w-20"
              bind:value={item.unit}
              on:change={({target}) => {
								if (target.value === 'px') {
									item.value = 100
								} else if (target.value === 'fr') {
									item.value = 1
								}
              }}
            >
              <option value="px">px</option>
              <option value="fr">fr</option>
              <option value="%">%</option>
            </select>
            <button
              class="join-item btn btn-sm btn-outline"
              on:click={() => deleteItem(rowsStore, i)}
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
          on:click={addRow}
        >Add</button>
      </div>
      {#if $layoutStore}
        {#each $layoutStore as item, i(item.key)}
          <div class="join bordered">
            <input bind:value={item.x} type="number" class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm" />
            <input bind:value={item.y} type="number" class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm" />
            <input bind:value={item.w} type="number" class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm" />
            <input bind:value={item.h} type="number" class="join-item flex-1 w-0 input input-number input-bordered border-gray-500 input-sm" />

            <button
              class="join-item btn btn-sm btn-outline"
              on:click={() => deleteItem(layoutStore, i)}
            >X</button>
          </div>
        {/each}
      {/if}
    </div>

    <div class="btn btn-sm btn-outline mt-4">btn</div>
  </div>
</div>

<style lang="scss" module></style>
