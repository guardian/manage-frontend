import type { DateRange, ParsedDate } from '../../../../shared/dates';
import {
	DATE_FNS_INPUT_FORMAT,
	dateAddYears,
	dateRange,
	dateString,
	getOldestDate,
	parseDate,
} from '../../../../shared/dates';
import { MDA_TEST_USER_HEADER } from '../../../../shared/productResponse';
import { AsyncLoader } from '../shared/AsyncLoader';

interface CommonCreditProperties {
	estimatedPrice?: number;
	actualPrice?: number;
}

interface RawHolidayStopDetail extends CommonCreditProperties {
	publicationDate: string;
	invoiceDate?: string;
}

export interface HolidayStopDetail extends CommonCreditProperties {
	publicationDate: ParsedDate;
	invoiceDate?: ParsedDate;
}

interface MutabilityFlags {
	isFullyMutable: boolean;
	isEndDateEditable: boolean;
}

interface RawHolidayStopRequest {
	startDate: string;
	endDate: string;
	id: string;
	subscriptionName: string;
	publicationsImpacted: RawHolidayStopDetail[];
	mutabilityFlags: MutabilityFlags;
	withdrawnTime?: string;
	bulkSuspensionReason?: string;
}

export interface RawPotentialHolidayStopDetail {
	publicationDate: string;
	credit?: number;
	invoiceDate?: string;
}

export interface PotentialHolidayStopsResponse {
	potentials: RawPotentialHolidayStopDetail[];
	nextInvoiceDateAfterToday: string;
}

export type OutstandingHolidayStop = object; // refine type if needed

export interface OutstandingHolidayStopsResponse {
	publicationsToRefund: OutstandingHolidayStop[];
}

export interface MinimalHolidayStopRequest {
	id?: string;
	subscriptionName?: string;
	publicationsImpacted: HolidayStopDetail[];
	dateRange: DateRange;
	mutabilityFlags?: MutabilityFlags;
	withdrawnDate?: ParsedDate;
	bulkSuspensionReason?: string;
}

export interface HolidayStopRequest extends MinimalHolidayStopRequest {
	mutabilityFlags: MutabilityFlags;
}

export interface GetHolidayStopsResponse {
	productSpecifics: {
		firstAvailableDate: Date;
		issueDaysOfWeek: number[];
	};
	annualIssueLimit: number;
	existing: HolidayStopRequest[];
}

interface RawGetHolidayStopsResponse {
	issueSpecifics: Array<{
		issueDayOfWeek: number;
		firstAvailableDate: string;
	}>;
	annualIssueLimit: number;
	existing: RawHolidayStopRequest[];
}

export const convertRawPotentialHolidayStopDetail = (
	raw: RawPotentialHolidayStopDetail,
) => ({
	estimatedPrice: raw.credit,
	invoiceDate: raw.invoiceDate ? parseDate(raw.invoiceDate) : undefined,
	publicationDate: parseDate(raw.publicationDate),
});

// tslint:disable-next-line:max-classes-per-file
export class PotentialHolidayStopsAsyncLoader extends AsyncLoader<PotentialHolidayStopsResponse> {}

export const getPotentialHolidayStopsFetcher =
	(
		subscriptionName: string,
		startDate: Date,
		endDate: Date,
		isTestUser: boolean,
	) =>
	() =>
		fetch(
			`/api/holidays/${subscriptionName}/potential?startDate=${dateString(
				startDate,
				DATE_FNS_INPUT_FORMAT,
			)}&endDate=${dateString(endDate, DATE_FNS_INPUT_FORMAT)}`,
			{
				headers: {
					[MDA_TEST_USER_HEADER]: `${isTestUser}`,
				},
			},
		);

export interface CreateOrAmendHolidayStopsResponse {
	success: string;
}

// tslint:disable-next-line:max-classes-per-file
export class CreateOrAmendHolidayStopsAsyncLoader extends AsyncLoader<CreateOrAmendHolidayStopsResponse> {}

export function isHolidayStopsResponse(
	data: GetHolidayStopsResponse | {} | undefined,
): data is GetHolidayStopsResponse {
	return !!data && data.hasOwnProperty('existing');
}

export const isNotWithdrawn = (holidayStopRequest: HolidayStopRequest) =>
	!holidayStopRequest.withdrawnDate;

export const isNotBulkSuspension = (holidayStopRequest: HolidayStopRequest) =>
	!holidayStopRequest.bulkSuspensionReason;

const embellishRawHolidayStop = (
	rawHolidayStopRequest: RawHolidayStopRequest,
) =>
	({
		...rawHolidayStopRequest,
		withdrawnDate: rawHolidayStopRequest.withdrawnTime
			? parseDate(
					rawHolidayStopRequest.withdrawnTime,
					"yyyy-MM-dd'T'kk:mm:ss.SSS'Z'",
			  ) // 2021-06-16T13:24:49.000Z
			: undefined,
		dateRange: dateRange(
			rawHolidayStopRequest.startDate,
			rawHolidayStopRequest.endDate,
		),
		publicationsImpacted: rawHolidayStopRequest.publicationsImpacted.map(
			(raw) => ({
				...raw,
				publicationDate: parseDate(raw.publicationDate),
				invoiceDate: raw.invoiceDate
					? parseDate(raw.invoiceDate)
					: undefined,
			}),
		),
	} as HolidayStopRequest);

export const embellishExistingHolidayStops = async (response: Response) => {
	const raw = (await response.json()) as RawGetHolidayStopsResponse;
	return {
		...raw,
		productSpecifics: {
			// taking the oldest date here is only knowingly safe for GW (once per week) and Voucher (no fulfilment)
			// it will need to re-visited for Home Delivery
			firstAvailableDate: getOldestDate(
				raw.issueSpecifics.map(
					(_) => parseDate(_.firstAvailableDate).date,
				),
			),
			issueDaysOfWeek: raw.issueSpecifics.map((_) => _.issueDayOfWeek),
		},
		existing: raw.existing
			.map(embellishRawHolidayStop)
			.sort(
				(a, b) =>
					a.dateRange.start.valueOf() - b.dateRange.start.valueOf(),
			),
	} as GetHolidayStopsResponse;
};

export interface IssuesImpactedPerYear {
	issuesThisYear: HolidayStopDetail[];
	issuesNextYear: HolidayStopDetail[];
}

export const calculateIssuesImpactedPerYear = (
	publicationsImpacted: HolidayStopDetail[],
	anniversaryDate: Date,
) => {
	return {
		issuesThisYear: publicationsImpacted.filter(
			(issue) =>
				issue.publicationDate.isBefore(anniversaryDate) &&
				issue.publicationDate.isSameOrAfter(
					dateAddYears(anniversaryDate, -1),
				),
		),
		issuesNextYear: publicationsImpacted.filter(
			(issue) =>
				issue.publicationDate.isSameOrAfter(anniversaryDate) &&
				issue.publicationDate.isBefore(
					dateAddYears(anniversaryDate, 1),
				),
		),
	} as IssuesImpactedPerYear;
};

export const createGetHolidayStopsFetcher =
	(subscriptionName: string, isTestUser: boolean) => () =>
		fetch(`/api/holidays/${subscriptionName}`, {
			headers: {
				[MDA_TEST_USER_HEADER]: `${isTestUser}`,
			},
		});
