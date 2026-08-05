import { conf } from '../../server/config';
import { helpCentreHomeForDomain } from '../../shared/helpCentreConfig';

export const getHelpCentreHomeUrl = (): string => {
	const domain =
		typeof window !== 'undefined' && window.guardian
			? window.guardian.domain
			: conf.DOMAIN;

	return helpCentreHomeForDomain(domain);
};
