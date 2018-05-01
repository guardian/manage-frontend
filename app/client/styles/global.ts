import { injectGlobal } from "emotion";

const global = `
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  line-height: 1.5;
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
  font-weight: guss-font-weight(medium);
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
