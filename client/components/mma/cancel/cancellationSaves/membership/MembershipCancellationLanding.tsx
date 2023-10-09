import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { featureSwitches } from '../../../../../../shared/featureSwitches';
import type {
	MembersDataApiResponse,
	PaidSubscriptionPlan,
	ProductDetail,
} from '../../../../../../shared/productResponse';
import { getMainPlan } from '../../../../../../shared/productResponse';
import { buttonLayoutCss } from '../../../../../styles/ButtonStyles';
import {
	headingCss,
	sectionSpacing,
} from '../../../../../styles/GenericStyles';
import type { CurrencyIso } from '../../../../../utilities/currencyIso';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../../../utilities/hooks/useAsyncLoader';
import { getNewMembershipPrice } from '../../../../../utilities/membershipPriceRise';
import { allRecurringProductsDetailFetcher } from '../../../../../utilities/productUtils';
import type { PhoneRegionKey } from '../../../../shared/CallCenterEmailAndNumbers';
import { CallCentreEmailAndNumbers } from '../../../../shared/CallCenterEmailAndNumbers';
import { GenericErrorScreen } from '../../../../shared/GenericErrorScreen';
import { JsonResponseHandler } from '../../../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../../../shared/asyncComponents/DefaultLoadingView';
import { Heading } from '../../../shared/Heading';
import type { CancellationContextInterface } from '../../CancellationContainer';
import { CancellationContext } from '../../CancellationContainer';

function ineligibleForSave(
	products: ProductDetail[],
	membershipToCancel: ProductDetail,
) {
	const inPaymentFailure = products.find((product) => product.alertText);

	const hasOtherProduct = products.find(
		(product) =>
			product.mmaCategory != 'membership' &&
			!product.subscription.cancelledAt,
	);

	const membershipTierIsNotSupporter =
		membershipToCancel.tier !== 'Supporter';

	const mainPlan = getMainPlan(
		membershipToCancel.subscription,
	) as PaidSubscriptionPlan;

	const hasBeenPriceRisen =
		getNewMembershipPrice(mainPlan) === mainPlan.price / 100;

	return (
		inPaymentFailure ||
		hasOtherProduct ||
		membershipTierIsNotSupporter ||
		hasBeenPriceRisen
	);
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

export const MembershipCancellationLanding = () => {
	const navigate = useNavigate();
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const membership = cancellationContext.productDetail;

	if (!membership) {
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

	if (
		featureSwitches.membershipSave &&
		ineligibleForSave(data.products as ProductDetail[], membership)
	) {
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
		membership.subscription,
	) as PaidSubscriptionPlan;

	const phoneRegion = getPhoneRegion(mainPlan.currencyISO as CurrencyIso);

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<h2 css={headingCss}>
						We're sorry to hear you're thinking of leaving
					</h2>
					<p
						css={css`
							${textSans.medium()}
						`}
					>
						To cancel today, please choose from the following
						options.
					</p>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>Call us to cancel</Heading>
					<p
						css={css`
							${textSans.medium()}
						`}
					>
						Phone one of our customer service agents.
					</p>
					<CallCentreEmailAndNumbers
						hideEmailAddress={true}
						phoneRegionFilterKeys={
							membership.selfServiceCancellation
								.phoneRegionsToDisplay
						}
						openPhoneRegion={phoneRegion}
					/>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>Cancel online</Heading>
					<p
						css={css`
							${textSans.medium()}
						`}
					>
						Continue without speaking to our customer service team.
					</p>
					<div css={buttonLayoutCss}>
						<Button
							onClick={() =>
								navigate('../details', {
									state: { user: data.user },
								})
							}
						>
							Cancel online
						</Button>
					</div>
				</Stack>
			</section>
		</>
	);
};
