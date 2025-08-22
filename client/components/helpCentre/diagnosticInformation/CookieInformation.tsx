import { getCookie } from '../../../utilities/cookies';

const cookieNames = [
	'gu_hide_support_messaging',
	'GU_AF1',
	'gu_allow_reject_all',
	'gu_user_benefits_expiry',
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
