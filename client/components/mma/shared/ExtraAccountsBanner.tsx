import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';

const containerCss = css`
	margin-top: ${space[10]}px;

	display: flex;
	gap: ${space[3]}px;
	flex-direction: row;
	justify-content: space-between;
	border-radius: ${space[2]}px;
	background-color: ${palette.neutral[97]};
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
`;

// Placeholder image slot - a correctly sized div to be replaced with the
// final asset later.
const imagePlaceholderCss = css`
	width: 160px;
	height: auto;
	aspect-ratio: 3 / 2;
	margin: ${space[3]}px;
	background-color: ${palette.neutral[86]};
	border-radius: ${space[2]}px;
	align-self: center;
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
