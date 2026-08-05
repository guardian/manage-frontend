export const DEFAULT_PAGE_TITLE = 'Help Centre | The Guardian';

export const helpCentreHomeForDomain = (domain: string): string =>
	domain === 'theguardian.com'
		? 'https://help.theguardian.com'
		: 'https://help.code.dev-theguardian.com';
