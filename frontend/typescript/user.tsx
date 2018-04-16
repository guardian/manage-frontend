import { css } from 'emotion'
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './components/main'

const User = <Main>
  <div css={{ color: 'hotpink' }}>Hello world!</div>
</Main>

export default User

// tslint:disable-next-line:no-expression-statement
// ReactDOM.render(element, document.getElementById('root'));

