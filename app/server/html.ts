import { Globals } from "../shared/globals";

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
      <link rel="shortcut icon" type="image/png" href="https://assets.guim.co.uk/images/favicons/46bd2faa1ab438684a6d4528a655a8bd/32x32.ico" />
      <script src="https://js.stripe.com/v3/" async></script>
    </head>
    <body style="margin:0">
        ${
          globals.supportedBrowser
            ? ""
            : '<p style="text-align: center; margin: 0; padding: 10px; background-color: #005689; color: #fff">manage.theguardian.com is not optimised for your current browser, for more information, see <a href="https://www.theguardian.com/help/recommended-browsers" style="color: #FFF; text-decoration: underline">our list of recommended browsers</a></p>'
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
