import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	Stack,
	SvgClock,
	SvgCreditCard,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate } from 'react-router';
import {
	dateAddMonths,
	dateAddYears,
	dateString,
} from '../../../../shared/dates';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import { sectionSpacing } from '../../../styles/spacing';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { SwitchOffsetPaymentIcon } from '../shared/assets/SwitchOffsetPaymentIcon';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { Card } from '../shared/Card';
import { CardDisplay } from '../shared/CardDisplay';
import { DirectDebitDisplay } from '../shared/DirectDebitDisplay';
import { Heading } from '../shared/Heading';
import { PaypalDisplay } from '../shared/PaypalDisplay';
import { SepaDisplay } from '../shared/SepaDisplay';
import { SupporterPlusBenefitsToggle } from '../shared/SupporterPlusBenefits';
import type { SwitchContextInterface } from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';

// TODO: this is copied from SwitchOptions, share it
const productTitleCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;
	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
`;

const whatHappensNextTextCss = css`
	margin-left: 0.75rem;
	width: 100%;
`;

interface PreviewResponse {
	amountPayableToday: number;
	contributionRefundAmount: number;
	supporterPlusPurchaseAmount: number;
}

export const SwitchReview = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const productDetail = switchContext.productDetail;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);
	const supporterPlusTitle = `${monthlyOrAnnual} + extras`;
	// ToDo: hardcoding this for now; need to find out where to get this from for each currency
	const monthlyThreshold = 10;
	const annualThreshold = 95;

	const threshold =
		monthlyOrAnnual == 'Monthly' ? monthlyThreshold : annualThreshold;
	const newAmount = Math.max(threshold, mainPlan.price / 100);

	// ToDo: the API could return the next payment date
	const nextPayment = dateString(
		monthlyOrAnnual == 'Monthly'
			? dateAddMonths(new Date(), 1)
			: dateAddYears(new Date(), 1),
		'd MMMM',
	);

	const {
		data: previewResponse,
		loadingState,
	}: { data: PreviewResponse | null; loadingState: LoadingState } =
		useAsyncLoader(
			() =>
				fetch(
					`/api/product-move/${productDetail.subscription.subscriptionId}`,
					{
						method: 'POST',
						body: JSON.stringify({
							price: newAmount,
							preview: true,
						}),
						headers: {
							'Content-Type': 'application/json',
						},
					},
				),
			JsonResponseHandler,
		);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen loggingMessage={false} />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView />;
	}
	if (previewResponse == null) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<section>
						<Heading sansSerif>Review change</Heading>
						<p
							css={css`
								${textSans.medium()};
							`}
						>
							You will now support us with {mainPlan.currency}
							{newAmount} every {mainPlan.billingPeriod}, giving
							you exclusive supporter extras, including unlimited
							reading in our news app
						</p>
					</section>
					<Heading sansSerif>Your new support</Heading>
					<Card>
						<Card.Header backgroundColor={palette.brand[500]}>
							<h3 css={productTitleCss}>{supporterPlusTitle}</h3>
						</Card.Header>
						<Card.Section>
							<p
								css={css`
									${textSans.medium()};
									margin: 0;
									max-width: 40ch;
								`}
							>
								{monthlyOrAnnual} support with exclusive extras
								including unlimited access to the App
							</p>
							<SupporterPlusBenefitsToggle />
							<p
								css={css`
									${textSans.medium({ fontWeight: 'bold' })};
									padding-top: ${space[3]}px;
									margin-top: ${space[4]}px;
									margin-bottom: 0;
									border-top: 1px solid ${palette.neutral[86]};
								`}
							>
								{mainPlan.currency}
								{newAmount}/{mainPlan.billingPeriod}
							</p>
						</Card.Section>
					</Card>{' '}
				</Stack>
				<section css={sectionSpacing}>
					<Stack>
						<Heading sansSerif>What happens next?</Heading>
						<div
							css={css`
								display: flex;
								align-items: start;
							`}
						>
							<SvgClock size="medium" />
							<div css={whatHappensNextTextCss}>
								<p
									css={css`
										${textSans.medium({
											fontWeight: 'bold',
										})};
										margin-bottom: 0;
									`}
								>
									This change will happen today
								</p>
								<p
									css={css`
										${textSans.medium()}
										margin-top: 0;
									`}
								>
									Dive in and start enjoying your exclusive
									extras straight away.
								</p>
							</div>
						</div>
						<div
							css={css`
								display: flex;
								align-items: start;
								svg {
									flex-shrink: 0;
									fill: ${palette.success[400]};
								}
							`}
						>
							<SwitchOffsetPaymentIcon size="medium" />
							<div css={whatHappensNextTextCss}>
								<p
									css={css`
										${textSans.medium({
											fontWeight: 'bold',
										})};
										color: ${palette.success[400]};
										margin-bottom: 0;
										border-top: 1px solid
											${palette.neutral[86]};
									`}
								>
									Your first payment will be just{' '}
									{mainPlan.currency}
									{previewResponse.amountPayableToday}
								</p>
								<p
									css={css`
										${textSans.medium()};
										color: ${palette.success[400]};
										margin-top: 0;
									`}
								>
									We will charge you a smaller amount today,
									to offset the payment you've already given
									us for the rest of the month. After this,
									from {nextPayment}, your new{' '}
									{monthlyOrAnnual.toLocaleLowerCase()}{' '}
									payment will be {mainPlan.currency}
									{
										previewResponse.supporterPlusPurchaseAmount
									}
								</p>
							</div>
						</div>
						<div
							css={css`
								display: flex;
								align-items: start;
							`}
						>
							<SvgCreditCard size="medium" />
							<div css={whatHappensNextTextCss}>
								<p
									css={css`
										${textSans.medium({
											fontWeight: 'bold',
										})};
										margin-bottom: 0;
										border-top: 1px solid
											${palette.neutral[86]};
									`}
								>
									No payment changes are needed
								</p>
								<div
									css={css`
										${from.tablet} {
											display: flex;
										}
										${textSans.medium()}
										margin-top: 0;
									`}
								>
									<p
										css={css`
											margin-bottom: 0;
											margin-right: ${space[1]}px;
										`}
									>
										We will take payment as before, from
									</p>
									{productDetail.subscription.card && (
										<b>
											<CardDisplay
												cssOverrides={css`
													margin: 0;
												`}
												{...productDetail.subscription
													.card}
											/>
										</b>
									)}
									{productDetail.subscription.payPalEmail && (
										<PaypalDisplay
											inline
											payPalId={
												productDetail.subscription
													.payPalEmail
											}
										/>
									)}
									{productDetail.subscription.sepaMandate && (
										<SepaDisplay
											inline
											accountName={
												productDetail.subscription
													.sepaMandate.accountName
											}
											iban={
												productDetail.subscription
													.sepaMandate.iban
											}
										/>
									)}
									{productDetail.subscription.mandate && (
										<DirectDebitDisplay
											inline
											{...productDetail.subscription
												.mandate}
										/>
									)}
								</div>
							</div>
						</div>
					</Stack>
				</section>
			</section>
		</>
	);
};
