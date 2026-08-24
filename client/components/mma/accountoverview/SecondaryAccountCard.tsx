import { useNavigate } from 'react-router-dom';
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
	subscription,
}: {
	subscription: MultipleAccountPrimaryUser;
}) => {
	const navigate = useNavigate();
	const specificProductType =
		getSpecificProductTypeFromProductKey('Digital Pack');
	const mainPlan = {
		name: specificProductType.friendlyName,
		shouldBeVisible: true,
	};
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
				primarySubscriber={subscription}
				navigate={navigate}
			/>
		</Card>
	);
};
