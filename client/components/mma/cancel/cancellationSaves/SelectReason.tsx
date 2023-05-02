import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	Radio,
	RadioGroup,
	Stack,
	SvgCalendar,
	SvgEnvelope,
} from '@guardian/source-react-components';
import type { FormEvent} from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import type {
	ProductDetail} from '../../../../../shared/productResponse';
import {
	MDA_TEST_USER_HEADER
} from '../../../../../shared/productResponse';
import type { ProductTypeWithCancellationFlow } from '../../../../../shared/productTypes';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { JsonResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import type {
	CancellationContextInterface} from '../CancellationContainer';
import {
	CancellationContext
} from '../CancellationContainer';
import type { CancellationReason } from '../cancellationReason';
import { membershipCancellationReasons } from '../membership/MembershipCancellationReasons';
import {
	buttonCentredCss,
	buttonLayoutCss,
	headingCss,
	sectionSpacing,
} from './SaveStyles';

const infoCss = css`
	${textSans.medium()}
	display: flex;
	> svg {
		flex-shrink: 0;
		margin-right: 8px;
		fill: currentColor;
	}
	> span {
		padding-top: ${space[1]}px;
	}
`;

const reasonLegendCss = css`
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
`;

const CancellationInfo = () => (
	<ul
		css={css`
			padding-inline-start: 0;
		`}
	>
		<Stack space={1}>
			<li css={infoCss}>
				<SvgCalendar size="medium" />
				<span>
					You'll continue to have access to your Membership benefits
					until xx
				</span>
			</li>
			<li css={infoCss}>
				<SvgEnvelope size="medium" />
				<span>We will send you a confirmation email at xx.com</span>
			</li>
		</Stack>
	</ul>
);

const ReasonSelection = (props: {
	setSelectedReasonId: React.Dispatch<React.SetStateAction<string>>;
}) => {
	return (
		<fieldset
			onChange={(event: FormEvent<HTMLFieldSetElement>) => {
				const target: HTMLInputElement =
					event.target as HTMLInputElement;
				props.setSelectedReasonId(target.value);
			}}
			css={css`
				border: 1px solid ${palette.neutral[86]};
				margin: 0 0 ${space[5]}px;
				padding: 0;
			`}
		>
			<legend css={reasonLegendCss}>
				Why did you cancel your Membership with us today?
			</legend>
			<RadioGroup
				name="issue_type"
				orientation="vertical"
				css={css`
					display: block;
					padding: ${space[5]}px;
				`}
			>
				{membershipCancellationReasons.map(
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
	);
};

function cancellationCaseFetch(
	selectedReasonId: string,
	productType: ProductTypeWithCancellationFlow,
	productDetail: ProductDetail,
) {
	return fetch('/api/case', {
		method: 'POST',
		body: JSON.stringify({
			reason: selectedReasonId,
			product: productType.cancellation.sfCaseProduct,
			subscriptionName: productDetail.subscription.subscriptionId,
			gaData: '' + JSON.stringify(window.gaData),
		}),
		headers: {
			'Content-Type': 'application/json',
			[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
		},
	});
}

export const SelectReason = () => {
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [loadingFailed, setLoadingFailed] = useState<boolean>(false);

	const [selectedReasonId, setSelectedReasonId] = useState<string>('');
	const [inValidationErrorState, setInValidationErrorState] =
		useState<boolean>(false);
	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const submitReason = async () => {
		{
			const canContinue = !!selectedReasonId.length;
			if (canContinue) {
				await postReason();
				navigate('../reminder', {
					state: {
						selectedReasonId,
					},
				});
			}
			setInValidationErrorState(!canContinue);
		}
	};

	const postReason = async () => {
		if (isSubmitting) {
			return;
		}

		try {
			setIsSubmitting(true);
			const response = await cancellationCaseFetch(
				selectedReasonId,
				productType,
				productDetail,
			);
			const data = await JsonResponseHandler(response);

			if (data === null) {
				setIsSubmitting(false);
				setLoadingFailed(true);
			}
		} catch (e) {
			setIsSubmitting(false);
			setLoadingFailed(true);
		}
	};

	if (loadingFailed) {
		return (
			<GenericErrorScreen loggingMessage="Cancel journey case id api call failed during the cancellation process" />
		);
	}

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: '' },
					{ title: '' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<h2 css={headingCss}>Your Membership is cancelled</h2>
			<CancellationInfo />
			<p
				css={css`
					${textSans.medium()}
					border-top: 1px solid ${palette.neutral[86]};
					padding-top: ${space[5]}px;
				`}
			>
				We're always trying to improve our offering and welcome any
				feedback. If you can, please take a moment to tell us why you've
				cancelled your Membership.
			</p>
			<ReasonSelection setSelectedReasonId={setSelectedReasonId} />
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
			<section
				css={[sectionSpacing, buttonLayoutCss, { textAlign: 'right' }]}
			>
				<Button
					priority="tertiary"
					cssOverrides={[buttonCentredCss]}
					onClick={() => navigate('..')}
				>
					Skip
				</Button>
				<Button
					isLoading={isSubmitting}
					onClick={() => submitReason()}
					cssOverrides={buttonCentredCss}
				>
					Submit
				</Button>
			</section>
		</>
	);
};
