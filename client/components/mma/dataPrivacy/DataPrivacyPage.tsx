import type { CMP } from '@guardian/consent-management-platform/dist/types';
import { useEffect, useState } from 'react';
import type {
	MembersDataApiItem,
	MembersDataApiResponse,
} from '../../../../shared/productResponse';
import {
	isProduct,
	mdapiResponseReader,
} from '../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { allProductsDetailFetcher } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';
import * as UserAPI from '../identity/idapi/user';
import { ConsentOptions, mapSubscriptions } from '../identity/identity';
import { Lines } from '../identity/Lines';
import type { ConsentOption } from '../identity/models';
import { Actions, useConsentOptions } from '../identity/useConsentOptions';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { CookiesOnThisBrowserSection } from './CookiesOnTheBrowserSection';
import { LearnMoreSection } from './LearnMoreSection';
import { YourDataSection } from './YourDataSection';

type DataPrivacyResponse = [
	MembersDataApiResponse | MembersDataApiItem[],
	ConsentOption[],
	UserAPI.UserAPIResponse,
];

const dataPrivacyFetcher = () =>
	Promise.all([
		allProductsDetailFetcher(),
		fetchWithDefaultParameters('/idapicodeproxy/consents?filter=all'),
		fetchWithDefaultParameters('/idapi/user'),
	]);

export const DataPrivacyPage = () => {
	const { options, error, subscribe, unsubscribe } = Actions;
	const [state, dispatch] = useConsentOptions();
	const [importedCmp, setImportedCmp] = useState<CMP | null>(null);
	const {
		data: dataPrivacyResponse,
		loadingState,
	}: {
		data: DataPrivacyResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(dataPrivacyFetcher, JsonResponseHandler);

	useEffect(() => {
		if (dataPrivacyResponse) {
			handleResponse(dataPrivacyResponse);
		}
		loadCMP();
	}, [dataPrivacyResponse]);

	const loadCMP = () => {
		import('@guardian/consent-management-platform').then(({ cmp }) => {
			setImportedCmp(cmp);
		});
	};

	/**
	 * This function uses the responses from the dataPrivacyFetcher api calls
	 * to get the users subscriptions/consents and dispatch the options to the
	 * store.
	 *
	 * @param {DataPrivacyResponse} response
	 */
	const handleResponse = (response: DataPrivacyResponse) => {
		const [productDetailsResponse, consentOptions, userResponse] = response;
		const user = UserAPI.toUser(userResponse);

		const consentOpt = mapSubscriptions(user.consents, consentOptions);
		const productDetails = mdapiResponseReader(
			productDetailsResponse,
		).products.filter(isProduct);
		const consentsWithFilteredSoftOptIns = consentOpt.filter(
			(consent: ConsentOption) =>
				consent.isProduct
					? productDetails.some((productDetail) => {
							const groupedProductType =
								GROUPED_PRODUCT_TYPES[
									productDetail.mmaCategory
								];
							const specificProductType =
								groupedProductType.mapGroupedToSpecific(
									productDetail,
								);
							return specificProductType.softOptInIDs.includes(
								consent.id,
							);
					  })
					: true,
		);
		console.log(
			'consentsWithFilteredSoftOptIns',
			consentsWithFilteredSoftOptIns,
		);

		dispatch(options(consentsWithFilteredSoftOptIns));
	};

	const consents = ConsentOptions.consents(state.options);
	console.log('CCC', consents);
	console.log('OPTION', state.options);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return (
			<DefaultLoadingView loadingMessage="Loading your privacy details." />
		);
	}
	if (dataPrivacyResponse === null) {
		return <GenericErrorScreen />;
	}

	const toggleConsentSubscription = async (id: string) => {
		const option = ConsentOptions.findById(state.options, id);
		try {
			if (option === undefined) {
				throw Error('Id not found');
			}
			if (option.subscribed) {
				await ConsentOptions.unsubscribe(option);
				dispatch(unsubscribe(id));
			} else {
				await ConsentOptions.subscribe(option);
				dispatch(subscribe(id));
			}
		} catch (e) {
			dispatch(error(e));
		}
	};

	const openManageCookies = () => {
		importedCmp?.showPrivacyManager();
	};

	const content = () => (
		<>
			<WithStandardTopMargin>
				<Lines n={1} />
				<YourDataSection
					consents={consents}
					toggleConsent={toggleConsentSubscription}
				/>
				<Lines n={1} />
				<CookiesOnThisBrowserSection onClick={openManageCookies} />
				<Lines n={1} />
				<LearnMoreSection />
			</WithStandardTopMargin>
		</>
	);

	return <>{content()}</>;
};