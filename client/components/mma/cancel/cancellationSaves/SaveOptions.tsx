import { css, ThemeProvider } from '@emotion/react';
import { palette, space } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import { Card } from '../../shared/Card';
import { Heading } from '../../shared/Heading';
import { MembershipBenefitsSection } from '../../shared/MembershipBenefits';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { RecurringSupporterBenefitsSection } from '../../shared/RecurringSupporterBenefits';
import { productTitleCss, sectionSpacing } from '../../switch/SwitchStyles';
import {
	buttonLayoutCss,
	cardHeaderDivCss,
	productSubtitleCss,
} from './SaveStyles';

export const SaveOptions = () => {
	const navigate = useNavigate();

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
						Are you sure you want to lose your exclusive benefits?
					</Heading>
				</section>
				<section css={sectionSpacing}>
					<Heading sansSerif>Keep your Membership</Heading>
				</section>
				Enjoy all of your exclusive extras. The new price has increased
				from XX to YY/ZZ.
				<Card>
					<Card.Header backgroundColor={palette.brand[600]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>Membership</h3>
							<p css={productSubtitleCss}>XY/Z</p>
						</div>
					</Card.Header>
					<Card.Section>
						<MembershipBenefitsSection />
						{/*todo: add  border border-top: 1px solid ${palette.neutral[86]}; */}
						<section css={sectionSpacing}>
							<div css={buttonLayoutCss}>
								<ThemeProvider
									theme={buttonThemeReaderRevenueBrand}
								>
									<Button>
										Keep my Membership for xx/yy
									</Button>
								</ThemeProvider>
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
									onClick={() => navigate('../switch-offer')}
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
					<Button
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						onClick={() => navigate('../confirm')}
					>
						Cancel membership
					</Button>
				</div>
			</section>
		</>
	);
};
