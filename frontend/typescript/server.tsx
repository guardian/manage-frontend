import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import User from './user';
import html from './html';
import { Main } from './components/main';
import { renderStylesToString } from 'emotion-server'

const port = 3000;
const server = express();

server.get('/', (req, res) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderStylesToString(renderToString(<Main>
    <div css={{ color: 'hotpink' }}>Hello world!</div>
  </Main>))
  const title = 'Server side Rendering with Styled Components';

  res.send(
    html({
      body,
      title
    })
  );
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);