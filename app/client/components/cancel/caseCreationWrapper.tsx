import * as React from 'react';
import {
	MDA_TEST_USER_HEADER,
	ProductDetail,
} from '../../../shared/productResponse';
import AsyncLoader from '../asyncLoader';
import { CancellationCaseIdContext } from './cancellationContexts';
import { CancellationReasonContext } from './cancellationContexts';
import {
	CancellationReasonId,
	OptionalCancellationReasonId,
} from './cancellationReason';
import { fetchWithDefaultParameters } from '../../fetch';

interface CaseCreationResponse {
	id: string;
}

const getCreateCaseFunc =
	(
		reason: OptionalCancellationReasonId,
		sfCaseProduct: string,
		productDetail: ProductDetail,
	) =>
	async () =>
		await fetchWithDefaultParameters('/api/case', {
			method: 'POST',
			body: JSON.stringify({
				reason,
				product: sfCaseProduct,
				subscriptionName: productDetail.subscription.subscriptionId,
				gaData: '' + JSON.stringify(window.gaData),
			}),
			headers: {
				'Content-Type': 'application/json',
				[MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`,
			},
		});

const renderWithCaseIdContextProvider =
	(children: React.ReactChildren | JSX.Element) =>
	(caseCreationResponse?: CaseCreationResponse) =>
		caseCreationResponse ? (
			<CancellationCaseIdContext.Provider value={caseCreationResponse.id}>
				{children}
			</CancellationCaseIdContext.Provider>
		) : (
			children
		);

class CaseCreationAsyncLoader extends AsyncLoader<CaseCreationResponse> {}

interface CaseCreationWrapperProps {
	children: JSX.Element;
	sfCaseProduct: string;
	productDetail: ProductDetail;
	reasonId: CancellationReasonId;
}

export const CaseCreationWrapper = (props: CaseCreationWrapperProps) => (
	<CaseCreationAsyncLoader
		fetch={getCreateCaseFunc(
			props.reasonId,
			props.sfCaseProduct,
			props.productDetail,
		)}
		render={renderWithCaseIdContextProvider(props.children)}
		errorRender={renderWithCaseIdContextProvider(props.children)}
		loadingMessage="Capturing your cancellation reason..."
	/>
);
