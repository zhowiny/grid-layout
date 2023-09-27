<script>
import GridLayout from './lib/GridContainer.svelte'
import GridEdit from './lib/GridEdit.svelte'
import {getLayoutData} from './lib/utils.js'

const n = 'a'.charCodeAt(0)
let arr = Array.from({length: 5}, (_, i) => ({key: String.fromCharCode(n + i), i}))
let layout = getLayoutData()
let l2 = getLayoutData()
let cols = 5
let rows = 4

let grid = null
let gridChild = null
let current = null

$: setTimeout(() => {
	grid && (current = grid)
}, 0)

// $: s = grid?.gridStore?.colsStore
// $: l = grid?.gridStore?.layoutStore

const handleClick = () => {
	current = current === grid ? gridChild : grid
	// layout = [
	// 	{key: 'header', x: 2, y: 1, w: 3, h: 1},
	// 	{key: 'aside', x: 1, y: 2, w: 2, h: 2},
	// 	{key: 'section', x: 3, y: 2, w: 2, h: 1},
	// 	{key: 'article', x: 5, y: 2, w: 1, h: 1},
	// 	{key: 'footer', x: 3, y: 3, w: 3, h: 1},
	// ]
}
</script>

<div class="grid grid-cols-[300px_1fr_300px] gap-2">
  <aside>
    {#if current}
      <GridEdit grid={current} />
    {/if}
  </aside>
  <main class="place-self-center p-8 w-full" >
   <button class="btn" on:click={handleClick}>btn</button>
    <GridLayout bind:this={grid} cols="{cols}" rows="{rows}" layout="{layout}" gap={20}>
      {#each arr as {key, i}}
        <div class="bg-gray-600 first:bg-primary-focus/30">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto autem blanditiis dolore ducimus eligendi enim expedita explicabo fuga, fugiat mollitia nesciunt quas quidem reiciendis repudiandae tempora ullam vitae voluptas voluptatibus!
        </div>
      {/each}
      <div class="bg-secondary-focus/30" data-grid="2/3/span 3/span 3">

        <GridLayout wrapperClass="" bind:this={gridChild} cols="{2}" rows="{2}" layout="{l2}" gap={1}>
          {#each arr as {key, i}}
            <div class="bg-primary-focus/50">{key}-{i}</div>
          {/each}
        </GridLayout>
      </div>
    </GridLayout>
    <!--<div class="w-96 mt-4">
      <GridLayout cols="{2}" rows="{2}" layout="{l2}" gap={4}>
        <div class="bg-primary-focus/20">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam asperiores cumque dolor, dolorum earum eius enim harum itaque laborum, magnam mollitia numquam obcaecati odio placeat tempora temporibus unde voluptas!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam asperiores cumque dolor, dolorum earum eius enim harum itaque laborum, magnam mollitia numquam obcaecati odio placeat tempora temporibus unde voluptas!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam asperiores cumque dolor, dolorum earum eius enim harum itaque laborum, magnam mollitia numquam obcaecati odio placeat tempora temporibus unde voluptas!
        </div>
        {#each arr as {key, i}}
          <div class="bg-gray-600">{key}-{i}</div>
        {/each}
      </GridLayout>
    </div>
    <GridLayout class="mt-4" layout="{l2}" gap={4}>
      {#each arr as {key, i}}
        <div class="bg-gray-600">{key}-{i}</div>
      {/each}
    </GridLayout>-->
  </main>
  <aside class="h-screen sticky top-0">
    <!-- material -->
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </aside>
</div>
<style lang="scss" module>
</style>
