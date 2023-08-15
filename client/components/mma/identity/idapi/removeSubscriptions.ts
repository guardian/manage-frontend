import {
	addCSRFToken,
	deleteRequest,
	fetchWithDefaultParameters,
} from '@/client/utilities/fetch';

export const execute = async () => {
	const url = '/idapi/user/consents/all';
	await fetchWithDefaultParameters(url, addCSRFToken(deleteRequest()));
};
