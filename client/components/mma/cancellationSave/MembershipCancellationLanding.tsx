import { css } from '@emotion/react';
import { from, headline, palette, space } from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';
import { Heading } from '../shared/Heading';
import { sectionSpacing } from '../switch/SwitchStyles';

const buttonLayoutCss = css`
	> * + * {
		margin-left: ${space[3]}px;
	}
`;

const headingCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	margin-top: 0;
	margin-bottom: 0;

	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
		span {
			display: block;
			color: ${palette.brand['500']};
		}
	}
`;

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
					<Heading sansSerif>Call us</Heading>
					You can call one of our customer service...
					<CallCentreEmailAndNumbers
						hideEmailAddress={true}
						collapsed
					/>
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
