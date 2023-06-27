import { getCookie } from '../../../utilities/cookies';

const cookieNames = [
	'gu_hide_support_messaging',
	'gu_digital_subscriber',
	'gu_paying_member',
	'gu_recurring_contributor',
];

/**
 * CookieInformation
 *
 * This component displays the users cookies to be used for diagnostic information
 */
export const CookieInformation = () => {
	const cookies = cookieNames.map(function (cookieName) {
		const value = getCookie(cookieName);
		return { name: cookieName, value: value };
	});

	return (
		<>
			<h3>Cookie Information:</h3>
			<ul>
				{cookies.map(function (cookie) {
					return (
						<li key={cookie.name}>
							{cookie.name}: {cookie.value || 'unset'}
						</li>
					);
				})}
			</ul>
		</>
	);
};
