import { SvgGift } from '@guardian/source/react-components';
import { parseDate } from '@/shared/dates';
import type {
	ProductDetail,
	SubscriptionPlan,
} from '../../../../shared/productResponse';
import type { ProductType } from '../../../../shared/productTypes';
import { Ribbon } from '../../shared/Ribbon';
import { getGuardianWeeklyGiftBenefits } from '../shared/benefits/BenefitsConfiguration';
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
import { Card } from '../shared/Card';
import type { NextPaymentDetails } from '../shared/NextPaymentDetails';
import type { ProductCardConfiguration } from './ProductCardConfiguration';
import {
	benefitsTextCss,
	giftRibbonColour,
	giftRibbonCopyColour,
	giftRibbonCss,
	productCardTitleCss,
} from './ProductCardStyles';

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
		<Card.Section backgroundColor="#edf5fA" removeBorders>
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
		<Card.Section backgroundColor="#edf5fA">
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
	((isGifted && !userIsGifter) || !productDetail.subscription.autoRenew) && (
		<div>
			<dt>End date</dt>
			<dd>{parseDate(subscriptionEndDate).dateStr()}</dd>
		</div>
	);
