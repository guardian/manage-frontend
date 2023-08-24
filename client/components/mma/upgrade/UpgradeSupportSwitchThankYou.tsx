import {
	Button,
	LinkButton,
	Stack,
	SvgCalendar,
	SvgClock,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import {
	headingCss,
	stackedButtonLayoutCss,
	whatHappensNextCss,
} from '../cancel/cancellationSaves/SaveStyles';
import { Heading } from '../shared/Heading';
import { SwitchSignInImage } from '../switch/complete/SwitchSignInImage';
import { buttonCentredCss, iconListCss } from '../switch/SwitchStyles';
import {
	sectionSpacing,
	signInContentContainerCss,
	signInCss,
	signInHeadingCss,
	signInParaCss,
} from './UpgradeStyles';
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

export const UpgradeSupportSwitchThankYou = () => {
	const upgradeSupportContext = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const navigate = useNavigate();
	const userEmailAddress = upgradeSupportContext.user;

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<h2 css={headingCss}>
						Thank you for supporting us with{' '}
						contributionPriceDisplay/billingPeriod
					</h2>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Heading sansSerif>What happens next?</Heading>
				<ul css={[iconListCss, whatHappensNextCss]}>
					<li>
						<SvgEnvelope size="medium" />
						<span data-qm-masking="blocklist">
							You will receive a confirmation email to{' '}
							<> {userEmailAddress} </>
						</span>
					</li>
					<li>
						<SvgCalendar size="medium" />
						<span>
							Your first billing date is today and you will be
							charged {upgradeSupportContext.mainPlan.currency}{' '}
							amount payable today , your ongoing{' '}
							{upgradeSupportContext.mainPlan.billingPeriod}{' '}
							payment will be{' '}
							{upgradeSupportContext.mainPlan.currency}next
							payment amount
						</span>
					</li>
					<li>
						<SvgClock size="medium" />
						<span>
							Your new support will start today. It can take up to
							an hour for your support to be activated
						</span>
					</li>
				</ul>
			</section>
			<section>
				<div css={signInCss}>
					<SwitchSignInImage />
					<div css={signInContentContainerCss}>
						<h2 css={signInHeadingCss}>
							Sign in on all your devices
						</h2>
						<p css={signInParaCss}>
							To access your exclusive extras on our website and
							app, please sign in. It takes less than a minute.
						</p>
					</div>
				</div>
			</section>
			<section css={sectionSpacing}>
				<div css={stackedButtonLayoutCss}>
					<LinkButton
						href="https://theguardian.com"
						cssOverrides={buttonCentredCss}
					>
						Continue to the Guardian
					</LinkButton>
					<Button
						priority="tertiary"
						cssOverrides={buttonCentredCss}
						onClick={() => navigate('/')}
					>
						Back to my account
					</Button>
				</div>
			</section>
		</>
	);
};
