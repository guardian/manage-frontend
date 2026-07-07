import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';

export const standardAlternateFeedbackIntro =
	'Please share any further thoughts you have about cancelling — you can help us improve. Thank you.';

export const inOrderToImproveSubs =
	'In order to improve our subscription and supporter model, we’d love to know more about why you are thinking of cancelling.';

export const financialCircumstances = [
	'We understand that financial circumstances can change from time to time. Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. Once you’ve completed your cancellation below, we hope you’ll consider supporting us in the future.',
];

export const hrefStyle = {
	textDecoration: 'underline',
	color: palette.sport[300],
	':visited': { color: palette.sport[300] },
};

export const titleCss = css`
	${headlineBold24};
	margin: ${space[3]}px;

	${from.tablet} {
		${headlineBold28};
		margin: ${space[6]}px 0 ${space[3]}px;
	}
`;

export const bodyCss = css`
	${textSans15};
	margin: ${space[2]}px 0;

	${from.tablet} {
		${textSans17};
	}
`;

export const ctaContainerCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
	margin-top: ${space[6]}px;

	${from.tablet} {
		flex-direction: row;
	}
`;
