import {
	addCSRFToken,
	fetchWithDefaultParameters,
	patchRequest,
} from '@/client/utilities/fetch';
import type { ConsentOption } from '../models';
import { ConsentOptionType } from '../models';

export interface NewsletterAPIResponse {
	id: string;
	theme: string;
	group: string;
	name: string;
	description: string;
	frequency: string;
	subscribed: boolean;
	exactTargetListId: number;
}

export const newsletterToConsentOption = (
	newsletter: NewsletterAPIResponse,
): ConsentOption => {
	const {
		id: identityName,
		theme,
		name,
		group,
		description,
		frequency,
		exactTargetListId,
	} = newsletter;
	return {
		id: exactTargetListId.toString(),
		description,
		theme,
		type: ConsentOptionType.NEWSLETTER,
		group,
		name,
		frequency,
		subscribed: false,
		identityName,
	};
};

export const read = async (): Promise<ConsentOption[]> => {
	const url = '/idapi/newsletters';
	return await fetchWithDefaultParameters(url)
		.then((response) => response.json() as Promise<NewsletterAPIResponse[]>)
		.then((newsletters) => newsletters.map(newsletterToConsentOption));
};

export const readRestricted = async (): Promise<ConsentOption[]> => {
	const url = '/idapi/newsletters/restricted';
	return await fetchWithDefaultParameters(url)
		.then((response) => response.json() as Promise<NewsletterAPIResponse[]>)
		.then((newsletters) => newsletters.map(newsletterToConsentOption));
};

export const update = async (id: string, subscribed: boolean = true) => {
	const url = '/idapi/user/newsletters';
	await fetchWithDefaultParameters(
		url,
		addCSRFToken(
			patchRequest({
				id,
				subscribed,
			}),
		),
	);
};
