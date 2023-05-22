interface ReminderParams {
	reminderData: string;
	token: string;
}

export const getReminderParams = (
	querystring: string,
): ReminderParams | undefined => {
	const pairs = querystring
		.slice(1) // drop initial '?'
		.replace('?', '&') // braze can append a new query string at the end of an existing one
		.split('&');

	const params = pairs.reduce<Partial<ReminderParams>>((acc, pair) => {
		const [key, value] = pair.split('=');
		if (key && value && (key === 'reminderData' || key === 'token')) {
			return {
				...acc,
				[key]: decodeURIComponent(value),
			};
		} else {
			return acc;
		}
	}, {});

	if (params.reminderData && params.token) {
		return params as ReminderParams;
	}
	return undefined;
};
