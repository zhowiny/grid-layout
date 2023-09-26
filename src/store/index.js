import {derived, writable} from 'svelte/store'
import {getColsOrRows, toFixed} from '../lib/utils'

export const GRID_STORE_KEY = Symbol('grid')

const toUnitMap = arr => arr.reduce((m, {unit, value}) => {
  if (value === null) return m
  if (!m.has(unit)) m.set(unit, 0)
  const sum = m.get(unit)
  m.set(unit, toFixed(sum + value, 2))
  return m
}, new Map())

export function createGridStore(options = {}) {
  const {layout, cols, rows, width, height, ...others} = options
  const {colsArr, rowsArr} = getColsOrRows(layout, cols, rows)

  const layoutStore = writable(layout)
  const colsStore = writable(colsArr)
  const rowsStore = writable(rowsArr)
  const sizeStore = writable({width, height})

  const otherOptions = writable(others)

  const gridState = derived([
    sizeStore, layoutStore, colsStore, rowsStore, otherOptions,
  ], ([$sizeStore, $layout, $cols, $rows, $other]) => {
    const colSizes = $cols.map(({value, unit}) => `${value === null ? '' : value}${unit}`)
    const rowSizes = $rows.map(({value, unit}) => `${value === null ? '' : value}${unit}`)
    const rowTemplate = rowSizes.join(' ')
    const colTemplate = colSizes.join(' ')

    return {
      // alignItems: 'flex-start',
      // gridAutoRows: 'max-content',
      ...$sizeStore,
      col: {
        data: $cols,
        sizes: colSizes,
        units: toUnitMap($cols),
        gap: $other.gap,
        gapSum: $other.gap * ($cols.length - 1),
        template: colTemplate,
      },
      row: {
        data: $rows,
        sizes: rowSizes,
        units: toUnitMap($rows),
        gap: $other.gap,
        gapSum: $other.gap * ($rows.length - 1),
        template: rowTemplate,
      },
      children: $layout,
      rowTemplate,
      colTemplate,
      ...$other,
    }
  })

  const reset = (layout, cols, rows) => {
    layoutStore.set(layout)
    const {colsArr, rowsArr} = getColsOrRows(layout, cols, rows)
    colsStore.set(colsArr)
    rowsStore.set(rowsArr)
  }

  const findSourceByType = type => typeof type === 'string' ? ({
    col: colsStore,
    row: rowsStore,
    layout: layoutStore,
    size: sizeStore,
  }[type]) : undefined

  // todo key允许嵌套
  const updateData = (type, key, value) => {
    findSourceByType(type)?.update(d => {
      d[key] = value
      return d
    })
  }
  const deleteData = (type, key) => {
    findSourceByType(type)?.update(d => {
      if (Array.isArray(d)) {
        d.splice(key, 1)
      } else if (typeof d === 'object') {
        delete d[key]
      }
      return d
    })
  }

  const updateSize = (w, h) => {
    updateData('size', 'width', w)
    updateData('size', 'height', h)
  }

  return {
    layoutStore,
    colsStore,
    rowsStore,
    reset,
    updateData,
    deleteData,
    updateSize,
    gridState,
  }
}
