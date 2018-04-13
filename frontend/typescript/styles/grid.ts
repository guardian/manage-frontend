import { css } from 'emotion'
import styled from 'react-emotion'
import { SomeBreakPoints, BreakpointQueries, minWidth } from './breakpoints';


const gutter = 20
const baseline = 12
const width = 60
const rowHeight = 36

export const calculateWidth = (n: number) => n * width + (n - 1) * gutter
export const calculateHeight = (n: number) => n * rowHeight + (n - 1) * baseline

export const span = (n: number) => ({
  width: `${calculateWidth(n)}px`
})

export interface BreakpointCSS {
    [key:string]: {
      width: string
    },
}

export const spanBreakpoints: (bs:SomeBreakPoints,qs: BreakpointQueries)=> BreakpointCSS = (bs, qs = minWidth) => {
    return Object.entries(bs).map(([k, v]) => {
    if (k in qs && v) {
      let q = qs[k]
      let w = span(v)
      return ({ [q]: w })
    }
    return {}
  }).reduce((a ,c) =>({...a,...c}),{})
}

