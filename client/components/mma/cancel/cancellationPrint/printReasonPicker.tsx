import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold15,
	textSansBold17,
	textSansBold20,
	textSansBold24,
} from '@guardian/source/foundations';
import {
	Button,
	InlineError,
	Radio,
	RadioGroup,
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { ChangeEvent, FormEvent } from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductTypeWithCancellationFlow } from '../../../../../shared/productTypes';
import { useAccountStore } from '../../../../stores/AccountStore';
import { usePrintCancellationStore } from '../../../../stores/PrintCancellationStore';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';
import { Card } from '../../shared/Card';
import { ProgressStepper } from '../../shared/ProgressStepper';
import {
	CancellationContext,
	type CancellationContextInterface,
	CancellationPageTitleContext,
	type CancellationPageTitleInterface,
} from '../CancellationContainer';
import type {
	CancellationReason,
	OptionalCancellationReasonId,
} from '../cancellationReason';

interface PrintReasonPickerProps {
	productType: ProductTypeWithCancellationFlow;
}

const stepperCss = css`
	margin: ${space[5]}px 0;
	margin-bottom: ${space[8]}px;

	${from.tablet} {
		margin: ${space[10]}px 0;
	}
`;

const titleCss = css`
	${headlineBold24}
	margin: 0 0 ${space[2]}px;

	${from.tablet} {
		${headlineBold28}
		margin: 0 0 ${space[3]}px;
	}
`;

const introCss = css`
	${textSans15}
	margin: 0 0 ${space[5]}px;

	${from.tablet} {
		${textSans17}
	}
`;

const introEmphasisCss = css`
	${textSansBold15}
	text-decoration: underline;

	${from.tablet} {
		${textSansBold17}
	}
`;

const cardWrapperCss = css`
	margin: 0 0 ${space[5]}px;
`;

const cardTitleCss = css`
	${textSansBold20}
	margin: 0;

	${from.tablet} {
		${textSansBold24}
	}
`;

const reasonFieldsetCss = css`
	border: 0;
	margin: 0;
	padding: 0;
`;

const hiddenLegendCss = css`
	display: none;
`;

const reasonRadioGroupCss = css`
	display: block;

	> div > div {
		padding-top: 0;
		padding-bottom: ${space[4]}px;
	}

	> div > div:last-of-type {
		padding-bottom: ${space[3]}px;
	}

	input + label > div {
		${textSans15}
	}

	input:checked + label > div {
		${textSansBold15}
	}

	${from.tablet} {
		input + label > div {
			${textSans17}
		}

		input:checked + label > div {
			${textSansBold17}
		}
	}
`;

const reasonRadioCss = css`
	vertical-align: top;
`;

const inlineErrorCss = css`
	padding: ${space[5]}px;
	margin-bottom: ${space[4]}px;
	border: 4px solid ${palette.error[400]};
	text-align: left;
`;

const feedbackTitleCss = css`
	${textSansBold17}
	margin: ${space[6]}px 0 ${space[1]}px;
`;

const feedbackTextareaCss = css`
	width: 100%;
	font-size: inherit;
	font-family: inherit;
	border: 1px solid ${palette.neutral[86]};
	border-radius: ${space[1]}px;
	margin-bottom: ${space[6]}px;
`;

const ctaContainerCss = css`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: ${space[3]}px;

	${from.tablet} {
		flex-direction: row;
	}
`;

export const PrintReasonPicker = ({ productType }: PrintReasonPickerProps) => {
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const productDetail = cancellationContext.productDetail;
	const {
		selectedReasonId: storedSelectedReasonId,
		cancellationFeedback: storedFeedback,
		setSelectedReasonId: setStoredSelectedReasonId,
		setCancellationFeedback: setStoredCancellationFeedback,
	} = usePrintCancellationStore();
	const { getUser } = useAccountStore();
	const user = getUser();
	const [selectedReasonId, setSelectedReasonId] =
		useState<OptionalCancellationReasonId>(
			storedSelectedReasonId ?? undefined,
		);
	const [feedback, setFeedback] = useState<string>(storedFeedback);
	const selectedReasonIdValue = selectedReasonId ?? '';
	const [inValidationErrorState, setInValidationErrorState] =
		useState<boolean>(false);

	const navigate = useNavigate();
	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const characterLimit = 2500;
	const fallbackFirstName = productDetail.subscription.account?.accountName
		?.trim()
		.split(/\s+/)[0];
	const supporterFirstName = user?.firstName || fallbackFirstName;
	const supporterNamePrefix = supporterFirstName
		? `${supporterFirstName}, `
		: '';
	const sorryWord = supporterNamePrefix ? "we're" : "We're";

	useEffect(() => {
		pageTitleContext.setPageTitle('Manage subscription');
	}, [pageTitleContext]);

	return (
		<>
			<ProgressStepper
				steps={[{ isCurrentStep: true }, {}, {}]}
				additionalCSS={stepperCss}
			/>
			<WithStandardTopMargin>
				<h2 css={titleCss}>
					{`${supporterNamePrefix}${sorryWord} sorry to see you go`}
				</h2>
				<p css={introCss}>
					As a reader-funded organisation, we rely on the generous
					support from those who are in a position to pay for news.{' '}
					<span css={introEmphasisCss}>
						Would you take a moment to tell us why you&apos;d like
						to cancel?
					</span>
				</p>
				<div css={cardWrapperCss}>
					<Card>
						<Card.Header
							backgroundColor={palette.brand[800]}
							minHeightOverride="auto"
						>
							<h3 css={cardTitleCss}>
								Please select a reason for cancelling
							</h3>
						</Card.Header>
						<Card.Section>
							<fieldset
								onChange={(
									event: FormEvent<HTMLFieldSetElement>,
								) => {
									const target: HTMLInputElement =
										event.target as HTMLInputElement;
									setSelectedReasonId(
										target.value as OptionalCancellationReasonId,
									);
								}}
								css={reasonFieldsetCss}
							>
								<legend css={hiddenLegendCss}>
									Please select a reason for cancelling
								</legend>
								<RadioGroup
									name="issue_type"
									orientation="vertical"
									cssOverrides={reasonRadioGroupCss}
								>
									{productType.cancellation.reasons?.map(
										(reason: CancellationReason) => (
											<Radio
												key={reason.reasonId}
												name="cancellation-reason"
												value={reason.reasonId}
												checked={
													selectedReasonIdValue ===
													reason.reasonId
												}
												label={reason.linkLabel}
												cssOverrides={reasonRadioCss}
											/>
										),
									)}
								</RadioGroup>
							</fieldset>
						</Card.Section>
					</Card>
				</div>
				{inValidationErrorState && !selectedReasonIdValue.length && (
					<InlineError cssOverrides={inlineErrorCss}>
						Please select a reason
					</InlineError>
				)}
				<h3 css={feedbackTitleCss}>
					Help us improve by sharing more detail
				</h3>
				<textarea
					rows={5}
					maxLength={characterLimit}
					value={feedback}
					css={feedbackTextareaCss}
					onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
						setFeedback(event.target.value);
					}}
				/>

				<div data-cy="cta_container" css={ctaContainerCss}>
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
							const canContinue = !!selectedReasonIdValue.length;

							if (canContinue) {
								setStoredSelectedReasonId(selectedReasonId);
								setStoredCancellationFeedback(feedback);
								navigate('review');
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
