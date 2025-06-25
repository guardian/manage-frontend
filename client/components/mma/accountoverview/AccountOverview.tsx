import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans17,
	until,
} from '@guardian/source/foundations';
import { Stack } from '@guardian/source/react-components';
import { capitalize } from 'lodash';
import { Fragment } from 'react';
import { featureSwitches } from '../../../../shared/featureSwitches';
import type { MPAPIResponse } from '../../../../shared/mpapiResponse';
import { isValidAppSubscription } from '../../../../shared/mpapiResponse';
import type {
	CancelledProductDetail,
	MembersDataApiResponse,
	ProductDetail,
	SingleProductDetail,
} from '../../../../shared/productResponse';
import { isProductResponse } from '../../../../shared/productResponse';
import {
	getSpecificProductTypeFromTier,
	isProduct,
	isSpecificProductType,
	sortByJoinDate,
} from '../../../../shared/productResponse';
import type { GroupedProductTypeKeys } from '../../../../shared/productTypes';
import {
	GROUPED_PRODUCT_TYPES,
	PRODUCT_TYPES,
} from '../../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import {
	LoadingState,
	useAsyncLoaderAllSettled,
} from '../../../utilities/hooks/useAsyncLoaderAllSettled';
import {
	allRecurringProductsDetailFetcher,
	allSingleProductsDetailFetcher,
} from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { SupportTheGuardianButton } from '../../shared/SupportTheGuardianButton';
import { isCancelled } from '../cancel/CancellationSummary';
import { PageContainer } from '../Page';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { DownloadAppCtaVariation1 } from '../shared/DownloadAppCtaVariation1';
import { DownloadFeastAppCtaWithImage } from '../shared/DownloadFeastAppCtaWithImage';
import type { IsFromAppProps } from '../shared/IsFromAppProps';
import { NewspaperArchiveCta } from '../shared/NewspaperArchiveCta';
import { nonServiceableCountries } from '../shared/NonServiceableCountries';
import { PaymentFailureAlertIfApplicable } from '../shared/PaymentFailureAlertIfApplicable';
import { ProblemAlert } from '../shared/ProblemAlert';
import { CancelledProductCard } from './CancelledProductCard';
import { EmptyAccountOverview } from './EmptyAccountOverview';
import { InAppPurchaseCard } from './InAppPurchaseCard';
import { PersonalisedHeader } from './PersonalisedHeader';
import { ProductCard } from './ProductCard';
import { SingleContributionCard } from './SingleContributionCard';

interface ProductFetchResponse {
	mdapiResponse: MembersDataApiResponse;
	cancelledProductsResponse: CancelledProductDetail[];
	mpapiResponse: MPAPIResponse;
	singleContributionsResponse: SingleProductDetail[];
}

const productFetchPromisesAndRefs = () => {
	return [
		{ promise: allRecurringProductsDetailFetcher(), ref: 'mdapiResponse' },
		{
			promise: fetchWithDefaultParameters('/api/cancelled/'),
			ref: 'cancelledProductsResponse',
		},
		{
			promise: fetchWithDefaultParameters(
				'/mpapi/user/mobile-subscriptions',
			),
			ref: 'mpapiResponse',
		},
		{
			promise: allSingleProductsDetailFetcher(),
			ref: 'singleContributionsResponse',
		},
	];
};

const subHeadingCss = css`
	margin: ${space[6]}px 0 ${space[6]}px;
	border-top: 1px solid ${palette.neutral['86']};
	${headlineBold28};
	${until.tablet} {
		font-size: 1.25rem;
		line-height: 1.6;
	}
	${from.tablet} {
		margin-top: ${space[8]}px;
	}
`;

const AccountOverviewPage = ({ isFromApp }: IsFromAppProps) => {
	const { data: accountOverviewResponse, loadingState } =
		useAsyncLoaderAllSettled(
			productFetchPromisesAndRefs,
			JsonResponseHandler,
		);
	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return (
			<DefaultLoadingView loadingMessage="Loading your account details..." />
		);
	}
	if (accountOverviewResponse === null) {
		return <GenericErrorScreen />;
	}

	const {
		mdapiResponse,
		cancelledProductsResponse,
		mpapiResponse,
		singleContributionsResponse,
	} = accountOverviewResponse as Partial<ProductFetchResponse>;

	const failedProductRequestMessages = [];
	if (!cancelledProductsResponse) {
		failedProductRequestMessages.push(
			"If you have any cancelled products, we're currently unable to display them. Please try again later",
		);
	}
	if (!mpapiResponse) {
		failedProductRequestMessages.push(
			"If you've purchased a subscription through the Guardian app, we're currently unable to display those details. Please try again later.",
		);
	}
	if (!singleContributionsResponse) {
		failedProductRequestMessages.push(
			"If you have made a single contribution, we're currently unable to display those details. Please try again later.",
		);
	}

	if (!isProductResponse(mdapiResponse)) {
		return <GenericErrorScreen />;
	}

	const singleContributions = singleContributionsResponse || [];

	const allActiveProductDetails = mdapiResponse.products
		.filter(isProduct)
		.sort(sortByJoinDate);

	const activeProductsNotPendingCancellation = allActiveProductDetails.filter(
		(product: ProductDetail) => !product.subscription.cancelledAt,
	);

	const allCancelledProductDetails = cancelledProductsResponse
		? cancelledProductsResponse.sort(
				(a: CancelledProductDetail, b: CancelledProductDetail) =>
					b.subscription.start.localeCompare(a.subscription.start),
		  )
		: [];

	const allProductCategories = [
		...allActiveProductDetails,
		...allCancelledProductDetails,
	].map((product: ProductDetail | CancelledProductDetail) => {
		const specificProductType = getSpecificProductTypeFromTier(
			product.tier,
		);
		if (
			specificProductType.groupedProductType ===
			'recurringSupportWithBenefits'
		) {
			return 'subscriptions'; // we want to override the display text in MMA for RC/S+ but not affect functionality
		}
		return specificProductType.groupedProductType;
	});

	const uniqueProductCategories = [...new Set(allProductCategories)];

	const appSubscriptions = mpapiResponse
		? mpapiResponse.subscriptions.filter(isValidAppSubscription)
		: [];

	if (
		featureSwitches.appSubscriptions &&
		appSubscriptions.length > 0 &&
		!uniqueProductCategories.includes('subscriptions')
	) {
		uniqueProductCategories.push('subscriptions');
	}

	if (
		singleContributions.length > 0 &&
		!uniqueProductCategories.includes('subscriptions')
	) {
		uniqueProductCategories.push('subscriptions');
	}

	if (
		allActiveProductDetails.length === 0 &&
		allCancelledProductDetails.length === 0 &&
		appSubscriptions.length === 0 &&
		singleContributions.length === 0
	) {
		return <EmptyAccountOverview />;
	}

	const maybeFirstPaymentFailure = allActiveProductDetails.find(
		(product) => product.alertText,
	);

	const hasDigiSubAndContribution =
		allActiveProductDetails.some((productDetail) =>
			isSpecificProductType(productDetail, PRODUCT_TYPES.contributions),
		) &&
		allActiveProductDetails.some((productDetail) =>
			isSpecificProductType(productDetail, PRODUCT_TYPES.digipack),
		);

	const hasDigitalPlusPrint = allActiveProductDetails.some((productDetail) =>
		isSpecificProductType(productDetail, PRODUCT_TYPES.tierthree),
	);

	const hasNonServiceableCountry = nonServiceableCountries.includes(
		allActiveProductDetails.find(isProduct)?.billingCountry as string,
	);

	const isEligibleToSwitch =
		!maybeFirstPaymentFailure &&
		!hasDigiSubAndContribution &&
		!hasNonServiceableCountry;

	const visualProductGroupingCategory = (
		product: ProductDetail | CancelledProductDetail,
	): GroupedProductTypeKeys => {
		const specificProductType = getSpecificProductTypeFromTier(
			product.tier,
		);
		if (
			specificProductType.groupedProductType ===
			'recurringSupportWithBenefits'
		) {
			return 'subscriptions';
		}
		return specificProductType.groupedProductType;
	};

	return (
		<>
			<PersonalisedHeader
				mdapiResponse={mdapiResponse}
				mpapiResponse={mpapiResponse}
			/>

			<PaymentFailureAlertIfApplicable
				productDetails={allActiveProductDetails}
				isFromApp={isFromApp}
			/>
			{failedProductRequestMessages.length > 0 && (
				<ProblemAlert
					message={
						<>
							{failedProductRequestMessages.map(
								(failureMessage) => (
									<p>{failureMessage}</p>
								),
							)}
						</>
					}
				/>
			)}
			{uniqueProductCategories.map((category) => {
				const groupedProductType = GROUPED_PRODUCT_TYPES[category];
				const activeProductsInCategory = allActiveProductDetails.filter(
					(activeProduct) =>
						visualProductGroupingCategory(activeProduct) ===
						category,
				);
				const cancelledProductsInCategory =
					allCancelledProductDetails.filter(
						(cancelledProduct) =>
							visualProductGroupingCategory(cancelledProduct) ===
							category,
					);

				return (
					<Fragment key={category}>
						<h2 css={subHeadingCss}>
							{capitalize(groupedProductType.groupFriendlyName)}
						</h2>
						<Stack space={6}>
							{activeProductsInCategory.map((productDetail) => (
								<ProductCard
									key={
										productDetail.subscription
											.subscriptionId
									}
									productDetail={productDetail}
									isEligibleToSwitch={isEligibleToSwitch}
									user={mdapiResponse.user}
								/>
							))}
							{cancelledProductsInCategory.map(
								(cancelledProductDetail) => (
									<CancelledProductCard
										key={
											cancelledProductDetail.subscription
												.subscriptionId
										}
										productDetail={cancelledProductDetail}
										hasOtherActiveSubs={
											!!activeProductsNotPendingCancellation.length
										}
									/>
								),
							)}
							{groupedProductType.supportTheGuardianSectionProps &&
								(cancelledProductsInCategory.length > 0 ||
									activeProductsInCategory.some(
										(productDetail) =>
											isCancelled(
												productDetail.subscription,
											),
									)) && (
									<div>
										<p
											css={css`
												${textSans17};
											`}
										>
											{
												groupedProductType
													.supportTheGuardianSectionProps
													.message
											}
										</p>
										<SupportTheGuardianButton
											{...groupedProductType.supportTheGuardianSectionProps}
											size="small"
										/>
									</div>
								)}
							{featureSwitches.appSubscriptions &&
								appSubscriptions.length > 0 &&
								category === 'subscriptions' &&
								appSubscriptions.map((subscription) => (
									<InAppPurchaseCard
										key={subscription.subscriptionId}
										subscription={subscription}
									/>
								))}
							{category === 'subscriptions' &&
								singleContributions.length > 0 && (
									<SingleContributionCard
										singleContributions={
											singleContributions
										}
									/>
								)}
						</Stack>
					</Fragment>
				);
			})}
			{hasDigitalPlusPrint && (
				<>
					<h2 css={subHeadingCss}>
						Get the most out of your benefits
					</h2>
					<Stack space={6}>
						{featureSwitches.digitalArchiveCta && (
							<NewspaperArchiveCta />
						)}
						<DownloadAppCtaVariation1 />
						<DownloadFeastAppCtaWithImage />
					</Stack>
				</>
			)}
		</>
	);
};

export const AccountOverview = ({ isFromApp }: IsFromAppProps) => (
	<PageContainer
		selectedNavItem={NAV_LINKS.accountOverview}
		pageTitle="Account overview"
	>
		<AccountOverviewPage isFromApp={isFromApp} />
	</PageContainer>
);
