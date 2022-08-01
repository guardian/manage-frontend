import { error } from '@guardian/source-foundations';
import * as React from 'react';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	DateRange,
	dateString,
} from '../../../shared/dates';
import { ProductTypeWithHolidayStopsFlow } from '../../../shared/productTypes';
import { maxWidth } from '../../styles/breakpoints';
import { Spinner } from '../spinner';
import { HolidayAnniversaryDateExplainerModal } from './holidayAnniversaryDateExplainerModal';
import { HolidayStopDetail, IssuesImpactedPerYear } from './holidayStopApi';

interface HolidaySelectionInfoPros {
	productType: ProductTypeWithHolidayStopsFlow;
	renewalDate: Date;
	combinedIssuesImpactedPerYear: IssuesImpactedPerYear;
	annualIssueLimit: number;
	publicationsImpacted: HolidayStopDetail[];
	issuesImpactedPerYearBySelection?: IssuesImpactedPerYear | null;
	validationErrorMessage?: React.ReactNode;
	selectedRange?: DateRange;
}

export const HolidaySelectionInfo = (props: HolidaySelectionInfoPros) => {
	const issuesRemainingThisYear = Math.max(
		0,
		props.annualIssueLimit -
			props.combinedIssuesImpactedPerYear.issuesThisYear.length -
			(props.issuesImpactedPerYearBySelection?.issuesThisYear.length ||
				0),
	);

	const issuesRemainingNextYear = Math.max(
		0,
		props.annualIssueLimit -
			props.combinedIssuesImpactedPerYear.issuesNextYear.length -
			(props.issuesImpactedPerYearBySelection?.issuesNextYear.length ||
				0),
	);

	if (props.validationErrorMessage) {
		return (
			<div
				css={{
					color: error['400'],
					fontWeight: 'bold',
					marginTop: '10px',
				}}
			>
				{props.validationErrorMessage}
			</div>
		);
	} else if (!props.selectedRange || props.issuesImpactedPerYearBySelection) {
		return (
			<>
				<div
					css={{
						marginTop: '10px',
						fontSize: '16px',
						[maxWidth.desktop]: {
							marginRight: '20px',
						},
					}}
				>
					Suspending{' '}
					{displayNumberOfIssuesAsText(
						props.publicationsImpacted.length,
						props.productType.holidayStops.issueKeyword,
					)}
				</div>
				<div
					css={{
						'@media(max-height: 600px)': {
							display: 'none',
						},
						[maxWidth.desktop]: {
							marginTop: '10px',
						},
					}}
				>
					<hr css={{ [maxWidth.desktop]: { display: 'none' } }} />
					Leaving you with{' '}
					{displayNumberOfIssuesAsText(
						issuesRemainingThisYear,
						props.productType.holidayStops.issueKeyword,
					)}{' '}
					available to suspend before{' '}
					{anniversaryDateToElement(props.renewalDate)}
					{!!props.issuesImpactedPerYearBySelection?.issuesNextYear
						.length && (
						<>
							{' '}
							and{' '}
							{displayNumberOfIssuesAsText(
								issuesRemainingNextYear,
								props.productType.holidayStops.issueKeyword,
							)}{' '}
							available the following year
						</>
					)}{' '}
					<HolidayAnniversaryDateExplainerModal
						dateElement={anniversaryDateToElement(
							props.renewalDate,
						)}
						issueKeyword={
							props.productType.holidayStops.issueKeyword
						}
					/>
				</div>
			</>
		);
	} else {
		return (
			<div css={{ [maxWidth.phablet]: { width: '100%' } }}>
				<Spinner />
			</div>
		);
	}
};

const displayNumberOfIssuesAsText = (
	numberOfIssues: number,
	issueKeyword: string,
) => (
	<strong data-cy="suspension-issue-count">
		{numberOfIssues}&nbsp;{issueKeyword}
		{numberOfIssues !== 1 ? 's' : ''}
	</strong>
);

const anniversaryDateToElement = (renewalDate: Date) => (
	<>{dateString(renewalDate, DATE_FNS_LONG_OUTPUT_FORMAT)}*</>
);
