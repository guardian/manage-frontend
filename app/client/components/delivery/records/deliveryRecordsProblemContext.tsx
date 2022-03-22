import { createContext, Dispatch, SetStateAction } from 'react';
import {
	DeliveryAddress,
	DeliveryRecordApiItem,
	Subscription,
} from '../../../../shared/productResponse';
import { ProductDescriptionListKeyValue } from '../../productDescriptionListTable';
import {
	ContactPhoneNumbers,
	DeliveryProblemMap,
	DeliveryRecordsPostPayload,
} from './deliveryRecordsApi';

export interface DeliveryRecordsProblemType {
	category?: string;
	message?: string;
}

interface DeliveryRecordsProblemContextInterface {
	subscription: Subscription;
	subscriptionCurrency: string;
	productName: string;
	apiProductName?: string;
	problemType?: DeliveryRecordsProblemType;
	affectedRecords: DeliveryRecordApiItem[];
	deliveryProblemMap: DeliveryProblemMap;
	isTestUser: boolean;
	showProblemCredit?: boolean;
	repeatDeliveryProblem?: boolean;
	contactPhoneNumbers?: ContactPhoneNumbers;
	resetDeliveryRecordsPage: () => void;
}

interface DeliveryProblemCreditInterface {
	showCredit?: boolean;
	creditAmount?: string;
	creditDate?: string | null;
}

export const DeliveryRecordsProblemContext =
	createContext<DeliveryRecordsProblemContextInterface>(
		{} as DeliveryRecordsProblemContextInterface,
	);

interface DeliveryRecordsAddressContextInterface {
	address?: DeliveryAddress;
	setAddress?: Dispatch<SetStateAction<DeliveryAddress | undefined>>;
	productsAffected?: ProductDescriptionListKeyValue[];
	setProductsAffected?: Dispatch<
		SetStateAction<ProductDescriptionListKeyValue[]>
	>;
	enableDeliveryInstructions?: boolean;
}

export const DeliveryRecordsAddressContext =
	createContext<DeliveryRecordsAddressContextInterface>({});

export const DeliveryRecordCreditContext =
	createContext<DeliveryProblemCreditInterface | null>(null);

export const DeliveryRecordsProblemPostPayloadContext =
	createContext<DeliveryRecordsPostPayload>({});

{
	/*
		<DeliveryRecordsProblemContext.Provider
			value={{
				subscription: productDetail.subscription,
				subscriptionCurrency,
				productName: capitalize(
					productType.shortFriendlyName || productType.friendlyName,
				),
				apiProductName:
					productType.delivery.records.productNameForProblemReport,
				problemType: deliveryProblem,
				affectedRecords: data.results.filter((record) =>
					selectedProblemRecords.includes(record.id),
				),
				deliveryProblemMap: data.deliveryProblemMap,
				isTestUser: productDetail.isTestUser,
				showProblemCredit:
					!(
						choosenDeliveryProblem ===
						holidaySuspensionDeliveryProblem.label
					) &&
					!productDetail.subscription.cancelledAt &&
					productDetail.subscription.autoRenew &&
					!(
						hasExistingDeliveryProblem &&
						productType.delivery?.records
							?.contactUserOnExistingProblemReport
					),
				repeatDeliveryProblem: hasExistingDeliveryProblem,
				contactPhoneNumbers: data.contactPhoneNumbers,
				resetDeliveryRecordsPage,
			}}
			>*/
}
