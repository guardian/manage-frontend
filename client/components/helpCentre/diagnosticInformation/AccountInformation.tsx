import { useEffect, useState } from 'react';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';

interface UserAttributes {
	userId: string;
	digitalSubscriptionExpiryDate: string;
	showSupportMessaging: boolean;
	contentAccess: Record<string, boolean>;
}

export const AccountInformation = () => {
	const [userAttributes, SetUserAttributes] = useState<
		UserAttributes | 'failed' | 'loading'
	>('loading');

	useEffect(() => {
		const fetchData = async () => {
			const resp = await fetchWithDefaultParameters(
				'/api/me/user-attributes',
			);

			if (resp.ok) {
				const data = (await resp.json()) as UserAttributes;
				SetUserAttributes(data);
			} else {
				SetUserAttributes('failed');
			}
		};

		fetchData().catch((e) => {
			console.error(e);
			SetUserAttributes('failed');
		});
	}, []);

	if (userAttributes === 'loading') {
		return (
			<>
				<h3>Account Information</h3>
				<p>Loading...</p>
			</>
		);
	}

	if (userAttributes === 'failed') {
		return (
			<>
				<h3>Account Information</h3>
				<p>User is not logged in / no attribute data available</p>
			</>
		);
	}

	return (
		<>
			<h3>Account Information:</h3>
			<ul>
				<li>ID number: {userAttributes.userId}</li>
				<li>
					Digital subscription end date:{' '}
					{userAttributes.digitalSubscriptionExpiryDate}
				</li>
				<li>
					Show supporter messaging:{' '}
					{userAttributes.showSupportMessaging.toString()}
				</li>
				{Object.entries(userAttributes.contentAccess).map(function ([
					name,
					value,
				]) {
					return (
						<li key={name}>
							Content Access - {name}: {value.toString()}
						</li>
					);
				})}
			</ul>
		</>
	);
};
