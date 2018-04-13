import { css , cx} from 'emotion'
import React from 'react';
import { minWidth } from '../styles/breakpoints';
import { cell, row, spanBreakpoints } from '../styles/grid';
 export interface ContainerProps {
  readonly children: ReadonlyArray<JSX.Element> | JSX.Element
}

export const Container : React.SFC<ContainerProps> = ({children}) => <div css={{
    position:'relative',
    margin:'auto',
    ...spanBreakpoints({mobile:1,wide:10},minWidth),
    ...row,
    ['&>*']:cell
  }}>
  {children}
  </div>
