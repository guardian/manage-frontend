import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans17,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import { Button, Stack } from '@guardian/source/react-components';
import { capitalize } from 'lodash';
import { useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { parseDate } from '@/shared/dates';
import type {
	DeliveryRecordApiItem,
	PaidSubscriptionPlan,
} from '@/shared/productResponse';
import { getMainPlan, isPaidSubscriptionPlan } from '@/shared/productResponse';
import { CallCentreEmailAndNumbers } from '../../../shared/CallCenterEmailAndNumbers';
import type {
	PotentialHolidayStopsResponse,
	RawPotentialHolidayStopDetail,
} from '../../holiday/HolidayStopApi';
import {
	getPotentialHolidayStopsFetcher,
	PotentialHolidayStopsAsyncLoader,
} from '../../holiday/HolidayStopApi';
import { InfoIconDark } from '../../shared/assets/InfoIconDark';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { DeliveryRecordCard } from './DeliveryRecordCard';
import { PageStatus } from './DeliveryRecords';
import type {
	ContactPhoneNumbers,
	DeliveryRecordsPostPayload,
} from './deliveryRecordsApi';
import type {
	DeliveryRecordsContextInterface,
	DeliveryRecordsRouterState,
} from './DeliveryRecordsContainer';
import {
	checkForExistingDeliveryProblem,
	DeliveryRecordsContext,
} from './DeliveryRecordsContainer';
import { DeliveryRecordCreditContext } from './DeliveryRecordsProblemContext';
import { UserPhoneNumber } from './UserPhoneNumber';

export const DeliveryRecordsProblemReview = () => {
	const location = useLocation();
	const routerState = location.state as DeliveryRecordsRouterState;

	if (!routerState) {
		return <Navigate to=".." />;
	}

	const { productDetail } = useContext(
		DeliveryRecordsContext,
	) as DeliveryRecordsContextInterface;

	const subscription = productDetail.subscription;
	const isTestUser = productDetail.isTestUser;

	const problemStartDate =
		routerState.affectedRecords[routerState.affectedRecords.length - 1]
			.deliveryDate;
	const problemEndDate = routerState.affectedRecords[0].deliveryDate;

	const renderReviewDetails = (
		potentialHolidayStopsResponseWithCredits: PotentialHolidayStopsResponse,
	) => {
		const totalCreditAmount: number =
			potentialHolidayStopsResponseWithCredits.potentials.length &&
			potentialHolidayStopsResponseWithCredits.potentials
				.flatMap((x) => [Math.abs(x.credit || 0)])
				.reduce(
					(accumulator, currentValue) => accumulator + currentValue,
				);

		return (
			<DeliveryRecordsProblemReviewFC
				showCredit
				creditDate={
					potentialHolidayStopsResponseWithCredits.nextInvoiceDateAfterToday
				}
				relatedPublications={
					potentialHolidayStopsResponseWithCredits.potentials
				}
				totalCreditAmount={totalCreditAmount}
			/>
		);
	};

	return routerState.showProblemCredit ? (
		<PotentialHolidayStopsAsyncLoader
			fetch={getPotentialHolidayStopsFetcher(
				subscription.subscriptionId,
				parseDate(problemStartDate).date,
				parseDate(problemEndDate).date,
				isTestUser,
			)}
			render={renderReviewDetails}
			loadingMessage="Generating your report"
		/>
	) : (
		<DeliveryRecordsProblemReviewFC />
	);
};

interface DeliveryRecordsProblemReviewFCProps {
	showCredit?: true;
	creditDate?: string;
	totalCreditAmount?: number;
	relatedPublications?: RawPotentialHolidayStopDetail[];
}

const DeliveryRecordsProblemReviewFC = (
	props: DeliveryRecordsProblemReviewFCProps,
) => {
	const location = useLocation();
	const routerState = location.state as DeliveryRecordsRouterState;
	const navigate = useNavigate();

	const { productType, productDetail, data } = useContext(
		DeliveryRecordsContext,
	) as DeliveryRecordsContextInterface;

	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	if (!isPaidSubscriptionPlan(mainPlan)) {
		throw new Error(
			'mainPlan is not a PaidSubscriptionPlan in deliveryRecordsProblemReview',
		);
	}

	const contactPhoneNumbers = data.contactPhoneNumbers;
	const apiProductName =
		productType.delivery.records.productNameForProblemReport;
	const repeatDeliveryProblem = checkForExistingDeliveryProblem(data.results);
	const subscription = productDetail.subscription;
	const productName = capitalize(
		productType.shortFriendlyName || productType.friendlyName,
	);
	const subscriptionCurrency = mainPlan.currency;
	const deliveryProblemMap = data.deliveryProblemMap;

	const [newPhoneNumbers, setPhoneNumbers] = useState<
		ContactPhoneNumbers | undefined
	>(contactPhoneNumbers);
	const [showCallCenterNumbers, setShowCallCenterNumbers] =
		useState<boolean>(false);

	const dtCss: string = `
    font-weight: bold;
    display: inline-block;
    vertical-align: top;
    min-width: 12ch;
    ${from.tablet} {
      min-width: 16ch;
    }
  `;
	const ddCss: string = `
    margin: 0;
    display: inline-block;
    vertical-align: top;
  `;
	const deliveryIssuePostPayload: DeliveryRecordsPostPayload = {
		productName: apiProductName,
		description: routerState.problemType?.message,
		problemType: routerState.problemType?.category,
		repeatDeliveryProblem: repeatDeliveryProblem,
		deliveryRecords:
			props.showCredit && props.relatedPublications
				? routerState.affectedRecords.map((record) => {
						const matchingPublication =
							props.relatedPublications?.find(
								(x) =>
									x.publicationDate === record.deliveryDate,
							);
						return {
							id: record.id,
							creditAmount: matchingPublication?.credit,
							invoiceDate: matchingPublication
								? props.creditDate
								: undefined,
						};
				  })
				: routerState.affectedRecords.map((record) => {
						return { id: record.id };
				  }),
		...((newPhoneNumbers?.Phone ||
			newPhoneNumbers?.HomePhone ||
			newPhoneNumbers?.MobilePhone ||
			newPhoneNumbers?.OtherPhone) && {
			newContactPhoneNumbers: newPhoneNumbers,
		}),
	};

	return (
		<DeliveryRecordCreditContext.Provider
			value={{
				showCredit: routerState.showProblemCredit,
				...(props.totalCreditAmount && {
					creditAmount: `${subscriptionCurrency}${props.totalCreditAmount.toFixed(
						2,
					)}`,
				}),
				...(props.creditDate && {
					creditDate:
						props.creditDate &&
						parseDate(props.creditDate).dateStr(),
				}),
			}}
		>
			<ProgressIndicator
				steps={[
					{ title: 'Update' },
					{ title: 'Review', isCurrentStep: true },
					{ title: 'Confirmation' },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<h2
				css={css`
					border-top: 1px solid ${palette.neutral['86']};
					${headlineBold28};
					${until.tablet} {
						font-size: 1.25rem;
						line-height: 1.6;
					}
				`}
			>
				Delivery report review
			</h2>
			<section
				css={css`
					border: 1px solid ${palette.neutral['86']};
				`}
			>
				<h2
					css={css`
						margin: 0;
						padding: ${space[3]}px;
						background-color: ${palette.neutral['97']};
						border-bottom: 1px solid ${palette.neutral['86']};
						${textSansBold17};
						${from.tablet} {
							padding: ${space[3]}px ${space[5]}px;
						}
					`}
				>
					Step 4. Please review your report details
				</h2>
				<dl
					css={css`
						padding: 0 ${space[3]}px;
						${textSans17};
						display: flex;
						flex-wrap: wrap;
						flex-direction: column;
						justify-content: space-between;
						${from.tablet} {
							flex-direction: initial;
							padding: 0 ${space[5]}px;
						}
					`}
				>
					<div
						css={css`
							flex-grow: 1;
						`}
					>
						<dt
							css={css`
								${dtCss}
							`}
						>
							Subscription ID:
						</dt>
						<dd
							css={css`
								${ddCss}
							`}
							data-qm-masking="blocklist"
						>
							{subscription.subscriptionId}
						</dd>
					</div>
					<div
						css={css`
							flex-grow: 1;
							margin-top: 16px;
							${from.tablet} {
								margin-top: 0;
							}
						`}
					>
						<dt
							css={css`
								${dtCss}
								${from.tablet} {
									min-width: 10ch;
								}
							`}
						>
							Product:
						</dt>
						<dd
							css={css`
								${ddCss}
							`}
						>
							{productName}
						</dd>
					</div>
					<div
						css={css`
							margin-top: 16px;
							width: 100%;
							${from.tablet} {
								margin-top: ${space[5]}px;
							}
						`}
					>
						<dt
							css={css`
								${dtCss}
							`}
						>
							Type of problem:
						</dt>
						<dd
							css={css`
								${ddCss}
								max-width: calc(100% - 12ch);
								${from.tablet} {
									max-width: calc(100% - 16ch);
								}
							`}
						>
							<h4
								css={css`
									${textSansBold17};
									margin: 0;
								`}
							>
								{routerState.problemType &&
									routerState.problemType.category}
							</h4>
							{routerState.problemType?.message && (
								<p
									css={css`
										margin: 0;
									`}
								>
									{routerState.problemType?.message}
								</p>
							)}
						</dd>
					</div>
					<div
						css={css`
							margin-top: 16px;
							width: 100%;
							${from.tablet} {
								margin-top: ${space[5]}px;
							}
						`}
					>
						<dt
							css={css`
								${dtCss}
							`}
						>
							Selected Issue(s):
						</dt>
						<dd
							css={css`
								${ddCss}
								max-width: calc(100% - 12ch);
								${from.tablet} {
									max-width: calc(100% - 16ch);
								}
							`}
						>
							<h4
								css={css`
									${textSans17};
									margin: 0;
								`}
							>
								{routerState.affectedRecords?.length}
							</h4>
						</dd>
					</div>
				</dl>
				{routerState && routerState.affectedRecords?.length ? (
					<div
						css={css`
							padding: 0 ${space[3]}px;
							margin-bottom: ${space[3]}px;
							${from.tablet} {
								padding: 0 ${space[5]}px;
								margin-bottom: ${space[5]}px;
							}
						`}
					>
						{routerState.affectedRecords.map(
							(
								deliveryRecord: DeliveryRecordApiItem,
								listIndex,
							) => (
								<DeliveryRecordCard
									key={deliveryRecord.id}
									deliveryRecord={deliveryRecord}
									listIndex={listIndex}
									pageStatus={PageStatus.ReadOnly}
									showDeliveryInstructions={
										productType.delivery.records
											.showDeliveryInstructions
									}
									deliveryProblemMap={deliveryProblemMap}
								/>
							),
						)}
					</div>
				) : (
					<p>There aren't any delivery records to show you yet</p>
				)}
				{routerState.showProblemCredit && props.totalCreditAmount ? (
					<>
						<span
							css={css`
								position: relative;
								display: block;
								margin: ${space[3]}px;
								padding: 0 ${space[3]}px 0
									${space[5] + space[2]}px;
								${textSans17};
								${from.tablet} {
									margin: ${space[5]}px;
									padding: 0 ${space[5]}px 0
										${space[5] + space[2]}px;
								}
							`}
						>
							<i
								css={css`
									position: absolute;
									top: 4px;
									left: 0;
								`}
							>
								<InfoIconDark fillColor={palette.brand[500]} />
							</i>
							We apologise for any inconvenience caused and will
							credit you the amount shown below once you submit
							your report. We continually review these reports and
							use them to improve our service. If you’re not
							satisfied with this outcome please{' '}
							<span
								css={css`
									color: ${palette.brand[500]};
									text-decoration: underline;
									cursor: pointer;
								`}
								onClick={() =>
									setShowCallCenterNumbers(
										!showCallCenterNumbers,
									)
								}
							>
								contact us
							</span>{' '}
							instead of submitting your report.
						</span>
						<dl
							css={css`
								${textSans17};
								padding: ${space[3]}px;
								margin: ${space[3]}px;
								background-color: ${palette.neutral['97']};
								${from.tablet} {
									padding: ${space[5]}px;
									margin: ${space[5]}px;
								}
							`}
						>
							<div
								css={css`
									display: inline-block;
								`}
							>
								<dt
									css={css`
										display: inline-block;
										font-weight: bold;
										min-width: 12ch;
										${from.tablet} {
											min-width: 0;
										}
									`}
								>
									Credit amount:
								</dt>
								<dd
									css={css`
										display: inline-block;
										margin-left: 0;
										font-weight: bold;
										${from.tablet} {
											margin-left: ${space[9]}px;
											min-width: 9ch;
										}
									`}
								>
									{subscriptionCurrency}
									{props.totalCreditAmount.toFixed(2)}
								</dd>
							</div>
							<div
								css={css`
									display: inline-block;
								`}
							>
								<dt
									css={css`
										display: inline-block;
										font-weight: bold;
										min-width: 12ch;
										${from.tablet} {
											min-width: 0;
										}
									`}
								>
									Credit date:
								</dt>
								<dd
									css={css`
										display: inline-block;
										margin-left: 0;
										${from.tablet} {
											margin-left: ${space[9]}px;
										}
									`}
								>
									{props.creditDate &&
										parseDate(props.creditDate).dateStr()}
								</dd>
							</div>
						</dl>
					</>
				) : (
					<>
						<span
							css={css`
								position: relative;
								display: block;
								margin: ${space[3]}px;
								padding: 0 ${space[3]}px 0
									${space[5] + space[2]}px;
								${textSans17};
								${from.tablet} {
									margin: ${space[5]}px;
									padding: 0 ${space[5]}px 0
										${space[5] + space[2]}px;
								}
							`}
						>
							<i
								css={css`
									position: absolute;
									top: 4px;
									left: 0;
								`}
							>
								<InfoIconDark fillColor={palette.brand[500]} />
							</i>
							Once you submit your report, your case will be
							marked as high priority. Our customer service team
							will try their best to contact you as soon as
							possible to resolve the issue.
						</span>
						{newPhoneNumbers && (
							<UserPhoneNumber
								existingPhoneNumbers={contactPhoneNumbers}
								callback={(newNumbers: ContactPhoneNumbers) => {
									setPhoneNumbers(newNumbers);
								}}
							/>
						)}
					</>
				)}
			</section>
			<div
				css={css`
					margin-top: ${space[9]}px;
				`}
			>
				<Button
					onClick={() => {
						navigate('../confirmed', {
							state: {
								productDetail,
								affectedRecords: routerState.affectedRecords,
								deliveryIssuePostPayload:
									deliveryIssuePostPayload,
							},
						});
					}}
				>
					Submit your report
				</Button>
				<Button
					css={css`
						${textSans17};
						background-color: transparent;
						font-weight: bold;
						margin-left: 22px;
						padding: 0;
						color: ${palette.brand[400]};
						:hover {
							background-color: transparent;
						}
					`}
					onClick={() => {
						navigate('..', {
							state: {
								productDetail,
							},
						});
					}}
				>
					Cancel
				</Button>
			</div>
			<Stack space={5}>
				<p
					css={css`
						${textSans17};
						margin: ${space[6]}px 0 0;
						color: ${palette.neutral[46]};
					`}
				>
					If your delivery is not shown above, or you’d like to talk
					to someone,{' '}
					<span
						css={css`
							color: ${palette.brand[500]};
							text-decoration: underline;
							cursor: pointer;
						`}
						onClick={() =>
							setShowCallCenterNumbers(!showCallCenterNumbers)
						}
					>
						contact us
					</span>
				</p>
				{showCallCenterNumbers && <CallCentreEmailAndNumbers />}
			</Stack>
		</DeliveryRecordCreditContext.Provider>
	);
};
