const fetchDefaultParameters: RequestInit = {
	credentials: 'include',
	mode: 'same-origin',
};

export const fetchWithDefaultParameters: typeof fetch = (url, options) => {
	return fetch(url, { ...fetchDefaultParameters, ...options });
};
