import { css, ThemeProvider } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import type { PaidSubscriptionPlan } from '../../../../../../shared/productResponse';
import { getMainPlan } from '../../../../../../shared/productResponse';
import { getBillingPeriodAdjective } from '../../../../../../shared/productTypes';
import {
	buttonCentredCss,
	buttonContainerCss,
} from '../../../../../styles/ButtonStyles';
import {
	headingCss,
	productTitleCss,
	sectionSpacing,
} from '../../../../../styles/GenericStyles';
import {
	getNewMembershipPrice,
	getOldMembershipPrice,
} from '../../../../../utilities/pricingConfig/membershipPriceRise';
import { benefitsConfiguration } from '../../../shared/benefits/BenefitsConfiguration';
import { BenefitsSection } from '../../../shared/benefits/BenefitsSection';
import { Card } from '../../../shared/Card';
import { Heading } from '../../../shared/Heading';
import { ProgressStepper } from '../../../shared/ProgressStepper';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../../CancellationContainer';
import { CancellationContext } from '../../CancellationContainer';
import {
	cardHeaderDivCss,
	cardSectionCss,
	productSubtitleCss,
} from './SaveStyles';

const NewPriceIcon = () => {
	return (
		<div
			css={css`
				${textSans.xsmall({ fontWeight: 'bold' })};
				color: ${palette.sport[300]};
				background-color: ${palette.neutral[100]};
				border: 1px solid ${palette.sport[300]};
				border-radius: 19px;
				padding: 0 ${space[2]}px;
				margin-left: ${space[3]}px;

				${from.tablet} {
					position: absolute;
					top: -10px;
				}
			`}
		>
			New price
		</div>
	);
};

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
	const billingPeriod = mainPlan.billingPeriod;
	const monthlyOrAnnual = getBillingPeriodAdjective(billingPeriod);

	const oldPriceDisplay = `${mainPlan.currency}${getOldMembershipPrice(
		mainPlan,
	)}`;
	const newPriceDisplay = `${mainPlan.currency}${getNewMembershipPrice(
		mainPlan,
	)}`;

	return (
		<>
			<ProgressStepper
				steps={[
					{ title: 'Details' },
					{ title: 'Options', isCurrentStep: true },
					{ title: 'Confirmation' },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
					max-width: 350px;
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
					Enjoy all of your exclusive benefits. The new price has
					increased from {oldPriceDisplay}/{billingPeriod} to{' '}
					{newPriceDisplay}/{billingPeriod}.
				</p>
				<Card>
					<Card.Header backgroundColor={palette.sport[300]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>Membership</h3>
							<div
								css={css`
									${until.tablet} {
										display: flex;
										flex-direction: column-reverse;
									}
								`}
							>
								<NewPriceIcon />
								<p css={productSubtitleCss}>
									{newPriceDisplay}/{billingPeriod}
								</p>
							</div>
						</div>
					</Card.Header>
					<Card.Section>
						<BenefitsSection
							benefits={benefitsConfiguration['membership']}
						/>
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
					<Card.Header backgroundColor={palette.brand[400]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>
								{monthlyOrAnnual} contribution
							</h3>
							<p css={productSubtitleCss}>
								{oldPriceDisplay}/{billingPeriod}
							</p>
						</div>
					</Card.Header>
					<Card.Section>
						<BenefitsSection
							benefits={benefitsConfiguration['contributions']}
						/>
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
					<Heading sansSerif>Cancel your Membership</Heading>
					<p
						css={css`
							${textSans.medium()};
						`}
					>
						Please note if you cancel you will not be able to rejoin
						the Guardian Members scheme, as it’s now closed to new
						Members
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
