import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';
import { Heading } from '../shared/Heading';

const buttonLayoutCss = css`
	text-align: right;
	> * + * {
		margin-left: ${space[3]}px;
	}
`;

export const MembershipCancellationLanding = () => {
	return (
		<>
			{' '}
			<Stack space={3}>
				<Heading>
					We're sorry to hear you're thinking of cancelling.
				</Heading>
				<p>Lorem Lipsum Loremm Lipsum</p>
				<Heading>
					We offer different ways for cancelling your membership
				</Heading>
				<Heading sansSerif>Call us</Heading>
				You can call one of our customer service...
				<CallCentreEmailAndNumbers //TODO collapse menu
					hideEmailAddress={true}
				/>
				<Heading sansSerif>Chat to us</Heading>
				You can chat with our customer service..
				<div css={buttonLayoutCss}>
					<Button icon={<SvgArrowRightStraight />} iconSide="right">
						Contact Us
					</Button>
				</div>
				<Heading sansSerif>Cancel online</Heading>
				You can cancel online Lorem Lipsum.
				<div css={buttonLayoutCss}>
					<Button icon={<SvgArrowRightStraight />} iconSide="right">
						Cancel online
					</Button>
				</div>
			</Stack>
		</>
	);
};
