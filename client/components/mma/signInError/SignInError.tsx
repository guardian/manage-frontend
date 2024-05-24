import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { conf } from '@/server/config';

const containerStyle = css`
	max-width: ${breakpoints.wide}px;
	margin: 0 auto;
	padding: ${space[12]}px 0;
	border-left: 1px solid ${neutral[86]};
	border-right: 1px solid ${neutral[86]};
	height: 100%;
`;

const wrapperStyle = css`
	margin: 0 10px;
	max-width: ${breakpoints.mobileLandscape}px;
	${from.tablet} {
		margin: 0 20px;
	}
`;

const headingStyle = css`
	${headline.medium({ fontWeight: 'bold' })};
	margin: 0;
	padding-bottom: ${space[4]}px;
	border-bottom: 1px solid ${neutral['86']};
`;

const grafStyle = css`
	${textSans.medium()};
	margin-top: ${space[4]}px;
	margin-bottom: ${space[4]}px;
`;

export const SignInError = () => {
	const domain =
		typeof window !== 'undefined' && window.guardian
			? window.guardian.domain
			: conf.DOMAIN;
	const signOutUrl = `https://profile.${domain}/signout?returnUrl=${encodeURIComponent(
		`https://manage.${domain}/`,
	)}`;

	return (
		<div css={containerStyle}>
			<section css={wrapperStyle}>
				<h1 css={headingStyle}>Sign in error</h1>
				<p css={grafStyle}>
					There's been a problem signing you in. Please sign in again
					to continue managing your account.
				</p>

				<LinkButton href={signOutUrl}>Continue</LinkButton>
			</section>
		</div>
	);
};
