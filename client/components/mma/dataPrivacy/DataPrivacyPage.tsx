import type { CMP } from '@guardian/consent-management-platform/dist/types';
import { from } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { gridItemPlacement } from '../../../styles/grid';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
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
import { dataPrivacyWrapper } from './DataPrivacy.styles';
import { LearnMoreSection } from './LearnMoreSection';
import { YourDataSection } from './YourDataSection';

type DataPrivacyResponse = [ConsentOption[], UserAPI.UserAPIResponse];

const dataPrivacyFetcher = () =>
	Promise.all([
		fetchWithDefaultParameters('/idapi/consents'),
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

	/**
	 * This function imports and loads the cmp app to the state value, importedCmp
	 *
	 */
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
		const [consentOptions, userResponse] = response;
		const user = UserAPI.toUser(userResponse);
		const consentOpt = mapSubscriptions(user.consents, consentOptions);
		dispatch(options(consentOpt));
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

	/**
	 * This function makes an API request to /users/me/consents to subscribe or unsubscribe.
	 * It then dispatches a redux action
	 *
	 * @param {string} id
	 */
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

	/**
	 * This function triggers importedCmp?.showPrivacyManage
	 * if it has loaded.
	 *
	 * The importedCmp is lazy loaded.
	 *
	 */
	const openManageCookies = () => {
		importedCmp?.showPrivacyManager();
	};

	const content = () => (
		<div css={dataPrivacyWrapper}>
			<div
				css={{
					...gridItemPlacement(1, 12),

					[from.tablet]: {
						...gridItemPlacement(1, 12),
					},

					[from.desktop]: {
						...gridItemPlacement(1, 10),
					},

					[from.wide]: {
						...gridItemPlacement(1, 14),
					},
				}}
			>
				<WithStandardTopMargin>
					<YourDataSection
						consents={consents}
						toggleConsent={toggleConsentSubscription}
					/>
					<Lines n={1} />
					<CookiesOnThisBrowserSection onClick={openManageCookies} />
					<Lines n={1} />
					<LearnMoreSection />
				</WithStandardTopMargin>
			</div>
		</div>
	);

	return <>{content()}</>;
};
