import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans14,
	textSans17,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	InlineError,
	Spinner,
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { ChangeEvent, FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { getBenefitsThreshold } from '@/client/utilities/pricingConfig/supporterPlusPricing';
import {
	contribToSupporterPlusFetch,
	isPrintProduct,
} from '@/client/utilities/productUtils';
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
import { usePrintCancellationStore } from '../../../stores/PrintCancellationStore';
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
import {
	CancellationContext,
	CancellationPageTitleContext,
} from './CancellationContainer';
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
						css={css`
							${textSans14};
							color: ${palette.neutral[46]};
							padding-bottom: 10px;
						`}
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

const printPauseBannerCss = css`
	background-color: ${palette.neutral[97]};
	display: flex;
	flex-direction: column-reverse;
	align-items: stretch;
	margin-bottom: ${space[6]}px;

	${from.tablet} {
		flex-direction: row;
		margin-bottom: ${space[10]}px;
	}
`;

const printPauseBannerContentCss = css`
	flex: 1;
	padding: ${space[3]}px;
	padding-bottom: ${space[6]}px;
`;

const printPauseBannerHeadingCss = css`
	${textSansBold17};
	margin: 0 0 ${space[1]}px;
`;

const printPauseBannerBodyCss = css`
	${textSans17};
	max-width: 54ch;
	margin: 0 0 ${space[4]}px;

	${from.tablet} {
		margin: 0 0 ${space[6]}px;
		max-width: unset;
	}
`;

const printPauseBannerGraphicCss = css`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: ${space[3]}px ${space[3]}px ${space[3]}px;

	${from.tablet} {
		padding-top: 0;
	}

	img {
		height: auto;
		display: block;
		width: 100%;
		max-width: 350px;
		margin: auto;

		${from.tablet} {
			width: 204px;
		}
	}
`;

interface PrintCancellationStepTwoProps {
	productType: ProductTypeWithCancellationFlowMandatoryReasons;
}

const PrintCancellationStepTwo = ({
	productType,
}: PrintCancellationStepTwoProps) => {
	const navigate = useNavigate();
	const { setEligibleForFreePeriodOffer } = usePrintCancellationStore();
	const pauseBannerImageSrc: { mobile: string; desktop: string } = {
		mobile: 'https://i.guim.co.uk/img/media/203dbadbd6e0fcd4eed01370f94bf3a67d747ebd/0_0_204_162/204.png?width=204&quality=100&s=e69f374f6154453c7442d39b22efcb56',
		desktop:
			'https://i.guim.co.uk/img/media/203dbadbd6e0fcd4eed01370f94bf3a67d747ebd/0_0_204_162/204.png?width=204&quality=100&s=e69f374f6154453c7442d39b22efcb56',
	};

	return (
		<>
			<h2
				css={css`
					${headlineBold28}
					margin: 0 0 ${space[5]}px;
				`}
			>
				Pause your subscription
			</h2>
			<section css={printPauseBannerCss}>
				<div css={printPauseBannerContentCss}>
					<h3 css={printPauseBannerHeadingCss}>
						Do you need a break?
					</h3>
					<p css={printPauseBannerBodyCss}>
						Put your print deliveries on hold for up to five weeks
						and we will apply a credit for the suspended issues to
						your next bill date. If you have digital benefits you
						will still receive and be charged for those during this
						time.
					</p>
					<Button
						priority="secondary"
						onClick={() =>
							navigate(`/suspend/${productType.urlPart}`)
						}
						cssOverrides={css`
							width: 100%;

							${from.tablet} {
								width: auto;
							}
						`}
					>
						Pause subscription
					</Button>
				</div>
				<picture css={printPauseBannerGraphicCss}>
					<source
						srcSet={pauseBannerImageSrc.desktop}
						media="(min-width: 740px)"
					/>
					<img src={pauseBannerImageSrc.mobile} alt="" />
				</picture>
			</section>
			<section
				css={css`
					margin-bottom: ${space[6]}px;
				`}
			>
				<h2
					css={css`
						${headlineBold28}
						margin: 0 0 ${space[2]}px;

						${from.tablet} {
							margin: 0 0 ${space[3]}px;
						}
					`}
				>
					Speak with an advisor
				</h2>
				<p
					css={css`
						${textSans17};
						margin: 0 0 ${space[4]}px;
					`}
				>
					Get in touch with our customer care team if you require any
					assistance or simply wish to discuss other subscription
					options.
				</p>
				<p
					css={css`
						${textSans17};
						margin: 0;
					`}
				>
					Email{' '}
					<strong>
						<a
							href="mailto:customer.help@theguardian.com"
							css={css`
								color: ${palette.neutral[7]};
							`}
						>
							customer.help@theguardian.com
						</a>
					</strong>
					<br />
					Call us at <strong>+44 (0) 330 333 6767</strong> 9am to 6pm,
					Monday to Sunday
				</p>
			</section>
			<div
				data-cy="cta_container"
				css={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
					gap: `${space[3]}px`,

					[from.tablet]: {
						flexDirection: 'row',
					},
				}}
			>
				<Button
					priority="tertiary"
					icon={<SvgArrowLeftStraight />}
					iconSide="left"
					onClick={() => navigate('..')}
				>
					Previous
				</Button>
				<Button
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					onClick={() => {
						setEligibleForFreePeriodOffer(false);
						navigate('../confirm');
					}}
				>
					Continue to cancel
				</Button>
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
	const { selectedReasonId: printSelectedReasonId } =
		usePrintCancellationStore();
	const selectedReasonId = isPrintProduct(productType)
		? printSelectedReasonId
		: routerState?.selectedReasonId;

	if (!selectedReasonId || !productType?.cancellation.reasons) {
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
	const pageTitleContext = useContext(CancellationPageTitleContext) as {
		setPageTitle: (title: string) => void;
	};
	const isPrintProductType = isPrintProduct(productType);
	const {
		selectedReasonId: printSelectedReasonId,
		cancellationPolicy: printCancellationPolicy,
		setCaseData,
	} = usePrintCancellationStore();
	const selectedReasonId = isPrintProductType
		? printSelectedReasonId
		: routerState.selectedReasonId;
	const cancellationPolicy = isPrintProductType
		? printCancellationPolicy
		: routerState.cancellationPolicy;

	useEffect(() => {
		if (isPrintProductType) {
			pageTitleContext.setPageTitle('Manage subscription');
		}
	}, [isPrintProductType, pageTitleContext]);

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

	const isDataLoading =
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
		cancellationPolicy,
	);

	useEffect(() => {
		if (!isPrintProductType || isDataLoading || !caseId) {
			return;
		}

		setCaseData({
			caseId,
			holidayStops: holidayStopCreditFetch.data?.publicationsToRefund,
			deliveryCredits: deliveryProblemCreditFetch.data?.results,
		});
	}, [
		caseId,
		deliveryProblemCreditFetch.data?.results,
		holidayStopCreditFetch.data?.publicationsToRefund,
		isDataLoading,
		isPrintProductType,
		setCaseData,
	]);

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
			{isPrintProductType ? (
				<ProgressStepper
					steps={[{}, { isCurrentStep: true }, {}]}
					additionalCSS={css`
						margin: ${space[5]}px 0;
						margin-bottom: ${space[8]}px;

						${from.tablet} {
							margin: ${space[10]}px 0;
						}
					`}
				/>
			) : shouldUseProgressStepper ? (
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
				{isDataLoading ? (
					!loadingHasFailed && (
						<SpinnerWithMessage loadingMessage="Checking details" />
					)
				) : isPrintProductType ? (
					<PrintCancellationStepTwo productType={productType} />
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
