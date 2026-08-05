import { helpCentreHomeForDomain } from '../../shared/helpCentreConfig';

export const getHelpCentreHomeUrl = (): string =>
	helpCentreHomeForDomain(window.guardian?.domain ?? '');
