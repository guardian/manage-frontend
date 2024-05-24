import { css } from '@emotion/react';
import {
	brand,
	from,
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source/foundations';
import { Button, Stack } from '@guardian/source/react-components';
import { capitalize } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { dateIsSameOrBefore, parseDate } from '../../../../../shared/dates';
import type {
	DeliveryAddress,
	DeliveryRecordApiItem,
	PaidSubscriptionPlan,
} from '../../../../../shared/productResponse';
import {
	getMainPlan,
	isGift,
	isPaidSubscriptionPlan,
} from '../../../../../shared/productResponse';
import type { DeliveryProblemType } from '../../../../../shared/productTypes';
import { holidaySuspensionDeliveryProblem } from '../../../../../shared/productTypes';
import { trackEvent } from '../../../../utilities/analytics';
import { CallCentreEmailAndNumbers } from '../../../shared/CallCenterEmailAndNumbers';
import { FormError } from '../../../shared/FormError';
import { InfoIconDark } from '../../shared/assets/InfoIconDark';
import type { ProductDescriptionListKeyValue } from '../../shared/ProductDescriptionListTable';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { DeliveryAddressStep } from './DeliveryAddressStep';
import { DeliveryRecordCard } from './DeliveryRecordCard';
import type { DeliveryRecordDetail } from './deliveryRecordsApi';
import type { DeliveryRecordsContextInterface } from './DeliveryRecordsContainer';
import {
	checkForExistingDeliveryProblem,
	DeliveryRecordsContext,
} from './DeliveryRecordsContainer';
import { PaginationNav } from './DeliveryRecordsPaginationNav';
import type { DeliveryRecordsProblemType } from './DeliveryRecordsProblemContext';
import { DeliveryRecordsAddressContext } from './DeliveryRecordsProblemContext';
import { DeliveryRecordProblemForm } from './DeliveryRecordsProblemForm';
import { ProductDetailsTable } from './ProductDetailsTable';

interface IdentityDetails {
	userId: string;
}
declare global {
	interface Window {
		identityDetails?: IdentityDetails;
	}
}

export enum PageStatus {
	ReadOnly,
	ReportIssueStep1,
	ReportIssueStep2,
	ContinueToReview,
	ReportIssueConfirmation,
	CannotReportProblem,
}

interface Step1FormValidationDetails {
	isValid: boolean;
	message?: string;
}

const checkForRecentHolidayStop = (records: DeliveryRecordDetail[]) =>
	records.findIndex((record) => record.hasHolidayStop) > -1;

export const DeliveryRecords = () => {
	const navigate = useNavigate();
	const { productDetail, productType, data } = useContext(
		DeliveryRecordsContext,
	) as DeliveryRecordsContextInterface;

	const [pageStatus, setPageStatus] = useState<PageStatus>(
		PageStatus.ReadOnly,
	);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedProblemRecords, setSelectedProblemRecords] = useState<
		string[]
	>([]);
	const [step1formValidationState, setStep1formValidationState] =
		useState<boolean>(false);
	const [step1FormValidationDetails, setStep1FormValidationDetails] =
		useState<Step1FormValidationDetails>({ isValid: true });
	const [step2formValidationState, setStep2formValidationState] =
		useState<boolean>(false);
	const [step2FormValidationDetails, setStep2FormValidationDetails] =
		useState<Step1FormValidationDetails>({ isValid: true });
	const [step3formValidationState, setStep3formValidationState] =
		useState<boolean>(false);
	const [step3FormValidationDetails, setStep3FormValidationDetails] =
		useState<Step1FormValidationDetails>({ isValid: true });
	const [addressInValidState, setAddressValidationState] =
		useState<boolean>(true);
	const [deliveryProblem, setDeliveryProblem] =
		useState<DeliveryRecordsProblemType>();
	const [showTopCallCentreNumbers, setTopCallCentreNumbersVisibility] =
		useState<boolean>(false);
	const [choosenDeliveryProblem, setChoosenDeliveryProblem] =
		useState<string>();
	const [showBottomCallCentreNumbers, setBottomCallCentreNumbersVisibility] =
		useState<boolean>(false);
	const [address, setAddress] = useState<DeliveryAddress | undefined>(
		productDetail.subscription.deliveryAddress,
	);
	const [productsAffected, setProductsAffected] = useState<
		ProductDescriptionListKeyValue[]
	>([]);

	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	if (!isPaidSubscriptionPlan(mainPlan)) {
		throw new Error(
			'mainPlan is not a PaidSubscriptionPlan in deliveryRecords',
		);
	}

	const subscriptionCurrency = mainPlan.currency;
	const hasExistingDeliveryProblem = checkForExistingDeliveryProblem(
		data.results,
	);

	const isHolidayStopProblem =
		choosenDeliveryProblem === holidaySuspensionDeliveryProblem.label;
	const isCancelledSubscription = productDetail.subscription.cancelledAt;
	const subscriptionIsAutoRenewable = productDetail.subscription.autoRenew;
	const hasReportedProblemAndShouldBeContacted =
		hasExistingDeliveryProblem &&
		productType.delivery?.records?.contactUserOnExistingProblemReport;

	const showProblemCredit =
		!isHolidayStopProblem &&
		!isCancelledSubscription &&
		subscriptionIsAutoRenewable &&
		!hasReportedProblemAndShouldBeContacted;

	useEffect(() => {
		if (addressInValidState) {
			setStep3FormValidationDetails({
				isValid: addressInValidState,
			});
			setStep3formValidationState(!addressInValidState);
		}
	}, [addressInValidState]);
	const enableDeliveryInstructions =
		!!productType.delivery.enableDeliveryInstructionsUpdate;
	const step1FormRadioOptionCallback = (value: string) =>
		setChoosenDeliveryProblem(value);
	const step1FormUpdateCallback = (isValid: boolean, message?: string) => {
		setStep1formValidationState(false);
		setStep1FormValidationDetails({ isValid, message });
	};
	const step1FormSubmitListener = (
		selectedValue: string | undefined,
		selectedMessage: string | undefined,
	) => {
		setDeliveryProblem({
			category: selectedValue,
			message: selectedMessage,
		});
		setStep1formValidationState(true);
		if (step1FormValidationDetails.isValid) {
			trackEvent({
				eventCategory: 'delivery-problem',
				eventAction: 'continue_to_step_2_button_click',
				product: {
					productType: productType,
					productDetail: productDetail,
				},
				eventLabel: productType.urlPart,
			});
			setPageStatus(PageStatus.ReportIssueStep2);
		}
	};

	const addRecordToDeliveryProblem = (id: string) =>
		setSelectedProblemRecords([...selectedProblemRecords, id]);
	const removeRecordFromDeliveryProblem = (id: string) =>
		setSelectedProblemRecords(
			selectedProblemRecords.filter(
				(existingId: string) => existingId !== id,
			),
		);
	const resultsPerPage = 7;
	const totalPages = Math.ceil(data.results.length / resultsPerPage);
	const scrollToTop = () => window.scrollTo(0, 0);
	const resetDeliveryRecordsPage = () => setPageStatus(PageStatus.ReadOnly);

	const filterData = (overridePageStatusCheck?: boolean) => {
		if (
			(pageStatus !== PageStatus.ReadOnly &&
				pageStatus !== PageStatus.CannotReportProblem) ||
			overridePageStatusCheck
		) {
			const numOfReportableRecords =
				productType.delivery.records.numberOfProblemRecordsToShow;

			const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));

			const isNotHolidayProblem =
				choosenDeliveryProblem !==
				holidaySuspensionDeliveryProblem.label;

			return data.results
				.filter((_) => {
					const startOfDeliveryDateDay = new Date(
						parseDate(_.deliveryDate).date.setHours(0, 0, 0, 0),
					);
					return dateIsSameOrBefore(
						startOfDeliveryDateDay,
						startOfToday,
					);
				})
				.slice(0, numOfReportableRecords)
				.filter((_) => isNotHolidayProblem || _.hasHolidayStop)
				.filter((_) => !_.problemCaseId);
		}
		return data.results.filter((_, index) =>
			isRecordInCurrentPage(
				index,
				currentPage * resultsPerPage,
				currentPage * resultsPerPage + resultsPerPage - 1,
			),
		);
	};

	const isRecordInCurrentPage = (
		index: number,
		currentPageStartIndex: number,
		currentPageEndIndex: number,
	) => index >= currentPageStartIndex && index <= currentPageEndIndex;

	const filteredData = filterData();

	const hasRecentHolidayStop = checkForRecentHolidayStop(filteredData);

	const problemTypes: DeliveryProblemType[] = [
		...productType.delivery.records.availableProblemTypes,
		...(hasRecentHolidayStop ? [holidaySuspensionDeliveryProblem] : []),
	].sort((a, b) => a.label.localeCompare(b.label));

	const formErrorTitle =
		!step3FormValidationDetails.isValid &&
		step1FormValidationDetails.isValid &&
		step2FormValidationDetails.isValid
			? 'Unfinished changes'
			: 'Some information is missing';

	const formErrorMessages = [
		step1FormValidationDetails,
		step2FormValidationDetails,
		step3FormValidationDetails,
	].reduce(
		(acc: string[], validationDetails) =>
			!validationDetails.isValid && validationDetails.message
				? [...acc, validationDetails.message]
				: acc,
		[],
	);

	return (
		<DeliveryRecordsAddressContext.Provider
			value={{
				address,
				setAddress,
				productsAffected,
				setProductsAffected,
				enableDeliveryInstructions,
			}}
		>
			{pageStatus !== PageStatus.ReadOnly &&
				pageStatus !== PageStatus.CannotReportProblem && (
					<ProgressIndicator
						steps={[
							{ title: 'Update', isCurrentStep: true },
							{ title: 'Review' },
							{ title: 'Confirmation' },
						]}
						additionalCSS={css`
							margin: ${space[5]}px 0 ${space[12]}px;
						`}
					/>
				)}
			<div
				css={css`
					margin: ${space[6]}px 0 ${space[12]}px;
				`}
			>
				<ProductDetailsTable
					productName={capitalize(productType.friendlyName())}
					subscriptionId={productDetail.subscription.subscriptionId}
					isGift={isGift(productDetail.subscription)}
				/>
			</div>
			{data.results.find((record) => !record.problemCaseId) && (
				<>
					<h2
						css={css`
							border-top: 1px solid ${neutral['86']};
							${headline.small({ fontWeight: 'bold' })};
							${until.tablet} {
								font-size: 1.25rem;
								line-height: 1.6;
							}
						`}
					>
						Report delivery problems
					</h2>
					<div
						css={css`
							margin-bottom: ${pageStatus !==
							PageStatus.ReportIssueStep2
								? space[12]
								: space[5]}px;
							${textSans.medium()};
						`}
					>
						<p
							css={css`
								${textSans.medium()};
							`}
						>
							Have you been experiencing problems with your
							delivery? Report it online and let us take care of
							it for you. Depending on the problem you’re having,
							you’ll either be automatically credited or escalated
							to customer service. It’s easy to use and only takes
							a couple of minutes.
						</p>
						<p
							css={css`
								${textSans.medium()};
							`}
						>
							Please remember, you can also{' '}
							<span
								css={css`
									cursor: pointer;
									color: ${brand[500]};
									text-decoration: underline;
								`}
								onClick={() =>
									setTopCallCentreNumbersVisibility(
										!showTopCallCentreNumbers,
									)
								}
							>
								contact us
							</span>{' '}
							if you wish to speak to us in person.
						</p>
						{showTopCallCentreNumbers && (
							<CallCentreEmailAndNumbers />
						)}
						{pageStatus === PageStatus.CannotReportProblem && (
							<span
								css={css`
									position: relative;
									display: block;
									margin: ${space[3]}px 0;
									padding: ${space[3]}px ${space[3]}px
										${space[3]}px ${space[3] * 2 + 17}px;
									background-color: ${neutral[97]};
									${textSans.small()};
									${from.tablet} {
										margin: ${space[5]}px 0;
									}
								`}
							>
								<i
									css={css`
										position: absolute;
										top: ${space[3]}px;
										left: ${space[3]}px;
									`}
								>
									<InfoIconDark fillColor={brand[500]} />
								</i>
								You don't have any available delivery history to
								report. Your deliveries may be too far in the
								past or have already been reported.
							</span>
						)}
						{(pageStatus === PageStatus.ReadOnly ||
							pageStatus === PageStatus.CannotReportProblem) && (
							<Button
								onClick={() => {
									const filteredDataAtPresent =
										filterData(true);
									const canReportProblem =
										filteredDataAtPresent.length > 0;
									trackEvent({
										eventCategory: 'delivery-problem',
										eventAction:
											'report_delivery_problem_button_click',
										product: {
											productType,
											productDetail,
										},
										eventLabel: productType.urlPart,
									});
									if (canReportProblem) {
										setSelectedProblemRecords([]);
										setPageStatus(
											PageStatus.ReportIssueStep1,
										);
									} else {
										setPageStatus(
											PageStatus.CannotReportProblem,
										);
									}
								}}
							>
								Report a problem
							</Button>
						)}
						{(pageStatus === PageStatus.ReportIssueStep1 ||
							pageStatus === PageStatus.ReportIssueStep2) && (
							<DeliveryRecordProblemForm
								showNextStepButton={
									pageStatus !== PageStatus.ReportIssueStep2
								}
								onResetDeliveryRecordsPage={
									resetDeliveryRecordsPage
								}
								onFormSubmit={step1FormSubmitListener}
								inValidationState={step1formValidationState}
								updateValidationStatusCallback={
									step1FormUpdateCallback
								}
								updateRadioSelectionCallback={
									step1FormRadioOptionCallback
								}
								problemTypes={problemTypes}
							/>
						)}
					</div>
				</>
			)}
			<h2
				css={css`
					border-top: 1px solid ${neutral['86']};
					${headline.small()};
					font-weight: bold;
					opacity: ${pageStatus === PageStatus.ReportIssueStep1 &&
					filteredData.length > 0
						? '0.5'
						: '1'};
					${pageStatus === PageStatus.ReportIssueStep2
						? `
              background-color: ${neutral['97']};
              border-left: 1px solid ${neutral['86']};
              border-right: 1px solid ${neutral['86']};
              margin: 0;
              padding: 14px 14px 14px;
              ${textSans.medium({ fontWeight: 'bold' })};
            `
						: ''}
					${until.tablet} {
						${pageStatus === PageStatus.ReportIssueStep2
							? ``
							: `
              font-size: 1.25rem;
              line-height: 1.6;
              `}
					}
				`}
			>
				{pageStatus === PageStatus.ReportIssueStep2
					? 'Step 2. Select the date you have experienced the problem'
					: 'Deliveries'}
			</h2>
			{filteredData.length === 0 &&
				pageStatus !== PageStatus.CannotReportProblem &&
				(data.results.length === 0 ? (
					<p
						css={css`
							${textSans.medium()};
						`}
					>
						You haven't had a delivery for this subscription yet. In
						the future, details of your deliveries will appear here.
					</p>
				) : (
					<>
						<p
							css={css`
								${textSans.medium()};
							`}
						>
							You currently have no deliveries that you can report
							a problem on based on the problem type that you have
							selected.
						</p>
						<p
							css={css`
								${textSans.medium()};
							`}
						>
							If you are still having problems please{' '}
							<span
								css={css`
									cursor: pointer;
									color: ${brand[500]};
									text-decoration: underline;
								`}
								onClick={() =>
									setBottomCallCentreNumbersVisibility(
										!showBottomCallCentreNumbers,
									)
								}
							>
								Contact us
							</span>
						</p>
					</>
				))}
			{filteredData.map(
				(deliveryRecord: DeliveryRecordApiItem, listIndex) => (
					<DeliveryRecordCard
						key={deliveryRecord.id}
						deliveryRecord={deliveryRecord}
						listIndex={listIndex}
						pageStatus={pageStatus}
						deliveryProblemMap={data.deliveryProblemMap}
						addRecordToDeliveryProblem={addRecordToDeliveryProblem}
						removeRecordFromDeliveryProblem={
							removeRecordFromDeliveryProblem
						}
						showDeliveryInstructions={
							productType.delivery.records
								.showDeliveryInstructions
						}
						recordCurrency={subscriptionCurrency}
						isChecked={selectedProblemRecords.includes(
							deliveryRecord.id,
						)}
						productName={capitalize(
							productType.shortFriendlyName ||
								productType.friendlyName(),
						)}
					/>
				),
			)}
			{totalPages > 1 &&
				(pageStatus === PageStatus.ReadOnly ||
					pageStatus === PageStatus.CannotReportProblem) && (
					<PaginationNav
						resultsPerPage={resultsPerPage}
						totalNumberOfResults={data.results.length}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						changeCallBack={scrollToTop}
					/>
				)}
			{pageStatus === PageStatus.ReportIssueStep2 && (
				<>
					<section
						css={css`
							border: 1px solid ${neutral['86']};
							margin: ${space[5]}px 0 ${space[5]}px;
							padding: 0;
						`}
					>
						<h1
							css={css`
								margin: 0;
								padding: ${space[3]}px;
								background-color: ${neutral['97']};
								border-bottom: 1px solid ${neutral['86']};
								${textSans.medium({
									fontWeight: 'bold',
								})};
								${from.tablet} {
									padding: ${space[3]}px ${space[5]}px;
								}
							`}
						>
							Step 3. Check your current delivery address
							{enableDeliveryInstructions && ' and instructions'}
						</h1>
						{productDetail.subscription.deliveryAddress && (
							<DeliveryAddressStep
								productDetail={productDetail}
								enableDeliveryInstructions={
									enableDeliveryInstructions
								}
								setAddressValidationState={
									setAddressValidationState
								}
							/>
						)}
					</section>
					<div
						css={css`
							margin-top: ${space[6]}px;
						`}
					>
						{(step1formValidationState ||
							step2formValidationState ||
							step3formValidationState) &&
							formErrorMessages.length > 0 && (
								<FormError
									title={formErrorTitle}
									messages={formErrorMessages}
								/>
							)}
						<Button
							onClick={() => {
								setStep1formValidationState(true);
								const isStep2Valid =
									!!selectedProblemRecords.length;
								setStep2FormValidationDetails({
									isValid: isStep2Valid,
									message:
										'Step 2: Please select an affected delivery record.',
								});
								setStep2formValidationState(!isStep2Valid);
								const isStep3Valid = addressInValidState;
								setStep3FormValidationDetails({
									isValid: isStep3Valid,
									message:
										'Step 3: Please save or discard your delivery address changes.',
								});
								setStep3formValidationState(!isStep3Valid);
								if (
									step1FormValidationDetails.isValid &&
									isStep2Valid &&
									isStep3Valid
								) {
									trackEvent({
										eventCategory: 'delivery-problem',
										eventAction:
											'review_report_button_click',
										product: {
											productType,
											productDetail,
										},
										eventLabel: productType.urlPart,
									});
									setPageStatus(PageStatus.ContinueToReview);
									navigate('review', {
										state: {
											productDetail,
											affectedRecords:
												data.results.filter((record) =>
													selectedProblemRecords.includes(
														record.id,
													),
												),
											problemType: deliveryProblem,
											showProblemCredit,
										},
									});
								}
							}}
						>
							Review your report
						</Button>
						<Button
							css={css`
								${textSans.medium()};
								background-color: transparent;
								font-weight: bold;
								margin-left: 22px;
								padding: 0;
								color: ${brand[400]};
								:hover {
									background-color: transparent;
								}
							`}
							onClick={() => {
								setPageStatus(PageStatus.ReadOnly);
							}}
						>
							Cancel
						</Button>
						<Stack space={5}>
							<p
								css={css`
									${textSans.medium()};
									color: ${neutral[46]};
									margin: ${space[6]}px 0 0;
								`}
							>
								If your delivery is not shown above, or you’d
								like to talk to someone,{' '}
								<span
									css={css`
										cursor: pointer;
										color: ${brand[500]};
										text-decoration: underline;
									`}
									onClick={() =>
										setBottomCallCentreNumbersVisibility(
											!showBottomCallCentreNumbers,
										)
									}
								>
									contact us
								</span>
								.
							</p>
							{showBottomCallCentreNumbers && (
								<CallCentreEmailAndNumbers />
							)}
						</Stack>
					</div>
				</>
			)}
		</DeliveryRecordsAddressContext.Provider>
	);
};
