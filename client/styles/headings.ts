import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';

export const subHeadingCss = css`
	${headlineBold24};
	margin-top: ${space[8]}px;
	margin-bottom: ${space[4]}px;

	${from.tablet} {
		${headlineBold28};
		margin-top: ${space[10]}px;
		margin-bottom: ${space[5]}px;
	}
`;

export const subHeadingWithInformationCss = css`
	${headlineBold24};
	margin-top: ${space[8]}px;
	margin-bottom: ${space[2]}px;

	${from.tablet} {
		${headlineBold28};
		margin-top: ${space[10]}px;
		margin-bottom: ${space[3]}px;
	}
`;

export const subHeadingInformationTextCss = css`
	${textSans15};
	margin-bottom: ${space[4]}px;

	${from.tablet} {
		${textSans17};
		margin-bottom: ${space[5]}px;
	}
`;
