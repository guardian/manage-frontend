import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { featureSwitches } from '../../../shared/featureSwitches';
import { MDA_TEST_USER_HEADER } from '../../../shared/productResponse';
import useFetch from '../../services/useFetch';
import CancellationSwitchOffer from '../productSwitch/CancellationSwitchOffer';
import { AvailableProductsResponse } from '../productSwitch/productSwitchApi';
import { Spinner } from '../spinner';
import { WithStandardTopMargin } from '../WithStandardTopMargin';
import {
	CancellationContext,
	CancellationContextInterface,
	CancellationPageTitleContext,
	CancellationPageTitleInterface,
	CancellationRouterState,
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

	if (!routerState) {
		return <Navigate to="/" />;
	}

	if (routerState?.dontShowOffer) {
		pageTitleContext.setPageTitle(
			`Cancel ${
				cancellationContext.productType.shortFriendlyName ||
				cancellationContext.productType.friendlyName
			}`,
		);
		return <CancellationReasonSelection />;
	}

	const cancellationProductSwitchFeatureIsOn =
		featureSwitches.cancellationProductSwitch;

	const { data, error } = useFetch<AvailableProductsResponse[]>(
		`/api/available-product-moves/${routerState.productDetail.subscription.subscriptionId}`,
		{
			method: 'GET',
			headers: {
				[MDA_TEST_USER_HEADER]: `${routerState.productDetail.isTestUser}`,
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
						cancellationContext.productType.friendlyName
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
