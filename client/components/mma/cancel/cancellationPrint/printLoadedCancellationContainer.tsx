import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { Navigate, Outlet } from 'react-router-dom';
import type { ProductDetail } from '../../../../../shared/productResponse';
import type { ProductType } from '../../../../../shared/productTypes';
import { usePrintCancellationStore } from '../../../../stores/PrintCancellationStore';
import { usePrintCancellationLoader } from '../../../../utilities/hooks/usePrintCancellationLoader';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';
import {
	CancellationContext,
	type CancellationContextInterface,
} from '../CancellationContainer';
import { getProgressCopy } from './printCancellationCopy';

interface PrintLoadedCancellationContainerProps {
	productType: ProductType;
	routerProductDetail?: ProductDetail;
}

export const PrintLoadedCancellationContainer = ({
	productType,
	routerProductDetail,
}: PrintLoadedCancellationContainerProps) => {
	const { isLoading, shouldRedirect, hasTimingError, retryTiming } =
		usePrintCancellationLoader({
			productType,
			routerProductDetail,
		});
	const productDetail = usePrintCancellationStore(
		(state) => state.productDetail,
	);
	const resolvedProductDetail = productDetail ?? routerProductDetail;

	if (shouldRedirect) {
		return <Navigate to="/" />;
	}

	if (hasTimingError) {
		return (
			<>
				<GenericErrorScreen loggingMessage="Failed to load the print cancellation date" />
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
