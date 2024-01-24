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
import type { User } from '../models';
import { textSmall } from '../sharedStyles';
import { SettingsFormSection } from './SettingsFormSection';

const errorRef = createRef<GenericErrorMessageRef>();
const pageTopRef = createRef<HTMLDivElement>();

const loader = (
	<WithStandardTopMargin>
		<Spinner loadingMessage="Loading your profile ..." />
	</WithStandardTopMargin>
);

export const Settings = (_: { path?: string }) => {
	const [user, setUser] = useState<User>();
	const [error, setError] = useState(false);
	const [emailMessage, setEmailMessage] = useState<string | null>(null);

	useEffect(() => {
		if (error && errorRef.current) {
			window.scrollTo(0, errorRef.current.offsetTop - 20);
		}
	}, [error]);

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

	const saveUser = async (originalUser: User, values: User) => {
		const changedUser = { ...originalUser, ...values };
		return await Users.saveChanges(originalUser, changedUser);
	};

	const scrollToTop = () => {
		if (pageTopRef.current) {
			window.scrollTo(0, pageTopRef.current.offsetTop - 20);
		}
	};

	const updateValues = (input: User, response: User) => {
		const changedFields = Users.getChangedFields(response, input);
		if (changedFields.primaryEmailAddress) {
			setEmailMessage(changedFields.primaryEmailAddress);
		}
		setUser(response);
	};

	const content = (u: User) => (
		<>
			<div ref={pageTopRef} css={{ display: 'none' }} />
			<WithStandardTopMargin>
				<span css={textSmall}>
					These details will only be visible to you and the Guardian.
				</span>
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<SettingsFormSection
					user={u}
					saveUser={(values) => saveUser(u, values)}
					onError={handleGeneralError}
					onSuccess={updateValues}
					onDone={scrollToTop}
					emailMessage={emailMessage}
				/>
			</WithStandardTopMargin>
		</>
	);

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.settings}
			pageTitle="Settings"
		>
			{!error || (
				<WithStandardTopMargin>
					<GenericErrorMessage ref={errorRef} />
				</WithStandardTopMargin>
			)}
			{user ? content(user) : loader}
		</PageContainer>
	);
};
