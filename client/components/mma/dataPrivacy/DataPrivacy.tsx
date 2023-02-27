import type { CMP } from '@guardian/consent-management-platform/dist/types';
import { brand } from '@guardian/source-foundations';
import { createRef, useEffect, useState } from 'react';
import {
	isProduct,
	mdapiResponseReader,
} from '../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { allProductsDetailFetcher } from '../../../utilities/productUtils';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { Spinner } from '../../shared/Spinner';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';
import { optOutFinder } from '../identity/emailAndMarketing/OptOutSection';
import { GenericErrorMessage } from '../identity/GenericErrorMessage';
import type { GenericErrorMessageRef } from '../identity/GenericErrorMessage';
import { ConsentOptions, Users } from '../identity/identity';
import { IdentityLocations } from '../identity/IdentityLocations';
import { Lines } from '../identity/Lines';
import type { ConsentOption } from '../identity/models';
import { aCss } from '../identity/sharedStyles';
import { Actions, useConsentOptions } from '../identity/useConsentOptions';
import { PageContainer } from '../Page';
import { Button } from '../shared/Buttons';
import {
	dataPrivacyHeadingCss,
	dataPrivacyMarketingToggleCss,
	dataPrivacyParagraphCss,
	dataPrivacyUnorderedListCss,
	dataPrivacyVideoCss,
} from './DataPrivacy.styles';

export const DataPrivacy = () => {
	const { options, error, subscribe, unsubscribe } = Actions;
	const [state, dispatch] = useConsentOptions();
	const [importedCmp, setImportedCmp] = useState<CMP | null>(null);

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

	const addMarketingToggle = optOutFinder(
		consents,
		toggleConsentSubscription,
		dataPrivacyMarketingToggleCss,
	);

	const openManageCookies = () => {
		importedCmp?.showPrivacyManager();
	};

	useEffect(() => {
		makeInitialAPICalls();
		loadCMP();
	}, []);

	const loadCMP = () => {
		import('@guardian/consent-management-platform').then(({ cmp }) => {
			setImportedCmp(cmp);
		});
	};

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

	useEffect(() => {
		if (state.error && errorRef.current) {
			window.scrollTo(0, errorRef.current.offsetTop - 20);
		}
	}, [error]);

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
			{addMarketingToggle('profiling_optout')}
			<Lines n={1} />
			{addMarketingToggle('personalised_advertising')}

			<WithStandardTopMargin>
				<p>
					Advertising is a crucial source of our funding. You won't
					see more ads, and your data won't be shared with third
					parties to use for their own advertising
				</p>
				<p>We do this by:</p>
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
			</WithStandardTopMargin>
		</>
	);

	const cookiesOnThisBrowserSection = (
		<>
			<h3 css={dataPrivacyHeadingCss}>Cookies on this browser</h3>
			<p>
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
				Learn more about our private policy
			</h3>
			<video
				controls
				css={dataPrivacyVideoCss}
				src="https://uploads.guim.co.uk/2019%2F30%2F26%2FThe+Guardian%27s+privacy+policy+%E2%80%93+video--7d3a7f3f-bc23-4e9d-9566-ea1f8ada5954-1.mp4"
			/>

			<Lines n={1} />

			<p>
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
