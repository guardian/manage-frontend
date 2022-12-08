import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { featureSwitches } from '../../../shared/featureSwitches';
import { MDA_TEST_USER_HEADER } from '../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';
import useFetch from '../../utilities/hooks/useFetch';
import CancellationSwitchOffer from '../productSwitch/CancellationSwitchOffer';
import type { AvailableProductsResponse } from '../productSwitch/productSwitchApi';
import { Spinner } from '../shared/spinner';
import { WithStandardTopMargin } from '../shared/WithStandardTopMargin';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
	CancellationRouterState,
} from './CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from './CancellationContainer';
import CancellationReasonSelection from './CancellationReasonSelection';

const CancellationSwitchEligibilityCheck = () => {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const productDetail = cancellationContext.productDetail;

	if (!productDetail) {
		return <Navigate to="/" />;
	}

	const groupedProductType =
		GROUPED_PRODUCT_TYPES[
			cancellationContext.productType.groupedProductType
		];

	if (routerState?.dontShowOffer) {
		pageTitleContext.setPageTitle(
			`Cancel ${
				groupedProductType.shortFriendlyName ||
				groupedProductType.friendlyName()
			}`,
		);
		return <CancellationReasonSelection />;
	}

	const cancellationProductSwitchFeatureIsOn =
		featureSwitches.cancellationProductSwitch;

	const { data, error } = useFetch<AvailableProductsResponse[]>(
		`/api/available-product-moves/${productDetail.subscription.subscriptionId}`,
		{
			method: 'GET',
			headers: {
				[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
			},
		},
	);

	if (error) {
		return <CancellationReasonSelection />;
	}

	if (!data) {
		return (
			<WithStandardTopMargin>
				<Spinner
					loadingMessage={`Checking your ${
						cancellationContext.productType.shortFriendlyName ||
						cancellationContext.productType.friendlyName(
							productDetail,
						)
					} details...`}
				/>
			</WithStandardTopMargin>
		);
	}

	return cancellationProductSwitchFeatureIsOn && data.length ? (
		<CancellationSwitchOffer availableProductsToSwitch={data} />
	) : (
		<CancellationReasonSelection />
	);
};

export default CancellationSwitchEligibilityCheck;
