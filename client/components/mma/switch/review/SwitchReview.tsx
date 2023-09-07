import { css, ThemeProvider } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
	SvgClock,
	SvgCreditCard,
} from '@guardian/source-react-components';
import { ErrorSummary } from '@guardian/source-react-components-development-kitchen';
import { useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { dateString } from '../../../../../shared/dates';
import type {
	PreviewResponse,
	ProductSwitchType,
} from '../../../../../shared/productSwitchTypes';
import {
	buttonCentredCss,
	buttonMutedCss,
} from '../../../../styles/ButtonStyles';
import {
	errorSummaryBlockLinkCss,
	errorSummaryLinkCss,
	errorSummaryOverrideCss,
} from '../../../../styles/ErrorStyles';
import {
	iconListCss,
	listWithDividersCss,
	productTitleCss,
	sectionSpacing,
} from '../../../../styles/GenericStyles';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../../utilities/hooks/useAsyncLoader';
import { formatAmount } from '../../../../utilities/utils';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { SwitchOffsetPaymentIcon } from '../../shared/assets/SwitchOffsetPaymentIcon';
import { JsonResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';
import { BenefitsToggle } from '../../shared/benefits/BenefitsToggle';
import { Card } from '../../shared/Card';
import { Heading } from '../../shared/Heading';
import { PaymentDetails } from '../../shared/PaymentDetails';
import { SupporterPlusTsAndCs } from '../../shared/SupporterPlusTsAndCs';
import type {
	SwitchContextInterface,
	SwitchRouterState,
} from '../SwitchContainer';
import { SwitchContext } from '../SwitchContainer';

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

const scrollToErrorMessage = () => {
	const errorMessageElement = document.getElementById(
		'productSwitchErrorMessage',
	);
	errorMessageElement && errorMessageElement.scrollIntoView();
};

const productSwitchType: ProductSwitchType =
	'recurring-contribution-to-supporter-plus';

export const SwitchReview = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as SwitchRouterState;

	const [isSwitching, setIsSwitching] = useState<boolean>(false);
	const [switchingError, setSwitchingError] = useState<boolean>(false);

	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const {
		contributionToSwitch,
		mainPlan,
		monthlyOrAnnual,
		supporterPlusTitle,
		thresholds,
	} = switchContext;

	const inPaymentFailure = !!contributionToSwitch.alertText;

	const { thresholdForBillingPeriod: threshold, isAboveThreshold } =
		thresholds;

	const newAmount = Math.max(threshold, mainPlan.price / 100);

	const productMoveFetch = (
		preview: boolean,
		checkChargeAmountBeforeUpdate: boolean,
	) =>
		fetch(
			`/api/product-move/${productSwitchType}/${contributionToSwitch.subscription.subscriptionId}`,
			{
				method: 'POST',
				body: JSON.stringify({
					price: newAmount,
					preview,
					checkChargeAmountBeforeUpdate,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

	const confirmSwitch = async (
		amount: number,
		checkChargeAmountBeforeUpdate: boolean,
	) => {
		if (isSwitching) {
			return;
		}

		if (inPaymentFailure) {
			setSwitchingError(true);
			scrollToErrorMessage();
			return;
		}

		try {
			setIsSwitching(true);
			const response = await productMoveFetch(
				false,
				checkChargeAmountBeforeUpdate,
			);
			const data = await JsonResponseHandler(response);

			if (data === null) {
				setIsSwitching(false);
				setSwitchingError(true);
				scrollToErrorMessage();
			} else {
				navigate('../complete', {
					state: {
						...routerState,
						amountPayableToday: amount,
						nextPaymentDate: nextPaymentDate,
						switchHasCompleted: true,
					},
				});
			}
		} catch (e) {
			setIsSwitching(false);
			setSwitchingError(true);
			scrollToErrorMessage();
		}
	};

	const {
		data: previewResponse,
		loadingState,
	}: {
		data: PreviewResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(
		() => productMoveFetch(true, false),
		JsonResponseHandler,
	);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView />;
	}
	if (previewResponse === null) {
		return <Navigate to="/" />;
	}

	const nextPaymentDate = dateString(
		new Date(previewResponse.nextPaymentDate),
		'd MMMM',
	);

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
						{isAboveThreshold
							? `Please confirm your choice to get exclusive supporter extras. You'll still pay ${
									mainPlan.currency
							  }${formatAmount(newAmount)} per ${
									mainPlan.billingPeriod
							  }.`
							: `Please confirm your choice to change your support to ${monthlyOrAnnual.toLowerCase()} + extras.`}
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
							<BenefitsToggle productType="supporterplus" />
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
								In just a couple of steps, you'll be able to
								start enjoying your exclusive extras{' '}
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
									{previewResponse.amountPayableToday > 0 &&
										`Your first payment will be
									${isAboveThreshold ? 'just' : ''}
									${mainPlan.currency}${formatAmount(previewResponse.amountPayableToday)}`}
									{previewResponse.amountPayableToday == 0 &&
										"There's nothing extra to pay today"}
								</strong>
								<br />
								{previewResponse.amountPayableToday > 0 &&
									`We will charge you a smaller amount today, to
								offset the payment you've already given us for
								the rest of the ${mainPlan.billingPeriod}.`}
								{previewResponse.amountPayableToday == 0 &&
									`We won't charge you today, as your current payment covers you for the rest of the ${mainPlan.billingPeriod}.`}{' '}
								After this, from {nextPaymentDate}, your new{' '}
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
								We will take payment as before, from{' '}
								<PaymentDetails
									subscription={
										contributionToSwitch.subscription
									}
								/>
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
							confirmSwitch(
								previewResponse.amountPayableToday,
								previewResponse.checkChargeAmountBeforeUpdate,
							)
						}
					>
						Confirm {isAboveThreshold ? 'change' : 'upgrade'}
					</Button>
				</ThemeProvider>
				<Button
					priority="tertiary"
					cssOverrides={[buttonCentredCss, buttonMutedCss]}
					onClick={() => navigate('..', { state: routerState })}
				>
					Back
				</Button>
			</section>
			{switchingError && (
				<section css={sectionSpacing} id="productSwitchErrorMessage">
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
				<SupporterPlusTsAndCs
					currencyISO={mainPlan.currencyISO}
					billingPeriod={mainPlan.billingPeriod}
				/>
			</section>
		</>
	);
};
