import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	headlineBold28,
	palette,
	space,
	textSans17,
	textSansBold17,
	textSansBold24,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	InlineError,
	Radio,
	RadioGroup,
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { FormEvent } from 'react';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { featureSwitches } from '@/shared/featureSwitches';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '../../../../shared/dates';
import type { ProductDetail } from '../../../../shared/productResponse';
import type { ProductTypeWithCancellationFlow } from '../../../../shared/productTypes';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { isPrintProduct } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { Card } from '../shared/Card';
import { ProgressIndicator } from '../shared/ProgressIndicator';
import { ProgressStepper } from '../shared/ProgressStepper';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
} from './CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from './CancellationContainer';
import {
	cancellationEffectiveEndOfLastInvoicePeriod,
	cancellationEffectiveToday,
} from './cancellationContexts';
import type { CancellationDateResponse } from './cancellationDateResponse';
import { cancellationDateFetcher } from './cancellationDateResponse';
import type { CancellationReason } from './cancellationReason';

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

	const shouldUseProgressStepper =
		(featureSwitches.supporterplusCancellationOffer &&
			productType.productType === 'supporterplus') ||
		(featureSwitches.contributionCancellationPause &&
			productType.productType === 'contributions');

	if (!productType.cancellation.reasons) {
		return (
			<GenericErrorScreen loggingMessage="Got to the cancellation reasons selection page with a productType that doesn't have any cancellation reasons." />
		);
	}

	return (
		<>
			{shouldUseProgressStepper ? (
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
						cssOverrides={css`
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
									cssOverrides={css`
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
								cssOverrides={css`
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

const PrintReasonPicker = ({
	productType,
}: {
	productType: ProductTypeWithCancellationFlow;
}) => {
	const [selectedReasonId, setSelectedReasonId] = useState<string>('');
	const [feedback, setFeedback] = useState<string>('');
	const [inValidationErrorState, setInValidationErrorState] =
		useState<boolean>(false);

	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as Record<string, unknown>;
	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const characterLimit = 2500;

	useEffect(() => {
		pageTitleContext.setPageTitle('Manage subscription');
	}, [pageTitleContext]);

	if (!productType.cancellation.reasons) {
		return (
			<GenericErrorScreen loggingMessage="Got to the cancellation reasons selection page with a productType that doesn't have any cancellation reasons." />
		);
	}

	return (
		<>
			<ProgressStepper
				steps={[{ isCurrentStep: true }, {}, {}]}
				additionalCSS={css`
					margin: ${space[5]}px 0;
					margin-bottom: ${space[8]}px;

					${from.tablet} {
						margin: ${space[10]}px 0;
					}
				`}
			/>
			<WithStandardTopMargin>
				<h2
					css={css`
						${headlineBold28}
						margin: 0 0 ${space[2]}px;

						${from.tablet} {
							margin: 0 0 ${space[3]}px;
						}
					`}
				>
					We're sorry to see you go
				</h2>
				<p
					css={css`
						${textSans17}
						margin: 0 0 ${space[5]}px;
					`}
				>
					We value your feedback and review it regularly to improve
					our services.
				</p>
				<div
					css={css`
						margin: 0 0 ${space[5]}px;
					`}
				>
					<Card>
						<Card.Header
							backgroundColor={palette.brand[800]}
							minHeightOverride="auto"
						>
							<h3
								css={css`
									${textSansBold24}
									margin: 0;
								`}
							>
								Please take a moment to tell us why you want to
								cancel your subscription
							</h3>
						</Card.Header>
						<Card.Section>
							<fieldset
								onChange={(
									event: FormEvent<HTMLFieldSetElement>,
								) => {
									const target: HTMLInputElement =
										event.target as HTMLInputElement;
									setSelectedReasonId(target.value);
								}}
								css={css`
									border: 0;
									margin: 0;
									padding: 0;
								`}
							>
								<legend
									css={css`
										display: none;
									`}
								>
									Please select a reason for cancelling
								</legend>
								<RadioGroup
									name="issue_type"
									orientation="vertical"
									cssOverrides={css`
										display: block;

										> div > div {
											padding-top: 0;
											padding-bottom: ${space[4]}px;
										}

										> div > div:last-of-type {
											padding-bottom: ${space[3]}px;
										}
									`}
								>
									{productType.cancellation.reasons.map(
										(reason: CancellationReason) => (
											<Radio
												key={reason.reasonId}
												name="cancellation-reason"
												value={reason.reasonId}
												label={reason.linkLabel}
												cssOverrides={css`
													vertical-align: top;
													:checked
														+ div
														label:first-of-type {
														font-weight: bold;
													}
												`}
											/>
										),
									)}
								</RadioGroup>
							</fieldset>
						</Card.Section>
					</Card>
				</div>
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
				<h3
					css={css`
						${headlineBold17}
						margin: ${space[6]}px 0 ${space[1]}px;
					`}
				>
					Leave us some feedback
				</h3>
				<textarea
					rows={5}
					maxLength={characterLimit}
					css={{
						width: '100%',
						fontSize: 'inherit',
						fontFamily: 'inherit',
						border: `1px solid ${palette.neutral[86]}`,
						borderRadius: `${space[1]}px`,
						marginBottom: `${space[6]}px`,
					}}
					onChange={(event) => {
						setFeedback(event.target.value);
					}}
				/>

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
						onClick={() => {
							navigate('/');
						}}
					>
						Previous
					</Button>
					<Button
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						onClick={() => {
							const canContinue = !!selectedReasonId.length;

							if (canContinue) {
								navigate('review', {
									state: {
										...routerState,
										selectedReasonId,
										cancellationFeedback: feedback,
									},
								});
							}
							setInValidationErrorState(!canContinue);
						}}
					>
						Continue to Cancel
					</Button>
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

	if (isPrintProduct(productType)) {
		return <PrintReasonPicker productType={productType} />;
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
