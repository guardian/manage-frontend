const html: (
  _: {
    readonly body: string;
    readonly title: string;
    readonly scripts: string[];
  }
) => string = ({ body, title, scripts }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      ${scripts
        .map(url => `<link rel="preload" href="${url}" as="script">`)
        .join("\n")}
      <link rel="shortcut icon" type="image/png" href="https://assets.guim.co.uk/images/favicons/46bd2faa1ab438684a6d4528a655a8bd/32x32.ico" />
      <script>
        // we use the window.guardian.polyfilled to identify whether polyfill.io has run
        window.guardian = {
          polyfilled: false
        };
        // this is a global that's called at the bottom of the pf.io response,
        // once the polyfills have run. This may be useful for debugging.
        // mainly to support browsers that don't support async=false or defer
        function guardianPolyfilled() {
            try {
                window.guardian.polyfilled = true;
                window.guardian.onPolyfilled();
            } catch (e) {};
        }
        (function() {
            var firstScript = document.scripts[0];
            [${scripts.map(script => JSON.stringify(script))}].forEach(url => {
                if ('async' in firstScript) {
                    // modern browsers
                    var script = document.createElement('script');
                    script.async = false;
                    script.src = url;
                    if (document.head) {
                        document.head.appendChild(script);
                    }
                } else {
                    // fall back to defer
                    document.write('<script src="' + url + '" defer></' + 'script>');
                }
            });
        })();
      </script>
      </head>
    <body>
      <div id="app">${body}</div>
    </body>
  </html>
`;

export default html;
