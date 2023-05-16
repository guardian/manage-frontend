import { createRef, useEffect, useState } from 'react';
import { featureSwitches } from '../../../../../shared/featureSwitches';
import type {
	AppSubscription,
	MPAPIResponse,
} from '../../../../../shared/mpapiResponse';
import {
	AppSubscriptionSoftOptInIds,
	isValidAppSubscription,
	SingleContributionSoftOptInIds,
} from '../../../../../shared/mpapiResponse';
import type {
	MembersDataApiResponse,
	ProductDetail,
	SingleProductDetail,
} from '../../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../../../utilities/fetch';
import {
	allRecurringProductsDetailFetcher,
	allSingleProductsDetailFetcher,
} from '../../../../utilities/productUtils';
import { NAV_LINKS } from '../../../shared/nav/NavConfig';
import { Spinner } from '../../../shared/Spinner';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';
import { PageContainer } from '../../Page';
import type { GenericErrorMessageRef } from '../GenericErrorMessage';
import { GenericErrorMessage } from '../GenericErrorMessage';
import { ConsentOptions, Users } from '../identity';
import { IdentityLocations } from '../IdentityLocations';
import { Lines } from '../Lines';
import type { ConsentOption } from '../models';
import { Actions, useConsentOptions } from '../useConsentOptions';
import { ConsentSection } from './ConsentSection';
import { EmailSettingsSection } from './EmailSettingsSection';
import { NewsletterSection } from './NewsletterSection';
import { OptOutSection } from './OptOutSection';

export const EmailAndMarketing = (_: { path?: string }) => {
	const { options, error, subscribe, unsubscribe, unsubscribeAll } = Actions;
	const [email, setEmail] = useState<string>('');
	const [removed, setRemoved] = useState(false);
	const [state, dispatch] = useConsentOptions();

	const toggleSubscription = async (id: string) => {
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

	const setRemoveAllEmailConsents = async () => {
		try {
			await ConsentOptions.unsubscribeAll();
			setRemoved(true);
			dispatch(unsubscribeAll());
		} catch (e) {
			dispatch(error(e));
		}
	};

	useEffect(() => {
		const makeInitialAPICalls = async () => {
			try {
				const user = await Users.getCurrentUser();
				if (!user.validated) {
					window.location.assign(IdentityLocations.VERIFY_EMAIL);
					return;
				}

				const allRecurringProductsDetailFetcherPromise =
					allRecurringProductsDetailFetcher();
				const mpapiFetchPromise = fetchWithDefaultParameters(
					'/mpapi/user/mobile-subscriptions',
				);
				const allSingleProductsDetailFetcherPromise =
					allSingleProductsDetailFetcher();

				const [
					mdapiResponseRaw,
					mpapiResponseRaw,
					singleContributionsRaw,
				] = await Promise.all(
					[
						allRecurringProductsDetailFetcherPromise,
						mpapiFetchPromise,
						allSingleProductsDetailFetcherPromise,
					].map((responsePromise) =>
						responsePromise.then((response) => response.json()),
					),
				);

				const mdapiResponse: MembersDataApiResponse = mdapiResponseRaw;
				const productDetails =
					mdapiResponse.products as ProductDetail[];
				const mpapiResponse = mpapiResponseRaw as MPAPIResponse;
				const singleContributions: SingleProductDetail[] =
					singleContributionsRaw;

				const appSubscriptions = mpapiResponse.subscriptions.filter(
					isValidAppSubscription,
				);

				const consentOptions = await ConsentOptions.getAll();
				const consentsWithFilteredSoftOptIns = consentOptions.filter(
					(consent: ConsentOption) =>
						consent.isProduct
							? userHasProductWithConsent(
									productDetails,
									consent,
							  ) ||
							  (userHasAppSubscriptionWithConsent(
									appSubscriptions,
									consent,
							  ) &&
									featureSwitches.appSubscriptions) ||
							  (userHasSingleContributionWithConsent(
									singleContributions,
									consent,
							  ) &&
									featureSwitches.singleContributions)
							: true,
				);

				setEmail(user.primaryEmailAddress);
				dispatch(options(consentsWithFilteredSoftOptIns));
			} catch (e) {
				dispatch(error(e));
			}
		};
		makeInitialAPICalls();
	}, []);

	const newsletters = ConsentOptions.newsletters(state.options);
	const consents = ConsentOptions.consents(state.options);
	const loading = newsletters.length === 0 && consents.length === 0;

	const errorRef = createRef<GenericErrorMessageRef>();

	useEffect(() => {
		if (state.error && errorRef.current) {
			window.scrollTo(0, errorRef.current.offsetTop - 20);
		}
	}, [state.error]);

	const errorMessage = (
		<WithStandardTopMargin>
			<GenericErrorMessage ref={errorRef} />
		</WithStandardTopMargin>
	);

	const content = (
		<>
			<WithStandardTopMargin>
				<NewsletterSection
					newsletters={newsletters}
					clickHandler={toggleSubscription}
				/>
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<Lines n={4} />
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<ConsentSection
					consents={consents}
					clickHandler={toggleSubscription}
				/>
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<Lines n={1} />
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<EmailSettingsSection
					email={email}
					actionHandler={setRemoveAllEmailConsents}
					removed={removed}
				/>
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<Lines n={4} />
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<OptOutSection
					consents={consents}
					clickHandler={toggleSubscription}
				/>
			</WithStandardTopMargin>
		</>
	);

	const loader = (
		<WithStandardTopMargin>
			<Spinner loadingMessage="Loading your email preferences..." />
		</WithStandardTopMargin>
	);

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.emailPrefs}
			pageTitle="Emails &amp; marketing"
		>
			{state.error ? errorMessage : null}
			{loading ? (!state.error ? loader : null) : content}
		</PageContainer>
	);
};

function userHasProductWithConsent(
	productDetails: ProductDetail[],
	consent: ConsentOption,
) {
	return productDetails.some((productDetail) => {
		const groupedProductType =
			GROUPED_PRODUCT_TYPES[productDetail.mmaCategory];
		const specificProductType =
			groupedProductType.mapGroupedToSpecific(productDetail);
		return specificProductType.softOptInIDs.includes(consent.id);
	});
}

function userHasAppSubscriptionWithConsent(
	appSubscriptions: AppSubscription[],
	consent: ConsentOption,
) {
	return (
		appSubscriptions.length > 0 &&
		AppSubscriptionSoftOptInIds.includes(consent.id)
	);
}

function userHasSingleContributionWithConsent(
	singleContributions: SingleProductDetail[],
	consent: ConsentOption,
) {
	return (
		singleContributions.length > 0 &&
		SingleContributionSoftOptInIds.includes(consent.id)
	);
}
