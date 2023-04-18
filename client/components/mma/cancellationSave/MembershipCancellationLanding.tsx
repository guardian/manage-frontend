
import { css } from '@emotion/react';
import { from, space } from '@guardian/source-foundations';
import { Button , Stack } from '@guardian/source-react-components';
import { HelpCentreContactBox } from '../../helpCentre/HelpCentreEmailAndLiveChat';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';
import { Heading } from '../shared/Heading';
import { sectionSpacing } from '../switch/SwitchStyles';

//const navigate = useNavigate();

const chatButtonCss = css`
	margin-bottom: ${space[5]}px;
	margin-top: ${space[1]}px;
	${from.tablet} {
		margin-bottom: ${space[9]}px;
	}
`;

export const MembershipCancellationLanding = () => {
	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>
						We're sorry to hear you're thinking of cancelling
					</Heading>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>
						We offer different ways for canceling your membership
					</Heading>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<Heading sansSerif>Call us</Heading>
					<CallCentreEmailAndNumbers hideEmailAddress={true} />
				</Stack>
				<Stack space={4}>
					<Heading sansSerif>Chat to us</Heading>
					<HelpCentreContactBox
						title="Chat with us"
						subtitle="Chat with one of our customer service agents."
						iconId="chat-with-us"
					>
						{' '}
						<Button
							css={chatButtonCss}
							/*priority="secondary"
						onClick={() => {
							navigate('/help-centre/contact-us');
						}}*/
						>
							Contact Us
						</Button>
					</HelpCentreContactBox>
				</Stack>
				<Stack space={4}>
					<Heading sansSerif>Cancel online</Heading>
					You can cancel online...
				</Stack>
			</section>
		</>
	);
};
