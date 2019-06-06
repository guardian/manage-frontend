const html: (
  _: {
    readonly body: string;
    readonly title: string;
  }
) => string = ({ body, title }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <link rel="shortcut icon" type="image/png" href="https://assets.guim.co.uk/images/favicons/46bd2faa1ab438684a6d4528a655a8bd/32x32.ico" />
    </head>
    <body>
      <div id="app">${body}</div>
    </body>
  </html>
`;

export default html;
