import type { Dispatch, SetStateAction } from 'react';
import { Outlet } from 'react-router';
import { handleResponses } from '@/client/utilities/responseHandlers';
import type { DateRange } from '../../../../shared/dates';
import { MDA_TEST_USER_HEADER } from '../../../../shared/productResponse';
import type { ProductDetail } from '../../../../shared/productResponse';
import type { ProductTypeWithHolidayStopsFlow } from '../../../../shared/productTypes';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { embellishExistingHolidayStops } from './HolidayStopApi';
import type {
	GetHolidayStopsResponse,
	HolidayStopDetail,
	HolidayStopRequest,
} from './HolidayStopApi';
import { HolidayStopsContext } from './HolidayStopsContainer';

const HolidayStopsResponseHandler = (response: Response | Response[]) => {
	return handleResponses(response, embellishExistingHolidayStops);
};

export const HolidayStopsPage = ({
	productType,
	productDetail,
	existingHolidayStopToAmend,
	setExistingHolidayStopToAmend,
	selectedRange,
	setSelectedRange,
	publicationsImpacted,
	setPublicationsImpacted,
	setShouldReload,
}: {
	productDetail: ProductDetail;
	productType: ProductTypeWithHolidayStopsFlow;
	existingHolidayStopToAmend: HolidayStopRequest | null;
	setExistingHolidayStopToAmend: Dispatch<
		SetStateAction<HolidayStopRequest | null>
	>;
	selectedRange: DateRange | undefined;
	setSelectedRange: Dispatch<SetStateAction<DateRange | undefined>>;
	publicationsImpacted: HolidayStopDetail[];
	setPublicationsImpacted: Dispatch<SetStateAction<HolidayStopDetail[]>>;
	setShouldReload: Dispatch<SetStateAction<boolean>>;
}) => {
	const { data: holidayStopResponse, loadingState } =
		useAsyncLoader<GetHolidayStopsResponse>(
			() =>
				fetch(
					`/api/holidays/${productDetail.subscription.subscriptionId}`,
					{
						headers: {
							[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
						},
					},
				),
			HolidayStopsResponseHandler,
		);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView />;
	}

	if (holidayStopResponse === null) {
		return <GenericErrorScreen />;
	}

	return (
		<HolidayStopsContext.Provider
			value={{
				productType,
				productDetail,
				existingHolidayStopToAmend,
				setExistingHolidayStopToAmend,
				selectedRange,
				setSelectedRange,
				publicationsImpacted,
				setPublicationsImpacted,
				holidayStopResponse,
				setShouldReload,
			}}
		>
			<Outlet />
		</HolidayStopsContext.Provider>
	);
};
