export const PREFIX = 'a-'

export function genArr(len, callback) {
  return Array.from({length: len}).map(callback)
}

export const getMaxColsOrMaxRows = (layout, colspan, rowspan) => {
  let maxCols = colspan
  let maxRows = rowspan
  for (const {x, y, w, h} of layout) {
    maxRows = Math.max(maxRows, (y - 1) + h)
    maxCols = Math.max(maxCols, (x - 1) + w)
  }
  return {
    maxCols,
    maxRows,
  }
}
export const generateCols = (cols) => {
  return genArr(cols, (_, i) => ({
    name: `${PREFIX}c-${i}`,
    value: 1,
    unit: 'fr',
  }))
}
export const generateRows = (rows) => {
  return genArr(rows, (_, i) => ({
    name: `${PREFIX}r-${i}`,
    value: 24,
    unit: 'px',
  }))
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

export const getColsOrRows = (layout, colspan, rowspan) => {
  const {maxCols, maxRows} = getMaxColsOrMaxRows(layout, colspan, rowspan)

  const rows = rowspan ? Math.max(maxRows, rowspan) : 0

  const rowsArr = generateRows(rows)
  const colsArr = generateCols(maxCols)

  return {
    colsArr,
    rowsArr,
  }
}

export const getLayoutData = () => {
  return [
    {key: 'header', x: 1, y: 1, w: 5, h: 1},
    {key: 'aside', x: 1, y: 2, w: 2, h: 2},
    {key: 'section', x: 3, y: 2, w: 2, h: 1},
    {key: 'article', x: 5, y: 2, w: 1, h: 1},
    {key: 'footer', x: 3, y: 3, w: 3, h: 1},
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

export const PXToFR = (val, width, sumFR) => {
  return parseFloat((val / (width / sumFR)).toFixed(1))
}
export const PXToPCT = (val, width) => {
  return parseFloat((val / (width / 100)).toFixed(1))
}