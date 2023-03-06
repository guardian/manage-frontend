import type { CMP } from '@guardian/consent-management-platform/dist/types';
import { brand } from '@guardian/source-foundations';
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
import { optOutFinder } from '../identity/emailAndMarketing/OptOutSection';
import * as UserAPI from '../identity/idapi/user';
import { ConsentOptions, mapSubscriptions } from '../identity/identity';
import { Lines } from '../identity/Lines';
import type { ConsentOption } from '../identity/models';
import { aCss } from '../identity/sharedStyles';
import { Actions, useConsentOptions } from '../identity/useConsentOptions';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { Button } from '../shared/Buttons';
import {
	dataPrivacyHeadingCss,
	dataPrivacyMarketingToggleCss,
	dataPrivacyParagraphCss,
	dataPrivacyUnorderedListCss,
	dataPrivacyVideoCss,
} from './DataPrivacy.styles';

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

		dispatch(options(consentsWithFilteredSoftOptIns));
	};

	const consents = ConsentOptions.consents(state.options);

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

	const addMarketingToggleElement = optOutFinder(
		consents,
		toggleConsentSubscription,
		dataPrivacyMarketingToggleCss,
	);

	const openManageCookies = () => {
		importedCmp?.showPrivacyManager();
	};

	const yourDataSection = (
		<>
			<h3 css={dataPrivacyHeadingCss}>Your Data</h3>
			<p css={dataPrivacyParagraphCss}>What we mean by your data</p>
			<ul css={dataPrivacyUnorderedListCss}>
				<li> Information you provide such as your email address</li>
				<li> Products or services you buy from us</li>
				<li>
					{' '}
					Pages you view on theguardian.com or other Guardian websites
					when signed in
				</li>
			</ul>
			<Lines n={1} />
			{addMarketingToggleElement('profiling_optout')}
			<Lines n={1} />
			{addMarketingToggleElement('personalised_advertising')}

			<p css={dataPrivacyParagraphCss}>
				Advertising is a crucial source of our funding. You won't see
				more ads, and your data won't be shared with third parties to
				use for their own advertising
			</p>
			<p css={dataPrivacyParagraphCss}>We do this by:</p>
			<ul css={dataPrivacyUnorderedListCss}>
				<li>
					{' '}
					analysing your information to predict what you might be
					interested in
				</li>
				<li>
					{' '}
					checking if you are already a customer of other trusted
					partners.
				</li>
			</ul>
		</>
	);

	const cookiesOnThisBrowserSection = (
		<>
			<h3 css={dataPrivacyHeadingCss}>Cookies on this browser</h3>
			<p css={dataPrivacyParagraphCss}>
				{' '}
				When we make the Guardian available for you online, we use
				cookies and similar technologies to help us to do this. Some are
				necessary to help our website work properly and can’s be
				switched off, and some are optional but support the Guardian and
				your experience in other ways.
			</p>
			<Button
				disabled={false}
				text="Manage cookies on this browser"
				type="button"
				colour={brand[400]}
				onClick={() => openManageCookies()}
				fontWeight="bold"
			/>
		</>
	);

	const learnMoreSection = (
		<>
			<h3 css={dataPrivacyHeadingCss}>
				Learn more about our privacy policy
			</h3>
			<video
				controls
				css={dataPrivacyVideoCss}
				src="https://uploads.guim.co.uk/2019%2F30%2F26%2FThe+Guardian%27s+privacy+policy+%E2%80%93+video--7d3a7f3f-bc23-4e9d-9566-ea1f8ada5954-1.mp4"
			/>

			<Lines n={1} />

			<p css={dataPrivacyParagraphCss}>
				For more information about how we use your data, visit our&nbsp;
				<a
					css={aCss}
					target="_blank"
					href={'https://www.theguardian.com/info/privacy'}
					rel="noreferrer"
				>
					privacy policy
				</a>{' '}
				guide
			</p>
		</>
	);

	const content = () => (
		<>
			<WithStandardTopMargin>
				<Lines n={1} />
				{yourDataSection}
				<Lines n={1} />
				{cookiesOnThisBrowserSection}
				<Lines n={1} />
				{learnMoreSection}
			</WithStandardTopMargin>
		</>
	);

	return <>{content()}</>;
};
