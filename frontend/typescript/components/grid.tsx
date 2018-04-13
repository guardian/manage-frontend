import React from 'react';
import { css , cx} from 'emotion'
import styled from 'react-emotion'
import { spanBreakpoints, row, cell } from '../styles/grid';
import { minWidth } from '../styles/breakpoints';
export interface ContainerProps {
  children: JSX.Element[] | JSX.Element
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
