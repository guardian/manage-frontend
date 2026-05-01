import { Navigate, Outlet } from 'react-router-dom';
import type { ProductDetail } from '../../../../../shared/productResponse';
import type { ProductType } from '../../../../../shared/productTypes';
import { usePrintCancellationStore } from '../../../../stores/PrintCancellationStore';
import { usePrintCancellationLoader } from '../../../../utilities/hooks/usePrintCancellationLoader';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';
import {
	CancellationContext,
	type CancellationContextInterface,
} from '../CancellationContainer';

interface PrintLoadedCancellationContainerProps {
	productType: ProductType;
	routerProductDetail?: ProductDetail;
}

export const PrintLoadedCancellationContainer = ({
	productType,
	routerProductDetail,
}: PrintLoadedCancellationContainerProps) => {
	const { isLoading, shouldRedirect } = usePrintCancellationLoader({
		productType,
		routerProductDetail,
	});
	const { productDetail } = usePrintCancellationStore();
	const resolvedProductDetail = productDetail ?? routerProductDetail;

	if (shouldRedirect) {
		return <Navigate to="/" />;
	}

	if (isLoading) {
		return (
			<DefaultLoadingView
				loadingMessage={`Checking the status of your ${productType.friendlyName}...`}
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
