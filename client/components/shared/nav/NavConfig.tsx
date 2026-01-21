import type { ReactElement } from 'react';
import { conf } from '../../../../server/config';
import { AccountOverviewIcon } from '../../mma/shared/assets/AccountOverviewIcon';
import { CreditCardIcon } from '../../mma/shared/assets/CreditCardIcon';
import { EmailPrefsIcon } from '../../mma/shared/assets/EmailPrefIcon';
import { HelpIcon } from '../../mma/shared/assets/HelpIcon';
import { ProfileIcon } from '../../mma/shared/assets/ProfileIcon';
import { SettingsIcon } from '../../mma/shared/assets/SettingsIcon';
import { ShieldIcon } from '../../mma/shared/assets/ShieldIcon';
import { SignoutIcon } from '../../mma/shared/assets/SignoutIcon';

interface NavIconProps {
	overrideFillColor?: string;
	overrideWidthAtDesktop?: number;
}
export interface NavItem {
	title: string;
	link: string;
	local?: boolean;
	icon?: (props: NavIconProps) => ReactElement;
}

export interface MenuSpecificNavItem extends NavItem {
	isDropDownExclusive?: boolean;
}

interface NavLinks {
	accountOverview: MenuSpecificNavItem;
	billing: MenuSpecificNavItem;
	dataPrivacy: MenuSpecificNavItem;
	profile: MenuSpecificNavItem;
	settings: MenuSpecificNavItem;
	emailPrefs: MenuSpecificNavItem;
	help: MenuSpecificNavItem;
	comments: MenuSpecificNavItem;
	signOut: MenuSpecificNavItem;
}

let domain: string;
if (typeof window !== 'undefined' && window.guardian) {
	domain = window.guardian.domain;
} else {
	domain = conf.DOMAIN;
}
export const PROFILE_HOST_NAME = `https://profile.${domain}`;

export const NAV_LINKS: NavLinks = {
	accountOverview: {
		title: 'Account overview',
		link: '/',
		local: true,
		icon: AccountOverviewIcon,
	},
	billing: {
		title: 'Billing',
		link: '/billing',
		local: true,
		icon: CreditCardIcon,
	},
	profile: {
		title: 'Profile',
		link: '/public-settings',
		local: true,
		icon: ProfileIcon,
	},
	emailPrefs: {
		title: 'Emails & marketing',
		link: '/email-prefs',
		local: true,
		icon: EmailPrefsIcon,
	},
	dataPrivacy: {
		title: 'Data privacy',
		link: '/data-privacy',
		local: true,
		icon: ShieldIcon,
	},
	settings: {
		title: 'Settings',
		link: '/account-settings',
		local: true,
		icon: SettingsIcon,
	},
	help: {
		title: 'Help',
		link: '/help',
		local: true,
		icon: HelpIcon,
	},
	comments: {
		title: 'Comments & replies',
		link: '/profile/user', // note this hits a redirect/proxy endpoint
		isDropDownExclusive: true,
	},
	signOut: {
		title: 'Sign out',
		link: `${PROFILE_HOST_NAME}/signout`,
		isDropDownExclusive: true,
		icon: SignoutIcon,
	},
};

export const getNavItemFromFlowReferrer = (
	flowReferrerTitle?: string,
): MenuSpecificNavItem =>
	Object.entries(NAV_LINKS).find(
		(navLinkEntry) => navLinkEntry[1].title === flowReferrerTitle,
	)?.[1] || NAV_LINKS.accountOverview;
