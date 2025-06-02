import {
	headlineBold14Object,
	textEgyptian14Object,
} from '@guardian/source/foundations';

const brazeOverrides = `
	body .ab-feed {
		border-radius: 0;
		box-shadow: none;
		background-color: transparent;
	}
	body .ab-feed .ab-feed-body {
		padding: 0;
		border: 0;
	}
	.ab-feed-buttons-wrapper {
		display: none;
	}
`;

export const global = `
html {
  box-sizing: border-box;
  font-family: "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
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
  color: inherit;
  font-weight: 500;
  font-family: ${textEgyptian14Object.fontFamily};
}

h1 {
  font-family: ${headlineBold14Object.fontFamily};
}


a {
  text-decoration: none;
}

img {
  border: none;
  display: block;
  max-width: 100%;
}

p {
  margin-top: 0;
  margin-bottom: 1.125rem;
}

/**
* Reset address element defaults
*/
address {
  font-style: normal;
  word-break: keep-all;
}
${brazeOverrides}
`;
