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
      <title>${title}</title>
      ${insertGlobals(globals)}
      <link rel="shortcut icon" type="image/png" href="https://assets.guim.co.uk/images/favicons/48bc5564bb01b74cf7cd1a08ae0dd98e/32x32.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>.async-hide { opacity: 0 !important} </style>
      <script>
        (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
        h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
        (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
        })(window,document.documentElement,'async-hide','dataLayer',4000,
        {'GTM-NZGXNBL':true});
      </script>
    </head>
    <body style="margin:0">
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
