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
import { featureSwitches } from '../../../../shared/featureSwitches';
import type {
	CancelledProductDetail,
	MembersDataApiItem,
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../shared/productResponse';
import {
	isProduct,
	isSpecificProductType,
	mdapiResponseReader,
	sortByJoinDate,
} from '../../../../shared/productResponse';
import {
	GROUPED_PRODUCT_TYPES,
	PRODUCT_TYPES,
} from '../../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import { allProductsDetailFetcher } from '../../../utilities/productUtils';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { SupportTheGuardianButton } from '../../shared/SupportTheGuardianButton';
import { isCancelled } from '../cancel/CancellationSummary';
import { PageContainer } from '../Page';
import { AsyncLoader } from '../shared/AsyncLoader';
import { PaymentFailureAlertIfApplicable } from '../shared/PaymentFailureAlertIfApplicable';
import { AccountOverviewCancelledCard } from './AccountOverviewCancelledCard';
import { AccountOverviewCard } from './AccountOverviewCard';
import { AccountOverviewCardV2 } from './AccountOverviewCardV2';
import { EmptyAccountOverview } from './EmptyAccountOverview';
import { PersonalisedHeader } from './PersonalisedHeader';

const AccountOverviewRenderer = ([mdapiObject, cancelledProductsResponse]: [
	MembersDataApiResponse | MembersDataApiItem[],
	CancelledProductDetail[],
]) => {
	const mdaResponse = mdapiResponseReader(mdapiObject);

	const allActiveProductDetails = mdaResponse.products
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

	if (allActiveProductDetails.length === 0) {
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

	const isEligibleToSwitch =
		!maybeFirstPaymentFailure && !hasDigiSubAndContribution;

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
			<PersonalisedHeader mdapiResponse={mdaResponse} />

			<PaymentFailureAlertIfApplicable
				productDetails={allActiveProductDetails}
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
							{activeProductsInCategory.map((productDetail) =>
								featureSwitches.accountOverviewNewLayout ||
								productDetail.tier === 'IAP' ? ( // ToDo: remove this check when moving to V2
									<AccountOverviewCardV2
										key={
											productDetail.subscription
												.subscriptionId
										}
										productDetail={productDetail}
										isEligibleToSwitch={isEligibleToSwitch}
										user={mdaResponse.user}
									/>
								) : (
									<AccountOverviewCard
										key={
											productDetail.subscription
												.subscriptionId
										}
										productDetail={productDetail}
									/>
								),
							)}
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
						</Stack>
					</Fragment>
				);
			})}
		</>
	);
};

export const AccountOverview = () => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle="Account overview"
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
	[MembersDataApiResponse, CancelledProductDetail[]]
> {}

const AccountOverviewFetcher = () =>
	Promise.all([
		allProductsDetailFetcher(),
		fetchWithDefaultParameters('/api/cancelled/'),
	]);
