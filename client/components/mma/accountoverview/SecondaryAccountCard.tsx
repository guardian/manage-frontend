import type { MultipleAccountPrimaryUser } from '@/shared/productResponse';
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
	primaryUser,
}: {
	primaryUser: MultipleAccountPrimaryUser;
}) => {
	const specificProductType =
		getSpecificProductTypeFromProductKey('Digital Pack');
	const mainPlan = {
		name: specificProductType.friendlyName,
		shouldBeVisible: true,
	};
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in SecondaryAccountCard');
	}
	const productTitle =
		specificProductType.productTitle(mainPlan) + ' shared subscription';
	const cardConfig = getSecondaryUserBenefitsCopy;
	const overrideBenefitsText = secondaryUserBenefitsCopy();

	return (
		<Card>
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
	);
};
