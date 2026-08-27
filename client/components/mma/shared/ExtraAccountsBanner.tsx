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
import {
	extraAccountsPath,
	MAX_EXTRA_ACCOUNTS,
} from '../../../utilities/extraAccounts';

const containerCss = css`
	margin-top: ${space[10]}px;

	display: flex;
	flex-direction: column-reverse;
	border-radius: ${space[2]}px;
	background-color: ${palette.neutral[97]};

	${from.tablet} {
		flex-direction: row;
	}
`;

const copyContainerCss = css`
	padding: ${space[3]}px;
	padding-bottom: ${space[8]}px;

	h4 {
		${textSansBold20};
		margin: 0;
	}

	p {
		${textSans17};
		margin: ${space[1]}px 0 0 0;
	}
`;

const buttonCss = css`
	margin-top: ${space[5]}px;

	${until.tablet} {
		width: 100%;
	}
`;

// Placeholder image slot - a correctly sized SVG to be replaced with the
// final asset later.
const imagePlaceholderCss = css`
	display: block;
	align-self: center;
	width: 100%;
	aspect-ratio: 5 / 3;
	background-color: ${palette.neutral[86]};
	border-radius: 0 ${space[2]}px ${space[2]}px 0;

	${from.tablet} {
		height: 100%;
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
					As part of your Digital plus rewards, you can start sharing
					your subscription with up to{' '}
					<strong>{MAX_EXTRA_ACCOUNTS} other people</strong>.
				</p>
				<p>
					Each person can enjoy full access to our supporter extras
					through their own individual account.
				</p>
				<Button
					size="small"
					priority="primary"
					cssOverrides={buttonCss}
					onClick={() => navigate(extraAccountsPath())}
				>
					Start sharing
				</Button>
			</div>
			<div css={imagePlaceholderCss}>Placeholder</div>
		</div>
	);
};
