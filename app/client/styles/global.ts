const global = `
html {
  box-sizing: border-box;
  font-family: "Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  font-variant-ligatures: common-ligatures;
  font-kerning: normal;
}

::selection {
    background: #ffe500;
    color: #121212;
}

h1,
h2,
h3 {
  -webkit-font-feature-settings: normal;
  -moz-font-feature-settings: "kern" 1, "liga" 1;
  font-feature-settings: "kern" 1, "liga" 1;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  color: inherit;
  font-weight: 500;
}

a {
  text-decoration: none;
}

img {
  border: none;
  display: block;
  max-width: 100%;
}

/**
* Reset address element defaults
*/
address {
  font-style: normal;
  word-break: keep-all;
}
`;
export default global;
