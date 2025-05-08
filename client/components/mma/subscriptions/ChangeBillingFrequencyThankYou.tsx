import {
	Button,
	LinkButton,
	Stack,
	SvgCalendar,
	SvgEnvelope,
} from '@guardian/source/react-components';
import { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '../../../../shared/dates';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '../../../styles/ButtonStyles';
import {
	headingCss,
	iconListCss,
	sectionSpacing,
	whatHappensNextIconCss,
} from '../../../styles/GenericStyles';
import { getOldMembershipPrice } from '../../../utilities/pricingConfig/membershipPriceRise';
import { Heading } from '../shared/Heading';
import type {
	SubscriptionsContextInterface,
	SubscriptionsPageTitleInterface,
	SubscriptionsRouterState,
} from './SubscriptionsContainer';
import {
	SubscriptionsContext,
	SubscriptionsPageTitleContext,
} from './SubscriptionsContainer';

export const ChangeBillingFrequencyThankYou = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as SubscriptionsRouterState;
	const pageTitleContext: SubscriptionsPageTitleInterface = useContext(
		SubscriptionsPageTitleContext,
	);
	const subscriptionsContext: SubscriptionsContextInterface =
		useContext(SubscriptionsContext);
	const productDetail = subscriptionsContext.productDetail;
	const userEmailAddress =
		routerState?.productDetail.subscription.account?.accountName;

	useEffect(() => {
		if (pageTitleContext.setPageTitle) {
			pageTitleContext.setPageTitle('Change billing frequency');
		}
	}, [pageTitleContext]);

	if (!productDetail) {
		return <Navigate to="/" />;
	}

	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const contributionPriceDisplay = `${
		mainPlan.currency
	}${getOldMembershipPrice(mainPlan)}`;

	const billingPeriod = mainPlan.billingPeriod;
	const nextBillingDate = parseDate(
		mainPlan.chargedThrough ?? undefined,
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<h2 css={headingCss}>
						Thank you for supporting us with{' '}
						{contributionPriceDisplay}/{billingPeriod}
					</h2>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<Heading sansSerif>What happens next?</Heading>
					<ul css={[iconListCss, whatHappensNextIconCss]}>
						<li>
							<SvgEnvelope size="medium" />
							<span data-qm-masking="blocklist">
								We will send a confirmation email to you at{' '}
								{userEmailAddress}
							</span>
						</li>
						<li>
							<SvgCalendar size="medium" />
							<span>
								This change will happen on your next billing
								date of {nextBillingDate}.
							</span>
						</li>
					</ul>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<div css={stackedButtonLayoutCss}>
					<LinkButton
						href="https://theguardian.com"
						cssOverrides={buttonCentredCss}
					>
						Continue to the Guardian
					</LinkButton>
					<Button
						priority="tertiary"
						cssOverrides={buttonCentredCss}
						onClick={() => navigate('/')}
					>
						Back to my account
					</Button>
				</div>
			</section>
		</>
	);
};
