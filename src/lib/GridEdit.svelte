<svelte:window
  on:scroll={handleSizeChange}
  on:resize={handleSizeChange}
  bind:scrollX={scrollX}
  bind:scrollY={scrollY}
/>

<script>
  import GridControlBar from './GridControlBar.svelte'
  import {onMount} from 'svelte';
  import {getChildren} from './utils.js';

  let scrollX, scrollY
  export let grid = null

  $: store = grid?.gridStore
  $: gridState = store.gridState
  $: layout = $gridState.children
  $: cols = $gridState.col
  $: rows = $gridState.row

  let target
  const handleSizeChange = () => {
    target = grid?.container?.getBoundingClientRect()
  }
  $: handleSizeChange($gridState.width, $gridState.height)

  $: childrenElement = getChildren(grid?.container?.children[0])

  onMount(() => {
    console.log($gridState)
  })

  const updateItem = (type, index, data) => {
    store?.updateData(type, index, data)
  }
  const deleteItem = (type, index) => {
    store?.deleteData(type, index)
  }

</script>

<div
  class="grid fixed z-10 opacity-80 pointer-events-none"
  style="left:{target?.x}px;top:{target?.y}px;height:{$gridState.height}px;width:{$gridState.width}px;grid-template-columns: {cols.template};grid-template-rows: {rows.template};column-gap: {cols.gap}px;row-gap: {rows.gap}px;"
>
  <GridControlBar
    dataSource={cols}
    width={$gridState.width}
    on:change={({detail}) => updateItem('col', detail.index, detail.data)}
  />
  <GridControlBar
    dataSource={rows}
    width={$gridState.height}
    mode="vertical"
    isLimited={false}
    on:change={({detail}) => updateItem('row', detail.index, detail.data)}
  />

  {#each layout as item, i(item.key)}
    {#if childrenElement[i]}
      <div style="grid-area: {childrenElement[i].style.gridArea};width: {childrenElement[i].clientWidth}px;height: {childrenElement[i].clientHeight}px;"></div>
    {/if}
  {/each}
    <!-- {#each rows.data as _, i} -->
    <!--   {#each cols.data as _, j} -->
    <!--     <div class="bg-primary-focus/20" style="grid-area: {i + 1} / {j + 1} / span 1 / span 1"></div> -->
    <!--   {/each} -->
    <!-- {/each} -->
</div>
<div class="mockup-window sticky top-0 border bg-base-100 h-screen overflow-y-auto">
  <div class="p-4 pt-0">
    <div class="flex flex-col gap-1 w-full">
      <div class="text-md flex justify-between">
        <span>grid-template-cols</span>
        <button
          class="btn btn-primary btn-outline rounded-sm btn-xs"
          on:click={() => {
            updateItem('col', cols.data.length, {name: `key-${cols.data.length}`, value: 100, unit: 'px'})
          }}
        >Add
        </button>
      </div>
      {#if cols.data}
        {#each cols.data as item, i(item.name)}
          <div class="join bordered">
            <input
              disabled={item.value === null}
              value={item.value}
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered input-sm"
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('col', i, {...item, value: isNaN(value) ? 0 : value})
              }}
            />
            <select
              class="join-item select select-bordered select-sm w-20"
              value={item.unit}
              on:change={({target}) => {
                const unit = target.value
                const isValidUnit = ['px','fr','%'].includes(unit)
                const defaultValue = unit === 'px' ? 100 : 1
                updateItem('col', i, {
                  ...item,
                  value: isValidUnit ? defaultValue : null,
                  unit
                })
              }}
            >
              <option value="px">px</option>
              <option value="fr">fr</option>
              <option value="%">%</option>
              <option value="auto">auto</option>
            </select>
            <button
              class="join-item btn btn-sm btn-outline"
              on:click={() => deleteItem('col', i)}
            >X
            </button>
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
            updateItem('row', rows.data.length, {name: `key-${rows.data.length}`, value: 24, unit: 'px'})
          }}
        >Add
        </button>
      </div>
      {#if rows.data}
        {#each rows.data as item, i(item.name)}
          <div class="join bordered">
            <input
              disabled={item.value === null}
              value={item.value}
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered input-sm"
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('row', i, {...item, value: isNaN(value) ? 0 : value})
              }}
            />
            <select
              class="join-item select select-bordered select-sm w-20"
              value={item.unit}
              on:change={({target}) => {
                const unit = target.value
                const isValidUnit = ['px','fr','%'].includes(unit)
                const defaultValue = unit === 'px' ? 100 : 1
                updateItem('row', i, {
                  ...item,
                  value: isValidUnit ? defaultValue : null,
                  unit
                })
              }}
            >
              <option value="px">px</option>
              <option value="fr">fr</option>
              <option value="%">%</option>
              <option value="auto">auto</option>
            </select>
            <button
              class="join-item btn btn-sm btn-outline"
              on:click={() => deleteItem('row', i)}
            >X
            </button>
          </div>
        {/each}
      {/if}
    </div>

    <div class="flex flex-col gap-1 w-full mt-2">
      <div class="text-md flex justify-between">
        <span>children grid-area</span>
        <button
          class="btn btn-primary btn-outline rounded-sm btn-xs"
        >Add
        </button>
      </div>
      {#if layout}
        {#each layout as item, i(item.key)}
          <div class="join bordered">
            <input
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered input-sm"
              value={item.x}
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('layout', i, {...item, x: isNaN(value) ? 0 : value})
              }}
            />
            <input
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered input-sm"
              value={item.y}
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('layout', i, {...item, y: isNaN(value) ? 0 : value})
              }}
            />
            <input
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered input-sm"
              value={item.w}
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('layout', i, {...item, w: isNaN(value) ? 0 : value})
              }}
            />
            <input
              type="number"
              class="join-item flex-1 w-0 input input-number input-bordered input-sm"
              value={item.h}
              on:input={({target}) => {
                const value = Number(target.value)
                updateItem('layout', i, {...item, h: isNaN(value) ? 0 : value})
              }}
            />
            <button
              class="join-item btn btn-sm btn-outline"
            >X
            </button>
          </div>
        {/each}
      {/if}
    </div>

    <div class="btn btn-sm btn-outline mt-4">btn</div>
  </div>
</div>

<style lang="scss" module></style>
