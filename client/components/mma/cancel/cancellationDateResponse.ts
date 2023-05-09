import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../../../shared/identity';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';

export interface CancellationDateResponse {
	cancellationEffectiveDate: string;
}

export const cancellationDateFetcher = (subscriptionName: string) => () =>
	fetchWithDefaultParameters('/api/cancellation-date/' + subscriptionName, {
		headers: {
			[X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
				window.location.href,
			),
		},
	});
