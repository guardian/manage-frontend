import React from 'react';
import { css } from 'emotion'
import { neutral_1, neutral_8, nav_background_colour } from '../colours'
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
      backgroundColor: nav_background_colour,
      height: '100px',
      color: neutral_1,
    }}>this is the header</header>
    <main css={{ flex: '1' }}>
      {children}
    </main>
    <footer css={{
      backgroundColor: neutral_1,
      color: neutral_8,
    }}>this is the footer</footer>
  </div>
}
