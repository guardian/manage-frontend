import { css } from '@emotion/react';
import { space, textSans14, until } from '@guardian/source/foundations';
import {
	Button,
	Checkbox,
	InlineError,
} from '@guardian/source/react-components';
import { useContext, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import type { DateRange } from '../../../../shared/dates';
import { DATE_FNS_INPUT_FORMAT, dateString } from '../../../../shared/dates';
import type { ProductDetail } from '../../../../shared/productResponse';
import { MDA_TEST_USER_HEADER } from '../../../../shared/productResponse';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import { CallCentreNumbers } from '../../shared/CallCentreNumbers';
import { InfoIcon } from '../shared/assets/InfoIcon';
import { LinkButton } from '../shared/Buttons';
import { ProgressIndicator } from '../shared/ProgressIndicator';
import { buttonBarCss, cancelLinkCss } from './HolidayDateChooser';
import {
	creditExplainerSentence,
	HolidayQuestionsModal,
} from './HolidayQuestionsModal';
import type {
	CreateOrAmendHolidayStopsResponse,
	GetHolidayStopsResponse,
	HolidayStopDetail,
	HolidayStopRequest,
} from './HolidayStopApi';
import {
	CreateOrAmendHolidayStopsAsyncLoader,
	isHolidayStopsResponse,
} from './HolidayStopApi';
import type {
	HolidayStopsContextInterface,
	HolidayStopsRouterState,
} from './HolidayStopsContainer';
import { HolidayStopsContext } from './HolidayStopsContainer';
import { Modal } from './Modal';
import { SummaryTable } from './SummaryTable';

const getPerformCreateOrAmendFetcher =
	(
		selectedRange: DateRange,
		subscriptionName: string,
		isTestUser: boolean,
		existingHolidayStopToAmend: HolidayStopRequest | null,
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
		<div
			css={css`
				text-align: left;
				margin-top: 10px;
			`}
		>
			<h2>
				Sorry, {modificationKeyword} your holiday suspension failed.
			</h2>
			<p>To try again please go back and re-enter your dates.</p>
			<CallCentreNumbers prefixText="Alternatively, to contact us" />
			<LinkButton to=".." text="Back" left />
		</div>
	);

export const HolidayReview = () => {
	const [isExecuting, setIsExecuting] = useState<boolean>(false);
	const [isCheckboxConfirmed, setIsCheckboxConfirmed] =
		useState<boolean>(false);

	const {
		productDetail,
		productType,
		selectedRange,
		publicationsImpacted,
		holidayStopResponse,
		existingHolidayStopToAmend,
	} = useContext(HolidayStopsContext) as HolidayStopsContextInterface;

	const location = useLocation();
	const routerState = location.state as HolidayStopsRouterState;

	const buildActualRenderer = (
		holidayStopsResponse: GetHolidayStopsResponse,
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
					<div
						css={css`
							height: 25px;
						`}
					/>
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
								css={css`
									margin-top: 20px;
									margin-bottom: 10px;
								`}
							>
								<Checkbox
									label={
										productType.holidayStops
											.explicitConfirmationRequired
											.checkboxLabel
									}
									checked={isCheckboxConfirmed}
									onChange={() => {
										setIsCheckboxConfirmed(
											!isCheckboxConfirmed,
										);
									}}
								/>
							</div>
							<Modal
								instigator={
									<a
										css={css`
											${textSans14};
											cursor: pointer;
											text-decoration: underline;
											margin: 10px;
										`}
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
					<div
						css={css`
							margin-top: 40px;
							text-align: right;
						`}
					>
						<CreateOrAmendHolidayStopsAsyncLoader
							fetch={getPerformCreateOrAmendFetcher(
								selectedRange,
								productDetail.subscription.subscriptionId,
								productDetail.isTestUser,
								existingHolidayStopToAmend,
							)}
							render={(_: CreateOrAmendHolidayStopsResponse) => (
								<Navigate
									to="../confirmed"
									state={routerState}
								/>
							)}
							errorRender={getRenderCreateOrAmendError(
								existingHolidayStopToAmend
									? 'amending'
									: 'creating',
							)}
							loadingMessage={`${
								existingHolidayStopToAmend
									? 'Amending'
									: 'Creating'
							} your suspension...`}
							spinnerScale={0.7}
							inline
						/>
					</div>
				) : (
					<div
						css={css`
							margin-top: ${space[5]}px;
							${until.mobileMedium} {
								margin-top: 0;
							},
						`}
					>
						<div
							css={[
								buttonBarCss,
								css`
									margin-top: ${space[5]}px;
								`,
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
								<InlineError
									cssOverrides={css`
										margin-top: ${space[3]}px;
									`}
								>
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
		productDetail?.mmaProductKey &&
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
