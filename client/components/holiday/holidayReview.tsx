import { css } from '@emotion/react';
import { space, until } from '@guardian/source-foundations';
import { useContext, useState } from 'react';
import {
	DATE_FNS_INPUT_FORMAT,
	DateRange,
	dateString,
} from '../../../shared/dates';
import {
	MDA_TEST_USER_HEADER,
	ProductDetail,
} from '../../../shared/productResponse';
import { sans } from '../../styles/fonts';
import { LinkButton } from '../buttons';
import { Button, InlineError } from '@guardian/source-react-components';
import { CallCentreNumbers } from '../callCentreNumbers';
import { Checkbox } from '../checkbox';
import { Modal } from '../modal';
import { ProgressIndicator } from '../progressIndicator';
import { InfoIcon } from '../svgs/infoIcon';
import { buttonBarCss, cancelLinkCss } from './holidayDateChooser';
import {
	creditExplainerSentence,
	HolidayQuestionsModal,
} from './holidayQuestionsModal';
import {
	CreateOrAmendHolidayStopsAsyncLoader,
	CreateOrAmendHolidayStopsResponse,
	HolidayStopDetail,
	HolidayStopRequest,
	isHolidayStopsResponse,
	ReloadableGetHolidayStopsResponse,
} from './holidayStopApi';
import { SummaryTable } from './summaryTable';
import { fetchWithDefaultParameters } from '../../fetch';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
	HolidayStopsContext,
	HolidayStopsContextInterface,
	HolidayStopsRouterState,
} from './HolidayStopsContainer';

const getPerformCreateOrAmendFetcher =
	(
		selectedRange: DateRange,
		subscriptionName: string,
		isTestUser: boolean,
		existingHolidayStopToAmend?: HolidayStopRequest,
	) =>
	() =>
		fetchWithDefaultParameters(
			`/api/holidays${
				existingHolidayStopToAmend
					? `/${subscriptionName}/${existingHolidayStopToAmend.id}`
					: ''
			}`,
			{
				method: existingHolidayStopToAmend ? 'PATCH' : 'POST',
				body: JSON.stringify({
					startDate: dateString(
						selectedRange.start,
						DATE_FNS_INPUT_FORMAT,
					),
					endDate: dateString(
						selectedRange.end,
						DATE_FNS_INPUT_FORMAT,
					),
					subscriptionName,
				}),
				headers: {
					'Content-Type': 'application/json',
					[MDA_TEST_USER_HEADER]: `${isTestUser}`,
				},
			},
		);

const getRenderCreateOrAmendError = (modificationKeyword: string) => () =>
	(
		<div css={{ textAlign: 'left', marginTop: '10px' }}>
			<h2>
				Sorry, {modificationKeyword} your holiday suspension failed.
			</h2>
			<p>To try again please go back and re-enter your dates.</p>
			<CallCentreNumbers prefixText="Alternatively, to contact us" />
			<LinkButton to=".." text="Back" left />
		</div>
	);

const HolidayReview = () => {
	const [isExecuting, setIsExecuting] = useState<boolean>(false);
	const [isCheckboxConfirmed, setIsCheckboxConfirmed] =
		useState<boolean>(false);

	const {
		productDetail,
		productType,
		selectedRange,
		publicationsImpacted,
		holidayStopResponse,
		setExistingHolidayStopToAmend,
	} = useContext(HolidayStopsContext) as HolidayStopsContextInterface;

	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as HolidayStopsRouterState;

	const buildActualRenderer = (
		holidayStopsResponse: ReloadableGetHolidayStopsResponse,
		productDetail: ProductDetail,
		selectedRange: DateRange,
		publicationsImpacted: HolidayStopDetail[],
	) => {
		const innerContent = (
			<>
				<div>
					<h1>Review details before confirming</h1>
					<p>
						Check the details carefully and amend them if necessary.{' '}
						{creditExplainerSentence(
							productType.holidayStops.issueKeyword,
						)}{' '}
						{productType.holidayStops.additionalHowAdvice}
					</p>
					<HolidayQuestionsModal
						annualIssueLimit={holidayStopsResponse.annualIssueLimit}
						holidayStopFlowProperties={productType.holidayStops}
					/>
					<div css={{ height: '25px' }} />
					<SummaryTable
						data={{ selectedRange, publicationsImpacted }}
						alternateSuspendedColumnHeading="To be suspended"
						isTestUser={productDetail.isTestUser}
						subscription={productDetail.subscription}
						issueKeyword={productType.holidayStops.issueKeyword}
					/>
					{productType.holidayStops.explicitConfirmationRequired && (
						<>
							<div
								css={{
									marginTop: '20px',
									marginBottom: '10px',
								}}
							>
								<Checkbox
									checked={isCheckboxConfirmed}
									onChange={(newValue) =>
										setIsCheckboxConfirmed(newValue)
									}
									label={
										productType.holidayStops
											.explicitConfirmationRequired
											.checkboxLabel
									}
								/>
							</div>
							<Modal
								instigator={
									<a
										css={{
											fontFamily: sans,
											fontSize: '14px',
											cursor: 'pointer',
											textDecoration: 'underline',
											margin: '10px',
										}}
									>
										<InfoIcon />
										Tell me more
									</a>
								}
								title={
									productType.holidayStops
										.explicitConfirmationRequired
										.explainerModalTitle
								}
							>
								<p>
									{
										productType.holidayStops
											.explicitConfirmationRequired
											.explainerModalBody
									}
								</p>
							</Modal>
						</>
					)}
				</div>
				{isExecuting ? (
					<div css={{ marginTop: '40px', textAlign: 'right' }}>
						<CreateOrAmendHolidayStopsAsyncLoader
							fetch={getPerformCreateOrAmendFetcher(
								selectedRange,
								productDetail.subscription.subscriptionId,
								productDetail.isTestUser,
								holidayStopsResponse.existingHolidayStopToAmend,
							)}
							render={(_: CreateOrAmendHolidayStopsResponse) => (
								<Navigate
									to="../confirmed"
									state={routerState}
								/>
							)}
							errorRender={getRenderCreateOrAmendError(
								holidayStopsResponse.existingHolidayStopToAmend
									? 'amending'
									: 'creating',
							)}
							loadingMessage={`${
								holidayStopsResponse.existingHolidayStopToAmend
									? 'Amending'
									: 'Creating'
							} your suspension...`}
							spinnerScale={0.7}
							inline
						/>
					</div>
				) : (
					<div
						css={[
							buttonBarCss,
							{
								justifyContent: 'space-between',
								marginTop: '20px',
								[until.mobileMedium]: {
									flexDirection: 'column',
									marginTop: 0,
								},
							},
						]}
					>
						<div
							css={{
								marginTop: '20px',
								alignSelf: 'flex-start',
							}}
						>
							<Button
								onClick={() => {
									setExistingHolidayStopToAmend({
										dateRange: selectedRange,
										publicationsImpacted,
										mutabilityFlags: {
											isEndDateEditable: true,
											isFullyMutable: true,
										},
									});
									navigate('../amend', {
										state: routerState,
									});
								}}
								priority="secondary"
							>
								Amend
							</Button>
						</div>
						<div
							css={[
								buttonBarCss,
								{
									marginTop: '20px',
									alignSelf: 'flex-end',
								},
							]}
						>
							<Link
								css={cancelLinkCss}
								to=".."
								state={routerState}
							>
								Cancel
							</Link>
							<Button
								disabled={
									!!productType.holidayStops
										.explicitConfirmationRequired &&
									!isCheckboxConfirmed
								}
								onClick={() => setIsExecuting(true)}
							>
								Confirm
							</Button>
						</div>
						{!!productType.holidayStops
							.explicitConfirmationRequired &&
							!isCheckboxConfirmed && (
								<InlineError>
									Please confirm you will destroy the affected
									vouchers by checking the box.
								</InlineError>
							)}
					</div>
				)}
			</>
		);

		return (
			<>
				<ProgressIndicator
					steps={[
						{ title: 'Choose dates' },
						{ title: 'Review', isCurrentStep: true },
						{ title: 'Confirmation' },
					]}
					additionalCSS={css`
						margin: ${space[5]}px 0 ${space[12]}px;
					`}
				/>
				{innerContent}
			</>
		);
	};

	return isHolidayStopsResponse(holidayStopResponse) &&
		productDetail?.tier &&
		selectedRange &&
		publicationsImpacted ? (
		buildActualRenderer(
			holidayStopResponse,
			productDetail,
			selectedRange,
			publicationsImpacted,
		)
	) : (
		<Navigate to=".." state={routerState} />
	);
};

export default HolidayReview;
