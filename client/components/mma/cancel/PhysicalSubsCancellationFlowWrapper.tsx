import type { ReactNode } from 'react';
import { DATE_FNS_INPUT_FORMAT, parseDate } from '../../../../shared/dates';
import type { ProductDetail } from '../../../../shared/productResponse';
import { MDA_TEST_USER_HEADER } from '../../../../shared/productResponse';
import type { ProductType } from '../../../../shared/productTypes';
import type { DeliveryRecordsResponse } from '../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStopsResponse } from '../holiday/HolidayStopApi';
import { AsyncLoader } from '../shared/AsyncLoader';
import {
	cancellationEffectiveToday,
	CancellationOutstandingCreditsContext,
	CancellationPolicyContext,
} from './cancellationContexts';

type CombinedOutstandingCreditsResponse = [
	OutstandingHolidayStopsResponse,
	DeliveryRecordsResponse | undefined,
];

class OutstandingHolidayStopsAsyncLoader extends AsyncLoader<CombinedOutstandingCreditsResponse> {}

const getOutstandingCreditsFetcher =
	(
		productDetail: ProductDetail,
		productType: ProductType,
		cancellationPolicy: string | undefined,
	) =>
	async () => {
		const effectiveCancellationDate =
			!productDetail.subscription.chargedThroughDate ||
			cancellationPolicy === cancellationEffectiveToday
				? parseDate()
				: parseDate(productDetail.subscription.chargedThroughDate);

		const outstandingHolidayStopsPromise = fetch(
			`/api/holidays/${
				productDetail.subscription.subscriptionId
			}/cancel?effectiveCancellationDate=${effectiveCancellationDate.dateStr(
				DATE_FNS_INPUT_FORMAT,
			)}`,
			{
				headers: {
					[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
				},
			},
		);

		const optionalOutstandingDeliveryProblemCreditsPromise =
			productType.delivery?.records &&
			fetch(
				`/api/delivery-records/${
					productDetail.subscription.subscriptionId
				}/cancel?effectiveCancellationDate=${effectiveCancellationDate.dateStr(
					DATE_FNS_INPUT_FORMAT,
				)}`,
				{
					headers: {
						[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
					},
				},
			);

		return Promise.all([
			outstandingHolidayStopsPromise,
			...(optionalOutstandingDeliveryProblemCreditsPromise
				? [optionalOutstandingDeliveryProblemCreditsPromise]
				: []),
		]);
	};

export type RestOfCancellationFlow = ReactNode | ReactNode[];

const getContextualRestOfFlowRenderer =
	(restOfFlow: RestOfCancellationFlow) =>
	([
		outstandingHolidayStops,
		outstandingDeliveryProblemCredits,
	]: CombinedOutstandingCreditsResponse) =>
		(
			<CancellationOutstandingCreditsContext.Provider
				value={{
					holidayStops: outstandingHolidayStops.publicationsToRefund,
					deliveryCredits: outstandingDeliveryProblemCredits?.results,
				}}
			>
				{restOfFlow}
			</CancellationOutstandingCreditsContext.Provider>
		);

export const physicalSubsCancellationFlowWrapper =
	(productDetail: ProductDetail, productType: ProductType) =>
	(restOfFlow: RestOfCancellationFlow) =>
		(
			<CancellationPolicyContext.Consumer>
				{(cancellationPolicy) => (
					<OutstandingHolidayStopsAsyncLoader
						fetch={getOutstandingCreditsFetcher(
							productDetail,
							productType,
							cancellationPolicy,
						)}
						render={getContextualRestOfFlowRenderer(restOfFlow)}
						loadingMessage="Checking for outstanding credits owed to you..."
					/>
				)}
			</CancellationPolicyContext.Consumer>
		);
