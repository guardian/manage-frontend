import { LOGGING_CODE_SUFFIX_HEADER } from '../../../shared/globals';
import { MDA_TEST_USER_HEADER } from '../../../shared/productResponse';
import { fetchWithDefaultParameters } from '../../utilities/fetch';
import AsyncLoader from '../AsyncLoader';

interface CaseUpdateResponse {
	message: string;
}

export class CaseUpdateAsyncLoader extends AsyncLoader<CaseUpdateResponse> {}

export const getUpdateCasePromise = (
	isTestUser: boolean,
	loggingCodeSuffix: string,
	caseId: string,
	body: object,
) =>
	fetchWithDefaultParameters('/api/case/' + caseId, {
		method: 'PATCH',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			[LOGGING_CODE_SUFFIX_HEADER]: loggingCodeSuffix,
			[MDA_TEST_USER_HEADER]: `${isTestUser}`,
		},
	});
