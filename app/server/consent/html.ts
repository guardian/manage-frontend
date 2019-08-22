import { CommonGlobals } from "../../shared/globals";

const insertGlobals = (globals: CommonGlobals) => {
  return `<script>
  window.guardian = ${JSON.stringify(globals)}
  </script>`;
};

const fontLoaderClassName = "gu-font-loader-iframe";
const html: (
  _: {
    readonly body: string;
    readonly title: string;
    readonly scripts: string[];
    readonly globals: CommonGlobals;
  }
) => string = ({ body, title, scripts, globals }) => `
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
      ${insertGlobals(globals)}
      <script>
        // we use the window.guardian.polyfilled to identify whether polyfill.io has run.
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
      <script type="text/javascript">
        (function(window, document) {
          var head = document.getElementsByTagName('head')[0];

          var useFont = function(font) {
            if (font.css) {
              var style = document.createElement('style');

              style.innerHTML = font.css;

              head.appendChild(style);
            }
          };

          var loadFonts = function() {
            var iframe = document.getElementById('${fontLoaderClassName}');

            // add iframe and wait for message
            window.addEventListener('message', function(e) {
              if (
                e &&
                e.data &&
                e.data.name &&
                e.data.name === 'guardianFonts' &&
                e.data.fonts &&
                e.source === iframe.contentWindow
              ) {
                e.data.fonts.forEach(useFont);
              }
            });

            document.body.appendChild(iframe);
          };

          document.addEventListener('DOMContentLoaded', loadFonts);
        })(window, document);
      </script>
      </head>
    <body>
      <div id="app">${body}</div>
      <iframe id="${fontLoaderClassName}" style="display:none" src="https://www.theguardian.com/font-loader"></iframe>
    </body>
  </html>
`;

export default html;
