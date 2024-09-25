import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { trackEvent } from '../../../../utilities/analytics';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';
import { hrefStyle } from '../cancellationConstants';

const cssBullet = (flexBasis: string = '50%') =>
	css({
		flexBasis,
		flexGrow: 1,
		listStyle: 'none',
		listStylePosition: 'inside',
		textIndent: '-0.6em',
		paddingLeft: '20px',
		'&::before': {
			display: 'inline-block',
			content: "'●'",
			marginRight: '0.6em',
		},
	});

const benefitsCss = css({
	margin: 0,
	padding: 0,
});

const clickHereToFindOutMoreAboutOurNewFeatures = (
	<a
		css={hrefStyle}
		href="https://www.theguardian.com/help/insideguardian/2018/may/15/introducing-live-and-discover-to-the-premium-tier-of-the-guardian-app"
		onClick={() => {
			trackEvent({
				eventCategory: 'href',
				eventAction: 'premium_features',
			});
		}}
	>
		click here to find out about our brand new features
	</a>
);

export const membershipCancellationFlowStart = () => (
	<>
		<div
			css={{
				backgroundColor: palette.neutral[93],
				padding: '10px 20px',
				marginBottom: '40px',
			}}
		>
			<h4
				css={{
					marginTop: '0',
					marginBottom: '10px',
				}}
			>
				If you cancel your Membership you will miss out on:
			</h4>
			<ul css={benefitsCss}>
				<li css={cssBullet()}>Access to events tickets</li>
				<li css={cssBullet()}>
					Exclusive emails from our membership editor
				</li>
				<li
					css={{
						...cssBullet('100%'),
						paddingTop: '5px',
					}}
				>
					Free access to the premium tier of the Guardian app -{' '}
					{clickHereToFindOutMoreAboutOurNewFeatures}
				</li>
			</ul>
		</div>
		<WithStandardTopMargin>
			<p
				css={{
					fontSize: '1rem',
					fontWeight: 500,
				}}
			>
				Your support means we can remain independent, open to all
				readers and empowered to hold those in power to account.
			</p>

			<p>
				Sorry to hear you are thinking of cancelling your membership.
				<br />
				Can you take a moment to tell us why?
			</p>
		</WithStandardTopMargin>
	</>
);
