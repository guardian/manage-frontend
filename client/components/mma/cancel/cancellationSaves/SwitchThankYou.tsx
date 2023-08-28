import {
	Button,
	LinkButton,
	Stack,
	SvgCalendar,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '../../../../../shared/dates';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { getMainPlan } from '../../../../../shared/productResponse';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '../../../../styles/ButtonStyles';
import { getOldMembershipPrice } from '../../../../utilities/membershipPriceRise';
import { Heading } from '../../shared/Heading';
import { iconListCss, sectionSpacing } from '../../switch/SwitchStyles';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '../CancellationContainer';
import { headingCss, whatHappensNextCss } from './SaveStyles';

export const SwitchThankYou = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const membership = cancellationContext.productDetail;
	const userEmailAddress = routerState?.user?.email;

	useEffect(() => {
		pageTitleContext.setPageTitle('Change your support');
	}, []);

	if (!membership) {
		return <Navigate to="/" />;
	}

	const mainPlan = getMainPlan(
		membership.subscription,
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
					<ul css={[iconListCss, whatHappensNextCss]}>
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
