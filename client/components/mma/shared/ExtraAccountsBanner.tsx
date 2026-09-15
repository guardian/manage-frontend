import { css } from '@emotion/react';
import {
	from,
	space,
	textSans17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import { subHeadingCss } from '@/client/styles/headings';
import { useWindowWidth } from '@/client/utilities/hooks/useWindowWidth';
import { NAV_LINKS } from '../../shared/nav/NavConfig';

const containerCss = css`
	display: flex;
	flex-direction: column-reverse;
	border-radius: ${space[2]}px;
	background-color: #e8f2ef;
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

const imageCss = css`
	display: block;
	width: 100%;
	height: auto;

	${from.tablet} {
		justify-self: end;
		align-self: center;
	}
`;

export const ExtraAccountsBanner = () => {
	const navigate = useNavigate();
	const { windowWidthIsGreaterThan } = useWindowWidth();

	const isTablet = windowWidthIsGreaterThan('tablet');

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
				<img
					css={imageCss}
					src={
						isTablet
							? 'https://i.guim.co.uk/img/media/1f23d2c2d0859f71c8ff64f294a4e08382550128/0_0_1228_920/1228.png?width=1228&quality=100&s=1d33811b97b975851bc9f78f12d87996'
							: 'https://i.guim.co.uk/img/media/3800c848df194784ad2350f12b41add46fed3c6d/0_0_1472_848/1472.png?width=1228&quality=100&s=618f6024688f0cf68cb18e0425c7bb11'
					}
				/>
			</div>
		</>
	);
};
