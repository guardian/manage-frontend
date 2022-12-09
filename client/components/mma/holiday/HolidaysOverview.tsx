import { from, until } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import type * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	dateString,
	parseDate,
} from '../../../../shared/dates';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
} from '../../../../shared/productResponse';
import { sans } from '../../../styles/fonts';
import { InfoIcon } from '../shared/assets/InfoIcon';
import { CollatedCredits } from './CollatedCredits';
import {
	creditExplainerSentence,
	HolidayQuestionsModal,
} from './HolidayQuestionsModal';
import {
	calculateIssuesImpactedPerYear,
	isNotBulkSuspension,
	isNotWithdrawn,
} from './HolidayStopApi';
import type {
	HolidayStopsContextInterface,
	HolidayStopsRouterState,
} from './HolidayStopsContainer';
import { HolidayStopsContext } from './HolidayStopsContainer';
import { SummaryTable } from './SummaryTable';

interface OverviewRowProps {
	heading: string;
	children: React.ReactFragment;
}

const OverviewRow = (props: OverviewRowProps) => (
	<div
		css={{
			display: 'flex',
			flexWrap: 'wrap',
			alignItems: 'top',
			marginBottom: '20px',
		}}
	>
		<div css={{ flex: '1 1 180px' }}>
			<h3 css={{ marginTop: '0', paddingTop: '0' }}>{props.heading}</h3>
		</div>
		<div
			css={{
				flex: '4 4 350px',
			}}
		>
			{props.children}
		</div>
	</div>
);

const HolidaysOverview = () => {
	const holidayStopsContext = useContext(
		HolidayStopsContext,
	) as HolidayStopsContextInterface;
	const {
		productType,
		productDetail,
		setExistingHolidayStopToAmend,
		holidayStopResponse,
		reload,
		setSelectedRange,
	} = holidayStopsContext;

	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as HolidayStopsRouterState;

	const renewalDate = parseDate(productDetail.subscription.renewalDate).date;
	const combinedIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
		holidayStopResponse.existing
			.filter(isNotWithdrawn)
			.filter(isNotBulkSuspension)
			.flatMap((existing) => existing.publicationsImpacted),
		renewalDate,
	);

	const mainPlan = getMainPlan(productDetail.subscription);
	const currency = isPaidSubscriptionPlan(mainPlan)
		? mainPlan.currency
		: undefined;

	const createSuspensionButton = (
		<Button
			onClick={() => {
				setExistingHolidayStopToAmend(null);
				setSelectedRange(undefined);
				navigate('create', { state: routerState });
			}}
		>
			Create suspension
		</Button>
	);

	return (
		<>
			<h1>Suspend {productType.friendlyName()}</h1>
			{productDetail.subscription.autoRenew ? (
				<OverviewRow heading="How">
					<>
						<div>
							You can suspend up to{' '}
							<strong>
								{holidayStopResponse.annualIssueLimit}{' '}
								{productType.holidayStops.issueKeyword}s
							</strong>{' '}
							per year of your subscription. <br />
						</div>
						{productType.holidayStops.alternateNoticeString && (
							<div>
								Please provide{' '}
								<strong>
									{
										productType.holidayStops
											.alternateNoticeString
									}
								</strong>
								.
							</div>
						)}
						<div>
							{creditExplainerSentence(
								productType.holidayStops.issueKeyword,
							)}
						</div>
						{productType.holidayStops.additionalHowAdvice && (
							<div>
								{productType.holidayStops.additionalHowAdvice}
							</div>
						)}
						<div
							css={{
								fontFamily: sans,
								fontSize: '14px',
								margin: '10px',
								display: 'flex',
								alignItems: 'top',
							}}
						>
							<InfoIcon />
							<div>
								<strong>
									{dateString(
										renewalDate,
										DATE_FNS_LONG_OUTPUT_FORMAT,
									)}
								</strong>{' '}
								is the next anniversary of your subscription.
								<br />
								The number of{' '}
								{productType.holidayStops.issueKeyword}s you can
								suspend per year is reset on this date.
							</div>
						</div>
						<HolidayQuestionsModal
							annualIssueLimit={
								holidayStopResponse.annualIssueLimit
							}
							holidayStopFlowProperties={productType.holidayStops}
						/>
					</>
				</OverviewRow>
			) : (
				<h4>
					This subscription does not automatically renew, so
					unfortunately you{' '}
					{holidayStopResponse.existing.length > 0
						? 'can no longer'
						: 'cannot'}{' '}
					create a holiday suspension for this subscription.
				</h4>
			)}
			{(productDetail.subscription.autoRenew ||
				holidayStopResponse.existing.length > 0) && (
				<>
					<OverviewRow heading="Summary">
						<>
							{holidayStopResponse.existing.length > 0 ? (
								<>
									<div>
										You have suspended{' '}
										<strong>
											{
												combinedIssuesImpactedPerYear
													.issuesThisYear.length
											}
											/
											{
												holidayStopResponse.annualIssueLimit
											}
										</strong>{' '}
										{productType.holidayStops.issueKeyword}s
										until{' '}
										{dateString(
											renewalDate,
											DATE_FNS_LONG_OUTPUT_FORMAT,
										)}
										{combinedIssuesImpactedPerYear
											.issuesNextYear.length > 0 && (
											<span>
												{' '}
												and{' '}
												<strong>
													{
														combinedIssuesImpactedPerYear
															.issuesNextYear
															.length
													}
													/
													{
														holidayStopResponse.annualIssueLimit
													}
												</strong>{' '}
												{
													productType.holidayStops
														.issueKeyword
												}
												s the following year
											</span>
										)}
										.
									</div>
								</>
							) : (
								<div>
									You have{' '}
									<strong>
										{holidayStopResponse.annualIssueLimit}
									</strong>{' '}
									{productType.holidayStops.issueKeyword}s
									available to suspend until{' '}
									{dateString(
										renewalDate,
										DATE_FNS_LONG_OUTPUT_FORMAT,
									)}
								</div>
							)}
							<div
								css={{
									textAlign: 'right',
									marginTop: '10px',
									[from.phablet]: {
										display: 'none',
									},
								}}
							>
								{productDetail.subscription.autoRenew &&
									createSuspensionButton}
							</div>
						</>
					</OverviewRow>
					{holidayStopResponse.existing.length > 0 && (
						<OverviewRow heading="Expected Credits">
							<CollatedCredits
								publicationsImpacted={holidayStopResponse.existing
									.filter(isNotWithdrawn)
									.flatMap((_) => _.publicationsImpacted)}
								currency={currency}
							/>
						</OverviewRow>
					)}
					<OverviewRow heading="Details">
						{holidayStopResponse.existing.length > 0 ? (
							<SummaryTable
								data={holidayStopResponse.existing}
								isTestUser={productDetail.isTestUser}
								subscription={productDetail.subscription}
								issueKeyword={
									productType.holidayStops.issueKeyword
								}
								reloadParent={reload}
								setExistingHolidayStopToAmend={
									setExistingHolidayStopToAmend
								}
							/>
						) : (
							"You currently don't have any scheduled suspensions."
						)}
					</OverviewRow>
				</>
			)}
			<div
				css={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: '30px',
					[until.phablet]: {
						flexDirection: 'column-reverse',
					},
				}}
			>
				<div css={{ marginTop: '10px', alignSelf: 'flex-start' }}>
					<Button
						onClick={() => {
							navigate('/');
						}}
						priority="tertiary"
					>
						Return to your account
					</Button>
				</div>
				<div
					data-cy="create-suspension-cta"
					css={{ marginTop: '10px', alignSelf: 'flex-end' }}
				>
					{productDetail.subscription.autoRenew &&
						createSuspensionButton}
				</div>
			</div>
		</>
	);
};

export default HolidaysOverview;
