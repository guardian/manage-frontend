import { createRef, useEffect } from 'react';
import {
	isProduct,
	mdapiResponseReader,
} from '../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { allProductsDetailFetcher } from '../../../utilities/productUtils';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { Spinner } from '../../shared/Spinner';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';
import { GenericErrorMessage } from '../identity/GenericErrorMessage';
import type { GenericErrorMessageRef } from '../identity/GenericErrorMessage';
import { ConsentOptions, Users } from '../identity/identity';
import { IdentityLocations } from '../identity/IdentityLocations';
import { Lines } from '../identity/Lines';
import { MarketingToggle } from '../identity/MarketingToggle';
import type { ConsentOption } from '../identity/models';
import { Actions, useConsentOptions } from '../identity/useConsentOptions';
import { PageContainer } from '../Page';

type ClickHandler = (id: string) => {};

export const DataPrivacy = () => {
	const { options, error, subscribe, unsubscribe } = Actions;
	const [state, dispatch] = useConsentOptions();
	// const [error, setError] = useState(false);
	const consents = ConsentOptions.consents(state.options);

	const loading = consents.length === 0;

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

	const optOutFinder =
		(
			consents: ConsentOption[],
			clickHandler: ClickHandler,
			invertSubscribedValue?: (c: ConsentOption) => ConsentOption,
		) =>
		(id: string) => {
			let consent = consents.find((c) => c.id === id);
			if (consent && !!invertSubscribedValue) {
				consent = invertSubscribedValue(consent);
			}

			console.log('CONSENT', consent);
			console.log('CONSENT', consents);

			return (
				consent && (
					<MarketingToggle
						id={consent.id}
						title={consent.name}
						description={consent.description} // Not all consents from IDAPI have a description
						selected={consent.subscribed}
						onClick={clickHandler}
					/>
				)
			);
		};
	// const addInvertedMarketingToggle = optOutFinder(
	// 	consents,
	// 	clickHandler,
	// 	consentSubscribedValueInverter,
	// );
	const addMarketingToggle = optOutFinder(
		consents,
		toggleConsentSubscription,
	);

	useEffect(() => {
		const makeInitialAPICalls = async () => {
			try {
				const user = await Users.getCurrentUser();
				if (!user.validated) {
					window.location.assign(IdentityLocations.VERIFY_EMAIL);
					return;
				}
				const productDetailsResponse = await allProductsDetailFetcher();
				const productDetails = mdapiResponseReader(
					await productDetailsResponse.json(),
				).products.filter(isProduct);
				const consentOptions = await ConsentOptions.getAll();
				const consentsWithFilteredSoftOptIns = consentOptions.filter(
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
			} catch (e) {
				dispatch(error(e));
			}
		};

		makeInitialAPICalls();
	}, []);
	useEffect(() => {
		if (state.error && errorRef.current) {
			window.scrollTo(0, errorRef.current.offsetTop - 20);
		}
	}, [error]);

	const lines = () => <Lines n={1} margin="32px auto 16px" />;

	const errorRef = createRef<GenericErrorMessageRef>();

	const loader = (
		<WithStandardTopMargin>
			<Spinner loadingMessage="Loading your data privacy settings" />
		</WithStandardTopMargin>
	);

	const errorMessage = (
		<WithStandardTopMargin>
			<GenericErrorMessage ref={errorRef} />
		</WithStandardTopMargin>
	);

	const content = () => (
		<>
			<WithStandardTopMargin>
				<h2>Your Data</h2>
				<p>What we mean by your data</p>
				<ul>
					<li> Information you provide such as your email address</li>
					<li> Products or services you buy from us</li>
					<li>
						{' '}
						Pages you view on theguardian.com or other Guardian
						websites when signed in
					</li>
				</ul>
				{addMarketingToggle('personalised_advertising')}
				{addMarketingToggle('profiling_optout')}
				<p>
					Advertising is a crucial source of our funding. You won't
					see more ads, and your data won't be shared with third
					parties to use for their own advertising
				</p>
				<p>We do this by:</p>
				<ul>
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
				{lines()}
				<h2>Cookies on this browser</h2>
				<p>
					{' '}
					When we make the Guardian available for you online, we use
					cookies and similar technologies to help us to do this. Some
					are necessary to help our website work properly and can’s be
					switched off, and some are optional but support the Guardian
					and your experience in other ways.
				</p>
				{lines()}
				<h2>Learn more about our private policy</h2>
			</WithStandardTopMargin>
		</>
	);

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.dataPrivacy}
			pageTitle="Data privacy"
		>
			{loading ? loader : content()}
			{state.error ? errorMessage : null}
		</PageContainer>
	);
};
