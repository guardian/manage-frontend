import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';

const containerCss = css`
	margin-top: ${space[10]}px;

	display: flex;
	gap: ${space[3]}px;
	flex-direction: column-reverse;
	justify-content: space-between;
	border-radius: ${space[2]}px;
	background-color: ${palette.neutral[97]};

	${from.tablet} {
		flex-direction: row;
	}
`;

const copyContainerCss = css`
	padding: ${space[3]}px;
	padding-bottom: ${space[6]}px;

	h4 {
		${textSansBold20};
		margin: 0;
	}

	p {
		${textSans17};
		margin: 0;
	}
`;

const buttonCss = css`
	margin-top: ${space[5]}px;

	${until.tablet} {
		width: 100%;
	}
`;

// Placeholder image slot - a correctly sized div to be replaced with the
// final asset later.
const imagePlaceholderCss = css`
	width: 100%;
	aspect-ratio: 5 / 3;
	background-color: ${palette.neutral[86]};
	border-radius: ${space[2]}px;
	align-self: center;

	${from.tablet} {
		flex: 1;
		max-width: 250px;
		aspect-ratio: 4 / 3;
	}
`;

export const ExtraAccountsBanner = () => {
	const navigate = useNavigate();

	return (
		<div css={containerCss}>
			<div css={copyContainerCss}>
				<h4>Extra accounts</h4>
				<p>
					Share your subscription with up to <strong>3 people</strong>
					.
				</p>
				<Button
					size="small"
					priority="primary"
					cssOverrides={buttonCss}
					onClick={() => navigate('/extra-accounts')}
				>
					Start sharing
				</Button>
			</div>
			<div css={imagePlaceholderCss} />
		</div>
	);
};
