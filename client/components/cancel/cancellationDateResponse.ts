import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../../shared/identity';
import AsyncLoader from '../asyncLoader';
import { fetchWithDefaultParameters } from '../../fetch';

export interface CancellationDateResponse {
	cancellationEffectiveDate: string;
}

export class CancellationDateAsyncLoader extends AsyncLoader<CancellationDateResponse> {}

export const cancellationDateFetcher = (subscriptionName: string) => () =>
	fetchWithDefaultParameters('/api/cancellation-date/' + subscriptionName, {
		headers: {
			[X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
				window.location.href,
			),
		},
	});
