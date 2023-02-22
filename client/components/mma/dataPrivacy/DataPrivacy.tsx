import { createRef, useEffect, useState } from 'react';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { Spinner } from '../../shared/Spinner';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';
import { GenericErrorMessage } from '../identity/GenericErrorMessage';
import type { GenericErrorMessageRef } from '../identity/GenericErrorMessage';
import { Lines } from '../identity/Lines';
import { ToggleSwitch } from '../identity/ToggleSwitch';
import { PageContainer } from '../Page';

export const DataPrivacy = () => {
	// const [state, dispatch] = useConsentOptions();
	const [error, setError] = useState(false);

	useEffect(() => {
		if (error && errorRef.current) {
			window.scrollTo(0, errorRef.current.offsetTop - 20);
			setError(false);
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
				<ToggleSwitch
					id="oi"
					label="Allow the guardian to use my data for its marketing purposes"
					labelPosition="left"
				/>
				<ToggleSwitch
					id="oi"
					label="Allow personalised advertising using this data - this supports the Guardian"
					labelPosition="left"
				/>
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
			{loader}
			{error ? errorMessage : content()}
		</PageContainer>
	);
};
