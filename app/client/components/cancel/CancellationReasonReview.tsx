import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { navigate } from '@reach/router';
import { ChangeEvent, useContext, useState } from 'react';
import { WithProductType } from '../../../shared/productTypes';
import { ProductTypeWithCancellationFlow } from '../../../shared/productTypes';
import palette from '../../colours';
import { maxWidth } from '../../styles/breakpoints';
import { sans } from '../../styles/fonts';
import { trackEvent } from '../analytics';
import { Button } from '../buttons';
import { CallCentreNumbers } from '../callCentreNumbers';
import { ProgressIndicator } from '../progressIndicator';
import { WithStandardTopMargin } from '../WithStandardTopMargin';
import { ReturnToAccountOverviewButton } from '../wizardRouterAdapter';
import { cancellationEffectiveToday } from './cancellationContexts';
import { requiresCancellationEscalation } from './cancellationFlowEscalationCheck';
import {
	CancellationReason,
	CancellationReasonId,
	OptionalCancellationReasonId,
} from './cancellationReason';
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from './caseUpdate';
import {
	CancellationContext,
	CancellationContextInterface,
} from './CancellationContainer';
import { Navigate, useLocation } from 'react-router-dom';
import { DATE_FNS_INPUT_FORMAT, parseDate } from '../../../shared/dates';
import useFetch from '../../services/useFetch';
import {
	OutstandingHolidayStop,
	OutstandingHolidayStopsResponse,
} from '../holiday/holidayStopApi';
import { MDA_TEST_USER_HEADER } from '../../../shared/productResponse';
import {
	DeliveryRecordDetail,
	DeliveryRecordsResponse,
} from '../delivery/records/deliveryRecordsApi';
import { Spinner } from '../spinner';

const getPatchUpdateCaseFunc =
	(isTestUser: boolean, caseId: string, feedback: string) => async () =>
		await getUpdateCasePromise(isTestUser, '_FEEDBACK', caseId, {
			Description: feedback,
			Subject: 'Online Cancellation Query',
		});

const gaTrackFeedback = (actionString: string) =>
	trackEvent({
		eventCategory: 'feedback',
		eventAction: actionString,
	});

const ContactUs = (reason: CancellationReason) =>
	reason.hideContactUs ? (
		<></>
	) : (
		<CallCentreNumbers
			prefixText={reason.alternateCallUsPrefix || 'To contact us'}
		/>
	);

interface FeedbackFormProps
	extends WithProductType<ProductTypeWithCancellationFlow> {
	reason: CancellationReason;
	characterLimit: number;
	caseId: string;
	isTestUser: boolean;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

const FeedbackFormAndContactUs = (props: FeedbackFormProps) => {
	const [feedback, setFeedback] = useState<string>('');
	const [hasHitSubmit, setHasHitSubmit] = useState<boolean>(false);

	const getFeedbackThankYouRenderer = (reason: CancellationReason) => {
		return () => (
			<div
				css={{
					marginLeft: '15px',
					marginTop: '30px',
					paddingLeft: '15px',
					borderLeft: '1px solid ' + palette.neutral['4'],
				}}
			>
				<p
					css={{
						fontSize: '1rem',
						fontWeight: 500,
					}}
				>
					{reason.alternateFeedbackThankYouTitle ||
						'Thank you for your feedback.'}
				</p>
				<span>
					{reason.alternateFeedbackThankYouBody ||
						'The Guardian is dedicated to keeping our independent, investigative journalism open to all. We report on the facts, challenging the powerful and holding them to account. Support from our readers makes what we do possible and we appreciate hearing from you to help improve our service.'}
				</span>
			</div>
		);
	};

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setFeedback(event.target.value);
	};

	const submitFeedback = () => {
		setHasHitSubmit(true);
		gaTrackFeedback('submitted');
	};

	return hasHitSubmit ? (
		<>
			<CaseUpdateAsyncLoader
				loadingMessage="Storing your feedback..."
				fetch={getPatchUpdateCaseFunc(
					props.isTestUser,
					props.caseId,
					feedback,
				)}
				render={getFeedbackThankYouRenderer(props.reason)}
			/>
			<div css={{ height: '20px' }} />
			<ConfirmCancellationAndReturnRow
				hide={!!props.reason.hideSaveActions}
				reasonId={props.reason.reasonId}
				productType={props.productType}
				caseId={props.caseId}
				holidayStops={props.holidayStops}
				deliveryCredits={props.deliveryCredits}
			/>
		</>
	) : (
		<>
			<div>
				{!props.reason.hideContactUs &&
					!props.productType.cancellation
						.swapFeedbackAndContactUs && (
						<ContactUs {...props.reason} />
					)}
				<p>
					{props.reason.alternateFeedbackIntro ||
						'Alternatively provide feedback in the box below'}
				</p>
				<textarea
					rows={5}
					maxLength={props.characterLimit}
					css={{
						width: '100%',
						fontSize: 'inherit',
						fontFamily: 'inherit',
						border: '1px black solid',
					}}
					onChange={handleChange}
				/>
				<div css={{ textAlign: 'right' }}>
					<div
						css={{
							fontSize: 'small',
							color: palette.neutral['3'],
							fontFamily: sans,
							paddingBottom: '10px',
						}}
					>
						You have {props.characterLimit - feedback.length}{' '}
						characters remaining
					</div>
					<Button
						onClick={submitFeedback}
						text="Submit feedback"
						disabled={feedback.length === 0}
					/>
					<ConfirmCancellationAndReturnRow
						hide={!!props.reason.hideSaveActions}
						reasonId={props.reason.reasonId}
						productType={props.productType}
						caseId={props.caseId}
						holidayStops={props.holidayStops}
						deliveryCredits={props.deliveryCredits}
						onClick={() => {
							if (feedback.length > 0) {
								getPatchUpdateCaseFunc(
									props.isTestUser,
									props.caseId,
									feedback,
								)();
								gaTrackFeedback('submitted silently');
							}
						}}
					/>
					{!props.reason.hideContactUs &&
						props.productType.cancellation
							.swapFeedbackAndContactUs && (
							<div css={{ marginTop: '20px' }}>
								<ContactUs {...props.reason} />
							</div>
						)}
				</div>
			</div>
		</>
	);
};

interface ConfirmCancellationAndReturnRowProps
	extends WithProductType<ProductTypeWithCancellationFlow> {
	onClick?: () => void;
	hide?: boolean;
	reasonId: CancellationReasonId;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

const ConfirmCancellationAndReturnRow = (
	props: ConfirmCancellationAndReturnRowProps,
) => {
	const location = useLocation();
	const routerState = location.state as {
		selectedReasonId: OptionalCancellationReasonId;
		cancellationPolicy: string;
	};

	return (
		<>
			{!props.hide && (
				<div
					css={{
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row-reverse',
						marginTop: '10px',
						textAlign: 'left',
						[maxWidth.mobileLandscape]: {
							flexDirection: 'column',
						},
					}}
				>
					<div
						css={{
							textAlign: 'right',
							marginBottom: '30px',
						}}
					>
						<Button
							text="Confirm cancellation"
							onClick={() => {
								if (props.onClick) {
									props.onClick();
								}
								navigate('../confirmed', {
									state: {
										...routerState,
										caseId: props.caseId,
										holidayStops: props.holidayStops,
										deliveryCredits: props.deliveryCredits,
									},
								});
							}}
							right
						/>
					</div>
					<div>
						<ReturnToAccountOverviewButton />
					</div>
				</div>
			)}
		</>
	);
};

const CancellationReasonReview = () => {
	/*
	const outstandingCredits = useContext(
		CancellationOutstandingCreditsContext,
	);
	*/

	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const location = useLocation();
	const routerState = location.state as {
		selectedReasonId: OptionalCancellationReasonId;
		cancellationPolicy: string;
	};

	if (!routerState.selectedReasonId) {
		return <Navigate to=".." />;
	}

	const { selectedReasonId, cancellationPolicy } = routerState;

	const reason = productType.cancellation.reasons.find(
		(reason) => reason.reasonId === selectedReasonId,
	) as CancellationReason;

	const effectiveCancellationDate =
		!productDetail.subscription?.chargedThroughDate ||
		cancellationPolicy === cancellationEffectiveToday
			? parseDate()
			: parseDate(productDetail.subscription.chargedThroughDate);

	const holidayStopCreditApiUrl =
		productType.cancellation.checkForOutstandingCredits &&
		`/api/holidays/${
			productDetail.subscription.subscriptionId
		}/cancel?effectiveCancellationDate=${effectiveCancellationDate.dateStr(
			DATE_FNS_INPUT_FORMAT,
		)}`;

	const deliveryProblemCreditApiUrl =
		productType.cancellation.checkForOutstandingCredits &&
		`/api/delivery-records/${
			productDetail.subscription.subscriptionId
		}/cancel?effectiveCancellationDate=${effectiveCancellationDate.dateStr(
			DATE_FNS_INPUT_FORMAT,
		)}`;

	const holidayStopCreditFetch = useFetch<OutstandingHolidayStopsResponse>(
		holidayStopCreditApiUrl,
		{
			headers: {
				[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
			},
		},
	);

	const deliveryProblemCreditFetch = useFetch<DeliveryRecordsResponse>(
		deliveryProblemCreditApiUrl,
		{
			headers: {
				[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
			},
		},
	);

	const cancellationCaseFetch = useFetch<{ id: string }>('/api/case', {
		method: 'POST',
		body: JSON.stringify({
			reason: routerState.selectedReasonId,
			product: productType.cancellation.sfCaseProduct,
			subscriptionName: productDetail.subscription.subscriptionId,
			gaData: '' + JSON.stringify(window.gaData),
		}),
		headers: {
			'Content-Type': 'application/json',
			[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
		},
	});

	const caseId = cancellationCaseFetch.data?.id || '';

	const isLoading = () =>
		(productType.cancellation.checkForOutstandingCredits &&
			(!holidayStopCreditFetch.data ||
				!deliveryProblemCreditFetch.data)) ||
		!cancellationCaseFetch.data;

	// requiresCancellationEscalation(holidayStopCreditFetch.data.publicationsToRefund, deliveryProblemCreditFetch.data.results);

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: 'Reason' },
					{ title: 'Review', isCurrentStep: true },
					{ title: 'Confirmation' },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<WithStandardTopMargin>
				{isLoading() ? (
					<Spinner loadingMessage="Checking details" />
				) : (
					<>
						<h3 id="save_title">
							{productType.cancellation.hideReasonTitlePrefix
								? ''
								: 'Reason: '}
							{reason.saveTitle || reason.linkLabel}
						</h3>

						{requiresCancellationEscalation(
							holidayStopCreditFetch.data?.publicationsToRefund,
							deliveryProblemCreditFetch.data?.results,
							routerState.cancellationPolicy,
						) && (
							<p>
								Once you submit your cancellation request our
								customer service team will try their best to
								contact you as soon as possible to confirm the
								cancellation and refund any credit you are owed.
							</p>
						)}
						<p id="save_body">
							{requiresCancellationEscalation(
								holidayStopCreditFetch.data
									?.publicationsToRefund,
								deliveryProblemCreditFetch.data?.results,
								routerState.cancellationPolicy,
							) && reason.escalationSaveBody !== undefined
								? reason.escalationSaveBody
								: reason.saveBody}
						</p>

						{caseId && !reason.skipFeedback ? (
							<FeedbackFormAndContactUs
								characterLimit={2500}
								caseId={caseId}
								holidayStops={
									holidayStopCreditFetch.data
										?.publicationsToRefund
								}
								deliveryCredits={
									deliveryProblemCreditFetch.data?.results
								}
								reason={reason}
								productType={productType}
								isTestUser={productDetail.isTestUser}
							/>
						) : (
							<div
								css={{
									display: 'flex',
									flexDirection:
										productType.cancellation
											.swapFeedbackAndContactUs && caseId
											? 'column-reverse'
											: 'column',
								}}
							>
								<ContactUs {...reason} />
								<ConfirmCancellationAndReturnRow
									hide={!!reason.hideSaveActions}
									reasonId={reason.reasonId}
									productType={productType}
									caseId={caseId}
									holidayStops={
										holidayStopCreditFetch.data
											?.publicationsToRefund
									}
									deliveryCredits={
										deliveryProblemCreditFetch.data?.results
									}
								/>
							</div>
						)}
					</>
				)}
			</WithStandardTopMargin>
		</>
	);
};

export default CancellationReasonReview;