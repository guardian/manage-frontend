import {
	Button,
	LinkButton,
	Stack,
	SvgCalendar,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import {
	headingCss,
	stackedButtonLeftLayoutCss,
	whatHappensNextCss,
} from '../cancel/cancellationSaves/SaveStyles';
import { Heading } from '../shared/Heading';
import {
	buttonCentredCss,
	iconListCss,
	sectionSpacing,
} from '../switch/SwitchStyles';

export const UpgradeSupportThankYou = () => {
	const navigate = useNavigate();

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<h2 css={headingCss}>
						Thank you for your continued support.
					</h2>
				</Stack>
				<Stack space={4}>
					<h2 css={headingCss}>Your new support</h2>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<Heading sansSerif>What happens next?</Heading>
					<ul css={[iconListCss, whatHappensNextCss]}>
						<li>
							<SvgEnvelope size="medium" />
							<span data-qm-masking="blocklist">
								We will send a confirmation email to you at{' '}
							</span>
						</li>
						<li>
							<SvgCalendar size="medium" />
							<span>
								This change will happen on your next billing
								date of
							</span>
						</li>
					</ul>
				</Stack>
			</section>
			<div css={stackedButtonLeftLayoutCss}>
				<Button
					priority="tertiary"
					onClick={() => navigate('/')}
					cssOverrides={buttonCentredCss}
				>
					Back to my account
				</Button>
				<LinkButton
					href="https://theguardian.com"
					cssOverrides={buttonCentredCss}
				>
					Continue to the Guardian
				</LinkButton>
			</div>
		</>
	);
};
