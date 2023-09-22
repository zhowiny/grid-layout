import {derived, writable} from 'svelte/store'
import {getColsOrRows} from '../lib/utils'

export const GRID_STORE_KEY = Symbol('grid')

export function createGridStore(options = {}) {
  const {layout, cols, rows, ...others} = options
  const {colsArr, rowsArr} = getColsOrRows(layout, cols, rows)

  const layoutStore = writable(layout)
  const colsStore = writable(colsArr)
  const rowsStore = writable(rowsArr)

  const otherOptions = writable(others)

  const gridState = derived([
    layoutStore, colsStore, rowsStore, otherOptions,
  ], ([$layout, $cols, $rows, $other]) => {
    const colSizes = $cols.map(({value, unit}) => `${value}${unit}`)
    const rowSizes = $rows.map(({value, unit}) => `${value}${unit}`)

    return {
      // alignItems: 'flex-start',
      // gridAutoRows: 'max-content',
      colTemplate: colSizes.join(' '),
      rowTemplate: rowSizes.join(' '),
      col: {
        data: $cols,
        sizes: colSizes,
      },
      row: {
        data: $rows,
        sizes: rowSizes,
      },
      children: $layout,
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

  return {
    layoutStore,
    colsStore,
    rowsStore,
    reset,
    updateData,
    deleteData,
    gridState,
  }
}
