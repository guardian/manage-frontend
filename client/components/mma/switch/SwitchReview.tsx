import { css, ThemeProvider } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	InlineError,
	Stack,
	SvgClock,
	SvgCreditCard,
} from '@guardian/source-react-components';
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import {
	dateAddMonths,
	dateAddYears,
	dateString,
} from '../../../../shared/dates';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
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
import {
	buttonCentredCss,
	buttonMutedCss,
	iconListCss,
	listWithDividersCss,
	productTitleCss,
	sectionSpacing,
	smallPrintCss,
} from './SwitchStyles';

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
		try {
			setIsSwitching(true);
			const response = await productMoveFetch(true); //change back!
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
		return <GenericErrorScreen loggingMessage={false} />;
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
						You will now support us with {mainPlan.currency}
						{newAmount} every {mainPlan.billingPeriod}, giving you
						exclusive supporter extras, including unlimited reading
						in our news app
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
								{monthlyOrAnnual} support with exclusive extras
								including unlimited access to the App
							</p>
							<SupporterPlusBenefitsToggle />
							<p css={newAmountCss}>
								{mainPlan.currency}
								{newAmount}/{mainPlan.billingPeriod}
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
								straight away.
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
									Your first payment will be just{' '}
									{mainPlan.currency}
									{previewResponse.amountPayableToday.toFixed(
										2,
									)}
								</strong>
								<br />
								We will charge you a smaller amount today, to
								offset the payment you've already given us for
								the rest of the month. After this, from{' '}
								{nextPayment}, your new{' '}
								{monthlyOrAnnual.toLocaleLowerCase()} payment
								will be {mainPlan.currency}
								{previewResponse.supporterPlusPurchaseAmount}
							</span>
						</li>
						<li>
							<SvgCreditCard size="medium" />
							<span>
								<strong>No payment changes are needed</strong>
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
						Confirm change
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
					<InlineError>
						An error occurred whilst switching
					</InlineError>
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
					{threshold} per {mainPlan.billingPeriod} is the minimum
					payment. If you cancel within 14 days of signing up, you’ll
					receive a full refund and your benefits will stop
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
