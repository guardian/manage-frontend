import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { Card } from '../../shared/Card';
import { Heading } from '../../shared/Heading';
import { MembershipBenefitsSection } from '../../shared/MembershipBenefits';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { RecurringSupporterBenefitsSection } from '../../shared/RecurringSupporterBenefits';
import { productTitleCss, sectionSpacing } from '../../switch/SwitchStyles';
import { buttonLayoutCss } from './SaveStyles';

export const SwitchingOptions = () => {
	const cardHeaderDivCss = css`
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	`;
	const productSubtitleCss = css`
		${textSans.medium({ fontWeight: 'bold' })};
		color: ${palette.neutral[100]};
		margin: 0;
		max-width: 20ch;
	`;

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: '' },
					{ title: 'Offer', isCurrentStep: true },
					{ title: '' },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<Stack space={4}>
				<section css={sectionSpacing}>
					<Heading>
						Before you go, would you consider different support
						options
					</Heading>
				</section>
				<section css={sectionSpacing}>
					<Heading sansSerif>
						Continue your membership at X per month
					</Heading>
				</section>
				You will keep your current set of benefits
				<Card>
					<Card.Header backgroundColor={palette.brand[600]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>Membership</h3>
							<p css={productSubtitleCss}>XY/Z</p>
						</div>
					</Card.Header>
					<Card.Section>
						<MembershipBenefitsSection />
						<section css={sectionSpacing}>
							<div css={buttonLayoutCss}>
								<Button
									icon={<SvgArrowRightStraight />}
									iconSide="right"
								>
									Continue your membership
								</Button>
							</div>
						</section>
					</Card.Section>
				</Card>
				<section css={sectionSpacing}>
					<Heading sansSerif>
						Continue your membership at X per month
					</Heading>
				</section>
				You will still be able to enjoy uninterrupted reading and
				receive the supporter newsletter.
				<Card>
					<Card.Header backgroundColor={palette.brand[600]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>Recurring supporter</h3>
							<p css={productSubtitleCss}>XY/Z</p>
						</div>
					</Card.Header>
					<Card.Section>
						<RecurringSupporterBenefitsSection />
						<section css={sectionSpacing}>
							<div css={buttonLayoutCss}>
								<Button
									icon={<SvgArrowRightStraight />}
									iconSide="right"
								>
									Become a recurring supporter
								</Button>
							</div>
						</section>
					</Card.Section>
				</Card>
				<section css={sectionSpacing}>
					<Heading sansSerif>Cancel your membership</Heading>
					Copy to say that you cannot become a member again once you
					have cancelled.
				</section>
			</Stack>
			<section css={sectionSpacing}>
				<div css={buttonLayoutCss}>
					<Button icon={<SvgArrowRightStraight />} iconSide="right">
						Cancel membership
					</Button>
				</div>
			</section>
		</>
	);
};
