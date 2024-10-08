import { css } from '@emotion/react';
import { from, palette, space, until } from '@guardian/source/foundations';
import { Button, InlineError } from '@guardian/source/react-components';
import * as Sentry from '@sentry/browser';
import { startCase } from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import type * as React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { DateRange } from '../../../../shared/dates';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	dateAddYears,
	dateRange,
	dateString,
	parseDate,
} from '../../../../shared/dates';
import { isProduct } from '../../../../shared/productResponse';
import { sans } from '../../../styles/fonts';
import { trackEvent } from '../../../utilities/analytics';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { InfoIcon } from '../shared/assets/InfoIcon';
import { DatePicker } from '../shared/DatePicker';
import { ProgressIndicator } from '../shared/ProgressIndicator';
import { HolidayAnniversaryDateExplainerModal } from './HolidayAnniversaryDateExplainerModal';
import {
	creditExplainerSentence,
	HolidayQuestionsModal,
} from './HolidayQuestionsModal';
import { HolidaySelectionInfo } from './HolidaySelectionInfo';
import type {
	HolidayStopDetail,
	HolidayStopRequest,
	IssuesImpactedPerYear,
	PotentialHolidayStopsResponse,
} from './HolidayStopApi';
import {
	calculateIssuesImpactedPerYear,
	convertRawPotentialHolidayStopDetail,
	getPotentialHolidayStopsFetcher,
	isHolidayStopsResponse,
	isNotBulkSuspension,
	isNotWithdrawn,
} from './HolidayStopApi';
import type {
	HolidayStopsContextInterface,
	HolidayStopsRouterState,
} from './HolidayStopsContainer';
import { HolidayStopsContext } from './HolidayStopsContainer';

export const cancelLinkCss = css({
	marginRight: '20px',
	fontFamily: sans,
	fontWeight: 'bold',
	textDecoration: 'underline',
	fontSize: '16px',
	color: `${palette.neutral['7']}`,
});

export const buttonBarCss = css({
	display: 'flex',
	alignItems: 'center',
	marginTop: '40px',
	flexWrap: 'wrap',
});

const oneAtATimeStyles = css({
	fontFamily: sans,
	fontSize: '14px',
	marginBottom: '27px',
});

const fixedButtonFooterCss = css({
	[until.mobileLandscape]: {
		justifyContent: 'space-between',
	},
	[until.phablet]: {
		position: 'fixed',
		zIndex: 998,
		bottom: 0,
		left: 0,
		right: 0,
		background: palette.neutral[100],
		padding: '10px',
		boxShadow: '0 0 5px' + palette.neutral[60],
	},
});

export interface SharedHolidayDateChooserState {
	selectedRange: DateRange;
	publicationsImpacted: HolidayStopDetail[];
}

const extractMaybeLockedStartDate = (
	existingHolidayStopToAmend: HolidayStopRequest | null,
) =>
	!!existingHolidayStopToAmend &&
	existingHolidayStopToAmend.mutabilityFlags &&
	!existingHolidayStopToAmend.mutabilityFlags.isFullyMutable &&
	existingHolidayStopToAmend.mutabilityFlags.isEndDateEditable
		? existingHolidayStopToAmend.dateRange.start
		: null;

export function isSharedHolidayDateChooserState(
	state: HolidayStopRequest[] | SharedHolidayDateChooserState,
): state is SharedHolidayDateChooserState {
	return (
		state.hasOwnProperty('selectedRange') &&
		state.hasOwnProperty('publicationsImpacted')
	);
}

const validateIssuesSelected = (
	renewalDate: Date,
	annualIssueLimit: number,
	numPotentialIssuesThisYear: number,
	issuesRemainingThisYear: number,
	numPotentialIssuesNextYear: number,
	issuesRemainingNextYear: number,
	issueKeyword: string,
): React.ReactNode => {
	const dateElement = (
		<>{dateString(renewalDate, DATE_FNS_LONG_OUTPUT_FORMAT)}*</>
	);
	if (numPotentialIssuesThisYear > issuesRemainingThisYear) {
		return (
			<>
				Exceeded {issueKeyword} limit of {annualIssueLimit} before{' '}
				{dateElement}{' '}
				<HolidayAnniversaryDateExplainerModal
					dateElement={dateElement}
					issueKeyword={issueKeyword}
				/>
				<br />
				Please choose fewer/different days...
			</>
		);
	} else if (numPotentialIssuesNextYear > issuesRemainingNextYear) {
		return (
			<>
				Exceeded {issueKeyword} limit of {annualIssueLimit} between{' '}
				{dateElement} and{' '}
				{dateString(
					dateAddYears(renewalDate, 1),
					DATE_FNS_LONG_OUTPUT_FORMAT,
				)}
				{'* '}
				<HolidayAnniversaryDateExplainerModal
					dateElement={dateElement}
					issueKeyword={issueKeyword}
				/>
				<br />
				Please choose fewer/different days...
			</>
		);
	} else if (
		numPotentialIssuesThisYear < 1 &&
		numPotentialIssuesNextYear < 1
	) {
		return `No ${issueKeyword}s occur during selected period`;
	}
	return null; // important don't remove
};

export const HolidayDateChooserStateContext = createContext<
	SharedHolidayDateChooserState | {}
>({});

interface HolidayDateChooserProps {
	isAmendJourney?: true;
}

export const HolidayDateChooser = (props: HolidayDateChooserProps) => {
	const {
		productDetail,
		productType,
		existingHolidayStopToAmend,
		selectedRange,
		setSelectedRange,
		publicationsImpacted,
		setPublicationsImpacted,
		holidayStopResponse,
	} = useContext(HolidayStopsContext) as HolidayStopsContextInterface;

	const [
		issuesImpactedPerYearBySelection,
		setIssuesImpactedPerYearBySelection,
	] = useState<IssuesImpactedPerYear | null>(null);
	const [validationErrorMessage, setValidationErrorMessage] =
		useState<React.ReactNode | null>(null);

	const [showReviewWarning, setShowReviewWarning] = useState<Boolean>(false);

	const navigate = useNavigate();

	const location = useLocation();
	const routerState = location.state as HolidayStopsRouterState;

	useEffect(() => {
		if (
			isHolidayStopsResponse(holidayStopResponse) &&
			existingHolidayStopToAmend
		) {
			const maybeLockedStartDate = extractMaybeLockedStartDate(
				existingHolidayStopToAmend,
			);
			setSelectedRange(existingHolidayStopToAmend.dateRange);
			setValidationErrorMessage(
				`Please select your new ${
					maybeLockedStartDate
						? 'end date (the start date is locked because it is within notice period) '
						: 'dates'
				}...`,
			);
		}
	}, []);

	const onChange =
		(
			renewalDate: Date,
			subscriptionName: string,
			combinedIssuesImpactedPerYear: IssuesImpactedPerYear,
			allIssuesImpactedPerYear: IssuesImpactedPerYear,
			annualIssueLimit: number,
			isTestUser: boolean,
		) =>
		({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
			const newSelectedRange = dateRange(startDate, endDate);
			setSelectedRange(newSelectedRange);
			setIssuesImpactedPerYearBySelection(null);
			setValidationErrorMessage(null);

			getPotentialHolidayStopsFetcher(
				subscriptionName,
				startDate,
				endDate,
				isTestUser,
			)()
				.then((response) => {
					const locationHeader = response.headers.get('Location');
					if (
						response.status === 401 &&
						locationHeader &&
						window !== undefined
					) {
						window.location.replace(locationHeader);
						return Promise.resolve([]);
					} else if (response.ok) {
						return response.json();
					}
					return Promise.reject(
						`${response.status} from holiday-stop-api`,
					);
				})
				.then(({ potentials }: PotentialHolidayStopsResponse) => {
					const updatePublicationsImpacted: HolidayStopDetail[] =
						potentials.map(convertRawPotentialHolidayStopDetail);

					const updateIssuesImpactedPerYearBySelection =
						calculateIssuesImpactedPerYear(
							updatePublicationsImpacted,
							renewalDate,
						);

					const issuesRemainingThisYear =
						Math.max(
							annualIssueLimit,
							allIssuesImpactedPerYear.issuesThisYear.length,
						) - combinedIssuesImpactedPerYear.issuesThisYear.length;

					const issuesRemainingNextYear =
						Math.max(
							annualIssueLimit,
							allIssuesImpactedPerYear.issuesNextYear.length,
						) - combinedIssuesImpactedPerYear.issuesNextYear.length;

					setPublicationsImpacted(updatePublicationsImpacted);
					setIssuesImpactedPerYearBySelection(
						updateIssuesImpactedPerYearBySelection,
					);
					const newValidationErrorMessage = validateIssuesSelected(
						renewalDate,
						annualIssueLimit,
						updateIssuesImpactedPerYearBySelection.issuesThisYear
							.length,
						issuesRemainingThisYear,
						updateIssuesImpactedPerYearBySelection.issuesNextYear
							.length,
						issuesRemainingNextYear,
						productType.holidayStops.issueKeyword,
					);
					setValidationErrorMessage(newValidationErrorMessage);
					if (showReviewWarning) {
						setShowReviewWarning(
							!!newValidationErrorMessage ||
								!newSelectedRange ||
								!updateIssuesImpactedPerYearBySelection,
						);
					}
				})
				.catch((error) => {
					setValidationErrorMessage(
						`Failed to calculate ${productType.holidayStops.issueKeyword}s impacted by selected dates. Please try again later...`,
					);
					trackEvent({
						eventCategory: 'holidayDateChooser',
						eventAction: 'error',
						eventLabel: error ? error.toString() : undefined,
					});
					Sentry.captureException(error);
				});
		};

	const holidayStopResponseIsValid =
		isHolidayStopsResponse(holidayStopResponse);

	if (holidayStopResponseIsValid) {
		if (isProduct(productDetail)) {
			const existingHolidayStopToAmendId = existingHolidayStopToAmend?.id;

			const anniversaryDate = parseDate(
				productDetail.subscription.anniversaryDate,
			).date;

			const combinedIssuesImpactedPerYear =
				calculateIssuesImpactedPerYear(
					holidayStopResponse.existing
						.filter(isNotWithdrawn)
						.filter(isNotBulkSuspension)
						.filter((_) => _.id !== existingHolidayStopToAmendId)
						.flatMap((_) => _.publicationsImpacted),
					anniversaryDate,
				);

			const allIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
				holidayStopResponse.existing
					.filter(isNotWithdrawn)
					.filter(isNotBulkSuspension)
					.flatMap((_) => _.publicationsImpacted),
				anniversaryDate,
			);

			return (
				<>
					<ProgressIndicator
						steps={[
							{ title: 'Choose dates', isCurrentStep: true },
							{ title: 'Review' },
							{ title: 'Confirmation' },
						]}
						additionalCSS={css`
							margin: ${space[5]}px 0 ${space[12]}px;
						`}
					/>
					{props.isAmendJourney && !existingHolidayStopToAmend && (
						<Navigate to=".." state={routerState} />
					)}

					<h1>Choose the dates you will be away</h1>
					<p>
						The first available date is{' '}
						<strong>
							{dateString(
								holidayStopResponse.productSpecifics
									.firstAvailableDate,
								'cccc d MMMM',
							)}
						</strong>{' '}
						due to{' '}
						{productType.holidayStops.alternateNoticeString ? (
							<strong>
								{productType.holidayStops.alternateNoticeString}{' '}
								period
							</strong>
						) : (
							'our printing and delivery schedule (notice period)'
						)}
						.
						<br />
						{creditExplainerSentence(
							productType.holidayStops.issueKeyword,
						)}
					</p>
					<div css={oneAtATimeStyles}>
						<div css={{ margin: '10px' }}>
							<InfoIcon />
							You can schedule one suspension at a time.
						</div>
						<div
							css={{
								[from.mobileLandscape]: {
									display: 'none',
								},
							}}
						>
							<HolidayQuestionsModal
								annualIssueLimit={
									holidayStopResponse.annualIssueLimit
								}
								holidayStopFlowProperties={
									productType.holidayStops
								}
							/>
						</div>
					</div>
					<DatePicker
						firstAvailableDate={
							holidayStopResponse.productSpecifics
								.firstAvailableDate
						}
						issueDaysOfWeek={
							holidayStopResponse.productSpecifics.issueDaysOfWeek
						}
						issueKeyword={startCase(
							productType.holidayStops.issueKeyword,
						)}
						existingDates={holidayStopResponse.existing
							.filter(isNotWithdrawn)
							.filter(
								(holidayStopRequest) =>
									holidayStopRequest.id !==
									existingHolidayStopToAmendId,
							)
							.map((hsr) => hsr.dateRange)}
						amendableDateRange={
							existingHolidayStopToAmend?.dateRange
						}
						selectedRange={selectedRange}
						maybeLockedStartDate={extractMaybeLockedStartDate(
							existingHolidayStopToAmend,
						)}
						selectionInfo={
							<HolidaySelectionInfo
								productType={productType}
								renewalDate={anniversaryDate}
								combinedIssuesImpactedPerYear={
									combinedIssuesImpactedPerYear
								}
								annualIssueLimit={
									holidayStopResponse.annualIssueLimit
								}
								publicationsImpacted={publicationsImpacted}
								issuesImpactedPerYearBySelection={
									issuesImpactedPerYearBySelection
								}
								validationErrorMessage={validationErrorMessage}
								selectedRange={selectedRange}
							/>
						}
						onChange={onChange(
							anniversaryDate,
							productDetail.subscription.subscriptionId,
							combinedIssuesImpactedPerYear,
							allIssuesImpactedPerYear,
							holidayStopResponse.annualIssueLimit,
							productDetail.isTestUser,
						)}
						dateToAsterisk={anniversaryDate}
					/>
					<div
						css={[
							buttonBarCss,
							{ justifyContent: 'flex-end' },
							fixedButtonFooterCss,
						]}
					>
						<div
							css={{
								marginRight: '30px',
								[until.mobileLandscape]: {
									display: 'none',
								},
							}}
						>
							<HolidayQuestionsModal
								annualIssueLimit={
									holidayStopResponse.annualIssueLimit
								}
								holidayStopFlowProperties={
									productType.holidayStops
								}
							/>
						</div>
						<Link
							css={{
								marginRight: `${space[5]}px`,
								fontFamily: sans,
								fontWeight: 'bold',
								textDecoration: 'underline',
								fontSize: '16px',
								color: palette.neutral[20],
							}}
							to=".."
							state={routerState}
						>
							Cancel
						</Link>
						<div>
							<Button
								onClick={() => {
									const readyForReview =
										!validationErrorMessage &&
										selectedRange &&
										issuesImpactedPerYearBySelection;
									if (readyForReview) {
										navigate('../review', {
											state: routerState,
										});
									} else {
										setShowReviewWarning(true);
									}
								}}
							>
								Review details
							</Button>
						</div>
					</div>
					<div
						css={{
							marginTop: `${space[5]}px`,
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						{showReviewWarning && (
							<InlineError>
								Your request is incomplete. Please ensure your
								chosen dates are valid and that your remaining
								holiday balance has been calculated before
								trying again.
							</InlineError>
						)}
					</div>
				</>
			);
		}
		return <Navigate to=".." state={routerState} />;
	}
	return <GenericErrorScreen loggingMessage="No holiday stop response" />;
};
