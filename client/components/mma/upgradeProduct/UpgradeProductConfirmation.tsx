import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans12,
	textSans15,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import {
	Button,
	SvgClock,
	SvgCreditCard,
	SvgReload,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { ErrorSummary } from '@guardian/source-development-kitchen/react-components';
import * as Sentry from '@sentry/browser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '@/client/stores/AccountStore';
import { useUpgradeProductStore } from '@/client/stores/UpgradeProductStore';
import { errorSummaryOverrideCss } from '@/client/styles/ErrorStyles';
import {
	subHeadingCss,
	subHeadingInformationTextCss,
	subHeadingWithInformationCss,
} from '@/client/styles/headings';
import { trackEvent } from '@/client/utilities/analytics';
import { changePlanFetch } from '@/client/utilities/productUtils';
import { dateString } from '@/shared/dates';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { productCardConfiguration } from '../accountoverview/ProductCardConfiguration';
import { productCardTitleCss } from '../accountoverview/ProductCardStyles';
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
import { Card } from '../shared/Card';
import { getNextPaymentDetails } from '../shared/NextPaymentDetails';
import {
	actionButtonsContainerCss,
	benefitsTextCss,
	whatHappensNowItemCss,
	whatHappensNowItemInfoCss,
	whatHappensNowItemInformationBorderCss,
	whatHappensNowItemInformationTextCss,
} from './UpgradeProductContainer';

const subheadingTextCss = css`
	${textSansBold17};
	margin: 0;

	${from.tablet} {
		${textSansBold20};
	}
`;

const termsAndConditionsContainerCss = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: ${space[3]}px;

	${textSans15};
	padding: ${space[3]}px;
	border-radius: ${space[2]}px;
	border: 2px solid ${palette.neutral[38]};
	background-color: ${palette.neutral[97]};
`;

const termsAndConditionsTextCss = css`
	${textSans15};
	margin: 0;

	a {
		color: ${palette.brand[500]};
		text-decoration: underline;
	}
`;

const termsAndConditionsFooterCss = css`
	${textSans12};
	margin: 0;
	margin-top: ${space[5]}px;

	${from.tablet} {
		margin-top: ${space[6]}px;
	}

	a {
		color: ${palette.neutral[7]};
		text-decoration: underline;
	}
`;

export const UpgradeProductConfirmation = () => {
	const navigate = useNavigate();

	const { mainPlan, specificProductType, previewResponse, subscription } =
		useUpgradeProductStore();
	const { getIsTestUser } = useAccountStore();

	const [isUpgrading, setIsUpgrading] = useState(false);
	const [upgradeError, setUpgradeError] = useState<string | null>(null);

	if (!mainPlan || !specificProductType || !subscription) {
		return null;
	}

	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		subscription,
		null,
		false,
	);

	const handleUpgradeClick = async () => {
		if (isUpgrading) {
			return;
		}

		setIsUpgrading(true);
		setUpgradeError(null);

		const isTestUser = getIsTestUser();

		try {
			const response = await changePlanFetch({
				subscriptionId: subscription.subscriptionId,
				isTestUser,
				mode: 'switchToBasePrice',
				targetProduct: 'DigitalSubscription',
				preview: false,
			});

			if (!response.ok) {
				throw new Error(
					`Failed to upgrade subscription: ${response.status}`,
				);
			}

			trackEvent({
				eventCategory: 'account_overview',
				eventAction: 'click',
				eventLabel: `/${specificProductType.urlPart}/upgrade-product/thank-you`,
			});

			navigate(
				`/${specificProductType.urlPart}/upgrade-product/thank-you`,
			);
		} catch (error) {
			Sentry.captureException(
				error instanceof Error
					? error
					: new Error('Failed to upgrade subscription'),
				{
					extra: {
						subscriptionId: subscription.subscriptionId,
						isTestUser,
					},
				},
			);
			setUpgradeError(
				error instanceof Error
					? error.message
					: 'Something went wrong. Please try again.',
			);
			setIsUpgrading(false);
		}
	};

	let paymentMethodCopy = `We will take payment as before`;

	if (subscription.card) {
		paymentMethodCopy = `We will take payment as before, from ${subscription.card.type} card ending ${subscription.card.last4}`;
	} else if (subscription.payPalEmail) {
		paymentMethodCopy = `We will take payment as before, from PayPal email ${subscription.payPalEmail}`;
	} else if (subscription.mandate) {
		paymentMethodCopy = `We will take payment as before, from Direct Debit account ending ${subscription.mandate.accountNumber.slice(
			-4,
		)}`;
	} else if (subscription.sepaMandate) {
		paymentMethodCopy = `We will take payment as before, from SEPA Direct Debit account ending ${subscription.sepaMandate.iban.slice(
			-4,
		)}`;
	}

	return (
		<>
			<h2 css={subHeadingWithInformationCss}>Your upgrade</h2>
			<p css={subHeadingInformationTextCss}>
				Review changes to your subscription to unlock exclusive access.
			</p>
			<Card>
				<Card.Header
					backgroundColor={
						productCardConfiguration[
							PRODUCT_TYPES.digipack.productType
						].colour
					}
					minHeightOverride="auto"
				>
					<div>
						<h3 css={productCardTitleCss(false)}>
							{PRODUCT_TYPES.digipack.productTitle()}
						</h3>
					</div>
				</Card.Header>
				<Card.Section>
					<p css={benefitsTextCss}>
						Enjoy unlimited access to the Guardian's premium apps,
						uninterrupted, ad-free reading and more
					</p>
					<BenefitsToggle
						productType={PRODUCT_TYPES.tierthree.productType}
						subscriptionPlan={mainPlan}
					/>
				</Card.Section>
				<Card.Section>
					<p css={subheadingTextCss}>
						{mainPlan.currency}
						{previewResponse?.targetCatalogPrice}/
						{nextPaymentDetails?.paymentInterval}
					</p>
				</Card.Section>
			</Card>

			<h2 css={subHeadingCss}>What happens now?</h2>

			<div css={whatHappensNowItemCss}>
				<SvgClock size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<h3 css={subheadingTextCss}>
						This change will happen today
					</h3>
					<p
						css={[
							whatHappensNowItemInformationTextCss,
							whatHappensNowItemInformationBorderCss,
						]}
					>
						Dive in and start enjoying your benefits straight away
					</p>
				</div>
			</div>

			<div css={whatHappensNowItemCss}>
				<SvgReload size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<h3 css={subheadingTextCss}>
						Your first payment will be {mainPlan.currency}
						{previewResponse?.amountPayableToday}
					</h3>
					<p
						css={[
							whatHappensNowItemInformationTextCss,
							whatHappensNowItemInformationBorderCss,
						]}
					>
						We will charge you a smaller amount today, to offset the
						payment you've already given us for the rest of the{' '}
						{nextPaymentDetails?.paymentInterval}. After this, from{' '}
						{subscription.nextPaymentDate
							? dateString(
									new Date(subscription.nextPaymentDate),
									'MMMM do',
							  )
							: nextPaymentDetails?.nextPaymentDateValue}
						, your {nextPaymentDetails?.paymentInterval}ly payment
						will be {mainPlan.currency}
						{previewResponse?.targetCatalogPrice}
					</p>
				</div>
			</div>

			<div css={whatHappensNowItemCss}>
				<SvgCreditCard size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<h3 css={subheadingTextCss}>Your payment method</h3>
					<p css={whatHappensNowItemInformationTextCss}>
						{paymentMethodCopy}
					</p>
				</div>
			</div>

			<div css={termsAndConditionsContainerCss}>
				<p css={termsAndConditionsTextCss}>
					This subscription auto-renews. You'll be charged the
					applicable monthly amount at each renewal unless you cancel.
					You can cancel your subscription at any time before your
					next renewal date. To cancel go to{' '}
					<a href="/">Manage My Account</a>. Cancellation will take
					effect at the end of your currently monthly payment period.
					There is also a cooling off period of 14 days from sign-up.
					You can cancel your subscription within 14 days of sign-up
					by <a href="/help-centre#call-us">contacting us</a> and
					receive a full refund.
				</p>
			</div>

			{upgradeError && (
				<ErrorSummary
					message="We were unable to upgrade your subscription"
					context="Please try again. If the problem persists, contact customer.help@theguardian.com"
					cssOverrides={[
						errorSummaryOverrideCss,
						css`
							margin-top: ${space[5]}px;
						`,
					]}
				/>
			)}

			<div
				css={[
					actionButtonsContainerCss,
					css`
						margin-top: ${space[5]}px;

						${from.tablet} {
							margin-top: ${space[6]}px;
						}
					`,
				]}
			>
				<Button
					aria-label={`Upgrade subscription button`}
					data-cy={`upgrade-subscription-button`}
					size="small"
					priority="primary"
					theme={themeButtonReaderRevenueBrand}
					isLoading={isUpgrading}
					disabled={isUpgrading}
					cssOverrides={css`
						justify-content: center;
					`}
					onClick={() => void handleUpgradeClick()}
				>
					{`Upgrade for ${mainPlan.currency}${previewResponse?.targetCatalogPrice} per ${nextPaymentDetails?.paymentInterval}`}
				</Button>
				<Button
					aria-label={`Product Card Digital Plus Upsell Button`}
					data-cy={`digital-plus-upsell-button`}
					size="small"
					priority="tertiary"
					cssOverrides={css`
						justify-content: center;
						margin-left: 0px;
						margin-top: ${space[3]}px;

						${from.tablet} {
							margin-top: 0px;
							margin-left: ${space[3]}px;
						}
					`}
					onClick={() => {
						trackEvent({
							eventCategory: 'account_overview',
							eventAction: 'click',
							eventLabel: `/${specificProductType.urlPart}/upgrade-product/information`,
						});
						navigate(
							`/${specificProductType.urlPart}/upgrade-product/information`,
						);
					}}
				>
					{`Back`}
				</Button>
			</div>
			<p css={termsAndConditionsFooterCss}>
				If you want to change the payment method, please go to your
				billing section and update your payment details. By proceeding,
				you are agreeing to our
				<a href="https://www.theguardian.com/info/2025/oct/31/guardian-subscription-terms-and-conditions">
					Terms and Conditions
				</a>
				. To find out what personal data we collect and how we use it,
				please visit our <a href="/data-privacy">Privacy Policy</a>.
			</p>
		</>
	);
};
