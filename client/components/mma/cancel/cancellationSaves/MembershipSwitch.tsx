import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
	SvgClock,
	SvgCreditCard,
} from '@guardian/source-react-components';
import { ErrorSummary } from '@guardian/source-react-components-development-kitchen';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { dateString, parseDate } from '../../../../../shared/dates';
import type {
	PaidSubscriptionPlan,
	Subscription,
} from '../../../../../shared/productResponse';
import { getMainPlan } from '../../../../../shared/productResponse';
import type { ProductSwitchType } from '../../../../../shared/productSwitchTypes';
import { getBenefitsThreshold } from '../../../../utilities/benefitsThreshold';
import type { CurrencyIso } from '../../../../utilities/currencyIso';
import {
	getNewMembershipPrice,
	getOldMembershipPrice,
} from '../../../../utilities/membershipPriceRise';
import { JsonResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import { Card } from '../../shared/Card';
import { Heading } from '../../shared/Heading';
import { PaymentDetails } from '../../shared/PaymentDetails';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
} from '../CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '../CancellationContainer';
import {
	buttonCentredCss,
	buttonMutedCss,
	errorSummaryLinkCss,
	errorSummaryOverrideCss,
	iconListCss,
	listWithDividersCss,
	newAmountCss,
	productTitleCss,
	sectionSpacing,
	smallPrintCss,
	stackedButtonLayoutCss,
	wideButtonCss,
} from './SaveStyles';

const YourNewSupport = (props: {
	contributionPriceDisplay: string;
	billingPeriod: string;
}) => {
	const monthlyOrAnnual = getMonthlyOrAnnual(props.billingPeriod);
	return (
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
							${textSans.medium()};
							margin: 0;
						`}
					>
						{monthlyOrAnnual} support with fewer funding asks and an
						exclusive email from the newsroom
					</p>
					<p css={newAmountCss}>
						{props.contributionPriceDisplay}/{props.billingPeriod}
					</p>
				</Card.Section>
			</Card>
		</section>
	);
};

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
						<span>
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

const TsAndCs = () => (
	<section css={sectionSpacing}>
		<p css={smallPrintCss}>
			This subscription auto-renews and you will be charged the applicable
			monthly amount each time it renews unless you cancel. You can change
			how much you pay at any time but
		</p>
		<p css={smallPrintCss}>
			By proceeding, you are agreeing to our{' '}
			<a href="https://www.theguardian.com/info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions">
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

export const MembershipSwitch = () => {
	const navigate = useNavigate();
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const membership = cancellationContext.productDetail;

	const [isSwitching, setIsSwitching] = useState<boolean>(false);
	const [switchingError, setSwitchingError] = useState<boolean>(false);

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

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

	const newPriceDisplay = `${mainPlan.currency}${getNewMembershipPrice(
		mainPlan,
	)}`;

	const billingPeriod = mainPlan.billingPeriod;
	const monthlyOrAnnual = getMonthlyOrAnnual(billingPeriod);

	const supporterPlusPriceDisplay = `${
		mainPlan.currency
	}${getBenefitsThreshold(
		mainPlan.currencyISO as CurrencyIso,
		monthlyOrAnnual,
	)}`;

	const productSwitchType: ProductSwitchType = 'to-recurring-contribution';

	const productMoveFetch = () =>
		fetch(
			`/api/product-move/${productSwitchType}/${membership.subscription.subscriptionId}`,
			{
				method: 'POST',
				body: JSON.stringify({
					price: getOldMembershipPrice(mainPlan),
					preview: false,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

	const confirmSwitch = async () => {
		if (isSwitching) {
			return;
		}

		try {
			setIsSwitching(true);
			const response = await productMoveFetch();
			const data = await JsonResponseHandler(response);

			if (data === null) {
				setIsSwitching(false);
				setSwitchingError(true);
			} else {
				navigate('../switch-thank-you');
			}
		} catch (e) {
			setIsSwitching(false);
			setSwitchingError(true);
		}
	};
	return (
		<>
			<section css={sectionSpacing}>
				<Heading sansSerif>Review change</Heading>
				<p
					css={css`
						${textSans.medium()}
						margin: 0;
					`}
				>
					You are changing your current membership for a{' '}
					{contributionPriceDisplay} {monthlyOrAnnual}.
				</p>
			</section>
			<YourNewSupport
				contributionPriceDisplay={contributionPriceDisplay}
				billingPeriod={billingPeriod}
			/>
			<WhatHappensNext
				contributionPriceDisplay={contributionPriceDisplay}
				subscription={membership.subscription}
			/>
			<section css={sectionSpacing}>
				<p
					css={css`
						${textSans.medium()}
						border-top: 1px solid ${palette.neutral[86]};
						padding-top: ${space[5]}px;
					`}
				>
					Please note that, once the change is done, you will not be
					able to have the full set of benefits for {newPriceDisplay}{' '}
					again (full price is now {supporterPlusPriceDisplay}).
				</p>
			</section>
			{switchingError && (
				<section css={sectionSpacing} id="productSwitchErrorMessage">
					<ErrorSummary
						message={'We were unable to change your support'}
						context={<SwitchErrorContext />}
						cssOverrides={errorSummaryOverrideCss}
					/>
				</section>
			)}

			<section css={[sectionSpacing, stackedButtonLayoutCss]}>
				<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
					<Button
						cssOverrides={[buttonCentredCss, wideButtonCss]}
						isLoading={isSwitching}
						onClick={confirmSwitch}
					>
						Confirm change
					</Button>
				</ThemeProvider>
				<Button
					priority="tertiary"
					cssOverrides={[buttonCentredCss, buttonMutedCss]}
					onClick={() => navigate('../offers')}
				>
					Back
				</Button>
			</section>
			<TsAndCs />
		</>
	);
};

function getMonthlyOrAnnual(billingPeriod: string | undefined) {
	return billingPeriod === 'year' ? 'Annual' : 'Monthly';
}

function SwitchErrorContext() {
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
}
