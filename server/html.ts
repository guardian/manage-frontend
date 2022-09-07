import { Globals } from '../shared/globals';

declare let WEBPACK_BUILD: string;

/**
 * https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */

const insertGlobals = (globals: Globals) => {
	return `<script>
  window.guardian = ${JSON.stringify(globals)}
  </script>`;
};

const html: (_: {
	readonly title: string;
	readonly src: string;
	readonly globals: Globals;
}) => string = ({ title, src, globals }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>

      ${insertGlobals(globals)}

      <link rel="shortcut icon" type="image/png" href="https://assets.guim.co.uk/images/favicons/46bd2faa1ab438684a6d4528a655a8bd/32x32.ico" />
    </head>
    <body style="margin:0">
      <div id="app"></div>
      </body>
      <script src="${src}?release=${WEBPACK_BUILD}"></script>
      
  </html>
`;

export default html;
