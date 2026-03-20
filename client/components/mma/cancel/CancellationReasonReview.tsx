import { css } from '@emotion/react';
import { palette, space, until } from '@guardian/source/foundations';
import {
	Button,
	Spinner,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { getBenefitsThreshold } from '@/client/utilities/pricingConfig/supporterPlusPricing';
import { contribToSupporterPlusFetch } from '@/client/utilities/productUtils';
import { cancelAlternativeUrlPartLookup } from '@/shared/cancellationUtilsAndTypes';
import { featureSwitches } from '@/shared/featureSwitches';
import type { TrueFalsePending } from '@/shared/generalTypes';
import { appendCorrectPluralisation } from '@/shared/generalTypes';
import type { SwitchPreviewResponse } from '@/shared/productSwitchTypes';
import type { MonthsOrYears } from '../../../../shared/dates';
import { DATE_FNS_INPUT_FORMAT, parseDate } from '../../../../shared/dates';
import type { ProductDetail } from '../../../../shared/productResponse';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
} from '../../../../shared/productResponse';
import { MDA_TEST_USER_HEADER } from '../../../../shared/productResponse';
import type {
	ProductTypeWithCancellationFlow,
	ProductTypeWithCancellationFlowMandatoryReasons,
	WithProductType,
} from '../../../../shared/productTypes';
import { measure } from '../../../styles/typography';
import { useFetch } from '../../../utilities/hooks/useFetch';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { Spinner as SpinnerWithMessage } from '../../shared/Spinner';
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
import {
	allowCountrySwitchDiscount,
	reasonIsEligibleForSwitch,
} from './cancellationSaves/saveEligibilityCheck';
import { getUpdateCasePromise } from './caseUpdate';

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
		cancellationFeedback?: string;
	};

	const navigate = useNavigate();
	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const isSupporterPlusAndFreePeriodOfferIsActive =
		featureSwitches.supporterplusCancellationOffer &&
		productType.productType === 'supporterplus';

	const mainPlan = getMainPlan(productDetail.subscription);
	const isAnnualBilling =
		isPaidSubscriptionPlan(mainPlan) && mainPlan.billingPeriod === 'year';
	const isMonthlyBilling =
		isPaidSubscriptionPlan(mainPlan) && mainPlan.billingPeriod === 'month';

	const isAnnualContributionAndDiscountIsActive =
		productType.productType === 'contributions' &&
		allowCountrySwitchDiscount(productDetail.billingCountry) &&
		isAnnualBilling &&
		reasonIsEligibleForSwitch(routerState.selectedReasonId);

	const isContributionAndBreakFeatureIsActive =
		!isAnnualContributionAndDiscountIsActive &&
		featureSwitches.contributionCancellationPause &&
		productType.productType === 'contributions' &&
		isMonthlyBilling;

	const [
		showAlternativeBeforeCancelling,
		setShowAlternativeBeforeCancelling,
	] = useState<TrueFalsePending>(
		isSupporterPlusAndFreePeriodOfferIsActive ||
			isAnnualContributionAndDiscountIsActive ||
			isContributionAndBreakFeatureIsActive
			? 'pending'
			: false,
	);
	const [
		showContactDetailsBeforeCancelling,
		setShowContactDetailsBeforeCancelling,
	] = useState(false);
	const [discountPreviewDetails, setDiscountPreviewDetails] =
		useState<DiscountPreviewResponse | null>(null);

	const [switchDiscountPreviewDetails, setSwitchDiscountPreviewDetails] =
		useState<SwitchPreviewResponse | null>(null);

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
				) as MonthsOrYears,
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
							headers: {
								'Content-Type': 'application/json',
								[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
							},
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
				} catch {
					setShowAlternativeBeforeCancelling(false);
				}
			})();
		} else if (isAnnualContributionAndDiscountIsActive) {
			const supporterplusThreshold = getBenefitsThreshold(
				mainPlan.currencyISO,
				mainPlan.billingPeriod as 'month' | 'year',
			);
			(async () => {
				const eligableForContactDetailsBeforeCancelling =
					productDetail.billingCountry === 'United Kingdom' &&
					isPaidSubscriptionPlan(mainPlan) &&
					mainPlan.price / 100 <= supporterplusThreshold * 0.5 &&
					reasonIsEligibleForSwitch(routerState.selectedReasonId);
				try {
					const response = await contribToSupporterPlusFetch(
						productDetail.subscription.subscriptionId,
						true,
						productDetail.isTestUser,
						true,
					);

					if (response.ok) {
						// api returns a 400 response if the user is not eligible
						setShowAlternativeBeforeCancelling(true);
						const offerData = await response.json();
						setSwitchDiscountPreviewDetails(offerData);
					} else {
						setShowAlternativeBeforeCancelling(false);
						setShowContactDetailsBeforeCancelling(
							eligableForContactDetailsBeforeCancelling,
						);
					}
				} catch {
					setShowAlternativeBeforeCancelling(false);
					setShowContactDetailsBeforeCancelling(
						eligableForContactDetailsBeforeCancelling,
					);
				}
			})();
		}
	}, [
		isContributionAndBreakFeatureIsActive,
		isSupporterPlusAndFreePeriodOfferIsActive,
		isAnnualContributionAndDiscountIsActive,
		productDetail.subscription.subscriptionId,
		mainPlan,
		productDetail.isTestUser,
		productDetail.billingCountry,
		routerState.selectedReasonId,
	]);

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
									<Spinner size="xsmall" />
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
										cancelAlternativeUrlPartLookup(
											isSupporterPlusAndFreePeriodOfferIsActive,
											isContributionAndBreakFeatureIsActive,
											isAnnualContributionAndDiscountIsActive,
										);

									navigate(`../${cancelAlternativeUrlPart}`, {
										state: {
											...routerState,
											...(isAnnualContributionAndDiscountIsActive
												? switchDiscountPreviewDetails
												: discountPreviewDetails),
											caseId: props.caseId,
											holidayStops: props.holidayStops,
											deliveryCredits:
												props.deliveryCredits,
										},
									});
								} else if (showContactDetailsBeforeCancelling) {
									navigate('../contact-us', {
										state: {
											...routerState,
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
	const location = useLocation();
	const routerState = location.state as {
		selectedReasonId: OptionalCancellationReasonId;
		cancellationPolicy: string;
		cancellationFeedback?: string;
	};

	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	if (!routerState?.selectedReasonId || !productType?.cancellation.reasons) {
		return <Navigate to=".." />;
	}
	return (
		<ValidatedCancellationReasonReview
			productDetail={productDetail}
			productType={
				productType as ProductTypeWithCancellationFlowMandatoryReasons
			}
		/>
	);
};

const ValidatedCancellationReasonReview = ({
	productDetail,
	productType,
}: {
	productDetail: ProductDetail;
	productType: ProductTypeWithCancellationFlowMandatoryReasons;
}) => {
	const location = useLocation();
	const routerState = location.state as {
		selectedReasonId: OptionalCancellationReasonId;
		cancellationPolicy: string;
		cancellationFeedback?: string;
	};

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
			reason: selectedReasonId,
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
						<SpinnerWithMessage loadingMessage="Checking details" />
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
								onClick={() => {
									const feedback =
										routerState.cancellationFeedback?.trim();
									if (feedback) {
										void getPatchUpdateCaseFunc(
											productDetail.isTestUser,
											caseId,
											feedback,
										)();
									}
								}}
							/>
						</div>
					</>
				)}
				{loadingHasFailed && (
					<GenericErrorScreen loggingMessage="Cancel journey case id, holiday stop credits or delivery problem credits api call failed during the cancellation process" />
				)}
			</WithStandardTopMargin>
		</>
	);
};
