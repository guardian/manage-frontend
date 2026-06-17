import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import {
	Button,
	SvgGift,
	SvgInfoRound,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import type { NavigateFunction } from 'react-router-dom';
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
import { getGuardianWeeklyGiftBenefits } from '../shared/benefits/BenefitsConfiguration';
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
import { Card } from '../shared/Card';
import type { NextPaymentDetails } from '../shared/NextPaymentDetails';
import type { ProductCardConfiguration } from './ProductCardConfiguration';
import {
	benefitsSectionBackgroundColour,
	benefitsTextCss,
	centeredButtonCss,
	giftRibbonColour,
	giftRibbonCopyColour,
	giftRibbonCss,
	productCardTitleCss,
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
	isGifted: boolean;
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
	nextPaymentDetails,
	specificProductType,
	mainPlan,
	gwGiftSubscription,
}: {
	cardConfig: ProductCardConfiguration;
	nextPaymentDetails: NextPaymentDetails | undefined;
	specificProductType: ProductType;
	mainPlan: SubscriptionPlan;
	gwGiftSubscription: boolean;
}) =>
	cardConfig.getBenefitsSectionCopy &&
	nextPaymentDetails && (
		<Card.Section
			backgroundColor={benefitsSectionBackgroundColour}
			removeBorders
		>
			<p css={benefitsTextCss}>
				{cardConfig.getBenefitsSectionCopy(nextPaymentDetails)}
			</p>
			<BenefitsToggle
				productType={specificProductType.productType}
				subscriptionPlan={mainPlan}
				overrideBenefits={
					gwGiftSubscription ? getGuardianWeeklyGiftBenefits() : null
				}
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

export const StartDateRow = ({
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

export const JoinDateRow = ({
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

export const GiftPurchaseDateRow = ({
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

export const EndDateRow = ({
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

export const UserIdRow = ({
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

export const MembershipTierLabelRow = ({
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

export const TrialRemainingRow = ({
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

export const NextPaymentRow = ({
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

export const FutureProductRow = ({
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

export const ProductUpsellButton = ({
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

export const ProductManageButton = ({
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

export const ProductSwitchButton = ({
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
