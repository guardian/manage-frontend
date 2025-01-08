import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import {
	Button,
	InlineError,
	Radio,
	RadioGroup,
	Stack,
} from '@guardian/source/react-components';
import type { FormEvent } from 'react';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '../../../../../shared/dates';
import type {
	PaidSubscriptionPlan,
	ProductDetail,
} from '../../../../../shared/productResponse';
import {
	getMainPlan,
	MDA_TEST_USER_HEADER,
} from '../../../../../shared/productResponse';
import {
	GROUPED_PRODUCT_TYPES,
	type ProductTypeWithCancellationFlow,
} from '../../../../../shared/productTypes';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
	wideButtonCss,
} from '../../../../styles/ButtonStyles';
import { headingCss, sectionSpacing } from '../../../../styles/GenericStyles';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { JsonResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import type { CancellationReason } from '../cancellationReason';

const paragraphListCss = css`
	${textSans17};
	${from.tablet} {
		span {
			display: block;
		}
	}
`;

const reasonLegendCss = css`
	display: block;
	width: 100%;
	float: left;
	margin-top: ${space[2]}px;
	${textSansBold17};
`;

const CancellationInfo = ({
	userEmailAddress,
	benefitsEndDate,
}: {
	userEmailAddress: string;
	benefitsEndDate: string;
}) => (
	<ul
		css={css`
			padding-inline-start: 0;
		`}
	>
		<Stack space={1}>
			<p css={paragraphListCss} data-qm-masking="blocklist">
				We will send a confirmation email to you at {userEmailAddress}.{' '}
				<span>
					You will have access to all of your benefits until{' '}
					{benefitsEndDate}
				</span>
			</p>
		</Stack>
	</ul>
);

const ReasonSelection = ({
	productType,
	setSelectedReasonId,
}: {
	productType: ProductTypeWithCancellationFlow;
	setSelectedReasonId: React.Dispatch<React.SetStateAction<string>>;
}) => {
	return (
		<fieldset
			onChange={(event: FormEvent<HTMLFieldSetElement>) => {
				const target: HTMLInputElement =
					event.target as HTMLInputElement;
				setSelectedReasonId(target.value);
			}}
			css={css`
				margin: 0 0 ${space[5]}px;
				padding: 0;
				border: 0;
			`}
		>
			<legend css={reasonLegendCss}>
				Why did you cancel your{' '}
				{
					GROUPED_PRODUCT_TYPES[productType.groupedProductType]
						.friendlyName
				}{' '}
				today?
			</legend>
			<RadioGroup
				name="issue_type"
				orientation="vertical"
				cssOverrides={css`
					display: block;
					padding-top: ${space[4]}px;
				`}
			>
				{productType.cancellation.reasons.map(
					(reason: CancellationReason) => (
						<div
							key={reason.reasonId}
							css={css`
								border: 1px solid ${palette.neutral[86]};
								border-radius: 4px;
								padding: ${space[1]}px ${space[3]}px;
								margin-bottom: ${space[3]}px;
							`}
						>
							<Radio
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
						</div>
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
			gaData: '',
		}),
		headers: {
			'Content-Type': 'application/json',
			[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
		},
	});
}

function updateZuoraCancellationReason(
	selectedReasonId: string,
	productDetail: ProductDetail,
) {
	return fetch(
		'/api/update-cancellation-reason/' +
			productDetail.subscription.subscriptionId,
		{
			method: 'POST',
			body: JSON.stringify({ reason: selectedReasonId }),
			headers: {
				'Content-Type': 'application/json',
				[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
			},
		},
	);
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

	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const userEmailAddress = routerState?.user?.email ?? '';
	const benefitsEndDate = parseDate(
		mainPlan.chargedThrough ?? undefined,
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

	const navigateToReminder = productType.productType === 'membership';

	const submitReason = async () => {
		{
			const canContinue = !!selectedReasonId.length;
			if (canContinue) {
				await postReason();
				navigate(navigateToReminder ? '../reminder' : '/', {
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
			const response = await Promise.all([
				cancellationCaseFetch(
					selectedReasonId,
					productType,
					productDetail,
				),
				updateZuoraCancellationReason(selectedReasonId, productDetail),
			]);

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
		<section css={sectionSpacing}>
			<h2 css={headingCss}>
				Your{' '}
				{
					GROUPED_PRODUCT_TYPES[productType.groupedProductType]
						.friendlyName
				}{' '}
				has been cancelled
			</h2>
			<CancellationInfo
				userEmailAddress={userEmailAddress}
				benefitsEndDate={benefitsEndDate}
			/>
			<p
				css={css`
					${paragraphListCss};
					border-top: 1px solid ${palette.neutral[86]};
					padding-top: ${space[5]}px;
				`}
			>
				We're always keen to improve, and welcome your feedback.{' '}
				<span>
					Please take a moment to tell us more about your decision.
				</span>
			</p>
			<ReasonSelection
				productType={productType}
				setSelectedReasonId={setSelectedReasonId}
			/>
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
			<section css={stackedButtonLayoutCss}>
				<Button
					isLoading={isSubmitting}
					onClick={() => submitReason()}
					cssOverrides={[buttonCentredCss, wideButtonCss]}
				>
					Submit
				</Button>
				<Button
					priority="tertiary"
					cssOverrides={buttonCentredCss}
					onClick={() => navigate('/')}
				>
					Skip
				</Button>
			</section>
		</section>
	);
};
