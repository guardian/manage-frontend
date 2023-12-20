import { css } from '@emotion/react';
import {
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { capitalize } from 'lodash';
import { Fragment } from 'react';
import { JsonResponseProcessor } from '@/client/utilities/responseHandlers';
import { featureSwitches } from '../../../../shared/featureSwitches';
import type { MPAPIResponse } from '../../../../shared/mpapiResponse';
import { isValidAppSubscription } from '../../../../shared/mpapiResponse';
import type {
	CancelledProductDetail,
	MembersDataApiResponse,
	ProductDetail,
	SingleProductDetail,
} from '../../../../shared/productResponse';
import {
	isProduct,
	isSpecificProductType,
	sortByJoinDate,
} from '../../../../shared/productResponse';
import {
	GROUPED_PRODUCT_TYPES,
	PRODUCT_TYPES,
} from '../../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import {
	allRecurringProductsDetailFetcher,
	allSingleProductsDetailFetcher,
} from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { SupportTheGuardianButton } from '../../shared/SupportTheGuardianButton';
import { isCancelled } from '../cancel/CancellationSummary';
import { PageContainer } from '../Page';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import type { IsFromAppProps } from '../shared/IsFromAppProps';
import { nonServiceableCountries } from '../shared/NonServiceableCountries';
import { PaymentFailureAlertIfApplicable } from '../shared/PaymentFailureAlertIfApplicable';
import { CancelledProductCard } from './CancelledProductCard';
import { EmptyAccountOverview } from './EmptyAccountOverview';
import { InAppPurchaseCard } from './InAppPurchaseCard';
import { PersonalisedHeader } from './PersonalisedHeader';
import { ProductCard } from './ProductCard';
import { SingleContributionCard } from './SingleContributionCard';

type AccountOverviewResponse = [
	MembersDataApiResponse,
	CancelledProductDetail[],
	MPAPIResponse,
	SingleProductDetail[],
];

const subHeadingCss = css`
	margin: ${space[12]}px 0 ${space[6]}px;
	border-top: 1px solid ${palette.neutral['86']};
	${headline.small({ fontWeight: 'bold' })};
	${until.tablet} {
		font-size: 1.25rem;
		line-height: 1.6;
	}
`;

const AccountOverviewPage = ({ isFromApp }: IsFromAppProps) => {
	const { data: accountOverviewResponse, loadingState } =
		useAsyncLoader<AccountOverviewResponse>(
			accountOverviewFetcher,
			JsonResponseProcessor,
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

	const [
		mdapiResponse,
		cancelledProductsResponse,
		mpapiResponse,
		singleContributions,
	] = accountOverviewResponse;

	const allActiveProductDetails = mdapiResponse.products
		.filter(isProduct)
		.sort(sortByJoinDate);

	const allCancelledProductDetails = cancelledProductsResponse.sort(
		(a: CancelledProductDetail, b: CancelledProductDetail) =>
			b.subscription.start.localeCompare(a.subscription.start),
	);

	const productCategories = [
		...allActiveProductDetails,
		...allCancelledProductDetails,
	]
		.map(
			(product: ProductDetail | CancelledProductDetail) =>
				product.mmaCategory,
		)
		.filter((value, index, self) => self.indexOf(value) === index);

	const appSubscriptions = mpapiResponse.subscriptions.filter(
		isValidAppSubscription,
	);

	if (
		featureSwitches.appSubscriptions &&
		appSubscriptions.length > 0 &&
		!productCategories.includes('subscriptions')
	) {
		productCategories.push('subscriptions');
	}

	if (
		singleContributions.length > 0 &&
		!productCategories.includes('subscriptions')
	) {
		productCategories.push('subscriptions');
	}

	if (
		allActiveProductDetails.length === 0 &&
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

	const hasNonServiceableCountry = nonServiceableCountries.includes(
		allActiveProductDetails.find(isProduct)?.billingCountry as string,
	);

	const isEligibleToSwitch =
		!maybeFirstPaymentFailure &&
		!hasDigiSubAndContribution &&
		!hasNonServiceableCountry;

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
			{productCategories.map((category) => {
				const groupedProductType = GROUPED_PRODUCT_TYPES[category];
				const activeProductsInCategory = allActiveProductDetails.filter(
					(activeProduct) => activeProduct.mmaCategory === category,
				);
				const cancelledProductsInCategory =
					allCancelledProductDetails.filter(
						(activeProduct) =>
							activeProduct.mmaCategory === category,
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
												${textSans.medium()}
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
		</>
	);
};

const accountOverviewFetcher = () =>
	Promise.all([
		allRecurringProductsDetailFetcher(),
		fetchWithDefaultParameters('/api/cancelled/'),
		fetchWithDefaultParameters('/mpapi/user/mobile-subscriptions'),
		allSingleProductsDetailFetcher(),
	]);

export const AccountOverview = ({ isFromApp }: IsFromAppProps) => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle="Account overview"
		>
			<AccountOverviewPage isFromApp={isFromApp} />
		</PageContainer>
	);
};
