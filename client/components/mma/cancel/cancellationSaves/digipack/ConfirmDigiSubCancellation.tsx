import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source/foundations';
import { Button, Stack } from '@guardian/source/react-components';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { CancellationContextInterface } from '@/client/components/mma/cancel/CancellationContainer';
import { CancellationContext } from '@/client/components/mma/cancel/CancellationContainer';
import type { OptionalCancellationReasonId } from '@/client/components/mma/cancel/cancellationReason';
import { JsonResponseHandler } from '@/client/components/mma/shared/asyncComponents/DefaultApiResponseHandler';
import { benefitsCss } from '@/client/components/mma/shared/benefits/BenefitsStyles';
import { GenericErrorScreen } from '@/client/components/shared/GenericErrorScreen';
import { stackedButtonLayoutCss } from '@/client/styles/ButtonStyles';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { createProductDetailFetcher } from '@/client/utilities/productUtils';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '@/shared/productResponse';
import { MDA_TEST_USER_HEADER } from '@/shared/productResponse';
import type { ProductTypeWithCancellationFlow } from '@/shared/productTypes';
import type { DigisubCancellationRouterState } from './DigiSubThankYouOffer';

function GreyBulletpoint() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="17"
			viewBox="0 0 16 17"
			fill="none"
			css={css`
				padding-top: 5px;
			`}
		>
			<circle cx="8" cy="8.13672" r="8" fill="#DCDCDC" />
		</svg>
	);
}

const BenefitsNotAvailable = () => (
	<Stack
		space={4}
		css={css`
			background-color: #f3f7fe;
			border-radius: 4px;
			padding: ${space[4]}px;
		`}
	>
		<div>
			<div
				css={css`
					${textSans.large({ fontWeight: 'bold' })}
					margin-bottom: ${space[2]}px;
				`}
			>
				Extras you'll lose:
			</div>
			<ul css={benefitsCss}>
				<li>
					<GreyBulletpoint />
					Funding independent journalism
				</li>
				<li>
					<GreyBulletpoint />A regular supporter newsletter
				</li>
				<li>
					<GreyBulletpoint />
					Unlimited access in our app
				</li>
				<li>
					<GreyBulletpoint />
					Ad-free reading
				</li>
				<li>
					<GreyBulletpoint />
					Offline reading
				</li>
			</ul>
		</div>
	</Stack>
);

export const ConfirmDigiSubCancellation = () => {
	const navigate = useNavigate();

	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [loadingFailed, setLoadingFailed] = useState<boolean>(false);

	const location = useLocation();
	const routerState = location.state as DigisubCancellationRouterState;
	const eligibleForDiscount = routerState?.eligibleForDiscount;

	const reason: OptionalCancellationReasonId = 'mma_cancellation_default'; //reason needs to be provided as undefined doesn't work. Reason updated if user provides one on next screen.

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

	const cancelDigiSub = async (
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

			const cancelResponse = await cancelDigiSub(
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
			const digisub = (mdapiResponse.products[0] as ProductDetail) || {
				subscription: {},
			};
			const isCancelled =
				Object.keys(digisub.subscription).length === 0 ||
				digisub.subscription.cancelledAt;

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
		<section
			css={css`
				margin-top: ${space[4]}px;
			`}
		>
			<Stack space={1}>
				<h1
					css={css`
						${headline.xsmall({ fontWeight: 'bold' })};
						margin-top: 0;
						margin-bottom: 0;
						${from.tablet} {
							${headline.medium({ fontWeight: 'bold' })};
						}
					`}
				>
					Losing your supporter extras
				</h1>
				<div
					css={css`
						${textSans.medium()};
					`}
				>
					Please keep in mind that you will be losing access to your
					supporter extras if you cancel today.
				</div>
			</Stack>
			<section
				css={css`
					margin-top: 32px;
					margin-bottom: 32px;
				`}
			>
				<BenefitsNotAvailable />
			</section>
			<div
				css={css`
					${textSans.large({ fontWeight: 'bold' })}
					margin-bottom: ${space[4]}px;
				`}
			>
				Please confirm to cancel your digital subscription
			</div>
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
					Cancel subscription
				</Button>
				{eligibleForDiscount && (
					<Button
						onClick={() =>
							navigate('../discount-offer', {
								state: { ...routerState },
							})
						}
						cssOverrides={css`
							display: flex;
							margin-left: ${space[5]}px;
							justify-content: center;
						`}
						priority="subdued"
					>
						Go back to discount
					</Button>
				)}
			</div>
		</section>
	);
};
