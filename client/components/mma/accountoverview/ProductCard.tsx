import { Stack } from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import type {
	MembersDataApiUser,
	PaidSubscriptionPlan,
	ProductDetail,
} from '@/shared/productResponse';
import {
	getMainPlan,
	getSpecificProductTypeFromProductKey,
	isGift,
	isPaidSubscriptionPlan,
} from '@/shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';
import { trackEvent } from '../../../utilities/analytics';
import { useUpgradeProduct } from '../../../utilities/hooks/useUpgradePreview';
import { getGuardianWeeklyGiftBenefits } from '../shared/benefits/BenefitsConfiguration';
import { Card } from '../shared/Card';
import { getNextPaymentDetails } from '../shared/NextPaymentDetails';
import {
	getGuardianWeeklyGiftBenefitsCopy,
	productCardConfiguration,
} from './ProductCardConfiguration';
import {
	CancellationInfoRow,
	OfferActiveInfoRow,
	OfferPauseInfoRow,
} from './ProductCardInfoSummaries';
import {
	BenefitsCopyAndToggle,
	BillingAndPaymentSection,
	GiftPaymentSection,
	GuardianAdLiteCopy,
	LiveEventsSection,
	PaymentSection,
	ProductCardHeader,
	UsCancellationSection,
} from './ProductCardSections';

export const ProductCard = ({
	productDetail,
	isEligibleToSwitch,
	isEligibleToUpsell,
	user,
}: {
	productDetail: ProductDetail;
	isEligibleToSwitch: boolean;
	isEligibleToUpsell: boolean;
	user?: MembersDataApiUser;
}) => {
	const navigate = useNavigate();
	const mainPlan = getMainPlan(productDetail.subscription);
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in ProductCard');
	}

	const specificProductType = getSpecificProductTypeFromProductKey(
		productDetail.mmaProductKey,
	);

	const { fetchUpgradePreview, isPreviewLoading, hasPreviewError } =
		useUpgradeProduct();

	const groupedProductType =
		GROUPED_PRODUCT_TYPES[specificProductType.groupedProductType];

	const isPatron = productDetail.subscription.readerType === 'Patron';

	const entitledToEvents =
		['Partner', 'Patron'].includes(productDetail.mmaProductKey) &&
		(mainPlan as PaidSubscriptionPlan).features.includes('Events');

	const productTitle = `${specificProductType.productTitle(mainPlan)}${
		isPatron ? ' — Patron' : ''
	}`;

	const isGifted = isGift(productDetail.subscription);
	const userIsGifter = isGifted && productDetail.isPaidTier;
	const gwGiftSubscription =
		isGifted && specificProductType.productType === 'guardianweekly';
	const benefitsOverrideForGWGift = gwGiftSubscription
		? getGuardianWeeklyGiftBenefits()
		: undefined;
	const giftPurchaseDate = productDetail.subscription.lastPaymentDate;
	const shouldShowJoinDateNotStartDate =
		groupedProductType.shouldShowJoinDateNotStartDate;
	const shouldShowStartDate = !(
		shouldShowJoinDateNotStartDate || userIsGifter
	);
	const subscriptionStartDate = productDetail.subscription.start;
	const subscriptionEndDate = productDetail.subscription.end;
	const hasCancellationPending = productDetail.subscription.cancelledAt;

	const isSafeToUpdatePaymentMethod =
		productDetail.subscription.safeToUpdatePaymentMethod;
	const hasPaymentFailure = !!productDetail.alertText;
	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		productDetail.subscription,
		null,
		hasPaymentFailure,
	);

	const showSwitchButton =
		isEligibleToSwitch &&
		!hasCancellationPending &&
		specificProductType.productType === 'contributions';

	const showProductUpsellButton =
		isEligibleToUpsell &&
		!hasCancellationPending &&
		!productDetail.taxExclusive &&
		specificProductType.productType === 'supporterplus';

	const productBenefits =
		specificProductType.productType === 'supporterplus'
			? 'supporter benefits'
			: groupedProductType.friendlyName;

	const cardConfig = gwGiftSubscription
		? getGuardianWeeklyGiftBenefitsCopy
		: productCardConfiguration[specificProductType.productType];

	const canBeInOfferPeriod =
		specificProductType.productType === 'supporterplus';
	const canBeInPausePeriod =
		specificProductType.productType === 'contributions';

	const isInOfferOrPausePeriod =
		!hasCancellationPending &&
		productDetail.subscription.nextPaymentDate &&
		productDetail.subscription.potentialCancellationDate &&
		productDetail.subscription.nextPaymentDate !==
			productDetail.subscription.potentialCancellationDate;

	const futurePlan = productDetail.subscription.futurePlans[0];
	const isBillingFrequencySwitch =
		futurePlan?.mmaProductKey === productDetail.mmaProductKey &&
		isPaidSubscriptionPlan(mainPlan) &&
		isPaidSubscriptionPlan(futurePlan) &&
		mainPlan.billingPeriod !== futurePlan.billingPeriod;

	const futureProductTitle =
		futurePlan?.mmaProductKey &&
		productDetail.mmaProductKey &&
		productDetail.subscription.currentPlans.length > 0
			? isBillingFrequencySwitch
				? `${getSpecificProductTypeFromProductKey(
						futurePlan.mmaProductKey,
				  ).productTitle(mainPlan)} ${
						futurePlan.billingPeriod === 'year'
							? '(annual)'
							: futurePlan.billingPeriod === 'month'
							? '(monthly)'
							: futurePlan.billingPeriod
				  }`
				: getSpecificProductTypeFromProductKey(
						futurePlan.mmaProductKey,
				  ).productTitle(mainPlan)
			: null;

	return (
		<Stack space={4}>
			<CancellationInfoRow
				hasCancellationPending={hasCancellationPending}
				productDetail={productDetail}
				groupedProductType={groupedProductType}
				productBenefits={productBenefits}
			/>

			<OfferActiveInfoRow
				canBeInOfferPeriod={canBeInOfferPeriod}
				isInOfferOrPausePeriod={isInOfferOrPausePeriod}
				nextPaymentDetails={nextPaymentDetails}
				mainPlan={mainPlan}
			/>

			<OfferPauseInfoRow
				canBeInPausePeriod={canBeInPausePeriod}
				isInOfferOrPausePeriod={isInOfferOrPausePeriod}
				nextPaymentDetails={nextPaymentDetails}
			/>

			<Card>
				<ProductCardHeader
					cardConfig={cardConfig}
					productTitle={productTitle}
					isGifted={isGifted}
				/>

				<BenefitsCopyAndToggle
					cardConfig={cardConfig}
					nextPaymentDetails={nextPaymentDetails}
					specificProductType={specificProductType}
					mainPlan={mainPlan}
					overrideBenefits={benefitsOverrideForGWGift}
				/>

				<GuardianAdLiteCopy
					nextPaymentDetails={nextPaymentDetails}
					specificProductType={specificProductType}
				/>

				<BillingAndPaymentSection
					groupedProductType={groupedProductType}
					productDetail={productDetail}
					specificProductType={specificProductType}
					shouldShowStartDate={shouldShowStartDate}
					subscriptionStartDate={subscriptionStartDate}
					subscriptionEndDate={subscriptionEndDate}
					shouldShowJoinDateNotStartDate={
						shouldShowJoinDateNotStartDate
					}
					userIsGifter={userIsGifter}
					giftPurchaseDate={giftPurchaseDate}
					isGifted={isGifted}
					nextPaymentDetails={nextPaymentDetails}
					hasCancellationPending={hasCancellationPending}
					futureProductTitle={futureProductTitle}
					isPreviewLoading={isPreviewLoading}
					hasPreviewError={hasPreviewError}
					mainPlan={mainPlan}
					showProductUpsellButton={showProductUpsellButton}
					showSwitchButton={showSwitchButton}
					user={user}
					navigate={navigate}
					trackEvent={trackEvent}
					fetchUpgradePreview={fetchUpgradePreview}
				/>

				<LiveEventsSection entitledToEvents={entitledToEvents} />

				<PaymentSection
					productDetail={productDetail}
					specificProductType={specificProductType}
					hasPaymentFailure={hasPaymentFailure}
					isGifted={isGifted}
					isSafeToUpdatePaymentMethod={isSafeToUpdatePaymentMethod}
					mainPlan={mainPlan}
					navigate={navigate}
					trackEvent={trackEvent}
				/>

				<GiftPaymentSection
					productDetail={productDetail}
					isGifted={isGifted}
				/>

				<UsCancellationSection
					productDetail={productDetail}
					groupedProductType={groupedProductType}
					specificProductType={specificProductType}
					mainPlan={mainPlan}
					hasCancellationPending={hasCancellationPending}
					isGifted={isGifted}
					navigate={navigate}
					trackEvent={trackEvent}
				/>
			</Card>
		</Stack>
	);
};
