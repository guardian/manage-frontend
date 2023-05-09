import { conf } from '../../../../server/config';

let domain: string;
if (typeof window !== 'undefined' && window.guardian) {
	domain = window.guardian.domain;
} else {
	domain = conf.DOMAIN;
}

interface FooterLink {
	title: string;
	titleUSA?: string;
	link?: string;
	cmp?: boolean;
}

export const footerlinks: FooterLink[][] = [
	[
		{
			title: 'About us',
			link: `https://${domain}/about`,
		},
		{
			title: 'Contact us',
			link: `https://${domain}/help/contact-us`,
		},
		{
			title: 'Complaints & corrections',
			link: `https://${domain}/info/complaints-and-corrections`,
		},
		{
			title: 'Secure Drop',
			link: `https://${domain}/securedrop`,
		},
		{
			title: 'Work for us',
			link: `https://workforus.${domain}`,
		},
		{
			title: 'Privacy settings',
			titleUSA: 'California resident – Do Not Sell',
			cmp: true,
		},
		{
			title: 'Privacy policy',
			link: `https://${domain}/info/privacy`,
		},
		{
			title: 'Cookie policy',
			link: `https://${domain}/info/cookies`,
		},
		{
			title: 'Terms & conditions',
			link: `https://www.${domain}/help/terms-of-service`,
		},
		{
			title: 'Help',
			link: `https://www.${domain}/help`,
		},
	],
	[
		{
			title: 'All topics',
			link: `https://${domain}/index/subjects/a`,
		},
		{
			title: 'All writers',
			link: `https://${domain}/index/contributors`,
		},
		{
			title: 'Modern Slavery Act',
			link: `https://uploads.guim.co.uk/2021/07/27/STL_&_GMG_Modern_Slavery_Act_Statement_2021.pdf`,
		},
		{
			title: 'Digital newspaper archive',
			link: `https://theguardian.newspapers.com/`,
		},
		{
			title: 'Facebook',
			link: `https://www.facebook.com/theguardian`,
		},
		{
			title: 'Twitter',
			link: `https://twitter.com/guardian`,
		},
	],
	[
		{
			title: 'Advertise with us',
			link: `https://advertising.${domain}`,
		},
		{
			title: 'Guardian Labs',
			link: `https://${domain}/guardian-labs`,
		},
		{
			title: 'Search jobs',
			link: `https://jobs.${domain}/?INTCMP=NGW_FOOTER_UK_GU_JOBS`,
		},
		{
			title: 'Patrons',
			link: `https://patrons.${domain}/?INTCMP=footer_patrons`,
		},
	],
];

export const minimalFooterLinks: FooterLink[][] = [
	[
		{
			title: 'Privacy policy',
			link: `https://${domain}/info/privacy`,
		},
	],
	[
		{
			title: 'Contact us',
			link: `https://${domain}/help/contact-us`,
		},
	],
	[
		{
			title: 'Help centre',
			link: `https://www.${domain}/help`,
		},
	],
];
