import { css } from '@emotion/react';
import { from, space, textSans17 } from '@guardian/source/foundations';
import { Stack } from '@guardian/source/react-components';
import { capitalize } from 'lodash';
import { Fragment, useEffect } from 'react';
import { useAccountStore } from '@/client/stores/AccountStore';
import { useUpgradeProductStore } from '@/client/stores/UpgradeProductStore';
import {
	subHeadingCss,
	subHeadingInformationTextCss,
} from '@/client/styles/headings';
import { featureSwitches } from '../../../../shared/featureSwitches';
import type { MPAPIResponse } from '../../../../shared/mpapiResponse';
import { isValidAppSubscription } from '../../../../shared/mpapiResponse';
import type {
	CancelledProductDetail,
	MembersDataApiResponse,
	ProductDetail,
	ProductTier,
	SingleProductDetail,
} from '../../../../shared/productResponse';
import { userHasGuardianEmail } from '../../../../shared/productResponse';
import {
	getSpecificProductTypeFromProductKey,
	isPlusDigitalProductType,
	isProduct,
	isProductResponse,
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
import { DownloadEditionsAppCtaWithImage } from '../shared/DownloadEditionsAppCtaWithImage';
import { DownloadFeastAppCtaWithImage } from '../shared/DownloadFeastAppCtaWithImage';
import type { IsFromAppProps } from '../shared/IsFromAppProps';
import { NewspaperArchiveCta } from '../shared/NewspaperArchiveCta';
import { nonServiceableCountries } from '../shared/NonServiceableCountries';
import { PaymentFailureAlertIfApplicable } from '../shared/PaymentFailureAlertIfApplicable';
import { ProblemAlert } from '../shared/ProblemAlert';
import { CanadaStrike } from './CanadaStrike';
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

const benefitsCtasContainerCss = css`
	> * + * {
		margin-top: ${space[4]}px;
	}
	${from.tablet} {
		> * + * {
			margin-top: ${space[5]}px;
		}
	}
`;

type BenefitsCtasProps = {
	email: string;
	productKeys?: ProductTier[];
};

export const BenefitsCtas = ({ email, productKeys }: BenefitsCtasProps) => {
	const hasDigitalPlusPrint = productKeys?.some((productKey) =>
		isSpecificProductType(productKey, PRODUCT_TYPES.tierthree),
	);

	const isPlusDigitalProduct = productKeys?.some((productKey) =>
		isPlusDigitalProductType(productKey),
	);

	const hasDigitalPack = productKeys?.some((productKey) =>
		isSpecificProductType(productKey, PRODUCT_TYPES.digipack),
	);

	const hasSupporterPlus = productKeys?.some((productKey) =>
		isSpecificProductType(productKey, PRODUCT_TYPES.supporterplus),
	);

	const hasGuardianEmail = email ? userHasGuardianEmail(email) : false;

	const hasEditionsAndArchiveAccess =
		hasDigitalPlusPrint ||
		isPlusDigitalProduct ||
		hasDigitalPack ||
		hasGuardianEmail;

	return (
		<>
			{(hasDigitalPlusPrint ||
				isPlusDigitalProduct ||
				hasGuardianEmail ||
				hasDigitalPack ||
				hasSupporterPlus) && (
					<>
						<h2 css={subHeadingCss}>
							Get the most out of your benefits
						</h2>
						<div css={benefitsCtasContainerCss}>
							<DownloadAppCtaVariation1 />
							<DownloadFeastAppCtaWithImage />
							{hasEditionsAndArchiveAccess && (
								<>
									<DownloadEditionsAppCtaWithImage />
									<NewspaperArchiveCta />
								</>
							)}
						</div>
					</>
				)}
		</>
	);
};

const AccountOverviewPage = ({ isFromApp }: IsFromAppProps) => {
	const { setAllResponses } = useAccountStore();
	const { previewError, setPreviewError } = useUpgradeProductStore();

	const { data: accountOverviewResponse, loadingState } =
		useAsyncLoaderAllSettled(
			productFetchPromisesAndRefs,
			JsonResponseHandler,
		);

	const {
		mdapiResponse,
		cancelledProductsResponse,
		mpapiResponse,
		singleContributionsResponse,
	} = (accountOverviewResponse as Partial<ProductFetchResponse>) ?? {};

	useEffect(() => {
		return () => {
			if (previewError) {
				setPreviewError(null);
			}
		};
	}, [previewError, setPreviewError]);

	useEffect(() => {
		if (
			loadingState === LoadingState.HasLoaded &&
			accountOverviewResponse
		) {
			setAllResponses({
				mdapiResponse: mdapiResponse ?? undefined,
				cancelledProductsResponse:
					cancelledProductsResponse ?? undefined,
				mpapiResponse: mpapiResponse ?? undefined,
				singleContributionsResponse:
					singleContributionsResponse ?? undefined,
			});
		}
	}, [
		loadingState,
		accountOverviewResponse,
		mdapiResponse,
		cancelledProductsResponse,
		mpapiResponse,
		singleContributionsResponse,
		setAllResponses,
	]);

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
		const specificProductType = getSpecificProductTypeFromProductKey(
			product.mmaProductKey,
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
		return (
			<EmptyAccountOverview
				email={mdapiResponse.user?.email ?? 'badMDAPIresponse1'}
			/>
		);
	}

	const allActiveProductKeys = allActiveProductDetails.map(
		({ mmaProductKey }) => mmaProductKey,
	);

	const maybeFirstPaymentFailure = allActiveProductDetails.find(
		(product) => product.alertText,
	);

	const hasDigiSubAndContribution =
		allActiveProductKeys.some((productDetail) =>
			isSpecificProductType(productDetail, PRODUCT_TYPES.contributions),
		) &&
		allActiveProductKeys.some((productDetail) =>
			isSpecificProductType(productDetail, PRODUCT_TYPES.digipack),
		);

	const hasNonServiceableCountry = nonServiceableCountries.includes(
		allActiveProductDetails.find(isProduct)?.billingCountry as string,
	);

	const isEligibleToSwitch =
		!maybeFirstPaymentFailure &&
		!hasDigiSubAndContribution &&
		!hasNonServiceableCountry;

	const isEligibleToUpsell =
		!maybeFirstPaymentFailure && !hasNonServiceableCountry;

	const visualProductGroupingCategory = (
		product: ProductDetail | CancelledProductDetail,
	): GroupedProductTypeKeys => {
		const specificProductType = getSpecificProductTypeFromProductKey(
			product.mmaProductKey,
		);
		if (
			specificProductType.groupedProductType ===
			'recurringSupportWithBenefits'
		) {
			return 'subscriptions';
		}
		return specificProductType.groupedProductType;
	};

	const possiblyAffectedByCanadaPostStrike = allActiveProductDetails.some(
		(product) => {
			const deliveryCountry =
				product.subscription.deliveryAddress?.country?.toUpperCase();
			return (
				(product.mmaProductKey === 'Tier Three' ||
					product.mmaProductKey === 'Guardian Weekly - ROW') &&
				(deliveryCountry === 'CANADA' || deliveryCountry === 'CA')
			);
		},
	);

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
			{previewError && (
				<ProblemAlert
					title="Unable to upgrade your subscription"
					message={
						<p css={subHeadingInformationTextCss}>
							You are not currently eligible for an upgrade
							on this channel. Please find the customer care
							contact to discuss your upgrade option:{' '}
							<a href="https://manage.theguardian.com/help-centre">
								https://manage.theguardian.com/help-centre
							</a>
						</p>
					}
					additionalcss={css`
						margin-top: ${space[5]}px;
					`}
				/>
			)}
			{possiblyAffectedByCanadaPostStrike && <CanadaStrike />}
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
									isEligibleToUpsell={isEligibleToUpsell}
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
			{mdapiResponse.user && (
				<BenefitsCtas
					email={mdapiResponse.user.email}
					productKeys={allActiveProductKeys}
				/>
			)}
		</>
	);
};

export const AccountOverview = ({ isFromApp }: IsFromAppProps) => (
	<PageContainer
		selectedNavItem={NAV_LINKS.accountOverview}
		pageTitle="Account overview"
		minimalFooter
	>
		<AccountOverviewPage isFromApp={isFromApp} />
	</PageContainer>
);
