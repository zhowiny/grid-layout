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
const layout2 = [
  {
    "x": 2,
    "y": 0,
    "w": 2,
    "h": 4,
    "key": 0
  },
  {
    "x": 4,
    "y": 0,
    "w": 2,
    "h": 2,
    "key": 1
  },
  {
    "x": 4,
    "y": 2,
    "w": 2,
    "h": 2,
    "key": 2
  },
  {
    "x": 4,
    "y": 4,
    "w": 2,
    "h": 4,
    "key": 3
  },
  {
    "x": 10,
    "y": 0,
    "w": 2,
    "h": 3,
    "key": 4
  },
  {
    "x": 2,
    "y": 4,
    "w": 2,
    "h": 3,
    "key": 5
  },
  {
    "x": 0,
    "y": 4,
    "w": 2,
    "h": 4,
    "key": 6
  },
  {
    "x": 4,
    "y": 8,
    "w": 2,
    "h": 5,
    "key": 7
  },
  {
    "x": 0,
    "y": 8,
    "w": 2,
    "h": 3,
    "key": 8
  },
  {
    "x": 8,
    "y": 2,
    "w": 2,
    "h": 2,
    "key": 9
  },
  {
    "x": 4,
    "y": 13,
    "w": 2,
    "h": 4,
    "key": 10
  },
  {
    "x": 4,
    "y": 17,
    "w": 2,
    "h": 5,
    "key": 11
  },
  {
    "x": 0,
    "y": 11,
    "w": 2,
    "h": 4,
    "key": 12
  },
  {
    "x": 6,
    "y": 6,
    "w": 2,
    "h": 3,
    "key": 13
  },
  {
    "x": 0,
    "y": 15,
    "w": 2,
    "h": 5,
    "key": 14
  },
  {
    "x": 4,
    "y": 22,
    "w": 2,
    "h": 5,
    "key": 15
  },
  {
    "x": 4,
    "y": 27,
    "w": 2,
    "h": 4,
    "key": 16
  },
  {
    "x": 8,
    "y": 8,
    "w": 2,
    "h": 4,
    "key": 17
  },
  {
    "x": 0,
    "y": 20,
    "w": 2,
    "h": 3,
    "key": 18
  },
  {
    "x": 6,
    "y": 15,
    "w": 2,
    "h": 5,
    "key": 19
  },
  {
    "x": 2,
    "y": 15,
    "w": 2,
    "h": 5,
    "key": 20
  },
  {
    "x": 0,
    "y": 23,
    "w": 2,
    "h": 2,
    "key": 21
  },
  {
    "x": 2,
    "y": 9,
    "w": 2,
    "h": 3,
    "key": 22
  },
  {
    "x": 8,
    "y": 12,
    "w": 2,
    "h": 4,
    "key": 23
  },
  {
    "x": 6,
    "y": 20,
    "w": 2,
    "h": 4,
    "key": 24
  }
]
</script>

<grid-layout cols="{['400px', '1fr', '25%']}" gap="{8}">
  <aside>
    {#if current}
      <GridEdit grid={current} />
    {/if}
  </aside>
  <main class="place-self-center p-8 w-full" >
    <button class="btn" on:click={handleClick}>btn</button>
    <grid-layout class="px-8" bind:this={grid} cols="{cols}" rows="{rows}" layout="{layout}" gap={20}>
      {#each arr as {key, i}}
        <div class="border">
          Lorem dolor sit ame consectetur adipisicing elit. Architecto autem blanditiis dolore ducimus eligendi enim expedita explicabo fuga, fugiat mollitia nesciunt quas quidem reiciendis repudiandae tempora ullam vitae voluptas voluptatibus!
          <div>xxx</div>
        </div>
      {/each}
      <div class="border" data-grid="1/3/span 1/span 2">

        <grid-layout class="h-full"  cols="{2}" rows="{2}" layout="{l2}" gap={2}>
          <div>asdddd</div>
          <!-- {#each arr as {key, i}} -->
          <!--   <div class="border border-primary">{key}-{i}</div> -->
          <!-- {/each} -->
        </grid-layout>
      </div>
    </grid-layout>
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
    <pre class="mockup-code max-h-40 overflow-auto my-4">{JSON.stringify(layout2, null, 2)}</pre>
    <div class="mockup-window border bg-base-300">
      <grid-layout class="h-[800px]" bind:this={gridChild} cols={12} layout={layout2}>
        {#each layout2 as _,i(i)}
          <div class="bg-primary-focus/30 text-white flex justify-center items-center">{i}</div>
        {/each}
      </grid-layout>
    </div>
  </main>
  <aside class="mockup-window sticky top-0 border bg-base-100 h-screen overflow-y-auto p-4">
    <!-- material -->
    <grid-layout cols="{2}" gap={20}>
      <grid-layout class="aspect-video border border-primary-focus/30" layout="{l2}" gap={2}>
        {#each l2 as _}
          <div class="bg-primary-focus/30"></div>
        {/each}
      </grid-layout>
      <grid-layout
        class="aspect-video border border-primary-focus/30"
        gap={2}
        layout="{[
          {x: 0, y: 0, w: 6, h: 1},
          {x: 0, y: 1, w: 1, h: 3},
          {x: 1, y: 1, w: 4, h: 3},
          {x: 5, y: 1, w: 1, h: 3},
          {x: 0, y: 4, w: 6, h: 1},
        ]}"
      >
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
      </grid-layout>
      <grid-layout
        class="aspect-video border border-primary-focus/30"
        gap={2}
        layout="{[
          {x: 0, y: 0, w: 3, h: 6},
          {x: 3, y: 0, w: 6, h: 2},
          {x: 3, y: 2, w: 6, h: 3},
          {x: 3, y: 5, w: 6, h: 1},
        ]}"
      >
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
      </grid-layout>
      <grid-layout
        class="aspect-video border border-primary-focus/30"
        gap={2}
        layout="{[
          {x: 0, y: 0, w: 3, h: 1},
          {x: 0, y: 1, w: 1, h: 2},
          {x: 1, y: 1, w: 1, h: 2},
          {x: 2, y: 1, w: 1, h: 2},
          {x: 0, y: 3, w: 1, h: 2},
          {x: 1, y: 3, w: 1, h: 2},
          {x: 2, y: 3, w: 1, h: 2},
        ]}"
      >
        <div class="bg-primary-focus/30"></div>
        <div class=" bg-primary-focus/30"></div>
        <div class=" bg-primary-focus/30"></div>
        <div class=" bg-primary-focus/30"></div>
        <div class=" bg-primary-focus/30"></div>
        <div class=" bg-primary-focus/30"></div>
        <div class=" bg-primary-focus/30"></div>
      </grid-layout>
      <grid-layout
        class="aspect-video border border-primary-focus/30"
        gap={2}
        layout="{[
          {x: 0, y: 0, w: 6, h: 1},
          {x: 1, y: 1, w: 4, h: 2},
          {x: 1, y: 3, w: 4, h: 1},
          {x: 0, y: 4, w: 6, h: 3},
        ]}"
      >
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
        <div class="bg-primary-focus/30"></div>
      </grid-layout>
    </grid-layout>
  </aside>
</grid-layout>
<style lang="scss" module>
</style>
