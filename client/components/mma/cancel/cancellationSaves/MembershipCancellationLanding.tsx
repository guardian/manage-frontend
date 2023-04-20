import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { CallCentreEmailAndNumbers } from '../../../shared/CallCenterEmailAndNumbers';
import { Heading } from '../../shared/Heading';
import { sectionSpacing } from '../../switch/SwitchStyles';
import { buttonLayoutCss, headingCss } from './SaveStyles';

export const MembershipCancellationLanding = () => {
	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading>
						We're sorry to hear you're thinking of cancelling.
					</Heading>
					<p>Lorem Lipsum Loremm Lipsum</p>
					<h2 css={headingCss}>
						We offer different ways for cancelling your membership
					</h2>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>Call us</Heading>
					You can call one of our customer service...
					<CallCentreEmailAndNumbers
						hideEmailAddress={true}
						collapsed
					/>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>Chat to us</Heading>
					You can chat with our customer service..
					<div css={buttonLayoutCss}>
						<Button
							icon={<SvgArrowRightStraight />}
							iconSide="right"
						>
							Contact Us
						</Button>
					</div>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>Cancel online</Heading>
					You can cancel online Lorem Lipsum.
					<div css={buttonLayoutCss}>
						<Button
							icon={<SvgArrowRightStraight />}
							iconSide="right"
						>
							Cancel online
						</Button>
					</div>
				</Stack>
			</section>
		</>
	);
};
