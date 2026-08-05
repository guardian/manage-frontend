export const DEFAULT_PAGE_TITLE = 'Help Centre | The Guardian';

/** Client-side: use window.guardian.domain (STAGE is not available in the browser bundle). */
export const helpCentreHomeForDomain = (domain: string): string =>
	domain === 'theguardian.com'
		? 'https://help.theguardian.com'
		: 'https://help.code.dev-theguardian.com';
