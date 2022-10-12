import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	dateString,
} from '../../../../shared/dates';
import type { DeliveryAddress } from '../../../../shared/productResponse';
import type { ContactIdToArrayOfProductDetailAndProductType } from '../../../services/deliveryAddress';
import { flattenEquivalent } from '../../../utils';

export interface AddressSetStateObject {
	setAddressLine1: Dispatch<SetStateAction<string>>;
	setAddressLine2: Dispatch<SetStateAction<string>>;
	setTown: Dispatch<SetStateAction<string>>;
	setRegion: Dispatch<SetStateAction<string>>;
	setPostcode: Dispatch<SetStateAction<string>>;
	setCountry: Dispatch<SetStateAction<string>>;
	setInstructions: Dispatch<SetStateAction<string>>;
}

interface NewDeliveryAddressContextInterface {
	addressStateObject?: DeliveryAddress;
	addressSetStateObject?: AddressSetStateObject;
}

export interface SubscriptionEffectiveData {
	friendlyProductName: string;
	subscriptionId: string;
	effectiveDate?: Date;
}

export const NewDeliveryAddressContext =
	createContext<NewDeliveryAddressContextInterface>({});

export const AddressChangedInformationContext = createContext<
	SubscriptionEffectiveData[]
>([]);

export const ContactIdContext =
	createContext<ContactIdToArrayOfProductDetailAndProductType>({});

export function isAddress(
	maybeAddress: DeliveryAddress | undefined,
): maybeAddress is DeliveryAddress {
	return !!maybeAddress?.postcode;
}

export const convertToDescriptionListData = (
	addressChangeAffectedInfo: SubscriptionEffectiveData[],
) =>
	addressChangeAffectedInfo
		.map((element) => [
			{
				title: element.friendlyProductName,
				value: element.subscriptionId,
			},
			{
				title: 'Front cover date',
				value: element.effectiveDate
					? dateString(
							element.effectiveDate,
							DATE_FNS_LONG_OUTPUT_FORMAT,
					  )
					: '-',
			},
		])
		.flatMap(flattenEquivalent);
