import { css } from '@emotion/react';
import { news, space, textSans } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { MDA_TEST_USER_HEADER } from '../../../../../shared/productResponse';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../../shared/productResponse';
import type { ProductTypeWithCancellationFlow } from '../../../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../../../utilities/fetch';
import { createProductDetailFetcher } from '../../../../utilities/productUtils';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { JsonResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import { Heading } from '../../shared/Heading';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import type { OptionalCancellationReasonId } from '../cancellationReason';
import { stackedButtonLayoutCss } from './SaveStyles';

export const ConfirmMembershipCancellation = () => {
	const navigate = useNavigate();

	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [loadingFailed, setLoadingFailed] = useState<boolean>(false);

	const reason: OptionalCancellationReasonId = 'mma_other'; //reason needs to be provided as undefined doesn't work. Reason updated if user provides one on next screen.

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

			const caseData = await JsonResponseHandler(caseResponse);

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

			const cancelData = await JsonResponseHandler(cancelResponse);

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
				navigate('../reasons');
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
			<Stack space={4}>
				<Heading>
					Are you sure you want to cancel <br /> your membership?
				</Heading>
				<p
					css={css`
						${textSans.medium()}
					`}
				>
					Please keep in mind that you will be losing access to your
					supporter extras.{' '}
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
						background-color: ${news[400]};
						justify-content: center;
					`}
				>
					Confirm Cancellation
				</Button>
				<Button
					priority="tertiary"
					onClick={() => navigate('../offers')}
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
