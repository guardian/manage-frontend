import { ProgressIndicator } from '../progressIndicator';
import { WithStandardTopMargin } from '../WithStandardTopMargin';
import {
	Button,
	SvgArrowRightStraight,
	Radio,
	RadioGroup,
	InlineError,
} from '@guardian/source-react-components';
import { FormEvent, useContext, useState } from 'react';
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
import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	cancellationEffectiveEndOfLastInvoicePeriod,
	cancellationEffectiveToday,
} from './cancellationContexts';
import { CancellationReason } from './cancellationReason';
import { useNavigate, useLocation } from 'react-router-dom';

interface ReasonPickerProps {
	productDetail: ProductDetail;
	productType: ProductTypeWithCancellationFlow;
	chargedThroughCancellationDate: string;
}

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

	const [inValidationErrorState, setInValidationErrorState] =
		useState<boolean>(false);

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
				<fieldset
					onChange={(event: FormEvent<HTMLFieldSetElement>) => {
						const target: HTMLInputElement =
							event.target as HTMLInputElement;
						setSelectedReasonId(target.value);
					}}
					css={css`
						border: 1px solid ${palette.neutral[86]};
						margin: 0 0 ${space[5]}px;
						padding: 0;
					`}
				>
					<legend
						css={css`
							display: block;
							width: 100%;
							margin: 0;
							padding: ${space[3]}px;
							float: left;
							background-color: ${palette.neutral[97]};
							border-bottom: 1px solid ${palette.neutral[86]};
							${textSans.medium({ fontWeight: 'bold' })};
							${from.tablet} {
								padding: ${space[3]}px ${space[5]}px;
							}
						`}
					>
						Please select a reason
					</legend>
					<RadioGroup
						name="issue_type"
						orientation="vertical"
						css={css`
							display: block;
							padding: ${space[5]}px;
						`}
					>
						{props.productType.cancellation.reasons
							.filter((reason: CancellationReason) =>
								reason.shouldShow
									? reason.shouldShow(props.productDetail)
									: true,
							)
							.map((reason: CancellationReason) => (
								<Radio
									key={reason.reasonId}
									name="cancellation-reason"
									value={reason.reasonId}
									label={reason.linkLabel}
									css={css`
										vertical-align: top;
										text-transform: lowercase;
										:checked + div label:first-of-type {
											font-weight: bold;
										}
									`}
								/>
							))}
					</RadioGroup>
				</fieldset>
				{inValidationErrorState && !selectedReasonId.length && (
					<InlineError
						cssOverrides={css`
							padding: ${space[5]}px;
							margin-bottom: ${space[4]}px;
							border: 4px solid ${palette.error[400]};
							text-align: left;
						`}
					>
						Please select a reason
					</InlineError>
				)}
				{shouldOfferEffectiveDateOptions && (
					<>
						<fieldset
							onChange={(
								event: FormEvent<HTMLFieldSetElement>,
							) => {
								const target: HTMLInputElement =
									event.target as HTMLInputElement;
								if (target.value === 'EndOfLastInvoicePeriod') {
									setCancellationPolicy(
										cancellationEffectiveEndOfLastInvoicePeriod,
									);
								} else {
									setCancellationPolicy(
										cancellationEffectiveToday,
									);
								}
							}}
							css={css`
								border: 1px solid ${palette.neutral[86]};
								margin: 0 0 ${space[5]}px;
								padding: 0;
							`}
						>
							<legend
								css={css`
									display: block;
									width: 100%;
									margin: 0;
									padding: ${space[3]}px;
									float: left;
									background-color: ${palette.neutral[97]};
									border-bottom: 1px solid ${palette.neutral[86]};
									${textSans.medium({ fontWeight: 'bold' })};
									${from.tablet} {
										padding: ${space[3]}px ${space[5]}px;
									}
								`}
							>
								When would you like your cancellation to become
								effective?
							</legend>
							<RadioGroup
								name="issue_type"
								orientation="vertical"
								css={css`
									display: block;
									padding: ${space[5]}px;
								`}
							>
								<Radio
									name="effective-date"
									value="EndOfLastInvoicePeriod"
									label={`On ${chargedThroughDateStr}, which is the end of your current billing period (you should not be charged again)`}
								/>
								<Radio
									name="effective-date"
									value="Today"
									label="Today"
								/>
							</RadioGroup>
						</fieldset>
						{inValidationErrorState && !cancellationPolicy.length && (
							<InlineError
								cssOverrides={css`
									padding: ${space[5]}px;
									margin-bottom: ${space[4]}px;
									border: 4px solid ${palette.error[400]};
									text-align: left;
								`}
							>
								Please select When would you like your
								cancellation to become effective?
							</InlineError>
						)}
					</>
				)}

				<div
					data-cy="cta_container"
					css={{
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row-reverse',
						[until.mobileLandscape]: {
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
						<Button
							icon={<SvgArrowRightStraight />}
							iconSide="right"
							onClick={() => {
								const canContinue =
									!!selectedReasonId.length &&
									(shouldOfferEffectiveDateOptions
										? !!cancellationPolicy.length
										: true);

								if (canContinue) {
									navigate('review', {
										state: {
											...routerState,
											selectedReasonId,
											cancellationPolicy,
										},
									});
								}
								setInValidationErrorState(!canContinue);
							}}
						>
							Continue
						</Button>
					</div>
					<div>
						<Button
							priority="tertiary"
							onClick={() => {
								navigate('/');
							}}
						>
							Return to your account
						</Button>
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