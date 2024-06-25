import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	InlineError,
	Radio,
	RadioGroup,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { FormEvent } from 'react';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { featureSwitches } from '@/shared/featureSwitches';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '../../../../shared/dates';
import type { ProductDetail } from '../../../../shared/productResponse';
import type { ProductTypeWithCancellationFlow } from '../../../../shared/productTypes';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { hasCancellationFlow } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { ProgressIndicator } from '../shared/ProgressIndicator';
import { ProgressStepper } from '../shared/ProgressStepper';
import type { CancellationContextInterface } from './CancellationContainer';
import { CancellationContext } from './CancellationContainer';
import {
	cancellationEffectiveEndOfLastInvoicePeriod,
	cancellationEffectiveToday,
} from './cancellationContexts';
import type { CancellationDateResponse } from './cancellationDateResponse';
import { cancellationDateFetcher } from './cancellationDateResponse';
import type { CancellationReason } from './cancellationReason';
import { ContactUsToCancel } from './ContactUsToCancel';

interface ReasonPickerProps {
	productType: ProductTypeWithCancellationFlow;
	productDetail: ProductDetail;
	chargedThroughDateStr?: string;
}

const ReasonPicker = ({
	productType,
	productDetail,
	chargedThroughDateStr,
}: ReasonPickerProps) => {
	const [selectedReasonId, setSelectedReasonId] = useState<string>('');
	const [cancellationPolicy, setCancellationPolicy] = useState<string>('');

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
			{featureSwitches.supporterplusCancellationOffer &&
			productType.productType === 'supporterplus' ? (
				<ProgressStepper
					steps={[{ isCurrentStep: true }, {}, {}, {}]}
					additionalCSS={css`
						margin: ${space[5]}px 0 ${space[12]}px;
					`}
				/>
			) : (
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
			)}

			{productType.cancellation.startPageBody(productDetail)}
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
							${textSansBold17}
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
						{productType.cancellation.reasons.map(
							(reason: CancellationReason) => (
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
							),
						)}
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
				{chargedThroughDateStr && (
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
									border-bottom: 1px solid
										${palette.neutral[86]};
									${textSansBold17}
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
									(chargedThroughDateStr
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

interface ReasonPickerWithCancellationDateProps {
	productType: ProductTypeWithCancellationFlow;
	productDetail: ProductDetail;
}

function getChargedThroughDateStr(
	cancellationDateResponse: CancellationDateResponse,
) {
	if (
		cancellationDateResponse.cancellationEffectiveDate === 'now' ||
		cancellationDateResponse.cancellationEffectiveDate === undefined ||
		cancellationDateResponse.cancellationEffectiveDate === null
	) {
		return undefined;
	}

	return parseDate(
		cancellationDateResponse.cancellationEffectiveDate,
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);
}

const ReasonPickerWithCancellationDate = ({
	productType,
	productDetail,
}: ReasonPickerWithCancellationDateProps) => {
	const {
		data: cancellationDateResponse,
		loadingState,
	}: {
		data: CancellationDateResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(
		cancellationDateFetcher(productDetail.subscription.subscriptionId),
		JsonResponseHandler,
	);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}

	if (loadingState == LoadingState.IsLoading) {
		return (
			<DefaultLoadingView
				loadingMessage={`Checking your ${
					productType.shortFriendlyName || productType.friendlyName
				} details...`}
			/>
		);
	}

	if (cancellationDateResponse === null) {
		return <GenericErrorScreen />;
	}

	const chargedThroughDateStr = getChargedThroughDateStr(
		cancellationDateResponse,
	);

	return (
		<ReasonPicker
			productType={productType}
			productDetail={productDetail}
			chargedThroughDateStr={chargedThroughDateStr}
		/>
	);
};

export const CancellationReasonSelection = () => {
	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	if (
		!productDetail.selfServiceCancellation.isAllowed ||
		!hasCancellationFlow(productType)
	) {
		return (
			<ContactUsToCancel
				selfServiceCancellation={productDetail.selfServiceCancellation}
				subscriptionId={productDetail.subscription.subscriptionId}
				groupedProductType={
					GROUPED_PRODUCT_TYPES[productDetail.mmaCategory]
				}
			/>
		);
	}

	if (productType.cancellation.startPageOfferEffectiveDateOptions) {
		return (
			<ReasonPickerWithCancellationDate
				productType={productType}
				productDetail={productDetail}
			/>
		);
	}

	return (
		<ReasonPicker productType={productType} productDetail={productDetail} />
	);
};
