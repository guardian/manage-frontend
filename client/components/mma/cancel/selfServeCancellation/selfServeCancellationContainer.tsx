import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { Navigate, Outlet } from 'react-router-dom';
import type { ProductDetail } from '../../../../../shared/productResponse';
import type { ProductType } from '../../../../../shared/productTypes';
import { useSelfServeCancellationStore } from '../../../../stores/SelfServeCancellationStore';
import { useSelfServeCancellationLoader } from '../../../../utilities/hooks/useSelfServeCancellationLoader';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';
import {
	CancellationContext,
	type CancellationContextInterface,
} from '../CancellationContainer';
import { getProgressCopy } from './selfServeCancellationCopy';

interface SelfServeCancellationContainerProps {
	productType: ProductType;
	routerProductDetail?: ProductDetail;
}

export const SelfServeCancellationContainer = ({
	productType,
	routerProductDetail,
}: SelfServeCancellationContainerProps) => {
	const { isLoading, shouldRedirect, hasTimingError, retryTiming } =
		useSelfServeCancellationLoader({
			productType,
			routerProductDetail,
		});
	const productDetail = useSelfServeCancellationStore(
		(state) => state.productDetail,
	);
	const resolvedProductDetail = productDetail ?? routerProductDetail;

	if (shouldRedirect) {
		return <Navigate to="/" />;
	}

	if (hasTimingError) {
		return (
			<>
				<GenericErrorScreen loggingMessage="Failed to load the cancellation date" />
				<WithStandardTopMargin>
					<Button
						cssOverrides={css`
							margin-top: ${space[6]}px;
						`}
						onClick={retryTiming}
					>
						Try again
					</Button>
				</WithStandardTopMargin>
			</>
		);
	}

	if (isLoading) {
		return (
			<DefaultLoadingView
				loadingMessage={getProgressCopy(
					resolvedProductDetail,
				).checkingStatus(productType.friendlyName)}
			/>
		);
	}

	if (!resolvedProductDetail) {
		return <Navigate to="/" />;
	}

	return (
		<CancellationContext.Provider
			value={{
				productDetail: resolvedProductDetail,
				productType:
					productType as CancellationContextInterface['productType'],
			}}
		>
			<Outlet />
		</CancellationContext.Provider>
	);
};
