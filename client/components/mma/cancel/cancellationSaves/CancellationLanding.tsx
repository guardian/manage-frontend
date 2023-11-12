import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';
import type {
	MembersDataApiResponse,
	PaidSubscriptionPlan,
	ProductDetail,
} from '../../../../../shared/productResponse';
import {
	getMainPlan,
	getSpecificProductTypeFromProduct,
} from '../../../../../shared/productResponse';
import { headingCss } from '../../../../styles/GenericStyles';
import type { CurrencyIso } from '../../../../utilities/currencyIso';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../../utilities/hooks/useAsyncLoader';
import { allRecurringProductsDetailFetcher } from '../../../../utilities/productUtils';
import type { PhoneRegionKey } from '../../../shared/CallCenterEmailAndNumbers';
import { CallCentreEmailAndNumbers } from '../../../shared/CallCenterEmailAndNumbers';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { JsonResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';
import { Heading } from '../../shared/Heading';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import { ineligibleForSave } from './eligibilityCheck';

function getNextRoute(productToCancel: ProductDetail): string {
	const specificProductTypeKey =
		getSpecificProductTypeFromProduct(productToCancel).productType;

	switch (specificProductTypeKey) {
		case 'membership': {
			return '../details';
		}
		default: {
			return '/';
		}
	}
}

function getPhoneRegion(currencyIso: CurrencyIso): PhoneRegionKey {
	switch (currencyIso) {
		case 'USD':
		case 'CAD':
			return 'US';
		case 'AUD':
			return 'AUS';
		default:
			return 'UK & ROW';
	}
}

export const CancellationLanding = () => {
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
	} = useAsyncLoader(allRecurringProductsDetailFetcher, JsonResponseHandler);

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

	const mainPlan = getMainPlan(
		productToCancel.subscription,
	) as PaidSubscriptionPlan;

	const phoneRegion = getPhoneRegion(mainPlan.currencyISO as CurrencyIso);

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
				<Stack space={3}>
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
					<CallCentreEmailAndNumbers
						hideEmailAddress={true}
						phoneRegionFilterKeys={
							productToCancel.selfServiceCancellation
								.phoneRegionsToDisplay
						}
						openPhoneRegion={phoneRegion}
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
									state: { user: data.user },
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
