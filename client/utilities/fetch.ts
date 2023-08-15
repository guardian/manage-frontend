import Cookies from 'js-cookie';
import { CLIENTSIDE_CSRF_COOKIE_NAME } from '../../server/util';
import type { HTTPMethod } from '../../shared/apiTypes';

const fetchDefaultParameters: RequestInit = {
	credentials: 'include',
	mode: 'same-origin',
};

const getOptionsForMethod =
	<T>(method: HTTPMethod) =>
	(payload?: T): RequestInit => ({
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: payload ? JSON.stringify(payload) : undefined,
	});

export const addCSRFToken = (options: RequestInit): RequestInit => {
	const token = Cookies.get(CLIENTSIDE_CSRF_COOKIE_NAME);
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

export const postRequest = getOptionsForMethod('POST');
export const patchRequest = getOptionsForMethod('PATCH');
export const deleteRequest = getOptionsForMethod('DELETE');
export const putRequest = getOptionsForMethod('PUT');

export const filePostRequest = (payload: File): RequestInit => ({
	method: 'POST',
	body: payload,
});

export const fetchWithDefaultParameters: typeof fetch = (url, options) => {
	return fetch(url, { ...fetchDefaultParameters, ...options });
};
