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
import { subHeadingCss } from '@/client/styles/headings';
import { NAV_LINKS } from '../../shared/nav/NavConfig';

const containerCss = css`
	display: flex;
	flex-direction: column-reverse;
	border-radius: ${space[2]}px;
	background-color: ${palette.neutral[97]};
	overflow: hidden;

	${from.tablet} {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 40%;
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

const imagePlaceholderCss = css`
	display: none;

	${from.tablet} {
		display: block;
		justify-self: end;
		width: auto;
		max-width: 100%;
		height: 0;
		min-height: 100%;
	}
`;

const mobileImagePlaceholderCss = css`
	display: block;
	width: 100%;
	height: auto;

	${from.tablet} {
		display: none;
	}
`;

const ExtraAccountsBannerPlaceholderMobile = () => (
	<svg
		css={mobileImagePlaceholderCss}
		width="500"
		height="300"
		viewBox="0 0 500 300"
		preserveAspectRatio="xMidYMid slice"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<rect width="500" height="300" fill={palette.neutral[86]} />
		<text x="16" y="32" fill={palette.neutral[7]} fontSize="16">
			Placeholder mobile
		</text>
	</svg>
);

const ExtraAccountsBannerPlaceholder = () => (
	<svg
		css={imagePlaceholderCss}
		width="400"
		height="300"
		viewBox="0 0 400 300"
		preserveAspectRatio="xMidYMid slice"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<rect width="400" height="300" fill={palette.neutral[86]} />
		<text x="16" y="32" fill={palette.neutral[7]} fontSize="16">
			Placeholder
		</text>
	</svg>
);

export const ExtraAccountsBanner = () => {
	const navigate = useNavigate();

	return (
		<>
			<h2 css={subHeadingCss}>Share your digital plus access</h2>
			<div css={containerCss}>
				<div css={copyContainerCss}>
					<h4>Extra accounts</h4>
					<p>
						As part of your Digital plus rewards, you can start
						sharing your subscription with up to{' '}
						<strong>three other people</strong>.
					</p>
					<p>
						Each person can enjoy full access to our supporter
						extras through their own individual account.
					</p>
					<Button
						size="small"
						priority="primary"
						cssOverrides={buttonCss}
						onClick={() => navigate(NAV_LINKS.extraAccounts.link)}
					>
						Start sharing
					</Button>
				</div>
				<ExtraAccountsBannerPlaceholderMobile />
				<ExtraAccountsBannerPlaceholder />
			</div>
		</>
	);
};
