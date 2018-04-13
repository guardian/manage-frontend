import React from 'react';
import { css } from 'emotion'
import palette from '../colours'
import { Container } from './grid';

export interface MainProps {
  children: JSX.Element[] | JSX.Element
}

export const Main: React.SFC<MainProps> = ({ children }) => {
  return <div css={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'stretch',
    width: '100%'
  }}>
    <header css={{
      backgroundColor: palette.neutral.header,
      height: '100px',
      color: palette.neutral["1"],
    }}>this is the header</header>
    <main css={{ flex: '1' }}>
      {children}
    </main>
    <footer css={{
      backgroundColor:  palette.neutral["1"],
      color:  palette.neutral["7"],
    }}><Container>
      <h1>this is the footer</h1>
      <h1 css={{
        color: palette.yellow.medium
      }}>this is the fake footer</h1>
      </Container></footer>
  </div>
}
