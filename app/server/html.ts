/**
 * https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */

const html: (
  _: {
    readonly body: string;
    readonly title: string;
    readonly src: string;
  }
) => string = ({ body, title, src }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="shortcut icon" type="image/png" href="https://assets.guim.co.uk/images/favicons/48bc5564bb01b74cf7cd1a08ae0dd98e/32x32.ico" />
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
      <script src="${src}"></script>
    </body>
  </html>
`;

export default html;
