import { conf } from '../../../server/config';

const url = (subdomain: string, domain: string, path?: string) =>
	`https://${subdomain}.${domain}${path ? path : ''}`;

const DOMAIN =
	typeof window !== 'undefined' && window.guardian
		? window.guardian.domain
		: conf.DOMAIN;

const IMAGE_DOMAIN =
	DOMAIN === 'theguardian.com' ? 'guim.co.uk' : 'guimcode.co.uk';

const IDAPI_URL =
	DOMAIN === 'thegulocal.com' ? '/idapicodeproxy' : url('idapi', DOMAIN);

const AVATAR_URL =
	DOMAIN === 'thegulocal.com' ? '/avatarcodeproxy' : url('avatar', DOMAIN);

const getIdentityLocations = (domain: string) => ({
	COMMUNITY_FAQS: url('www', domain, '/community-faqs'),
	CONTACT_AND_DELIVERY_HELP: url(
		'manage',
		'theguardian.com',
		'/help-centre/article/i-need-to-change-my-delivery-address',
	),
	CHANGE_EMAIL: url('profile', domain, '/account/edit'),
	RESET_PASSWORD: url('profile', domain, '/reset'),
	MANAGE_JOB_ALERTS: url('jobs', domain, '/your-jobs/?ActiveSection=JbeList'),
	VERIFY_EMAIL: url('profile', domain, '/verify-email'),
	IDAPI: IDAPI_URL,
	AVATAR: AVATAR_URL,
	AVATAR_USER_IMAGES: url('avatar', IMAGE_DOMAIN, '/user'),
	DELETE_ACCOUNT: url('profile', domain, '/delete'),
});

export const IdentityLocations = getIdentityLocations(DOMAIN);
