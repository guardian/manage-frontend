import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';
import { Heading } from '../shared/Heading';
import { sectionSpacing } from '../switch/SwitchStyles';

const buttonLayoutCss = css`
	text-align: right;
	> * + * {
		margin-left: ${space[3]}px;
	}
`;

export const MembershipCancellationLanding = () => {
	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<h1>We're sorry to hear you're thinking of cancelling.</h1>
					Lorem Lipsum. Lorem Lipsum. Lorem Lipsum.
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<h1>We offer different ways for cancelling your membership</h1>
			</section>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<Heading sansSerif>Call us</Heading>
					<CallCentreEmailAndNumbers //TO DO collapse menu
						hideEmailAddress={true}
					/>
				</Stack>
				<section>
					<Stack space={4}>
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
				<section>
					<Stack space={4}>
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
			</section>
		</>
	);
};
