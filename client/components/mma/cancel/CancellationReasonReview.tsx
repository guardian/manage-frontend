import { css } from '@emotion/react';
import { palette, space, until } from '@guardian/source/foundations';
import {
	Button,
	InlineError,
	SvgArrowRightStraight,
	SvgSpinner,
} from '@guardian/source/react-components';
import type { ChangeEvent, FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import type {
	DiscountPeriodType,
	DiscountPreviewResponse,
} from '@/client/utilities/discountPreview';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { cancelAlternativeUrlPartLookup } from '@/shared/cancellationUtilsAndTypes';
import { featureSwitches } from '@/shared/featureSwitches';
import type { TrueFalsePending } from '@/shared/generalTypes';
import { appendCorrectPluralisation } from '@/shared/generalTypes';
import { DATE_FNS_INPUT_FORMAT, parseDate } from '../../../../shared/dates';
import { MDA_TEST_USER_HEADER } from '../../../../shared/productResponse';
import type {
	ProductTypeWithCancellationFlow,
	WithProductType,
} from '../../../../shared/productTypes';
import { sans } from '../../../styles/fonts';
import { measure } from '../../../styles/typography';
import { useFetch } from '../../../utilities/hooks/useFetch';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { Spinner } from '../../shared/Spinner';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';
import type {
	DeliveryRecordDetail,
	DeliveryRecordsResponse,
} from '../delivery/records/deliveryRecordsApi';
import type {
	OutstandingHolidayStop,
	OutstandingHolidayStopsResponse,
} from '../holiday/HolidayStopApi';
import { Heading } from '../shared/Heading';
import { ProgressIndicator } from '../shared/ProgressIndicator';
import { ProgressStepper } from '../shared/ProgressStepper';
import type { CancellationContextInterface } from './CancellationContainer';
import { CancellationContext } from './CancellationContainer';
import { cancellationEffectiveToday } from './cancellationContexts';
import { requiresCancellationEscalation } from './cancellationFlowEscalationCheck';
import type {
	CancellationReason,
	CancellationReasonId,
	OptionalCancellationReasonId,
	SaveBodyProps,
} from './cancellationReason';
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from './caseUpdate';

const getPatchUpdateCaseFunc =
	(isTestUser: boolean, caseId: string, feedback: string) => async () =>
		await getUpdateCasePromise(isTestUser, '_FEEDBACK', caseId, {
			Description: feedback,
			Subject: 'Online Cancellation Query',
		});

const ContactUs = (reason: CancellationReason) =>
	reason.hideContactUs ? (
		<></>
	) : (
		<p
			css={css`
				margin: 0;
			`}
		>
			If you have any questions, feel free to{' '}
			{
				<Link
					to="/help-centre#contact-options"
					css={css`
						text-decoration: underline;
						color: ${palette.brand[500]};
					`}
				>
					contact our support team
				</Link>
			}
			.
		</p>
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
	const [inFeedbackValidationErrorState, setFeedbackValidationErrorState] =
		useState<boolean>(false);

	const getFeedbackThankYouRenderer = (reason: CancellationReason) => {
		return () => (
			<div
				css={{
					marginLeft: '15px',
					marginTop: '30px',
					paddingLeft: '15px',
					borderLeft: '1px solid ' + palette.neutral[60],
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
		setFeedbackValidationErrorState(false);
	};

	const submitFeedback = () => {
		if (feedback.length) {
			setHasHitSubmit(true);
		}
		setFeedbackValidationErrorState(!feedback.length);
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
							color: palette.neutral[46],
							fontFamily: sans,
							paddingBottom: '10px',
						}}
					>
						You have {props.characterLimit - feedback.length}{' '}
						characters remaining
					</div>
					{inFeedbackValidationErrorState && (
						<InlineError
							cssOverrides={css`
								padding: ${space[5]}px;
								margin-bottom: ${space[4]}px;
								border: 4px solid ${palette.error[400]};
								text-align: left;
							`}
						>
							Please insert your feedback into the textbox before
							submitting. Otherwise select ‘Confirm cancellation’
							to continue
						</InlineError>
					)}
					<Button priority="secondary" onClick={submitFeedback}>
						Submit feedback
					</Button>
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
	const navigate = useNavigate();
	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const isSupporterPlusAndFreePeriodOfferIsActive =
		featureSwitches.supporterplusCancellationOffer &&
		productType.productType === 'supporterplus';

	const isContributionAndBreakFeatureIsActive =
		featureSwitches.contributionCancellationPause &&
		productType.productType === 'contributions';

	const [
		showAlternativeBeforeCancelling,
		setShowAlternativeBeforeCancelling,
	] = useState<TrueFalsePending>(
		isSupporterPlusAndFreePeriodOfferIsActive ||
			isContributionAndBreakFeatureIsActive
			? 'pending'
			: false,
	);
	const [discountPreviewDetails, setDiscountPreviewDetails] =
		useState<DiscountPreviewResponse | null>(null);

	const productHasAlternativeRecommendation =
		productType.productType === 'supporterplus' ||
		productType.productType === 'contributions';

	const sanitizeOfferData = (
		offerData: DiscountPreviewResponse,
	): DiscountPreviewResponse => {
		if (offerData.upToPeriodsType) {
			return {
				...offerData,
				upToPeriodsType: appendCorrectPluralisation(
					offerData.upToPeriodsType,
					offerData.upToPeriods,
				) as DiscountPeriodType,
			};
		}
		return offerData;
	};

	useEffect(() => {
		if (
			isSupporterPlusAndFreePeriodOfferIsActive ||
			isContributionAndBreakFeatureIsActive
		) {
			(async () => {
				try {
					const response = await fetchWithDefaultParameters(
						'/api/discounts/preview-discount',
						{
							method: 'POST',
							body: JSON.stringify({
								subscriptionNumber:
									productDetail.subscription.subscriptionId,
							}),
						},
					);

					if (response.ok) {
						// api returns a 400 response if the user is not eligible
						setShowAlternativeBeforeCancelling(true);
						const offerData = await response.json();
						const sanitizedOfferData = sanitizeOfferData(offerData);
						setDiscountPreviewDetails(sanitizedOfferData);
					} else {
						setShowAlternativeBeforeCancelling(false);
					}
				} catch (e) {
					setShowAlternativeBeforeCancelling(false);
				}
			})();
		}
	}, []);

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
						[until.mobileLandscape]: {
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
							icon={
								showAlternativeBeforeCancelling ===
								'pending' ? (
									<SvgSpinner size="xsmall" />
								) : (
									<SvgArrowRightStraight />
								)
							}
							iconSide="right"
							disabled={
								showAlternativeBeforeCancelling === 'pending'
							}
							aria-disabled={
								showAlternativeBeforeCancelling === 'pending'
							}
							onClick={() => {
								if (props.onClick) {
									props.onClick();
								}
								if (showAlternativeBeforeCancelling) {
									const cancelAlternativeUrlPart =
										cancelAlternativeUrlPartLookup[
											productType.productType
										] || '';

									navigate(`../${cancelAlternativeUrlPart}`, {
										state: {
											...routerState,
											...discountPreviewDetails,
											caseId: props.caseId,
											holidayStops: props.holidayStops,
											deliveryCredits:
												props.deliveryCredits,
										},
									});
								} else {
									navigate(
										productHasAlternativeRecommendation
											? '../confirm'
											: '../confirmed',
										{
											state: {
												...routerState,
												eligibleForFreePeriodOffer:
													false,
												caseId: props.caseId,
												holidayStops:
													props.holidayStops,
												deliveryCredits:
													props.deliveryCredits,
											},
										},
									);
								}
							}}
						>
							{productHasAlternativeRecommendation
								? 'Continue to cancellation'
								: 'Confirm cancellation'}
						</Button>
					</div>
					<div>
						<Button
							priority="tertiary"
							onClick={() => navigate('/')}
						>
							Return to your account
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export const CancellationReasonReview = () => {
	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const location = useLocation();
	const routerState = location.state as {
		selectedReasonId: OptionalCancellationReasonId;
		cancellationPolicy: string;
	};

	if (!routerState?.selectedReasonId) {
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
			gaData: '',
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

	const loadingHasFailed =
		(productType.cancellation.checkForOutstandingCredits &&
			holidayStopCreditFetch.error) ||
		deliveryProblemCreditFetch.error ||
		cancellationCaseFetch.error;

	const needsCancellationEscalation = requiresCancellationEscalation(
		holidayStopCreditFetch.data?.publicationsToRefund,
		deliveryProblemCreditFetch.data?.results,
		routerState.cancellationPolicy,
	);

	const renderSaveBody = (
		saveBody: string[] | React.FC<SaveBodyProps>,
		caseId: string,
		holidayStops?: OutstandingHolidayStop[],
		deliveryCredits?: DeliveryRecordDetail[],
	) => {
		if (saveBody.length && typeof saveBody === 'object') {
			<>
				{saveBody.map((saveBodyParagraph, index) => (
					<p key={`save_body_${index}`}>{saveBodyParagraph}</p>
				))}
			</>;
			return <p id="save_body">{saveBody}</p>;
		}
		const SaveBody = saveBody as FC<SaveBodyProps>;
		return (
			<SaveBody
				caseId={caseId}
				holidayStops={holidayStops}
				deliveryCredits={deliveryCredits}
			/>
		);
	};

	const shouldUseProgressStepper =
		(featureSwitches.supporterplusCancellationOffer &&
			productType.productType === 'supporterplus') ||
		(featureSwitches.contributionCancellationPause &&
			productType.productType === 'contributions');

	return (
		<>
			{shouldUseProgressStepper ? (
				<ProgressStepper
					steps={[{}, { isCurrentStep: true }, {}, {}]}
					additionalCSS={css`
						margin: ${space[5]}px 0 ${space[12]}px;
					`}
				/>
			) : (
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
			)}
			<WithStandardTopMargin>
				{isLoading() ? (
					!loadingHasFailed && (
						<Spinner loadingMessage="Checking details" />
					)
				) : (
					<>
						<Heading
							cssOverrides={[
								measure.heading,
								css`
									margin-bottom: ${space[6]}px;
								`,
							]}
						>
							{productType.cancellation.hideReasonTitlePrefix
								? ''
								: 'Reason: '}
							{reason.saveTitle || reason.linkLabel}
						</Heading>
						{needsCancellationEscalation && (
							<p>
								Once you submit your cancellation request our
								customer service team will try their best to
								contact you as soon as possible to confirm the
								cancellation and refund any credit you are owed.
							</p>
						)}

						{reason.saveBody &&
							renderSaveBody(
								reason.saveBody,
								caseId,
								holidayStopCreditFetch.data
									?.publicationsToRefund,
								deliveryProblemCreditFetch.data?.results,
							)}
						{needsCancellationEscalation &&
							reason.escalationSaveBody &&
							renderSaveBody(
								reason.escalationSaveBody,
								caseId,
								holidayStopCreditFetch.data
									?.publicationsToRefund,
								deliveryProblemCreditFetch.data?.results,
							)}

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
				{loadingHasFailed && (
					<GenericErrorScreen loggingMessage="Cancel journey case id, holiday stop credits or delivery problem credits api call failed during the cancellation process" />
				)}
			</WithStandardTopMargin>
		</>
	);
};
