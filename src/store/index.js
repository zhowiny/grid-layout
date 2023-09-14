import {writable, derived} from 'svelte/store'
import {getColsOrRows} from '../lib/utils'

const grid = {
  alignItems: 'flex-start',
  gridAutoRows: 'max-content',
  col: {
    sizes: ['20%', '30%', '1fr', '3f']
  },
  row: {
    sizes: ['50px', '1fr', '24px']
  },
  children: [
    {key: 'header', x: 1, y: 1, w: 5, h: 1},
    {key: 'aside', x: 1, y: 2, w: 2, h: 2},
    {key: 'section', x: 3, y: 2, w: 2, h: 1},
    {key: 'article', x: 5, y: 2, w: 1, h: 1},
    {key: 'footer', x: 3, y: 3, w: 3, h: 1},
  ]
}

function f (cols, gap = 0) {
  const defaultValue = {sum: 0, count: 0}
  const units = cols.reduce((m, {unit, value}) => {
    if (!m.has(unit)) m.set(unit, defaultValue)
    const target = m.get(unit)
    target.sum = parseFloat((target.sum + value).toFixed(2))
    target.count++
    return m
  }, new Map())
  const gapSum = gap * (cols.length - 1)
  const fr = units.get('fr') ?? defaultValue
  const px = units.get('px') ?? defaultValue
}

export const GRID_STORE_KEY = Symbol('grid')

export function createGridStore(layout, cols, rows) {
  const {colsArr, rowsArr} = getColsOrRows(layout, cols, rows)

  const layoutStore = writable(layout)
  const colsStore = writable(colsArr)
  const rowsStore = writable(rowsArr)

  const colTemplate = derived(colsStore, d => d.map(({value, unit}) => `${value}${unit}`).join(' '))
  const rowTemplate = derived(rowsStore, d => d.map(({value, unit}) => `${value}${unit}`).join(' '))

  const update = (layout, cols, rows) => {
    layoutStore.set(layout)
    const {colsArr, rowsArr} = getColsOrRows(layout, cols, rows)
    colsStore.set(colsArr)
    rowsStore.set(rowsArr)
  }

  return {
    layoutStore,
    colsStore,
    rowsStore,
    colTemplate,
    rowTemplate,
    update,
  }
}
