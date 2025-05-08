import { css } from '@emotion/react';
import { palette, space, textSans17 } from '@guardian/source/foundations';
import {
	Button,
	Stack,
	SvgClock,
	SvgCreditCard,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { ErrorSummary } from '@guardian/source-development-kitchen/react-components';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { dateString, parseDate } from '../../../../shared/dates';
import type {
	PaidSubscriptionPlan,
	Subscription,
} from '../../../../shared/productResponse';
import { MDA_TEST_USER_HEADER } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { getBillingPeriodAdjective } from '../../../../shared/productTypes';
import {
	buttonCentredCss,
	buttonMutedCss,
	stackedButtonLayoutCss,
	wideButtonCss,
} from '../../../styles/ButtonStyles';
import {
	errorSummaryLinkCss,
	errorSummaryOverrideCss,
} from '../../../styles/ErrorStyles';
import {
	iconListCss,
	listWithDividersCss,
	productTitleCss,
	sectionSpacing,
	smallPrintCss,
} from '../../../styles/GenericStyles';
import {
	getNewMembershipPrice,
	getOldMembershipPrice,
} from '../../../utilities/pricingConfig/membershipPriceRise';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { Card } from '../shared/Card';
import { Heading } from '../shared/Heading';
import { PaymentDetails } from '../shared/PaymentDetails';
import { newAmountCss } from './styles/SaveStyles';
import type {
	SubscriptionsContextInterface,
	SubscriptionsPageTitleInterface,
	SubscriptionsRouterState,
} from './SubscriptionsContainer';
import {
	SubscriptionsContext,
	SubscriptionsPageTitleContext,
} from './SubscriptionsContainer';

// Utility Components
const YourNewSupport = ({
	contributionPriceDisplay,
	billingPeriod,
	monthlyOrAnnual,
}: {
	contributionPriceDisplay: string;
	billingPeriod: string;
	monthlyOrAnnual: string;
}) => (
	<section css={sectionSpacing}>
		<Heading
			sansSerif
			cssOverrides={css`
				margin-bottom: ${space[3]}px;
			`}
		>
			Your new support
		</Heading>
		<Card>
			<Card.Header backgroundColor={palette.brand[400]}>
				<h3 css={productTitleCss}>{monthlyOrAnnual}</h3>
			</Card.Header>
			<Card.Section>
				<p
					css={css`
						${textSans17};
						margin: 0;
					`}
				>
					{monthlyOrAnnual} support with fewer funding asks and an
					exclusive email from the newsroom
				</p>
				<p css={newAmountCss}>
					{contributionPriceDisplay}/{billingPeriod}
				</p>
			</Card.Section>
		</Card>
	</section>
);

const WhatHappensNext = (props: {
	contributionPriceDisplay: string;
	subscription: Subscription;
}) => {
	const nextPaymentDate = dateString(
		parseDate(props.subscription.nextPaymentDate ?? '').date,
		'd MMMM',
	);

	return (
		<section css={sectionSpacing}>
			<Stack space={4}>
				<Heading sansSerif>What happens next?</Heading>
				<ul css={[iconListCss, listWithDividersCss]}>
					<li>
						<SvgClock size="medium" />
						<span>
							<strong>
								Your new support will start at the end of your
								billing period
							</strong>
							<br />
							You will be charged {
								props.contributionPriceDisplay
							}{' '}
							from the {nextPaymentDate}. From that date, you will
							continue to receive the supporter newsletter and see
							fewer support asks but you will lose access to
							premium features in the App and ad-free reading.
						</span>
					</li>
					<li>
						<SvgCreditCard size="medium" />
						<span data-qm-masking="blocklist">
							<strong>Your payment method</strong>
							<br />
							The payment will be taken from{' '}
							<PaymentDetails subscription={props.subscription} />
						</span>
					</li>
				</ul>
			</Stack>
		</section>
	);
};

const TsAndCs = ({
	contributionPriceDisplay,
	paymentDay,
	paymentMonth,
}: {
	contributionPriceDisplay: string;
	paymentDay: string;
	paymentMonth: string;
}) => (
	<section css={sectionSpacing}>
		<p css={smallPrintCss}>
			We will attempt to take payment of {contributionPriceDisplay}, on
			the {paymentDay} day of {paymentMonth}, from now until you cancel
			your payment. Payments may take up to 6 days to be recorded in your
			bank account. You can change how much you give or cancel your
			payment at any time.
		</p>
		<p css={smallPrintCss}>
			By proceeding, you are agreeing to our{' '}
			<a href="https://www.theguardian.com/info/2016/apr/04/contribution-terms-and-conditions">
				Terms and Conditions
			</a>
			.
		</p>
		<p css={smallPrintCss}>
			To find out what personal data we collect and how we use it, please
			visit our{' '}
			<a href="https://www.theguardian.com/help/privacy-policy">
				Privacy Policy
			</a>
			.
		</p>
	</section>
);

const ChangeErrorContext = () => {
	return (
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
};

// Main Component
export const ChangeBillingFrequency = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as SubscriptionsRouterState;
	const subscriptionsContext: SubscriptionsContextInterface =
		useContext(SubscriptionsContext);
	const productDetail = subscriptionsContext.productDetail;
	const [isChanging, setIsChanging] = useState<boolean>(false);
	const [changingError, setChangingError] = useState<boolean>(false);
	const pageTitleContext: SubscriptionsPageTitleInterface = useContext(
		SubscriptionsPageTitleContext,
	);

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

	if (mainPlan.billingPeriod !== 'month') {
		return <Navigate to="/" />;
	}

	const contributionPriceDisplay = `${
		mainPlan.currency
	}${getNewMembershipPrice({
		...mainPlan,
		billingPeriod: 'year',
	})}`;

	const billingPeriod = mainPlan.billingPeriod;
	const currentBillingPeriodAdjective =
		getBillingPeriodAdjective(billingPeriod);
	const nextBillingPeriodAdjective = getBillingPeriodAdjective('year');
	const currentIndefiniteArticle =
		currentBillingPeriodAdjective === 'Monthly' ? 'a' : 'an';
	const nextIndefiniteArticle =
		nextBillingPeriodAdjective === 'Monthly' ? 'a' : 'an';
	const paymentDay = parseDate(mainPlan.chargedThrough ?? undefined).dateStr(
		'do',
	);
	const paymentMonth =
		currentBillingPeriodAdjective === 'Monthly'
			? 'every month'
			: parseDate(mainPlan.chargedThrough ?? undefined).dateStr('MMMM');

	const changeBillingFrequencyFetch = () =>
		fetch(
			`/api/change-billing-frequency/${'productSwitchType'}/${
				productDetail.subscription.subscriptionId
			}`,
			{
				method: 'POST',
				body: JSON.stringify({
					price: getOldMembershipPrice(mainPlan),
					preview: false,
					checkChargeAmountBeforeUpdate: false,
				}),
				headers: {
					'Content-Type': 'application/json',
					[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
				},
			},
		);

	const confirmChange = async () => {
		if (isChanging) {
			return;
		}

		try {
			setIsChanging(true);
			const response = await changeBillingFrequencyFetch();
			const data = await JsonResponseHandler(response);

			if (data === null) {
				setIsChanging(false);
				setChangingError(true);
			} else {
				navigate('../switch-thank-you', {
					state: { ...routerState, journeyCompleted: true },
				});
			}
		} catch {
			setIsChanging(false);
			setChangingError(true);
		}
	};

	return (
		<>
			<section css={sectionSpacing}>
				<Heading sansSerif>Review and confirm change</Heading>
				<p
					css={css`
						${textSans17};
						margin: 0;
					`}
				>
					Please confirm that you’re changing support type from{' '}
					{currentIndefiniteArticle} {currentBillingPeriodAdjective}{' '}
					to {nextIndefiniteArticle} {nextBillingPeriodAdjective}{' '}
					contribution.
				</p>
			</section>
			<YourNewSupport
				contributionPriceDisplay={contributionPriceDisplay}
				billingPeriod="year"
				monthlyOrAnnual={nextBillingPeriodAdjective}
			/>
			<WhatHappensNext
				contributionPriceDisplay={contributionPriceDisplay}
				subscription={productDetail.subscription}
			/>
			<section css={sectionSpacing}>
				<p
					css={css`
						${textSans17};
						border-top: 1px solid ${palette.neutral[86]};
						padding-top: ${space[5]}px;
					`}
				>
					Please note if you confirm the change you will not be able
					to rejoin the Guardian Members scheme, as it’s now closed to
					new members.
				</p>
			</section>
			{changingError && (
				<section css={sectionSpacing} id="productSwitchErrorMessage">
					<ErrorSummary
						message={'We were unable to change your support'}
						context={<ChangeErrorContext />}
						cssOverrides={errorSummaryOverrideCss}
					/>
				</section>
			)}

			<section css={[sectionSpacing, stackedButtonLayoutCss]}>
				<Button
					theme={themeButtonReaderRevenueBrand}
					cssOverrides={[buttonCentredCss, wideButtonCss]}
					isLoading={isChanging}
					onClick={confirmChange}
				>
					Confirm change
				</Button>
				<Button
					priority="tertiary"
					cssOverrides={[buttonCentredCss, buttonMutedCss]}
					onClick={() => {
						if (
							window.history.state &&
							window.history.state.idx > 0
						) {
							navigate(-1); // Go back if there is history
						} else {
							navigate('/'); // Redirect to "/" if no history
						}
					}}
				>
					Back
				</Button>
			</section>
			<TsAndCs
				contributionPriceDisplay={contributionPriceDisplay}
				paymentDay={paymentDay}
				paymentMonth={paymentMonth}
			/>
		</>
	);
};
