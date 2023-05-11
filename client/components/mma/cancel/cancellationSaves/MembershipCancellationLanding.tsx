import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { featureSwitches } from '../../../../../shared/featureSwitches';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../../shared/productResponse';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../../utilities/hooks/useAsyncLoader';
import { allProductsDetailFetcher } from '../../../../utilities/productUtils';
import { CallCentreEmailAndNumbers } from '../../../shared/CallCenterEmailAndNumbers';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { JsonResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';
import { Heading } from '../../shared/Heading';
import { sectionSpacing } from '../../switch/SwitchStyles';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import { buttonLayoutCss } from './SaveStyles';

function ineligibleForSave(
	products: ProductDetail[],
	membershipToCancel: ProductDetail,
) {
	const inPaymentFailure = products.find((product) => product.alertText);

	const hasOtherProduct = products.find(
		(product) => product.mmaCategory != 'membership',
	);

	const membershipTierIsNotSupporter =
		membershipToCancel.tier !== 'Supporter';

	return inPaymentFailure || hasOtherProduct || membershipTierIsNotSupporter;
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
	} = useAsyncLoader(allProductsDetailFetcher, JsonResponseHandler);

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

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading>
						We're sorry to hear you're thinking of leaving
					</Heading>
					<p>
						To cancel today, please choose from the following
						options.
					</p>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>Call us</Heading>
					You can call one of our customer service agents.
					<CallCentreEmailAndNumbers hideEmailAddress={true} />
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>Cancel online</Heading>
					Continue without speaking to our customer service team.
					<div css={buttonLayoutCss}>
						<Button
							icon={<SvgArrowRightStraight />}
							iconSide="right"
							onClick={() => navigate('../details')}
						>
							Cancel online
						</Button>
					</div>
				</Stack>
			</section>
		</>
	);
};
