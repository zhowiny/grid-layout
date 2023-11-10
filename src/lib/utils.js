export const PREFIX = 'a-'

export function genArr(len, callback) {
  return Array.from({length: len}).map(callback)
}

export const getMaxColsOrMaxRows = (layout, colspan, rowspan) => {
  let maxCols = colspan
  let maxRows = rowspan
  for (const {x, y, w, h} of layout) {
    maxCols = Math.max(maxCols, x + w)
    maxRows = Math.max(maxRows, y + h)
  }
  return {
    maxCols,
    maxRows,
  }
}

export function generateSize(data, len, key) {
  const isArray = Array.isArray(data)

  if (typeof data !== 'number' && !isArray) {
    throw new Error('data must be number or array')
  }
  const callback = (_, i) => {
    const name = `${PREFIX}${key}${key ? '-' : ''}${i}`
    let value = 1
    let unit = 'fr'
    if (isArray && data[i]) {
      value = parseValue(data[i])
      unit = parseUnit(data[i])
    }
    return {name, value, unit}
  }
  return genArr(len, callback)
}
// export const generateAreas = (layout, cols, rows) => {
//   const {maxCols, maxRows} = getMaxColsOrMaxRows(layout, cols, rows)
//   const areas = Array.from({length: maxRows}, () => Array.from({length: maxCols}).fill('.'))
//   layout.forEach(({x, y, w, h, key}) => {
//     if (x <= 0 || y <= 0) return
//     for (let a = x; a < x + w; a++) {
//       for (let b = y; b < y + h; b++) {
//         areas[b - 1][a - 1] = key
//       }
//     }
//   })
//   return areas
// }

export const getColsOrRows = (layout, c, r) => {
  const colspan = Array.isArray(c) ? c.length : c
  const rowspan = Array.isArray(r) ? r.length : r
  const {maxCols, maxRows} = getMaxColsOrMaxRows(layout, colspan, rowspan)

  const rows = Math.max(maxRows, rowspan)
  // const rows = rowspan ? Math.max(maxRows, rowspan) : 0

  const rowsArr = generateSize(r, rows, 'r')
  const colsArr = generateSize(c, maxCols, 'c')

  return {
    colsArr,
    rowsArr,
  }
}

export const getLayoutData = () => {
  return [
    {key: 'header', x: 0, y: 0, w: 5, h: 1},
    {key: 'aside', x: 0, y: 1, w: 2, h: 2},
    {key: 'section', x: 2, y: 1, w: 2, h: 1},
    {key: 'article', x: 4, y: 1, w: 1, h: 1},
    {key: 'footer', x: 2, y: 2, w: 3, h: 1},
  ]
}


export const useRAF = (callback = () => {}, condition = () => false) => {
  const fn = () => {
    if (condition()) return
    callback()
    requestAnimationFrame(fn)
  }
  requestAnimationFrame(fn)
}

export const toFixed = (v, n = 1) => parseFloat(v.toFixed(n))
export const PXToFR = (val, width, sumFR) => {
  return toFixed(val / (width / sumFR))
}
export const PXToPCT = (val, width) => {
  return toFixed(val / (width / 100))
}

export const getChildren = node => {
  const slotElement = node.querySelector('slot')
  const children = slotElement ? slotElement.assignedElements({flatten: true}) : node.children
  return children || []
}

export const validGridUnits = ['fr', 'px', '%', 'em', 'auto', 'min-content', 'max-content', 'minmax']

function internalParseValue(str) {
  let val = parseFloat(str)
  return str.startsWith('minmax') ? str.slice(7, -1) : isNaN(val) ? null : val
}

function internalParseUnit(str) {
  return str.startsWith('minmax') ? 'minmax' : str.match(/[\d.\-+]*\s*(.*)/)[1] || ''
}
export function parseValue(str) {
  return str ? internalParseValue(str) : 0
}

export function parseUnit(str) {
  return str ? internalParseUnit(str) : 'fr'
}
