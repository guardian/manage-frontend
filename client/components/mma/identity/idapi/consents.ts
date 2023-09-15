import type { ConsentOption } from '../models';
import { ConsentOptionType } from '../models';
import { APIPatchOptions, APIUseCredentials, identityFetch } from './fetch';

export interface ConsentAPIResponse {
	id: string;
	description?: string;
	name: string;
	isOptOut: boolean;
	isChannel: boolean;
	isProduct: boolean;
}

const consentToConsentOption = (
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
	const url = '/consents?filter=all';
	return (await identityFetch<ConsentAPIResponse[]>(url)).map(
		consentToConsentOption,
	);
};

export const update = async (id: string, consented: boolean = true) => {
	const url = '/users/me/consents';
	const payload = [
		{
			id,
			consented,
		},
	];
	await identityFetch(url, APIUseCredentials(APIPatchOptions(payload)));
};
