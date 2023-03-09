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
			assignOption(dataPrivacyResponse);
		}
		loadCMP();
	}, [dataPrivacyResponse]);

	const loadCMP = () => {
		import('@guardian/consent-management-platform').then(({ cmp }) => {
			setImportedCmp(cmp);
		});
	};

	const assignOption = (response: DataPrivacyResponse) => {
		const [productDetailsResponse, consentOptions, userResponse] = response;
		const user = UserAPI.toUser(userResponse);

		console.log('consentOptions', consentOptions);

		const consentOpt = mapSubscriptions(user.consents, consentOptions);
		console.log('consentOpt', consentOpt);

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

	// const learnMoreSection = (
	// 	<>
	// 		<h3 css={dataPrivacyHeadingCss}>
	// 			Learn more about our privacy policy
	// 		</h3>
	// 		<video
	// 			controls
	// 			css={dataPrivacyVideoCss}
	// 			src="https://uploads.guim.co.uk/2019%2F30%2F26%2FThe+Guardian%27s+privacy+policy+%E2%80%93+video--7d3a7f3f-bc23-4e9d-9566-ea1f8ada5954-1.mp4"
	// 		/>

	// 		<Lines n={1} />

	// 		<p css={dataPrivacyParagraphCss}>
	// 			For more information about how we use your data, visit our&nbsp;
	// 			<a
	// 				css={aCss}
	// 				target="_blank"
	// 				href={'https://www.theguardian.com/info/privacy'}
	// 				rel="noreferrer"
	// 			>
	// 				privacy policy
	// 			</a>{' '}
	// 			guide
	// 		</p>
	// 	</>
	// );

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
