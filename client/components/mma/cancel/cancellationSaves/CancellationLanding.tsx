import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { CallCentreAccordion } from '@/client/components/shared/CallCentreAccordion';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../../shared/productResponse';
import { getSpecificProductTypeFromProduct } from '../../../../../shared/productResponse';
import { headingCss } from '../../../../styles/GenericStyles';
import {
	JsonTransform,
	LoadingState,
	useAsyncLoader,
} from '../../../../utilities/hooks/useAsyncLoader';
import { allRecurringProductsDetailFetcher } from '../../../../utilities/productUtils';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';
import { Heading } from '../../shared/Heading';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import { ineligibleForSave } from './saveEligibilityCheck';

function getNextRoute(productToCancel: ProductDetail): string {
	const specificProductTypeKey =
		getSpecificProductTypeFromProduct(productToCancel).productType;

	switch (specificProductTypeKey) {
		case 'membership': {
			return '../details';
		}
		case 'digipack': {
			return '../discount-offer';
		}
		default: {
			return '/';
		}
	}
}

export const CancellationLanding = () => {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	const navigate = useNavigate();
	const { productDetail: productToCancel } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	if (!productToCancel) {
		return <Navigate to="/" />;
	}

	const {
		data,
		loadingState,
	}: {
		data: MembersDataApiResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(allRecurringProductsDetailFetcher, JsonTransform);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView loadingMessage="Loading your products..." />;
	}
	if (data === null) {
		return <GenericErrorScreen />;
	}

	if (ineligibleForSave(data.products as ProductDetail[], productToCancel)) {
		return (
			<Navigate
				to="../"
				state={{
					dontShowOffer: true,
				}}
			/>
		);
	}

	return (
		<>
			<section
				css={css`
					margin-top: ${space[4]}px;
				`}
			>
				<Stack space={1}>
					<h2 css={headingCss}>
						We're sorry to hear you're thinking of leaving
					</h2>
					<p
						css={css`
							${textSans.medium()};
						`}
					>
						To cancel today, please choose from the following
						options.
					</p>
				</Stack>
			</section>
			<section
				css={css`
					margin-top: ${space[6] + space[2]}px;
				`}
			>
				<Stack space={4}>
					<div>
						<Heading borderless sansSerif level="3">
							Contact us
						</Heading>
						<p
							css={css`
								${textSans.medium()};
								margin: 0;
							`}
						>
							Speak to our customer service team.
						</p>
					</div>
					<CallCentreAccordion
						phoneRegionFilterKeys={
							productToCancel.selfServiceCancellation
								.phoneRegionsToDisplay
						}
					/>
				</Stack>
			</section>
			<section
				css={css`
					margin-top: ${space[6] + space[2]}px;
				`}
			>
				<Stack space={2}>
					<span>
						<Heading borderless sansSerif level="3">
							Cancel online
						</Heading>
						<p
							css={css`
								${textSans.medium()};
								margin: 0;
							`}
						>
							End your subscription with just a few clicks.
						</p>
					</span>
					<div>
						<Button
							priority="subdued"
							onClick={() =>
								navigate(getNextRoute(productToCancel), {
									state: {
										...routerState,
										user: data.user,
									},
								})
							}
						>
							Continue to cancel online
						</Button>
					</div>
				</Stack>
			</section>
		</>
	);
};
