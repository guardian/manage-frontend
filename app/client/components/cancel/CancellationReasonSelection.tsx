import { LinkButton } from '../buttons';
import { ProgressIndicator } from '../progressIndicator';
import { RadioButton } from '../radioButton';
import { WithStandardTopMargin } from '../WithStandardTopMargin';
import { Button } from '@guardian/src-button';

import { useContext, useState } from 'react';
import { hasCancellationFlow } from '../../productUtils';
import {
	CancellationContext,
	CancellationContextInterface,
} from './CancellationContainer';
import { ContactUsToCancel } from './contactUsToCancel';
import {
	CancellationDateAsyncLoader,
	cancellationDateFetcher,
	CancellationDateResponse,
} from './cancellationDateResponse';
import { ProductTypeWithCancellationFlow } from '../../../shared/productTypes';
import { ProductDetail } from '../../../shared/productResponse';
import { DATE_FNS_LONG_OUTPUT_FORMAT, parseDate } from '../../../shared/dates';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import {
	cancellationEffectiveEndOfLastInvoicePeriod,
	cancellationEffectiveToday,
} from './cancellationContexts';
import { maxWidth } from '../../styles/breakpoints';
import { CancellationReason } from './cancellationReason';
import { useNavigate, useLocation } from 'react-router-dom';

interface ReasonPickerProps {
	productDetail: ProductDetail;
	productType: ProductTypeWithCancellationFlow;
	chargedThroughCancellationDate: string;
}

const shouldShow = (reason: CancellationReason, productDetail: ProductDetail) =>
	reason.shouldShow ? reason.shouldShow(productDetail) : true;

const ReasonPicker = (props: ReasonPickerProps) => {
	const [selectedReasonId, setSelectedReasonId] = useState<string>('');
	const [cancellationPolicy, setCancellationPolicy] = useState<string>('');

	// offer choice if not trial period or lead time, and startPageOfferEffectiveDateOptions config set to true
	const shouldOfferEffectiveDateOptions =
		!isNaN(Date.parse(props.chargedThroughCancellationDate)) &&
		props.productType.cancellation.startPageOfferEffectiveDateOptions;

	const chargedThroughDateStr =
		shouldOfferEffectiveDateOptions &&
		parseDate(props.chargedThroughCancellationDate).dateStr(
			DATE_FNS_LONG_OUTPUT_FORMAT,
		);

	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as {
		productDetail: ProductDetail;
		productType: ProductTypeWithCancellationFlow;
	};

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: 'Reason', isCurrentStep: true },
					{ title: 'Review' },
					{ title: 'Confirmation' },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			{props.productType.cancellation.startPageBody(props.productDetail)}
			<WithStandardTopMargin>
				<h4>Please select a reason</h4>
				<form
					data-cy="cancellation_reasons"
					css={css({ marginBottom: '30px' })}
				>
					{props.productType.cancellation.reasons.map(
						(reason: CancellationReason) =>
							shouldShow(reason, props.productDetail) && (
								<RadioButton
									key={reason.reasonId}
									value={reason.reasonId}
									label={reason.linkLabel}
									checked={
										reason.reasonId === selectedReasonId
									}
									groupName="reasons"
									onChange={() =>
										setSelectedReasonId(reason.reasonId)
									}
								/>
							),
					)}
				</form>

				{shouldOfferEffectiveDateOptions && (
					<>
						<h4>
							When would you like your cancellation to become
							effective?
						</h4>
						<form css={css({ marginBottom: '30px' })}>
							<RadioButton
								value="EndOfLastInvoicePeriod"
								label={`On ${chargedThroughDateStr}, which is the end of your current billing period (you should not be charged again)`}
								checked={
									cancellationPolicy ===
									cancellationEffectiveEndOfLastInvoicePeriod
								}
								groupName="cancellationPolicy"
								onChange={() =>
									setCancellationPolicy(
										cancellationEffectiveEndOfLastInvoicePeriod,
									)
								}
							/>
							<RadioButton
								value="Today"
								label="Today"
								checked={
									cancellationPolicy ===
									cancellationEffectiveToday
								}
								groupName="cancellationPolicy"
								onChange={() =>
									setCancellationPolicy(
										cancellationEffectiveToday,
									)
								}
							/>
						</form>
					</>
				)}

				<div
					data-cy="cta_container"
					css={{
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row-reverse',
						[maxWidth.mobileLandscape]: {
							flexDirection: 'column',
						},
					}}
				>
					<div
						css={{
							textAlign: 'right',
							marginBottom: '10px',
						}}
					>
						{/*
						<LinkButton
							text="Continue"
							to="review"
							state={{
								selectedReason:
									props.productType.cancellation.reasons.find(
										(reason) => {
											return (
												reason.reasonId ===
												selectedReasonId
											);
										},
									),
								cancellationPolicy,
							}}
							disabled={
								!selectedReasonId ||
								(shouldOfferEffectiveDateOptions &&
									!cancellationPolicy)
							}
							right
						/>
					  */}
						<Button
							onClick={() => {
								console.log("asdf routerState = ", routerState);
								navigate('review', {
									state: {
										...routerState,
										selectedReasonId,
										cancellationPolicy,
									},
								});
							}}
						>
							Continue
						</Button>
					</div>
					<div>
						<LinkButton text="Return to your account" to="/" left />
					</div>
				</div>
			</WithStandardTopMargin>
		</>
	);
};

const ReasonPickerRenderer =
	(
		productType: ProductTypeWithCancellationFlow,
		productDetail: ProductDetail,
	) =>
	(apiResponse: CancellationDateResponse) => {
		return (
			<ReasonPicker
				productType={productType}
				productDetail={productDetail}
				chargedThroughCancellationDate={
					apiResponse.cancellationEffectiveDate
				}
			/>
		);
	};

const CancellationReasonSelection = () => {
	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	console.log('CancellationReasonSelection productDetail = ', productDetail);

	return productDetail.selfServiceCancellation.isAllowed &&
		hasCancellationFlow(productType) ? (
		<CancellationDateAsyncLoader
			fetch={cancellationDateFetcher(
				productDetail.subscription.subscriptionId,
			)}
			render={ReasonPickerRenderer(
				productType as ProductTypeWithCancellationFlow,
				productDetail,
			)}
			loadingMessage={`Checking your ${
				productType.shortFriendlyName || productType.friendlyName
			} details...`}
		/>
	) : (
		<ContactUsToCancel
			selfServiceCancellation={productDetail.selfServiceCancellation}
			subscriptionId={productDetail.subscription.subscriptionId}
			productType={productType}
		/>
	);
};

export default CancellationReasonSelection;
