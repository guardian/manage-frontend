import { css } from '@emotion/react';
import { news, space, textSans } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { fetchWithDefaultParameters } from '../../../../utilities/fetch';
import { createProductDetailFetcher } from '../../../../utilities/productUtils';
import { Heading } from '../../shared/Heading';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import type {
	CancellationContextInterface} from '../CancellationContainer';
import {
	CancellationContext
} from '../CancellationContainer';
import type { OptionalCancellationReasonId } from '../cancellationReason';
import { stackedButtonLeftLayoutCss } from './SaveStyles';

export const ConfirmMembershipCancellation = () => {
	const navigate = useNavigate();

	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const reason: OptionalCancellationReasonId = 'mma_other'; //reason needs to be provided as undefined doesn't work. Reason updated if user provides one on next screen.

	const cancellationFetch =
		(
			subscriptionName: string,
			withSubscriptionResponseFetcher: () => Promise<Response>,
		) =>
		async () => {
			await fetchWithDefaultParameters(
				`/api/cancel/${subscriptionName}`,
				{
					method: 'POST',
					body: JSON.stringify({ reason }),
					headers: { 'Content-Type': 'application/json' },
				},
			); // response is either empty or 404 - neither is useful so fetch subscription to determine cancellation result...

			return await withSubscriptionResponseFetcher();
		};

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
			<div css={stackedButtonLeftLayoutCss}>
				<Button
					onClick={cancellationFetch(
						productDetail.subscription.subscriptionId,
						createProductDetailFetcher(
							productType.allProductsProductTypeFilterString,
							productDetail.subscription.subscriptionId,
						),
					)}
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
