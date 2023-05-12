export const AccountInformation = () => {
	const userAttributes = window.guardian.userAttributes;

	if (!userAttributes) {
		return (
			<>
				<h3>Account Information</h3>
				<p>User is not logged in / no attribute data available</p>
			</>
		);
	}

	return (
		<>
			<h3>Account Information</h3>
			<ul>
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
