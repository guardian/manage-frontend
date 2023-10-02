import { conf } from '@/server/config';

export const buildUrl = (path: string, params: Record<string, string>) => {
	const url = new URL(`https://manage.${conf.DOMAIN}${path}`);
	Object.entries(params).forEach(([key, value]) => {
		url.searchParams.append(key, value);
	});
	// Return only the path and query string
	return url.href.replace(url.origin, '');
};
