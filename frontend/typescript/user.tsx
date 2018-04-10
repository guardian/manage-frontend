import React from 'react';
import { css } from 'emotion'
import ReactDOM from 'react-dom';
import { Main } from './components/main'

let element = <Main>
  <div css={{ color: 'hotpink' }}>Hello world!</div>
</Main>
ReactDOM.render(element, document.getElementById('root'));
