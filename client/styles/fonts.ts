/*
 * See here for Guardian font usage reference:
 * https://github.com/guardian/fonts
 */

const fontAssetsUrl = 'https://assets.guim.co.uk/static/frontend/fonts/';

export const fonts = `
/************* Guardian Headline *************/

@font-face {
	font-family: 'GH Guardian Headline';
	src: url('${fontAssetsUrl}guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-headline/latin1-not-hinted/GHGuardianHeadline-Medium.woff')
			format('woff');
	font-weight: 500;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'GH Guardian Headline';
	src: url('${fontAssetsUrl}guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-headline/latin1-not-hinted/GHGuardianHeadline-Bold.woff')
			format('woff');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}

/************* Guardian Text Egyptian *************/

@font-face {
	font-family: 'GuardianTextEgyptian';
	src: url('${fontAssetsUrl}guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Regular.woff')
			format('woff');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'GuardianTextEgyptian';
	src: url('${fontAssetsUrl}guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Bold.woff')
			format('woff');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}

/************* Guardian Text Sans *************/

@font-face {
	font-family: 'GuardianTextSans';
	src: url('${fontAssetsUrl}guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-textsans/latin1-not-hinted/GuardianTextSans-Regular.woff')
			format('woff');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}
@font-face {
	font-family: 'GuardianTextSans';
	src: url('${fontAssetsUrl}guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-textsans/latin1-not-hinted/GuardianTextSans-RegularItalic.woff')
			format('woff');
	font-weight: 400;
	font-style: italic;
	font-display: swap;
}
@font-face {
	font-family: 'GuardianTextSans';
	src: url('${fontAssetsUrl}guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-textsans/latin1-not-hinted/GuardianTextSans-Bold.woff')
			format('woff');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}
@font-face {
	font-family: 'GuardianTextSans';
	src: url('${fontAssetsUrl}guardian-textsans/noalts-not-hinted/GuardianTextSans-BoldItalic.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-textsans/latin1-not-hinted/GuardianTextSans-BoldItalic.woff')
			format('woff');
	font-weight: 700;
	font-style: italic;
	font-display: swap;
}

/************* Guardian Titlepiece *************/
@font-face {
	font-family: 'GT Guardian Titlepiece';
	src: url('${fontAssetsUrl}guardian-titlepiece/full-not-hinted/GTGuardianTitlepiece-Bold.woff2')
		format('woff2'),
		url('${fontAssetsUrl}guardian-titlepiece/full-not-hinted/GTGuardianTitlepiece-Bold.woff')
			format('woff');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}
`;

/*
	* unused font-face declarations:
	*
	*
************* Guardian Headline *************
@font-face {
	font-family: 'GH Guardian Headline';
	src: url('${fontAssetsUrl}guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-headline/latin1-not-hinted/GHGuardianHeadline-Light.woff')
			format('woff');
	font-weight: 300;
	font-style: normal;
	font-display: swap;
}
@font-face {
	font-family: 'GH Guardian Headline';
	src: url('${fontAssetsUrl}guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-headline/latin1-not-hinted/GHGuardianHeadline-LightItalic.woff')
			format('woff');
	font-weight: 300;
	font-style: italic;
	font-display: swap;
}
@font-face {
	font-family: 'GH Guardian Headline';
	src: url('${fontAssetsUrl}guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-headline/latin1-not-hinted/GHGuardianHeadline-MediumItalic.woff')
			format('woff');
	font-weight: 500;
	font-style: italic;
	font-display: swap;
}

************* Guardian Text Egyptian *************
@font-face {
	font-family: 'GuardianTextEgyptian';
	src: url('${fontAssetsUrl}guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-RegularItalic.woff')
			format('woff');
	font-weight: 400;
	font-style: italic;
	font-display: swap;
}
@font-face {
	font-family: 'GuardianTextEgyptian';
	src: url('${fontAssetsUrl}guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-BoldItalic.woff2')
			format('woff2'),
		url('${fontAssetsUrl}guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-BoldItalic.woff')
			format('woff');
	font-weight: 700;
	font-style: italic;
	font-display: swap;
}
*/
