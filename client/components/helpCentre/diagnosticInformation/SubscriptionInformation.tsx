import { JsonResponseHandler } from '@/client/utilities/responseHandlers';
import type { MembersDataApiResponse } from '../../../../shared/productResponse';
import { isProduct } from '../../../../shared/productResponse';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { allRecurringProductsDetailFetcher } from '../../../utilities/productUtils';

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
							return (
								<li>
									{product.tier} - {product.mmaCategory} -{' '}
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
