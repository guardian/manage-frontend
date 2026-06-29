import { css } from '@emotion/react';
import { palette, textSans17 } from '@guardian/source/foundations';
import {
	Button,
	SvgGift,
	SvgInfoRound,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import type { NavigateFunction } from 'react-router-dom';
import { wideButtonLayoutCss } from '@/client/styles/ButtonStyles';
import type { Event } from '@/client/utilities/analytics';
import type { FetchUpgradePreviewParams } from '@/client/utilities/hooks/useUpgradePreview';
import { parseDate } from '@/shared/dates';
import type {
	MembersDataApiUser,
	PaidSubscriptionPlan,
	ProductDetail,
	SubscriptionPlan,
} from '@/shared/productResponse';
import type { GroupedProductType, ProductType } from '@/shared/productTypes';
import { Ribbon } from '../../shared/Ribbon';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import type { ProductBenefit } from '../shared/benefits/BenefitsConfiguration';
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
import { Card } from '../shared/Card';
import type { NextPaymentDetails } from '../shared/NextPaymentDetails';
import { PaymentMethodDisplay } from '../shared/PaymentMethodDisplay';
import { TaxExclusiveNotice } from '../shared/TaxExclusiveNotice';
import type { ProductCardConfiguration } from './ProductCardConfiguration';
import {
	benefitsSectionBackgroundColour,
	benefitsTextCss,
	centeredActionCss,
	centeredButtonCss,
	giftRibbonColour,
	giftRibbonCopyColour,
	giftRibbonCss,
	keyValueCss,
	productCardTitleCss,
	productDetailLayoutCss,
	sectionHeadingCss,
	sharedMembershipLeaveButtonCss,
	sharedMembershipTextCss,
} from './ProductCardStyles';

const NewPriceAlert = () => {
	const iconCss = css`
		svg {
			position: relative;
			top: 7px;
			margin-left: -4px;
			fill: ${palette.brand[500]};
		}
	`;

	return (
		<span css={iconCss}>
			<SvgInfoRound size="small" />
			New price |{' '}
		</span>
	);
};

export const ProductCardHeader = ({
	cardConfig,
	productTitle,
	isGifted,
}: {
	cardConfig: ProductCardConfiguration;
	productTitle: string;
	isGifted?: boolean;
}) => (
	<Card.Header backgroundColor={cardConfig.colour} minHeightOverride="auto">
		<h3 css={productCardTitleCss(cardConfig.invertText)}>{productTitle}</h3>
		{isGifted && (
			<Ribbon
				copy="Gift"
				ribbonColour={giftRibbonColour(cardConfig)}
				copyColour={giftRibbonCopyColour(cardConfig)}
				icon={
					<SvgGift
						isAnnouncedByScreenReader
						size="small"
						theme={{ fill: giftRibbonCopyColour(cardConfig) }}
					/>
				}
				additionalCss={giftRibbonCss}
			/>
		)}
	</Card.Header>
);

export const BenefitsCopyAndToggle = ({
	cardConfig,
	specificProductType,
	mainPlan,
	nextPaymentDetails,
	overrideBenefits,
	overrideBenefitsText,
}: {
	cardConfig: ProductCardConfiguration;
	specificProductType: ProductType;
	mainPlan: SubscriptionPlan;
	nextPaymentDetails?: NextPaymentDetails;
	overrideBenefits?: ProductBenefit[];
	overrideBenefitsText?: string;
}) =>
	cardConfig.getBenefitsSectionCopy &&
	(nextPaymentDetails || overrideBenefitsText) && (
		<Card.Section
			backgroundColor={benefitsSectionBackgroundColour}
			removeBorders
		>
			<p css={benefitsTextCss}>
				{nextPaymentDetails
					? cardConfig.getBenefitsSectionCopy(nextPaymentDetails)
					: overrideBenefitsText}
			</p>
			<BenefitsToggle
				productType={specificProductType.productType}
				subscriptionPlan={mainPlan}
				overrideBenefits={overrideBenefits}
			/>
		</Card.Section>
	);

export const GuardianAdLiteCopy = ({
	nextPaymentDetails,
	specificProductType,
}: {
	nextPaymentDetails: NextPaymentDetails | undefined;
	specificProductType: ProductType;
}) =>
	specificProductType.productType === 'guardianadlite' &&
	nextPaymentDetails && (
		<Card.Section backgroundColor={benefitsSectionBackgroundColour}>
			<p css={benefitsTextCss}>
				You’re subscribed to {specificProductType.productTitle()} and
				pay {nextPaymentDetails.paymentValueShort} a{' '}
				{nextPaymentDetails.paymentInterval} for non-personalised
				advertising.
			</p>
		</Card.Section>
	);

export const SecondaryUserSubscriptionDetails = ({
	subscriptionName,
	primarySubscriber,
}: {
	subscriptionName: string;
	primarySubscriber: MembersDataApiUser | undefined;
}) =>
	primarySubscriber && (
		<Card.Section>
			<div css={productDetailLayoutCss}>
				<div>
					<h4 css={sectionHeadingCss}>Subscription details</h4>
					<p css={sharedMembershipTextCss}>
						Subscription: {subscriptionName} shared subscription{' '}
						<br />
						<br />
						You’ve been given access by{' '}
						{primarySubscriber.firstName}{' '}
						{primarySubscriber.lastName} ({primarySubscriber.email}
						). Your account and activity are private and not shared
						with the subscription owner.
					</p>
				</div>
				<div css={centeredActionCss}>
					<Button
						aria-label={`${subscriptionName} : Leave shared subscription`}
						size="small"
						priority="tertiary"
						cssOverrides={sharedMembershipLeaveButtonCss}
						onClick={() => undefined}
					>
						Manage support
					</Button>
				</div>
			</div>
		</Card.Section>
	);

const StartDateRow = ({
	subscriptionStartDate,
	shouldShowStartDate,
}: {
	subscriptionStartDate: string | undefined;
	shouldShowStartDate: boolean;
}) =>
	subscriptionStartDate &&
	shouldShowStartDate && (
		<div>
			<dt>Start date</dt>
			<dd>{parseDate(subscriptionStartDate).dateStr()}</dd>
		</div>
	);

const JoinDateRow = ({
	productDetail,
	shouldShowJoinDateNotStartDate,
}: {
	productDetail: ProductDetail;
	shouldShowJoinDateNotStartDate: true | undefined;
}) =>
	shouldShowJoinDateNotStartDate && (
		<div>
			<dt>Join date</dt>
			<dd>{parseDate(productDetail.joinDate).dateStr()}</dd>
		</div>
	);

const GiftPurchaseDateRow = ({
	userIsGifter,
	giftPurchaseDate,
}: {
	userIsGifter: boolean;
	giftPurchaseDate: string | null;
}) =>
	userIsGifter &&
	giftPurchaseDate && (
		<div>
			<dt>Purchase date</dt>
			<dd>{parseDate(giftPurchaseDate).dateStr()}</dd>
		</div>
	);

const EndDateRow = ({
	subscriptionEndDate,
	isGifted,
	userIsGifter,
	productDetail,
}: {
	subscriptionEndDate: string | undefined;
	isGifted: boolean;
	userIsGifter: boolean;
	productDetail: ProductDetail;
}) =>
	subscriptionEndDate &&
	((isGifted && !userIsGifter) || !productDetail.subscription.autoRenew) && (
		<div>
			<dt>End date</dt>
			<dd>{parseDate(subscriptionEndDate).dateStr()}</dd>
		</div>
	);

const UserIdRow = ({
	groupedProductType,
	productDetail,
}: {
	groupedProductType: GroupedProductType;
	productDetail: ProductDetail;
}) => (
	<div>
		<dt>
			{groupedProductType.showSupporterId
				? 'Supporter ID'
				: 'Subscription ID'}
		</dt>
		<dd data-qm-masking="blocklist">
			{productDetail.subscription.subscriptionId}
		</dd>
	</div>
);

const MembershipTierLabelRow = ({
	groupedProductType,
	productDetail,
}: {
	groupedProductType: GroupedProductType;
	productDetail: ProductDetail;
}) =>
	groupedProductType.tierLabel && (
		<div>
			<dt>{groupedProductType.tierLabel}</dt>
			<dd>{productDetail.mmaProductKey}</dd>
		</div>
	);

const TrialRemainingRow = ({
	specificProductType,
	productDetail,
	isGifted,
}: {
	specificProductType: ProductType;
	productDetail: ProductDetail;
	isGifted: boolean;
}) =>
	specificProductType.showTrialRemainingIfApplicable &&
	productDetail.subscription.trialLength > 0 &&
	!isGifted &&
	productDetail.subscription.readerType !== 'Patron' && (
		<div>
			<dt>Trial remaining</dt>
			<dd>
				{productDetail.subscription.trialLength}{' '}
				{productDetail.subscription.trialLength !== 1 ? 'days' : 'day'}
			</dd>
		</div>
	);

const NextPaymentRow = ({
	nextPaymentDetails,
	productDetail,
	hasCancellationPending,
}: {
	nextPaymentDetails: NextPaymentDetails | undefined;
	productDetail: ProductDetail;
	hasCancellationPending: boolean;
}) =>
	nextPaymentDetails &&
	productDetail.subscription.autoRenew &&
	!hasCancellationPending && (
		<div>
			<dt>{nextPaymentDetails.paymentKey}</dt>
			<dd>
				{nextPaymentDetails.isNewPaymentValue && <NewPriceAlert />}
				{nextPaymentDetails.paymentValue}
				{nextPaymentDetails.nextPaymentDateValue &&
					productDetail.subscription.readerType !== 'Patron' &&
					` on ${nextPaymentDetails.nextPaymentDateValue}`}
			</dd>
		</div>
	);

const FutureProductRow = ({
	futureProductTitle,
}: {
	futureProductTitle: string | null;
}) =>
	futureProductTitle && (
		<div>
			<dt>Switching to</dt>
			<dd>{futureProductTitle}</dd>
		</div>
	);

const ProductUpsellButton = ({
	isPreviewLoading,
	hasPreviewError,
	productDetail,
	specificProductType,
	mainPlan,
	showProductUpsellButton,
	trackEvent,
	fetchUpgradePreview,
}: {
	isPreviewLoading: boolean;
	hasPreviewError: boolean;
	productDetail: ProductDetail;
	specificProductType: ProductType;
	mainPlan: SubscriptionPlan;
	showProductUpsellButton: boolean;
	trackEvent: (trackEventArgs: Event) => void;
	fetchUpgradePreview: (
		fetchUpgradePreviewArgs: FetchUpgradePreviewParams,
	) => Promise<void>;
}) =>
	showProductUpsellButton && (
		<Button
			aria-label="Product Card Digital Plus Upsell Button"
			data-cy="digital-plus-upsell-button"
			size="small"
			priority="primary"
			theme={themeButtonReaderRevenueBrand}
			isLoading={isPreviewLoading}
			disabled={isPreviewLoading || hasPreviewError}
			cssOverrides={centeredButtonCss}
			onClick={() => {
				trackEvent({
					eventCategory: 'account_overview',
					eventAction: 'click',
					eventLabel: `/${specificProductType.urlPart}/upgrade-product/information`,
				});
				void fetchUpgradePreview({
					subscriptionId: productDetail.subscription.subscriptionId,
					subscription: productDetail.subscription,
					mainPlan: mainPlan as PaidSubscriptionPlan,
					navigationPath: `/${specificProductType.urlPart}/upgrade-product/information?subscriptionId=${productDetail.subscription.subscriptionId}`,
				});
			}}
		>
			Upgrade to Digital plus
		</Button>
	);

const ProductManageButton = ({
	isGifted,
	specificProductType,
	mainPlan,
	groupedProductType,
	productDetail,
	navigate,
	trackEvent,
}: {
	isGifted: boolean;
	specificProductType: ProductType;
	mainPlan: SubscriptionPlan;
	groupedProductType: GroupedProductType;
	productDetail: ProductDetail;
	navigate: NavigateFunction;
	trackEvent: (trackEventArgs: Event) => void;
}) =>
	!isGifted && (
		<Button
			aria-label={`${specificProductType.productTitle(
				mainPlan,
			)} : Manage ${groupedProductType.friendlyName}`}
			data-cy={`Manage ${groupedProductType.friendlyName}`}
			size="small"
			priority="tertiary"
			cssOverrides={centeredButtonCss}
			onClick={() => {
				trackEvent({
					eventCategory: 'account_overview',
					eventAction: 'click',
					eventLabel: `manage_${specificProductType.urlPart}`,
				});
				navigate(`/${specificProductType.urlPart}`, {
					state: { productDetail },
				});
			}}
		>
			{`Manage ${groupedProductType.friendlyName}`}
		</Button>
	);

const ProductSwitchButton = ({
	showSwitchButton,
	productDetail,
	user,
	navigate,
}: {
	showSwitchButton: boolean;
	productDetail: ProductDetail;
	user: MembersDataApiUser | undefined;
	navigate: NavigateFunction;
}) =>
	showSwitchButton &&
	user && (
		<Button
			theme={themeButtonReaderRevenueBrand}
			size="small"
			cssOverrides={centeredButtonCss}
			onClick={() =>
				navigate(`/switch`, {
					state: { productDetail, user },
				})
			}
		>
			Change to all-access digital
		</Button>
	);

export const BillingAndPaymentSection = ({
	groupedProductType,
	productDetail,
	specificProductType,
	shouldShowStartDate,
	subscriptionStartDate,
	subscriptionEndDate,
	shouldShowJoinDateNotStartDate,
	userIsGifter,
	giftPurchaseDate,
	isGifted,
	nextPaymentDetails,
	hasCancellationPending,
	futureProductTitle,
	isPreviewLoading,
	hasPreviewError,
	mainPlan,
	showProductUpsellButton,
	showSwitchButton,
	user,
	primaryUser,
	navigate,
	trackEvent,
	fetchUpgradePreview,
}: {
	groupedProductType: GroupedProductType;
	productDetail: ProductDetail;
	specificProductType: ProductType;
	shouldShowStartDate: boolean;
	subscriptionStartDate: string | undefined;
	subscriptionEndDate: string | undefined;
	shouldShowJoinDateNotStartDate: true | undefined;
	userIsGifter: boolean;
	giftPurchaseDate: string | null;
	isGifted: boolean;
	nextPaymentDetails: NextPaymentDetails | undefined;
	hasCancellationPending: boolean;
	futureProductTitle: string | null;
	isPreviewLoading: boolean;
	hasPreviewError: boolean;
	mainPlan: SubscriptionPlan;
	showProductUpsellButton: boolean;
	showSwitchButton: boolean;
	user: MembersDataApiUser | undefined;
	primaryUser: MembersDataApiUser | undefined;
	navigate: NavigateFunction;
	trackEvent: (trackEventArgs: Event) => void;
	fetchUpgradePreview: (
		fetchUpgradePreviewArgs: FetchUpgradePreviewParams,
	) => Promise<void>;
}) =>
	!primaryUser && (
		<Card.Section>
			<div css={productDetailLayoutCss}>
				<div>
					<h4 css={sectionHeadingCss}>Billing and payment</h4>
					<dl css={keyValueCss}>
						<UserIdRow
							groupedProductType={groupedProductType}
							productDetail={productDetail}
						/>
						<MembershipTierLabelRow
							groupedProductType={groupedProductType}
							productDetail={productDetail}
						/>
						<StartDateRow
							subscriptionStartDate={subscriptionStartDate}
							shouldShowStartDate={shouldShowStartDate}
						/>
						<JoinDateRow
							productDetail={productDetail}
							shouldShowJoinDateNotStartDate={
								shouldShowJoinDateNotStartDate
							}
						/>
						<GiftPurchaseDateRow
							userIsGifter={userIsGifter}
							giftPurchaseDate={giftPurchaseDate}
						/>
						<EndDateRow
							subscriptionEndDate={subscriptionEndDate}
							isGifted={isGifted}
							userIsGifter={userIsGifter}
							productDetail={productDetail}
						/>
						<TrialRemainingRow
							specificProductType={specificProductType}
							productDetail={productDetail}
							isGifted={isGifted}
						/>
						<NextPaymentRow
							nextPaymentDetails={nextPaymentDetails}
							productDetail={productDetail}
							hasCancellationPending={hasCancellationPending}
						/>
						<FutureProductRow
							futureProductTitle={futureProductTitle}
						/>
					</dl>
				</div>
				<div css={wideButtonLayoutCss}>
					<ProductUpsellButton
						isPreviewLoading={isPreviewLoading}
						hasPreviewError={hasPreviewError}
						productDetail={productDetail}
						specificProductType={specificProductType}
						mainPlan={mainPlan}
						showProductUpsellButton={showProductUpsellButton}
						fetchUpgradePreview={fetchUpgradePreview}
						trackEvent={trackEvent}
					/>
					<ProductManageButton
						isGifted={isGifted}
						specificProductType={specificProductType}
						mainPlan={mainPlan}
						groupedProductType={groupedProductType}
						productDetail={productDetail}
						navigate={navigate}
						trackEvent={trackEvent}
					/>
					<ProductSwitchButton
						showSwitchButton={showSwitchButton}
						productDetail={productDetail}
						user={user}
						navigate={navigate}
					/>
				</div>
			</div>
		</Card.Section>
	);

export const LiveEventsSection = ({
	entitledToEvents,
}: {
	entitledToEvents: boolean;
}) =>
	entitledToEvents && (
		<Card.Section>
			<div>
				<h4 css={sectionHeadingCss}>
					Guardian Live - Ticket Tailor promo codes
				</h4>
				<div>
					<dl css={keyValueCss}>
						<dt>{window.atob('TFBQRlJFRTZHTFRY')}</dt>
						<dd>
							gives you 6 free tickets each year (1 per event)
						</dd>
					</dl>
				</div>
				<div>
					<dl css={keyValueCss}>
						<dt>{window.atob('TFBQMjAyR0xUWA==')}</dt>
						<dd>gives you 20% off an extra 2 tickets per event</dd>
					</dl>
				</div>
			</div>
		</Card.Section>
	);

export const PaymentSection = ({
	productDetail,
	specificProductType,
	hasPaymentFailure,
	isGifted,
	isSafeToUpdatePaymentMethod,
	mainPlan,
	navigate,
	trackEvent,
}: {
	productDetail: ProductDetail;
	specificProductType: ProductType;
	hasPaymentFailure: boolean;
	isGifted: boolean;
	isSafeToUpdatePaymentMethod: boolean;
	mainPlan: SubscriptionPlan;
	navigate: NavigateFunction;
	trackEvent: (trackEventArgs: Event) => void;
}) =>
	productDetail.isPaidTier && (
		<Card.Section>
			<div css={productDetailLayoutCss}>
				<div>
					<h4 css={sectionHeadingCss}>Payment method</h4>
					<PaymentMethodDisplay
						subscription={productDetail.subscription}
						inPaymentFailure={hasPaymentFailure}
					/>
				</div>
				{!isGifted && isSafeToUpdatePaymentMethod && (
					<div css={wideButtonLayoutCss}>
						<Button
							aria-label={`${specificProductType.productTitle(
								mainPlan,
							)} : Update payment method`}
							size="small"
							cssOverrides={css`
								justify-content: center;
							`}
							priority="tertiary"
							icon={
								hasPaymentFailure ? (
									<ErrorIcon fill={palette.neutral[100]} />
								) : undefined
							}
							onClick={() => {
								trackEvent({
									eventCategory: 'account_overview',
									eventAction: 'click',
									eventLabel: 'manage_payment_method',
								});
								navigate(
									`/payment/${specificProductType.urlPart}`,
									{
										state: { productDetail },
									},
								);
							}}
						>
							Update payment method
						</Button>
					</div>
				)}
			</div>
			<TaxExclusiveNotice taxExclusive={productDetail.taxExclusive} />
		</Card.Section>
	);

// TODO I suspect this is never hit but I will leave it for not and clean up this file again once I move everything over.
export const GiftPaymentSection = ({
	productDetail,
	isGifted,
	primaryUser,
}: {
	productDetail: ProductDetail;
	isGifted: boolean;
	primaryUser: MembersDataApiUser | undefined;
}) =>
	!productDetail.isPaidTier &&
	!primaryUser && (
		<Card.Section>
			<h4 css={sectionHeadingCss}>Payment</h4>
			<p
				css={css`
					${textSans17};
					margin: 0;
				`}
			>
				{isGifted ? 'Gift redemption' : 'Free'}
			</p>
		</Card.Section>
	);

export const UsCancellationSection = ({
	productDetail,
	groupedProductType,
	specificProductType,
	mainPlan,
	hasCancellationPending,
	isGifted,
	navigate,
	trackEvent,
}: {
	productDetail: ProductDetail;
	groupedProductType: GroupedProductType;
	specificProductType: ProductType;
	mainPlan: SubscriptionPlan;
	hasCancellationPending: boolean;
	isGifted: boolean;
	navigate: NavigateFunction;
	trackEvent: (trackEventArgs: Event) => void;
}) =>
	productDetail.billingCountry === 'United States' &&
	!hasCancellationPending &&
	!isGifted && (
		<Card.Section>
			<div css={productDetailLayoutCss}>
				<div>
					<h4 css={sectionHeadingCss}>
						Cancel {groupedProductType.friendlyName}
					</h4>
					<p
						css={css`
							max-width: 350px;
						`}
					>
						{!productDetail.subscription.autoRenew &&
						!productDetail.subscription.nextPaymentDate ? (
							<>
								This is a one-off payment and will not renew.
								You’ll continue to enjoy your benefits until the
								end of the current billing period.
							</>
						) : (
							<>
								Stop your recurring payment, at the end of
								current billing period.
							</>
						)}
					</p>
				</div>
				<div css={wideButtonLayoutCss}>
					<Button
						aria-label={`Cancel ${specificProductType.productTitle(
							mainPlan,
						)}`}
						size="small"
						cssOverrides={css`
							justify-content: center;
						`}
						priority="tertiary"
						onClick={() => {
							trackEvent({
								eventCategory: 'account_overview',
								eventAction: 'click',
								eventLabel: 'cancel_product',
							});
							navigate(`/cancel/${specificProductType.urlPart}`, {
								state: { productDetail },
							});
						}}
					>
						Cancel {groupedProductType.friendlyName}
					</Button>
				</div>
			</div>
		</Card.Section>
	);
