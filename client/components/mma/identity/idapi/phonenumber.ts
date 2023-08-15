import {
	addCSRFToken,
	deleteRequest,
	fetchWithDefaultParameters,
} from '@/client/utilities/fetch';

export const remove = async () => {
	const url = '/idapi/user/telephone-number';
	return await fetchWithDefaultParameters(url, addCSRFToken(deleteRequest()));
};
