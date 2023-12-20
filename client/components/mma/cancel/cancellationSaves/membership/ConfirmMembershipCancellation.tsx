import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { JsonResponseProcessor } from '@/client/utilities/hooks/useAsyncLoader';
import { MDA_TEST_USER_HEADER } from '../../../../../../shared/productResponse';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../../../shared/productResponse';
import type { ProductTypeWithCancellationFlow } from '../../../../../../shared/productTypes';
import { stackedButtonLayoutCss } from '../../../../../styles/ButtonStyles';
import { fetchWithDefaultParameters } from '../../../../../utilities/fetch';
import { createProductDetailFetcher } from '../../../../../utilities/productUtils';
import { GenericErrorScreen } from '../../../../shared/GenericErrorScreen';
import { Heading } from '../../../shared/Heading';
import { ProgressStepper } from '../../../shared/ProgressStepper';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../../CancellationContainer';
import { CancellationContext } from '../../CancellationContainer';
import type { OptionalCancellationReasonId } from '../../cancellationReason';

export const ConfirmMembershipCancellation = () => {
	const navigate = useNavigate();

	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [loadingFailed, setLoadingFailed] = useState<boolean>(false);

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	const reason: OptionalCancellationReasonId =
		'mma_membership_cancellation_default'; //reason needs to be provided as undefined doesn't work. Reason updated if user provides one on next screen.

	const createCase = (
		selectedReasonId: string,
		productType: ProductTypeWithCancellationFlow,
		productDetail: ProductDetail,
	) => {
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
	};

	const cancelMembership = async (
		subscriptionId: string,
		withSubscriptionResponseFetcher: () => Promise<Response>,
	) => {
		await fetchWithDefaultParameters(`/api/cancel/${subscriptionId}`, {
			method: 'POST',
			body: JSON.stringify({ reason }),
			headers: { 'Content-Type': 'application/json' },
		}); // response is either empty or 404 - neither is useful so fetch subscription to determine cancellation result...

		return withSubscriptionResponseFetcher();
	};

	const postCancellation = async () => {
		if (isSubmitting) {
			return;
		}

		try {
			setIsSubmitting(true);
			const caseResponse = await createCase(
				reason,
				productType,
				productDetail,
			);

			const caseData = await JsonResponseProcessor(caseResponse);

			if (caseData === null) {
				setIsSubmitting(false);
				setLoadingFailed(true);
				return;
			}

			const cancelResponse = await cancelMembership(
				productDetail.subscription.subscriptionId,
				createProductDetailFetcher(
					productType.allProductsProductTypeFilterString,
					productDetail.subscription.subscriptionId,
				),
			);

			const cancelData = await JsonResponseProcessor(cancelResponse);

			if (cancelData === null) {
				setIsSubmitting(false);
				setLoadingFailed(true);
				return;
			}

			const mdapiResponse = cancelData as MembersDataApiResponse;
			const membership = (mdapiResponse.products[0] as ProductDetail) || {
				subscription: {},
			};
			const isCancelled =
				Object.keys(membership.subscription).length === 0 ||
				membership.subscription.cancelledAt;

			if (!isCancelled) {
				setIsSubmitting(false);
				setLoadingFailed(true);
			} else {
				navigate('../reasons', {
					state: { ...routerState, journeyCompleted: true },
				});
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
			<ProgressStepper
				steps={[
					{ title: 'Details' },
					{ title: 'Options' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
					max-width: 350px;
				`}
			/>
			<Stack space={4}>
				<Heading>
					Are you sure you want to cancel your Membership?
				</Heading>
				<p
					css={css`
						${textSans.medium()}
					`}
				>
					Please keep in mind that you will be losing access to your
					supporter benefits.{' '}
				</p>
				<p
					css={css`
						${textSans.medium()}
					`}
				>
					If you cancel you will not be able to rejoin the Guardian
					Members scheme, as it’s now closed to new members.
				</p>
			</Stack>
			<div css={stackedButtonLayoutCss}>
				<Button
					onClick={postCancellation}
					isLoading={isSubmitting}
					cssOverrides={css`
						background-color: ${palette.news['400']};
						justify-content: center;
						:hover {
							background-color: ${palette.news['200']};
						}
					`}
				>
					Confirm Cancellation
				</Button>
				<Button
					priority="tertiary"
					onClick={() =>
						navigate('../offers', { state: { ...routerState } })
					}
					cssOverrides={css`
						justify-content: center;
					`}
				>
					Back to options
				</Button>
			</div>
		</>
	);
};
