import type { MultipleAccountsApiResponse } from '@/shared/productResponse';
import { getSpecificProductTypeFromProductKey } from '@/shared/productResponse';
import { Card } from '../shared/Card';
import {
	getSecondaryUserBenefitsCopy,
	secondaryUserBenefitsCopy,
} from './ProductCardConfiguration';
import {
	BenefitsCopyAndToggle,
	ProductCardHeader,
	SecondaryUserSubscriptionDetails,
} from './ProductCardSections';

export const SecondaryAccountProductCard = ({
	maapiResponse,
}: {
	maapiResponse: MultipleAccountsApiResponse;
}) => {
	// TODO: This is a placeholder. We will likely need to adjust this.

	// TODO Hard-coded atm
	const specificProductType =
		getSpecificProductTypeFromProductKey('Digital Pack');
	const mainPlan = {
		name: specificProductType.friendlyName,
		shouldBeVisible: true,
	};
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in SecondaryAccountCard');
	}
	const productTitle = specificProductType.productTitle(mainPlan);
	const cardConfig = getSecondaryUserBenefitsCopy;
	const overrideBenefitsText = secondaryUserBenefitsCopy();

	return (
		<>
			{maapiResponse.primaryUsers.map((primaryUser, index) => (
				<Card key={index}>
					<ProductCardHeader
						cardConfig={cardConfig}
						productTitle={productTitle}
					/>

					<BenefitsCopyAndToggle
						cardConfig={cardConfig}
						specificProductType={specificProductType}
						mainPlan={mainPlan}
						overrideBenefitsText={overrideBenefitsText}
					/>

					<SecondaryUserSubscriptionDetails
						subscriptionName={productTitle}
						primarySubscriber={primaryUser}
					/>
				</Card>
			))}
		</>
	);
};
