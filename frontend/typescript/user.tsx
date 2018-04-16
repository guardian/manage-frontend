import { css } from 'emotion'
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './components/main'

const element = <Main>
  <div css={{ color: 'hotpink' }}>Hello world!</div>
</Main>
// tslint:disable-next-line:no-expression-statement
ReactDOM.render(element, document.getElementById('root'));
