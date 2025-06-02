export const getCookie = (name: string): string | null => {
	const cookies: string[] = document?.cookie
		.split(';')
		.filter((keyValue) => keyValue.trim().startsWith(name + '='));

	return cookies.length ? cookies[0].trim().replace(name + '=', '') : null;
};

export const parseJwt = (token: string) => {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(
				(char) =>
					'%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2),
			)
			.join(''),
	);

	return JSON.parse(jsonPayload);
};
