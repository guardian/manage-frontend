import Cookies from 'js-cookie';
import { IdentityLocations } from '../IdentityLocations';

const handleResponseFailure = async (response: Response) => {
	let err;
	const raw = await response.text();
	try {
		err = JSON.parse(raw);
	} catch (_) {
		err = raw;
	}
	throw err;
};

const handleResponseSuccess = async <T>(response: Response): Promise<T> => {
	try {
		return await response.json();
	} catch (e) {
		throw new Error(`Error decoding JSON response: ${e}`);
	}
};

const getAPIOptionsForMethod =
	(method: string) =>
	(payload: any): RequestInit => ({
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

export const APIFetch =
	(baseUrl: string) =>
	async <T>(url: string, options?: RequestInit): Promise<T> => {
		const response = await fetch(baseUrl + url, options);
		if (!response.ok) {
			return await handleResponseFailure(response);
		} else if (response.status === 204) {
			return null as any;
		} else {
			return await handleResponseSuccess<T>(response);
		}
	};

export const APIFilePostOptions = (payload: File): RequestInit => {
	const data = new FormData();
	data.append('file', payload);
	return {
		method: 'POST',
		body: data,
	};
};

export const APIPutOptions = getAPIOptionsForMethod('PUT');
export const APIPatchOptions = getAPIOptionsForMethod('PATCH');

export const APIUseCredentials = (options: RequestInit): RequestInit => ({
	...options,
	credentials: 'include',
});

export const APIUseXSRFHeader = (options: RequestInit): RequestInit => {
	const token = Cookies.get('XSRF-TOKEN');
	if (!token) {
		return options;
	}
	const headers = {
		...options.headers,
		'csrf-token': token,
	};
	return {
		...options,
		headers,
	};
};

export const localFetch = APIFetch('');
export const identityFetch = APIFetch(IdentityLocations.IDAPI);
