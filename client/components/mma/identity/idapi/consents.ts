import {
	addCSRFToken,
	fetchWithDefaultParameters,
	patchRequest,
} from '@/client/utilities/fetch';
import type { ConsentOption } from '../models';
import { ConsentOptionType } from '../models';

export interface ConsentAPIResponse {
	id: string;
	description?: string;
	name: string;
	isOptOut: boolean;
	isChannel: boolean;
	isProduct: boolean;
}

export const consentToConsentOption = (
	response: ConsentAPIResponse,
): ConsentOption => {
	const { id, description, name, isProduct, isChannel, isOptOut } = response;
	return {
		id,
		description,
		name,
		isProduct,
		isChannel,
		type: isOptOut ? ConsentOptionType.OPT_OUT : ConsentOptionType.EMAIL,
		subscribed: false,
	};
};

export const read = async (): Promise<ConsentOption[]> => {
	const url = '/idapi/user/consents';
	return await fetchWithDefaultParameters(url)
		.then((response) => response.json() as Promise<ConsentAPIResponse[]>)
		.then((consents) => consents.map(consentToConsentOption));
};

export const update = async (id: string, consented: boolean = true) => {
	const url = '/idapi/user/consents';
	const payload = {
		id,
		consented,
	};
	await fetchWithDefaultParameters(url, addCSRFToken(patchRequest(payload)));
};
