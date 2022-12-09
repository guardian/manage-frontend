import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import type { DeliveryAddress } from '../../../../shared/productResponse';
import type { ProductDescriptionListKeyValue } from '../../ProductDescriptionListTable';
import type { DeliveryRecordsPostPayload } from './deliveryRecordsApi';

export interface DeliveryRecordsProblemType {
	category?: string;
	message?: string;
}

interface DeliveryProblemCreditInterface {
	showCredit?: boolean;
	creditAmount?: string;
	creditDate?: string | null;
}

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
