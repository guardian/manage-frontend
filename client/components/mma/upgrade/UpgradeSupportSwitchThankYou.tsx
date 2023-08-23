import {
	Button,
	LinkButton,
	Stack,
	SvgCalendar,
	SvgClock,
	SvgEnvelope,
} from '@guardian/source-react-components';
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

export const UpgradeSupportSwitchThankYou = () => {
	const navigate = useNavigate();

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<h2 css={headingCss}>
						Thank you for your continued support.
					</h2>
					You've increased your support - helping keep independent
					journalism in perpetuity. You have instant access to
					unlimited app access, ad-free reading and more.
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Heading sansSerif>What happens next?</Heading>
				<ul css={[iconListCss, whatHappensNextCss]}>
					<li>
						<SvgEnvelope size="medium" />
						<span data-qm-masking="blocklist">
							You will receive a confirmation email to
						</span>
					</li>
					<li>
						<SvgCalendar size="medium" />
						<span>
							Your first billing date is today and you will be
							charged
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
			<section>
				<Stack space={6}>
					<div css={sectionSpacing}>
						<div css={stackedButtonLayoutCss}>
							<div>
								<Button
									priority="tertiary"
									cssOverrides={buttonCentredCss}
									onClick={() => navigate('/')}
								>
									Back to my account
								</Button>
								<LinkButton href="https://www.theguardian.com/">
									Continue reading the Guardian
								</LinkButton>
							</div>
						</div>
					</div>
				</Stack>
			</section>
		</>
	);
};
