import { APIUseCredentials, identityFetch } from './fetch';

export const execute = async () => {
	const url = '/remove/consent/all';
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	};
	return identityFetch<void>(url, APIUseCredentials(options));
};
