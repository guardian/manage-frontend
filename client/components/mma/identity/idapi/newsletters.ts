import { getCookie } from '@/client/utilities/cookies';
import {
	addCSRFToken,
	fetchWithDefaultParameters,
	patchRequest,
} from '@/client/utilities/fetch';
import type { ConsentOption } from '../models';
import { ConsentOptionType } from '../models';

export interface NewsletterAPIResponse {
	id: string;
	status: string;
	theme: string;
	group: string;
	name: string;
	signUpDescription?: string | null;
	signUpEmbedDescription?: string | null;
	frequency: string;
	exactTargetListId?: number | null;
	listId?: number | null;
}

export const newsletterToConsentOption = (
	newsletter: NewsletterAPIResponse,
): ConsentOption => {
	const {
		id: identityName,
		theme,
		name,
		group,
		signUpDescription,
		signUpEmbedDescription,
		frequency,
		exactTargetListId,
		listId,
	} = newsletter;
	const description = signUpDescription ?? signUpEmbedDescription ?? '';
	const consentId = exactTargetListId ?? listId ?? identityName;
	return {
		id: consentId.toString(),
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

	const browserId = getCookie('bwid');

	import('@guardian/ophan-tracker-js/MMA').then(async ({ viewId }) => {
		await fetchWithDefaultParameters(
			url,
			addCSRFToken(
				patchRequest({
					id,
					subscribed,
					refViewId: viewId,
					browserId,
				}),
			),
		);
	});
};
