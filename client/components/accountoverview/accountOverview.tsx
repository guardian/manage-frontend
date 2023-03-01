import { css } from '@emotion/react';
import {
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { capitalize } from 'lodash';
import { Fragment } from 'react';
import type {
	CancelledProductDetail,
	MembersDataApiItem,
	ProductDetail,
} from '../../../shared/productResponse';
import {
	isProduct,
	SingleProductDetail,
	sortByJoinDate,
} from '../../../shared/productResponse';
import type { GroupedProductTypeKeys } from '../../../shared/productTypes';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../fetch';
import {
	allRecurringProductsDetailFetcher,
	allSingleProductsDetailFetcher,
} from '../../productUtils';
import AsyncLoader from '../asyncLoader';
import { isCancelled } from '../cancel/cancellationSummary';
import { NAV_LINKS } from '../nav/navConfig';
import { PageContainer } from '../page';
import { PaymentFailureAlertIfApplicable } from '../payment/paymentFailureAlertIfApplicable';
import { SupportTheGuardianButton } from '../supportTheGuardianButton';
import { AccountOverviewCancelledCard } from './accountOverviewCancelledCard';
import { AccountOverviewCard } from './accountOverviewCard';
import { EmptyAccountOverview } from './emptyAccountOverview';

import { SingleProductCard } from './singleProductCard';

const AccountOverviewRenderer = ([
	mdaResponse,
	singleProductResponse,
	cancelledProductsResponse,
]: [MembersDataApiItem[], SingleProductDetail[], CancelledProductDetail[]]) => {
	const allActiveProductDetails = mdaResponse
		.filter(isProduct)
		.sort(sortByJoinDate);

	const allSingleProductDetails = singleProductResponse.sort(
		(a, b) => b.created - a.created,
	);

	const allCancelledProductDetails = cancelledProductsResponse.sort(
		(a: CancelledProductDetail, b: CancelledProductDetail) =>
			b.subscription.start.localeCompare(a.subscription.start),
	);

	const recurringProductCategories = [
		...allActiveProductDetails,
		...allCancelledProductDetails,
	]
		.map(
			(product: ProductDetail | CancelledProductDetail) =>
				product.mmaCategory,
		)
		.filter((value, index, self) => self.indexOf(value) === index);

	if (
		allActiveProductDetails.length === 0 &&
		allSingleProductDetails.length === 0
	) {
		return <EmptyAccountOverview />;
	}

	const maybeFirstPaymentFailure = allActiveProductDetails.find(
		(_) => _.alertText,
	);

	const subHeadingCss = css`
		margin: ${space[12]}px 0 ${space[6]}px;
		border-top: 1px solid ${neutral['86']};
		${headline.small({ fontWeight: 'bold' })};
		${until.tablet} {
			font-size: 1.25rem;
			line-height: 1.6;
		}
	`;

	return (
		<>
			<PaymentFailureAlertIfApplicable
				productDetail={maybeFirstPaymentFailure}
			/>
			{recurringProductCategories.map((category) => {
				const groupedProductType =
					GROUPED_PRODUCT_TYPES[category as GroupedProductTypeKeys];
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
								<AccountOverviewCard
									key={
										productDetail.subscription
											.subscriptionId
									}
									productDetail={productDetail}
								/>
							))}
							{cancelledProductsInCategory.map(
								(cancelledProductDetail) => (
									<AccountOverviewCancelledCard
										key={
											cancelledProductDetail.subscription
												.subscriptionId
										}
										product={cancelledProductDetail}
									/>
								),
							)}
							{groupedProductType.supportTheGuardianSectionProps &&
								(cancelledProductsInCategory.length > 0 ||
									activeProductsInCategory.some(
										(productDetail) =>
											isCancelled(
												(productDetail as ProductDetail)
													.subscription,
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
						</Stack>
					</Fragment>
				);
			})}
			<Fragment key="OccasionalSupport">
				<h2 css={subHeadingCss}>Occasional support</h2>
				<Stack space={6}>
					{allSingleProductDetails.map((singleProduct) => {
						return (
							<SingleProductCard
								productDetail={singleProduct}
							></SingleProductCard>
						);
					})}
				</Stack>
			</Fragment>
		</>
	);
};

const AccountOverview = () => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle="Account overview"
			key={''}
		>
			<AccountOverviewAsyncLoader
				fetch={AccountOverviewFetcher}
				render={AccountOverviewRenderer}
				loadingMessage={`Loading your account details...`}
			/>
		</PageContainer>
	);
};

class AccountOverviewAsyncLoader extends AsyncLoader<
	[MembersDataApiItem[], SingleProductDetail[], CancelledProductDetail[]]
> {}

const AccountOverviewFetcher = () =>
	Promise.all([
		allRecurringProductsDetailFetcher(),
		allSingleProductsDetailFetcher(),
		fetchWithDefaultParameters('/api/cancelled/'),
	]);

export default AccountOverview;
