declare var WEBPACK_BUILD: string;

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
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <link rel="preload" href="${src}" as="script">
      <link rel="shortcut icon" type="image/png" href="https://assets.guim.co.uk/images/favicons/46bd2faa1ab438684a6d4528a655a8bd/32x32.ico" />
    </head>
    <body>
      <div id="app">${body}</div>
      <script src="${src}?release=${WEBPACK_BUILD}"></script>
    </body>
  </html>
`;

export default html;
