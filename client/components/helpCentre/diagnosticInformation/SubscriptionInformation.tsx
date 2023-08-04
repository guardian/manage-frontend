import { useEffect, useState } from 'react';
import type { MembersDataApiResponse } from '../../../../shared/productResponse';
import { isProduct } from '../../../../shared/productResponse';
import { allRecurringProductsDetailFetcher } from '../../../utilities/productUtils';

export const SubscriptionInformation = () => {
	const [memberData, setMemberData] = useState<
		MembersDataApiResponse | 'failed' | 'loading'
	>('loading');

	useEffect(() => {
		const fetchData = async () => {
			const resp = await allRecurringProductsDetailFetcher();

			if (resp.ok) {
				const data = (await resp.json()) as MembersDataApiResponse;
				setMemberData(data);
			} else {
				setMemberData('failed');
			}
		};

		fetchData().catch((e) => {
			console.error(e);
			setMemberData('failed');
		});
	}, []);

	if (memberData === 'loading') {
		return (
			<>
				<h3>Subscription Information</h3>
				<p>Loading...</p>
			</>
		);
	}

	if (memberData === 'failed') {
		return (
			<>
				<h3>Subscription Information</h3>
				<p>User is not logged in / no attribute data available</p>
			</>
		);
	}

	return (
		<>
			<h3>Subscription Information</h3>
			<ul>
				{memberData.products.length > 0 ? (
					memberData.products.map((product) => {
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
