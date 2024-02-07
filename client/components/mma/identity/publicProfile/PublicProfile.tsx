import * as Sentry from '@sentry/browser';
import { createRef, useEffect, useState } from 'react';
import { trackEvent } from '../../../../utilities/analytics';
import { NAV_LINKS } from '../../../shared/nav/NavConfig';
import { Spinner } from '../../../shared/Spinner';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';
import { PageContainer } from '../../Page';
import type { GenericErrorMessageRef } from '../GenericErrorMessage';
import { GenericErrorMessage } from '../GenericErrorMessage';
import { Users } from '../identity';
import { IdentityLocations } from '../IdentityLocations';
import { Lines } from '../Lines';
import type { User } from '../models';
import { PageSection } from '../PageSection';
import { aCss } from '../sharedStyles';
import { AvatarSection } from './AvatarSection';
import { ProfileFormSection } from './ProfileFormSection';

const hasUsername = (user: User) => !!user.username;

export const PublicProfile = (_: { path?: string }) => {
	const [user, setUser] = useState<User>();
	const [error, setError] = useState(false);

	const errorRef = createRef<GenericErrorMessageRef>();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we're only assuming the argument object is an error object?
	const handleGeneralError = (e: any) => {
		setError(true);
		Sentry.captureException(e);
		trackEvent({
			eventCategory: 'publicProfileError',
			eventAction: 'error',
			eventLabel: e.toString(),
		});
	};

	useEffect(() => {
		Users.getCurrentUser()
			.then((u: User) => {
				setUser(u);
			})
			.catch(handleGeneralError);
	}, []);

	const setUsername = async (values: User) => await Users.setUsername(values);

	useEffect(() => {
		if (error && errorRef.current) {
			window.scrollTo(0, errorRef.current.offsetTop - 20);
		}
	}, [error]);

	const loader = (
		<WithStandardTopMargin>
			<Spinner loadingMessage="Loading your profile ..." />
		</WithStandardTopMargin>
	);

	const usernameDisplay = (u: User) => (
		<>
			<WithStandardTopMargin>
				<PageSection title="Username">{u.username}</PageSection>
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<Lines n={1} />
			</WithStandardTopMargin>
		</>
	);

	const usernameInputForm = (u: User) => (
		<>
			<ProfileFormSection
				user={u}
				saveUser={(values) => setUsername(values)}
				onError={handleGeneralError}
				onSuccess={setUser}
			/>

			<WithStandardTopMargin>
				<Lines n={1} />
			</WithStandardTopMargin>
		</>
	);

	const content = (u: User) => (
		<>
			<WithStandardTopMargin>
				<p css={{ fontSize: '14px' }}>
					These details will be publicly visible to everyone who sees
					your profile in the{' '}
					<a css={aCss} href={IdentityLocations.COMMUNITY_FAQS}>
						commenting
					</a>{' '}
					section.
				</p>
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<Lines n={1} />
			</WithStandardTopMargin>
			{hasUsername(u) ? usernameDisplay(u) : usernameInputForm(u)}
			<WithStandardTopMargin>
				<AvatarSection userId={u.id} />
			</WithStandardTopMargin>
		</>
	);

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.profile}
			pageTitle="Edit your profile"
		>
			<WithStandardTopMargin>
				{error ? <GenericErrorMessage ref={errorRef} /> : null}
			</WithStandardTopMargin>
			{user ? content(user) : loader}
		</PageContainer>
	);
};
