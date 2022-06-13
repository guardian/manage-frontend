import { DEFAULT_PAGE_TITLE } from '../../shared/helpCentreConfig';

export const setPageTitle = (suffix: string = '') => {
	// tslint:disable-next-line:no-object-mutation
	document.title = DEFAULT_PAGE_TITLE + (suffix ? ' | ' + suffix : '');
};
