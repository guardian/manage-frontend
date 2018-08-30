import { Globals } from "../globals";

declare var WEBPACK_BUILD: string;

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

const html: (
  _: {
    readonly body: string;
    readonly title: string;
    readonly src: string;
    readonly globals: Globals;
  }
) => string = ({ body, title, src, globals }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      ${insertGlobals(globals)}
      <link rel="shortcut icon" type="image/png" href="https://assets.guim.co.uk/images/favicons/48bc5564bb01b74cf7cd1a08ae0dd98e/32x32.ico" />
    </head>
    <body style="margin:0">
        ${
          globals.supportedBrowser
            ? ""
            : '<p style="text-align: center; margin: 0; padding: 10px; background-color: #ff4e36; color: #fff">Your browser isn\'t actively supported by manage.theguardian.com, for more information, see <a href="https://www.theguardian.com/help/recommended-browsers" style="color: #FFF; text-decoration: underline">our help page</a></p>'
        }
      <div id="app">${body}</div>
      </body>
      <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      </script>
      <script src="${src}?release=${WEBPACK_BUILD}"></script>
  </html>
`;

export default html;
