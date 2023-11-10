# What's the grid-layout


# How to use

### In HTML
```html
<script type="module" src="/dist/grid-layout.js" />

<grid-layout
  data-rows="['50px', '1fr']"
  data-cols="['300px','1fr']"
  data-gap="8"
>
  <div>A</div>
  <div>B</div>
  <div>C</div>
</grid-layout>
```

### In Svelte
```sveltehtml
<script>
  import 'grid-layout';
</script>
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
```

# Props