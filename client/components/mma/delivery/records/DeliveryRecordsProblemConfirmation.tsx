import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { DATE_FNS_SHORT_OUTPUT_FORMAT, dateString } from '@/shared/dates';
import type {
	DeliveryRecordApiItem,
	PaidSubscriptionPlan,
	Subscription,
} from '@/shared/productResponse';
import { getMainPlan } from '@/shared/productResponse';
import { NAV_LINKS } from '../../../shared/nav/NavConfig';
import { InfoIconDark } from '../../shared/assets/InfoIconDark';
import { ProductDescriptionListTable } from '../../shared/ProductDescriptionListTable';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { DeliveryRecordCard } from './DeliveryRecordCard';
import { PageStatus } from './DeliveryRecords';
import type {
	DeliveryRecordsPostPayload,
	DeliveryRecordsResponse,
} from './deliveryRecordsApi';
import {
	createDeliveryRecordsProblemPost,
	DeliveryRecordsApiAsyncLoader,
} from './deliveryRecordsApi';
import type {
	DeliveryRecordsContextInterface,
	DeliveryRecordsRouterState,
} from './DeliveryRecordsContainer';
import { DeliveryRecordsContext } from './DeliveryRecordsContainer';
import {
	DeliveryRecordCreditContext,
	DeliveryRecordsAddressContext,
	DeliveryRecordsProblemPostPayloadContext,
} from './DeliveryRecordsProblemContext';
import { ReadOnlyAddressDisplay } from './ReadOnlyAddressDisplay';

const renderDeliveryRecordsConfirmation =
	(subscription: Subscription) => (data: DeliveryRecordsResponse) => {
		const mainPlan = getMainPlan(subscription) as PaidSubscriptionPlan;

		if (!mainPlan) {
			throw new Error(
				'mainPlan does not exist in deliveryRecordsProblemReview',
			);
		}

		return (
			<DeliveryRecordsProblemConfirmationFC
				data={data}
				subscriptionId={subscription.subscriptionId}
				subscriptionCurrency={mainPlan.currency}
			/>
		);
	};

interface DeliveryRecordsProblemConfirmationFCProps {
	data: DeliveryRecordsResponse;
	subscriptionId: string;
	subscriptionCurrency: string;
}

const DeliveryRecordsProblemConfirmationFC = (
	props: DeliveryRecordsProblemConfirmationFCProps,
) => {
	const deliveryIssuePostPayload = useContext(
		DeliveryRecordsProblemPostPayloadContext,
	);
	const deliveryProblemCredit = useContext(DeliveryRecordCreditContext);
	const deliveryAddressContext = useContext(DeliveryRecordsAddressContext);
	const filteredData = props.data.results.filter(
		(record) =>
			deliveryIssuePostPayload?.deliveryRecords?.findIndex(
				(affectedRecord) => affectedRecord.id === record.id,
			) !== -1,
	);

	const { productType } = useContext(
		DeliveryRecordsContext,
	) as DeliveryRecordsContextInterface;

	const problemCaseId = filteredData.find(
		(record) => record.problemCaseId,
	)?.problemCaseId;
	const problemReferenceId = problemCaseId
		? props.data.deliveryProblemMap[problemCaseId]?.ref
		: '-';

	const dtCss = css`
		font-weight: bold;
		display: inline-block;
		vertical-align: top;
		min-width: 12ch;
		${from.tablet} {
			min-width: 16ch;
		}
	`;
	const ddCss = css`
		margin: 0;
		display: inline-block;
		vertical-align: top;
	`;
	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: 'Update' },
					{ title: 'Review' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<h2
				css={css`
					border-top: 1px solid ${palette.neutral['86']};
					${headline.small()};
					font-weight: bold;
					${until.tablet} {
						font-size: 1.25rem;
						line-height: 1.6;
					}
				`}
			>
				Delivery report confirmation
			</h2>
			<p
				css={css`
					${textSans.medium()};
				`}
			>
				Your delivery problem report has been successfully submitted.
			</p>
			<span
				css={css`
					position: relative;
					display: block;
					margin: ${space[3]}px 0;
					padding: ${space[3]}px ${space[3]}px ${space[3]}px
						${space[3] * 2 + 17}px;
					background-color: ${palette.neutral[97]};
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
					<InfoIconDark fillColor={palette.brand[500]} />
				</i>
				{deliveryProblemCredit?.showCredit
					? `Thank you for reporting your delivery problem${
							deliveryAddressContext.address &&
							deliveryAddressContext.productsAffected &&
							deliveryAddressContext.productsAffected?.length > 0
								? ' and updating your delivery details'
								: ''
					  }. We will credit you for the affected issues and apologise for any inconvenience caused. We monitor these reports closely and use them to improve our service.`
					: `Your case is high priority. Our customer service team will try their best to contact you as soon as possible to resolve the issue.${
							deliveryAddressContext.address &&
							deliveryAddressContext.productsAffected &&
							deliveryAddressContext.productsAffected?.length > 0
								? ' Thank you for updating your delivery details.'
								: ''
					  }`}
			</span>
			<section
				css={css`
					border: 1px solid ${palette.neutral['86']};
					margin-bottom: ${deliveryAddressContext.address &&
					deliveryAddressContext.productsAffected &&
					deliveryAddressContext.productsAffected?.length > 0
						? space[5]
						: space[9]}px;
				`}
			>
				<h2
					css={css`
						margin: 0;
						padding: 14px ${space[3]}px;
						background-color: ${palette.neutral['97']};
						border-bottom: 1px solid ${palette.neutral['86']};
						${textSans.medium({ fontWeight: 'bold' })};
						${from.tablet} {
							padding: 14px ${space[5]}px;
						}
					`}
				>
					Reported delivery problems
				</h2>
				<dl
					css={css`
						padding: 0 ${space[3]}px;
						${textSans.medium()};
						display: flex;
						flex-wrap: wrap;
						flex-direction: column;
						justify-content: space-between;
						${from.tablet} {
							flex-direction: initial;
							padding: 0 ${space[5]}px;
						}
						div {
							margin-top: 16px;
							${from.tablet} {
								min-width: 50%;
							}
						}
					`}
				>
					<div>
						<dt css={dtCss}>Reference:</dt>
						<dd css={ddCss}>{problemReferenceId}</dd>
					</div>
					<div>
						<dt css={dtCss}>Date reported:</dt>
						<dd css={ddCss}>
							{dateString(
								new Date(),
								DATE_FNS_SHORT_OUTPUT_FORMAT,
							)}
						</dd>
					</div>
					<div>
						<dt css={dtCss}>Subscription ID:</dt>
						<dd css={ddCss} data-qm-masking="blocklist">
							{props.subscriptionId}
						</dd>
					</div>
					<div>
						<dt css={dtCss}>Product:</dt>
						<dd css={ddCss}>
							{productType.shortFriendlyName ||
								productType.friendlyName()}
						</dd>
					</div>
					<div>
						<dt css={dtCss}>Contact number:</dt>
						<dd css={ddCss}>
							{Object.entries(props.data.contactPhoneNumbers)
								.filter(
									([phoneType, phoneNumber]) =>
										phoneType.toLowerCase() !== 'id' &&
										phoneNumber,
								)
								.map(([_, phoneNumber], index) => (
									<span
										key={`phoneNo-${index}`}
										css={css`
											display: block;
											margin-bottom: ${space[3]};
										`}
									>
										{phoneNumber}
									</span>
								)) || '-'}
						</dd>
					</div>
					<div>
						<dt css={dtCss}>Selected Issue(s):</dt>
						<dd css={ddCss}>
							{deliveryIssuePostPayload?.deliveryRecords?.length}
						</dd>
					</div>
				</dl>
				<div
					css={css`
						padding: 0 ${space[3]}px;
						margin-bottom: ${space[5]}px;
						${from.tablet} {
							padding: 0 ${space[5]}px;
						}
					`}
				>
					{props.data.results.length ? (
						filteredData.map(
							(
								deliveryRecord: DeliveryRecordApiItem,
								listIndex,
							) => (
								<DeliveryRecordCard
									key={deliveryRecord.id}
									deliveryRecord={deliveryRecord}
									listIndex={listIndex}
									pageStatus={
										PageStatus.ReportIssueConfirmation
									}
									showDeliveryInstructions={
										productType.delivery?.records
											?.showDeliveryInstructions
									}
									deliveryProblemMap={
										props.data.deliveryProblemMap
									}
									recordCurrency={props.subscriptionCurrency}
								/>
							),
						)
					) : (
						<p>There aren't any delivery records to show you yet</p>
					)}
				</div>
				{deliveryProblemCredit?.showCredit && (
					<dl
						css={css`
							${textSans.medium()};
							padding: ${space[5]}px;
							margin: ${space[5]}px;
							background-color: ${palette.neutral['97']};
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
								`}
							>
								Credit amount:
							</dt>
							<dd
								css={css`
									display: inline-block;
									min-width: 9ch;
								`}
							>
								{deliveryProblemCredit.creditAmount}
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
								`}
							>
								Credit date:
							</dt>
							<dd
								css={css`
									display: inline-block;
								`}
							>
								{deliveryProblemCredit.creditDate}
							</dd>
						</div>
					</dl>
				)}
			</section>
			{deliveryAddressContext.address &&
				deliveryAddressContext.productsAffected &&
				deliveryAddressContext.productsAffected?.length > 0 && (
					<section
						css={css`
							border: 1px solid ${palette.neutral['86']};
							margin-bottom: ${space[9]}px;
						`}
					>
						<h2
							css={css`
								margin: 0;
								padding: 14px ${space[3]}px;
								background-color: ${palette.neutral['97']};
								border-bottom: 1px solid
									${palette.neutral['86']};
								${textSans.medium({ fontWeight: 'bold' })};
								${from.tablet} {
									padding: 14px ${space[5]}px;
								}
							`}
						>
							Delivery address changes
						</h2>
						<ReadOnlyAddressDisplay
							address={deliveryAddressContext.address}
							instructions={
								(deliveryAddressContext.enableDeliveryInstructions &&
									deliveryAddressContext.address
										.instructions) ||
								undefined
							}
						/>
						<div
							css={css`
								padding: 0 ${space[3]}px;
								margin-top: ${space[5]}px;
								${from.tablet} {
									padding: 0 ${space[5]}px;
								}
							`}
						>
							<p
								css={css`
									${textSans.medium()}
								`}
							>
								Your change of address affects the following
								subscriptions:
							</p>
							<ProductDescriptionListTable
								content={
									deliveryAddressContext.productsAffected
								}
								seperateEachRow
							/>
						</div>
					</section>
				)}
			<LinkButton
				css={css`
					margin-top: ${space[3]}px;
					${from.tablet} {
						margin-top: ${space[5]}px;
					}
				`}
				href={NAV_LINKS.accountOverview.link}
			>
				Return to your account
			</LinkButton>
		</>
	);
};

interface DeliveryRecordsConfirmationRouterState
	extends DeliveryRecordsRouterState {
	deliveryIssuePostPayload: DeliveryRecordsPostPayload;
}

export const DeliveryRecordsProblemConfirmation = () => {
	const location = useLocation();
	const routerState =
		location.state as DeliveryRecordsConfirmationRouterState;

	if (!routerState) {
		return <Navigate to=".." />;
	}

	const { productDetail, deliveryIssuePostPayload } = routerState;

	const subscription = productDetail.subscription;
	const isTestUser = productDetail.isTestUser;

	return (
		<DeliveryRecordsApiAsyncLoader
			render={renderDeliveryRecordsConfirmation(subscription)}
			fetch={createDeliveryRecordsProblemPost(
				subscription.subscriptionId,
				isTestUser,
				deliveryIssuePostPayload,
			)}
			loadingMessage={'Reporting problem...'}
		/>
	);
};
