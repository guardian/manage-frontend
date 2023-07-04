import type { ConsentOption } from '../models';
import { ConsentOptionType } from '../models';
import { APIPatchOptions, APIUseCredentials, identityFetch } from './fetch';

interface NewsletterAPIResponse {
	id: string;
	theme: string;
	group: string;
	name: string;
	description: string;
	frequency: string;
	subscribed: boolean;
	exactTargetListId: number;
}

const newsletterToConsentOption = (
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
	const url = '/newsletters';
	const newslettersResponse = await identityFetch<NewsletterAPIResponse[]>(
		url,
	);
	console.log({ idapiNewslettersResponse: newslettersResponse });
	return newslettersResponse.map(newsletterToConsentOption);
};

export const readRestricted = async (): Promise<ConsentOption[]> => {
	const url = '/newsletters/restricted';
	return (await identityFetch<NewsletterAPIResponse[]>(url)).map(
		newsletterToConsentOption,
	);
};

export const update = async (id: string, subscribed: boolean = true) => {
	const url = '/users/me/newsletters';
	const payload = {
		id,
		subscribed,
	};
	identityFetch(url, APIUseCredentials(APIPatchOptions(payload)));
};
