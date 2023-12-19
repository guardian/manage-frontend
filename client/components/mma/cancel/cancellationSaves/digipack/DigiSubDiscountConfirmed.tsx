import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	LinkButton,
	Stack,
	SvgCalendar,
	SvgEnvelope,
	SvgGift,
} from '@guardian/source-react-components';
import { captureException } from '@sentry/browser';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
} from '@/client/components/mma/cancel/CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '@/client/components/mma/cancel/CancellationContainer';
import { linkCss } from '@/client/components/mma/upgrade/UpgradeSupportStyles';
import { GenericErrorScreen } from '@/client/components/shared/GenericErrorScreen';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '@/client/styles/ButtonStyles';
import { formatAmount } from '@/client/utilities/utils';
import { DATE_FNS_LONG_OUTPUT_FORMAT, parseDate } from '@/shared/dates';
import type { PaidSubscriptionPlan } from '@/shared/productResponse';
import { getMainPlan } from '@/shared/productResponse';
import {
	headingCss,
	iconListCss,
	listWithDividersCss,
	whatHappensNextIconCss,
} from '../../../../../styles/GenericStyles';
import type { DigisubCancellationRouterState } from './DigiSubThankYouOffer';

export const DigiSubDiscountConfirmed = () => {
	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const location = useLocation();
	const routerState = location.state as DigisubCancellationRouterState;
	const digiSub = cancellationContext.productDetail;

	const mainPlan = getMainPlan(digiSub.subscription) as PaidSubscriptionPlan;

	const currencySymbol = mainPlan.currency;
	const discountPeriod = routerState.discountPeriod;
	const discountedPrice = routerState.discountedPrice;
	const newPrice =
		(digiSub.subscription.nextPaymentPrice ?? mainPlan.price) / 100;

	const nextBillingDate = parseDate(
		digiSub.subscription.nextPaymentDate ?? undefined,
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

	const userEmailAddress = routerState?.user?.email;

	useEffect(() => {
		pageTitleContext.setPageTitle('Your subscription');
	}, []);

	if (!discountedPrice) {
		const message = 'No discounted price found in router state';
		captureException(message);
		return <GenericErrorScreen loggingMessage={message} />;
	}

	return (
		<>
			<section
				css={css`
					padding-top: ${space[4]}px;
					margin-bottom: 32px;
					${textSans.medium()};
				`}
			>
				<h2 css={headingCss}>Discount confirmed</h2>
				Thank you for continuing to fund our journalism.
			</section>

			<section
				css={css`
					margin-top: 20px;
					border-bottom: 1px solid ${palette.neutral[86]};
					border-top: 1px solid ${palette.neutral[86]};
					padding-bottom: ${space[5]}px;
				`}
			>
				<Stack space={5}>
					<ul
						css={[
							iconListCss,
							listWithDividersCss,
							whatHappensNextIconCss,
						]}
					>
						<li>
							<SvgEnvelope size="medium" />
							<span>
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Check your email
								</strong>
								<br />
								We have sent you a discount confirmation to{' '}
								{userEmailAddress}
							</span>
						</li>
						<li>
							<SvgGift size="medium" />
							<span>
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									25% discount for {discountPeriod}
								</strong>
								<br />
								You’ll pay {currencySymbol}
								{formatAmount(discountedPrice)} per{' '}
								{mainPlan.billingPeriod} for {discountPeriod},
								then {currencySymbol}
								{formatAmount(newPrice)} per{' '}
								{mainPlan.billingPeriod}
							</span>
						</li>
						<li>
							<SvgCalendar size="medium" />
							<span data-qm-masking="blocklist">
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Your billing date
								</strong>
								<br />
								{nextBillingDate}
							</span>
						</li>
					</ul>
				</Stack>
			</section>
			<section
				css={css`
					margin-top: 32px;
				`}
			>
				<div css={stackedButtonLayoutCss}>
					<LinkButton
						href="https://theguardian.com"
						cssOverrides={buttonCentredCss}
					>
						Go to Guardian homepage
					</LinkButton>
					<div css={linkCss}>
						<a href="/">Back to account overview </a>
					</div>
				</div>
			</section>
		</>
	);
};
