import type { MembersDataApiResponse } from '../../../../shared/productResponse';
import {
	getSpecificProductTypeFromProductKey,
	isProduct,
} from '../../../../shared/productResponse';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { allRecurringProductsDetailFetcher } from '../../../utilities/productUtils';
import { JsonResponseHandler } from '../../mma/shared/asyncComponents/DefaultApiResponseHandler';

export const SubscriptionInformation = () => {
	const {
		data,
		loadingState,
	}: {
		data: MembersDataApiResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(allRecurringProductsDetailFetcher, JsonResponseHandler);

	if (loadingState === LoadingState.IsLoading) {
		return (
			<>
				<h3>Subscription Information:</h3>
				<p>Loading...</p>
			</>
		);
	}

	if (loadingState === LoadingState.HasError || data === null) {
		return (
			<>
				<h3>Subscription Information:</h3>
				<p>
					User is not logged in / no subscription information
					available
				</p>
			</>
		);
	}

	return (
		<>
			<h3>Subscription Information:</h3>
			<ul>
				{data.products.length > 0 ? (
					data.products.map((product) => {
						if (isProduct(product)) {
							const specificProductType =
								getSpecificProductTypeFromProductKey(
									product.mmaProductKey,
								);
							return (
								<li>
									{product.mmaProductKey} -{' '}
									{specificProductType.groupedProductType} -{' '}
									{product.subscription.subscriptionId}
								</li>
							);
						}
					})
				) : (
					<li>User has no subscription</li>
				)}
			</ul>
		</>
	);
};
