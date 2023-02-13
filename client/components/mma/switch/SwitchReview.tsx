import { css, ThemeProvider } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
	SvgClock,
	SvgCreditCard,
} from '@guardian/source-react-components';
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {
	dateAddMonths,
	dateAddYears,
	dateString,
} from '../../../../shared/dates';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import { getBenefitsThreshold } from '../../../utilities/benefitsThreshold';
import type { CurrencyIso } from '../../../utilities/currencyIso';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { formatAmount } from '../../../utilities/utils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { ErrorSummary } from '../paymentUpdate/Summary';
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
import {
	buttonCentredCss,
	buttonMutedCss,
	errorSummaryBlockLinkCss,
	errorSummaryLinkCss,
	errorSummaryOverrideCss,
	iconListCss,
	listWithDividersCss,
	productTitleCss,
	sectionSpacing,
	smallPrintCss,
} from './SwitchStyles';

const SwitchErrorContext = (props: { PaymentFailure: boolean }) =>
	props.PaymentFailure ? (
		<>
			Please update your payment details in order to change your support.
			<Link
				css={[errorSummaryLinkCss, errorSummaryBlockLinkCss]}
				to="/payment/contributions"
			>
				Check your payment details
			</Link>
		</>
	) : (
		<>
			Please ensure your payment details are correct. If the problem
			persists get in touch at{' '}
			<a
				css={errorSummaryLinkCss}
				href="mailto:customer.help@guardian.com"
			>
				customer.help@guardian.com
			</a>
			.
		</>
	);

const newAmountCss = css`
	${textSans.medium({ fontWeight: 'bold' })};
	padding-top: ${space[3]}px;
	margin-top: ${space[4]}px;
	margin-bottom: 0;
	border-top: 1px solid ${palette.neutral[86]};
`;

const buttonLayoutCss = css`
	display: flex;
	flex-direction: column;
	margin-top: ${space[5]}px;
	padding-top: 32px;
	border-top: 1px solid ${palette.neutral[86]};
	> * + * {
		margin-top: ${space[3]}px;
	}
	${from.tablet} {
		flex-direction: row;
		> * + * {
			margin-top: 0;
			margin-left: ${space[3]}px;
		}
	}
`;

interface PreviewResponse {
	amountPayableToday: number;
	contributionRefundAmount: number;
	supporterPlusPurchaseAmount: number;
}

export const SwitchReview = () => {
	const navigate = useNavigate();

	const [isSwitching, setIsSwitching] = useState<boolean>(false);
	const [switchingError, setSwitchingError] = useState<boolean>(false);

	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const productDetail = switchContext.productDetail;

	const inPaymentFailure = !!productDetail.alertText;

	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);
	const supporterPlusTitle = `${monthlyOrAnnual} + extras`;

	const threshold = getBenefitsThreshold(
		mainPlan.currencyISO as CurrencyIso,
		monthlyOrAnnual,
	);
	const aboveThreshold = mainPlan.price >= threshold * 100;
	const newAmount = Math.max(threshold, mainPlan.price / 100);

	// ToDo: the API could return the next payment date
	const nextPayment = dateString(
		monthlyOrAnnual == 'Monthly'
			? dateAddMonths(new Date(), 1)
			: dateAddYears(new Date(), 1),
		'd MMMM',
	);

	const productMoveFetch = (preview: boolean) =>
		fetch(
			`/api/product-move/${productDetail.subscription.subscriptionId}`,
			{
				method: 'POST',
				body: JSON.stringify({
					price: newAmount,
					preview,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

	const confirmSwitch = async (amount: number) => {
		if (inPaymentFailure) {
			setSwitchingError(true);
			return;
		}

		try {
			setIsSwitching(true);
			const response = await productMoveFetch(false);
			const data = await JsonResponseHandler(response);

			if (data === null) {
				setIsSwitching(false);
				setSwitchingError(true);
			} else {
				navigate('../complete', {
					state: { amountPayableToday: amount },
				});
			}
		} catch (e) {
			setIsSwitching(false);
			setSwitchingError(true);
		}
	};

	const {
		data: previewResponse,
		loadingState,
	}: {
		data: PreviewResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(() => productMoveFetch(true), JsonResponseHandler);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView />;
	}
	if (previewResponse === null) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>Review change</Heading>
					<p
						css={css`
							${textSans.medium()};
						`}
					>
						Please {switchContext.isFromApp ? 'confirm' : 'review'}{' '}
						your choice to unlock exclusive supporter extras
						{aboveThreshold ? ". You'll still pay " : ' by paying '}
						{mainPlan.currency}
						{formatAmount(newAmount)}  per {mainPlan.billingPeriod}.
					</p>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={3}>
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
								{monthlyOrAnnual} support with exclusive extras,
								including full access to our app and ad-free
								reading
							</p>
							<SupporterPlusBenefitsToggle />
							<p css={newAmountCss}>
								{mainPlan.currency}
								{formatAmount(newAmount)}/
								{mainPlan.billingPeriod}
							</p>
						</Card.Section>
					</Card>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<Heading sansSerif>What happens next?</Heading>
					<ul css={[iconListCss, listWithDividersCss]}>
						<li>
							<SvgClock size="medium" />
							<span>
								<strong>This change will happen today</strong>
								<br />
								Dive in and start enjoying your exclusive extras
								straight away
							</span>
						</li>
						<li
							css={css`
								color: ${palette.success[400]};
							`}
						>
							<SwitchOffsetPaymentIcon size="medium" />
							<span>
								<strong>
									Your first payment will be{' '}
									{aboveThreshold && 'just'}{' '}
									{mainPlan.currency}
									{formatAmount(
										previewResponse.amountPayableToday,
									)}
								</strong>
								<br />
								We will charge you a smaller amount today, to
								offset the payment you've already given us for
								the rest of the {mainPlan.billingPeriod}. After
								this, from {nextPayment}, your new{' '}
								{monthlyOrAnnual.toLowerCase()} payment will be{' '}
								{mainPlan.currency}
								{formatAmount(
									previewResponse.supporterPlusPurchaseAmount,
								)}
							</span>
						</li>
						<li>
							<SvgCreditCard size="medium" />
							<span>
								<strong>Your payment method</strong>
								<br />
								We will take payment as before, from
								<strong>
									{productDetail.subscription.card && (
										<CardDisplay
											inline
											cssOverrides={css`
												margin: 0;
											`}
											{...productDetail.subscription.card}
										/>
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
								</strong>
							</span>
						</li>
					</ul>
				</Stack>
			</section>
			<section css={buttonLayoutCss}>
				<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
					<Button
						isLoading={isSwitching}
						cssOverrides={buttonCentredCss}
						onClick={() =>
							confirmSwitch(previewResponse.amountPayableToday)
						}
					>
						Confirm {aboveThreshold ? 'change' : 'upgrade'}
					</Button>
				</ThemeProvider>
				<Button
					priority="tertiary"
					cssOverrides={[buttonCentredCss, buttonMutedCss]}
					onClick={() => navigate('..')}
				>
					Back
				</Button>
			</section>
			{switchingError && (
				<section css={sectionSpacing}>
					<ErrorSummary
						message={
							inPaymentFailure
								? 'There is a problem with your payment method'
								: 'We were unable to change your support'
						}
						context={
							<SwitchErrorContext
								PaymentFailure={inPaymentFailure}
							/>
						}
						cssOverrides={errorSummaryOverrideCss}
					/>
				</section>
			)}
			<section css={sectionSpacing}>
				<p css={smallPrintCss}>
					This arrangement auto-renews each {mainPlan.billingPeriod}.
					You will be charged the applicable{' '}
					{monthlyOrAnnual.toLowerCase()} amount at each renewal
					unless you cancel. You can cancel or change how much you pay
					for these benefits at any time before your next renewal
					date, but {mainPlan.currency}
					{formatAmount(threshold)} per {mainPlan.billingPeriod} is
					the minimum payment. If you cancel within 14 days of signing
					up, you’ll receive a full refund and your benefits will stop
					immediately. Changes to your payment amount or cancellation
					made after 14 days will take effect at the end of your
					current {monthlyOrAnnual.toLowerCase()} payment period. To
					cancel, go to Manage My Account or see our{' '}
					<a href="https://www.theguardian.com/info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions">
						Terms
					</a>
					.
				</p>
				<p css={smallPrintCss}>
					By proceeding, you are agreeing to our{' '}
					<a href="https://www.theguardian.com/info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions">
						Terms and Conditions
					</a>
					.
				</p>
				<p css={smallPrintCss}>
					To find out what personal data we collect and how we use it,
					please visit our{' '}
					<a href="https://www.theguardian.com/help/privacy-policy">
						Privacy Policy
					</a>
					.
				</p>
			</section>
		</>
	);
};
