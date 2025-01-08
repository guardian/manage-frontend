import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans17,
	until,
} from '@guardian/source/foundations';
import type { DateRange } from '../../../../shared/dates';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	dateString,
} from '../../../../shared/dates';
import type { Subscription } from '../../../../shared/productResponse';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
} from '../../../../shared/productResponse';
import { ExpanderButton } from '../../shared/ExpanderButton';
import { CollatedCredits } from './CollatedCredits';
import { ExistingHolidayStopActions } from './ExistingHolidayStopActions';
import type { SharedHolidayDateChooserState } from './HolidayDateChooser';
import { isSharedHolidayDateChooserState } from './HolidayDateChooser';
import type {
	HolidayStopDetail,
	HolidayStopRequest,
	MinimalHolidayStopRequest,
} from './HolidayStopApi';

const cellCss = css`
	padding: ${space[2]}px ${space[4]}px;
	border: 1px solid ${palette.neutral[86]};
`;

interface SummaryTableProps {
	data: HolidayStopRequest[] | SharedHolidayDateChooserState;
	isTestUser: boolean;
	subscription: Subscription;
	issueKeyword: string;
	alternateSuspendedColumnHeading?: string;
	setExistingHolidayStopToAmend?: (
		newValue: HolidayStopRequest | null,
	) => void;
}

export const formatDateRangeAsFriendly = (range: DateRange) =>
	`${dateString(
		range.start,
		range.start.getFullYear() !== range.end.getFullYear()
			? DATE_FNS_LONG_OUTPUT_FORMAT
			: 'd MMMM',
	)} - ${dateString(range.end, DATE_FNS_LONG_OUTPUT_FORMAT)}`;

interface SummaryTableRowProps extends MinimalHolidayStopRequest {
	issueKeyword: string;
	isTestUser: boolean;
	isOperatingOnNewHolidayStop: boolean;
	currency?: string;
	asTD?: true;
}

const formattedCreditIfAvailable = (
	detail: HolidayStopDetail,
	currency?: string,
) => {
	const rawAmount = detail.actualPrice || detail.estimatedPrice;
	const amountTwoDecimalPlaces = rawAmount ? rawAmount.toFixed(2) : undefined;
	return currency && rawAmount
		? ` (${currency}${amountTwoDecimalPlaces})`
		: undefined;
};

const SummaryTableRow = (props: SummaryTableRowProps) => {
	const dateRangeStr = formatDateRangeAsFriendly(props.dateRange);
	const detailPart = (
		<ExpanderButton
			buttonLabel={
				<strong>
					{props.publicationsImpacted.length} {props.issueKeyword}
					{props.publicationsImpacted.length !== 1 ? 's' : ''}
				</strong>
			}
		>
			{props.publicationsImpacted.map((detail, index) => (
				<div key={index}>
					-{' '}
					{detail.publicationDate.dateStr(
						DATE_FNS_LONG_OUTPUT_FORMAT,
					)}
					{formattedCreditIfAvailable(detail, props.currency)}
				</div>
			))}
		</ExpanderButton>
	);

	const withdrawnRelatedCSS = css`
		text-decoration: line-through;
	`;

	return props.asTD ? (
		<tr>
			<td css={props.withdrawnDate && withdrawnRelatedCSS}>
				{dateRangeStr}
			</td>
			<td css={props.withdrawnDate && withdrawnRelatedCSS}>
				{detailPart}
			</td>
			<td>
				{props.isOperatingOnNewHolidayStop ? (
					<CollatedCredits {...props} />
				) : (
					<ExistingHolidayStopActions {...props} />
				)}
			</td>
		</tr>
	) : (
		<div
			css={[
				css`
					margin-bottom: ${space[5]}px;
				`,
				props.withdrawnDate && withdrawnRelatedCSS,
			]}
		>
			<div
				css={[
					cellCss,
					props.withdrawnDate && withdrawnRelatedCSS,
					css`
						background-color: ${palette.neutral[97]};
						border-bottom: 0;
					`,
				]}
			>
				{dateRangeStr}
			</div>
			<div css={[cellCss, props.withdrawnDate && withdrawnRelatedCSS]}>
				{detailPart}
			</div>
			<div
				css={[
					cellCss,
					css`
						border-top: 0;
					`,
				]}
			>
				{props.isOperatingOnNewHolidayStop ? (
					<>
						<strong>Expected Credits</strong>
						<CollatedCredits {...props} withBullet />
					</>
				) : (
					<ExistingHolidayStopActions {...props} />
				)}
			</div>
		</div>
	);
};

export const SummaryTable = (props: SummaryTableProps) => {
	const holidayStopRequestsList: MinimalHolidayStopRequest[] =
		isSharedHolidayDateChooserState(props.data)
			? [
					{
						dateRange: props.data.selectedRange,
						publicationsImpacted: props.data.publicationsImpacted,
					},
			  ]
			: props.data;

	const mainPlan = getMainPlan(props.subscription);
	const currency = isPaidSubscriptionPlan(mainPlan)
		? mainPlan.currency
		: undefined;

	const isOperatingOnNewHolidayStop = isSharedHolidayDateChooserState(
		props.data,
	);

	return (
		<div
			css={css`
				${textSans17};
			`}
		>
			<table
				css={css`
					width: 100%;
					border-collapse: collapse;
					tr {
						text-align: left;
					}
					th {
						${cellCss};
						background-color: ${palette.neutral[97]};
						margin: 0;
					}
					td {
						${cellCss};
					}
					${until.tablet} {
						display: none;
					}
				`}
			>
				<tbody>
					<tr>
						<th
							css={css`
								min-width: 225px;
							`}
						>
							Duration
						</th>
						<th
							css={css`
								min-width: 225px;
							`}
						>
							{props.alternateSuspendedColumnHeading ||
								'Suspended'}
						</th>
						{isOperatingOnNewHolidayStop ? (
							<th>Expected Credits</th>
						) : (
							<th
								css={css`
									min-width: 205px;
								`}
							>
								Actions
							</th>
						)}
					</tr>
					{holidayStopRequestsList.map(
						(holidayStopRequest, index) => (
							<SummaryTableRow
								{...props}
								key={index}
								isOperatingOnNewHolidayStop={
									isOperatingOnNewHolidayStop
								}
								currency={currency}
								{...holidayStopRequest}
								asTD
							/>
						),
					)}
				</tbody>
			</table>
			<div
				css={css`
					${from.tablet} {
						display: none;
					},
				`}
			>
				{holidayStopRequestsList.map((holidayStopRequest, index) => (
					<SummaryTableRow
						{...props}
						key={index}
						isOperatingOnNewHolidayStop={
							isOperatingOnNewHolidayStop
						}
						currency={currency}
						{...holidayStopRequest}
					/>
				))}
			</div>
		</div>
	);
};
