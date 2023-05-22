import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { getMainPlan } from '../../../../../shared/productResponse';
import {
	getNewMembershipPrice,
	getOldMembershipPrice,
} from '../../../../utilities/membershipPriceRise';
import { Card } from '../../shared/Card';
import { Heading } from '../../shared/Heading';
import { MembershipBenefitsSection } from '../../shared/MembershipBenefits';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { RecurringSupporterBenefitsSection } from '../../shared/RecurringSupporterBenefits';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import {
	buttonCentredCss,
	buttonContainerCss,
	cardHeaderDivCss,
	cardSectionCss,
	headingCss,
	productSubtitleCss,
	productTitleCss,
	sectionSpacing,
} from './SaveStyles';

export const SaveOptions = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const membership = cancellationContext.productDetail;

	if (!membership) {
		return <Navigate to="/" />;
	}

	const mainPlan = getMainPlan(
		membership.subscription,
	) as PaidSubscriptionPlan;

	const oldPriceDisplay = `${mainPlan.currency}${getOldMembershipPrice(
		mainPlan,
	)}`;
	const newPriceDisplay = `${mainPlan.currency}${getNewMembershipPrice(
		mainPlan,
	)}`;
	const billingPeriod = mainPlan.billingPeriod;

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
					<h2 css={headingCss}>
						Are you sure you want to lose your exclusive benefits?
					</h2>
				</section>
				<section css={sectionSpacing}>
					<Heading sansSerif>Keep your Membership</Heading>
				</section>
				<p
					css={css`
						${textSans.medium()};
					`}
				>
					Enjoy all of your exclusive extras. The new price has
					increased from {oldPriceDisplay} to {newPriceDisplay}/
					{billingPeriod}.
				</p>
				<Card>
					<Card.Header backgroundColor={palette.brand[600]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>Membership</h3>
							<p css={productSubtitleCss}>
								{newPriceDisplay}/{billingPeriod}
							</p>
						</div>
					</Card.Header>
					<Card.Section>
						<MembershipBenefitsSection />
						<section css={[cardSectionCss, buttonContainerCss]}>
							<ThemeProvider
								theme={buttonThemeReaderRevenueBrand}
							>
								<Button
									cssOverrides={buttonCentredCss}
									size="small"
									onClick={() => navigate('../thank-you')}
								>
									Keep my Membership for {newPriceDisplay}/
									{billingPeriod}
								</Button>
							</ThemeProvider>
						</section>
					</Card.Section>
				</Card>
				<section css={sectionSpacing}>
					<Heading sansSerif>
						Stay a supporter at no extra cost
					</Heading>
				</section>
				<p
					css={css`
						${textSans.medium()};
					`}
				>
					You will lose access to some of your benefits, but will keep
					funding Guardian journalism.
				</p>
				<Card>
					<Card.Header backgroundColor={palette.brand[600]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>Monthly contribution</h3>
							<p css={productSubtitleCss}>
								{oldPriceDisplay}/{billingPeriod}
							</p>
						</div>
					</Card.Header>
					<Card.Section>
						<RecurringSupporterBenefitsSection />
						<section css={[cardSectionCss, buttonContainerCss]}>
							<ThemeProvider
								theme={buttonThemeReaderRevenueBrand}
							>
								<Button
									cssOverrides={buttonCentredCss}
									size="small"
									onClick={() =>
										navigate('../switch-offer', {
											state: { ...routerState },
										})
									}
								>
									Become a recurring contributor
								</Button>
							</ThemeProvider>
						</section>
					</Card.Section>
				</Card>
				<section css={sectionSpacing}>
					<Heading sansSerif>Cancel your membership</Heading>
					<p
						css={css`
							${textSans.medium()};
						`}
					>
						Please note if you cancel you will not be able to rejoin
						the Guardian Members scheme, as it’s now closed to new
						members
					</p>
					<div css={buttonContainerCss}>
						<Button
							cssOverrides={buttonCentredCss}
							priority="tertiary"
							size="small"
							onClick={() =>
								navigate('../confirm', {
									state: { ...routerState },
								})
							}
						>
							Cancel Membership
						</Button>
					</div>
				</section>
			</Stack>
		</>
	);
};
