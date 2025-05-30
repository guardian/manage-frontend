/* eslint-disable @typescript-eslint/naming-convention -- disabling this rule due to uncertainty around coupling between enum values and API responses in Identity code */

export enum NewsletterGroup {
	newsInDepth = 'news in depth',
	newsInBrief = 'news in brief',
	opinion = 'opinion',
	features = 'features',
	culture = 'culture',
	lifestyle = 'lifestyle',
	sport = 'sport',
	work = 'work',
	fromThePapers = 'from the papers',
}

export enum ErrorTypes {
	GENERAL = 'GENERAL',
	NOT_FOUND = 'NOT_FOUND',
	VALIDATION = 'VALIDATION',
}

export enum ConsentOptionType {
	EMAIL = 'EMAIL',
	NEWSLETTER = 'NEWSLETTER',
	OPT_OUT = 'OPT_OUT',
	SUPPORT_REMINDER = 'SUPPORT_REMINDER',
}

export interface User {
	id: string;
	primaryEmailAddress: string;
	consents: string[];
	username: string;
	validated: boolean;
	title: string;
	firstName: string;
	secondName: string;
	address1: string;
	address2: string;
	address3: string;
	address4: string;
	postcode: string;
	country: string;
	countryCode: string;
	localNumber: number;
	registrationLocation: registrationLocationType;
	registrationLocationState: RegistrationLocationState;
}

export interface UserError {
	type: ErrorTypes.VALIDATION;
	error: {
		username: string;
	};
}

export interface UserCollection {
	getCurrentUser: () => Promise<User>;
	save: (user: User) => Promise<User>;
	saveChanges: (original: User, changed: User) => Promise<User>;
	getChangedFields: (original: User, changed: User) => Partial<User>;
	setUsername: (user: User) => Promise<User>;
}

export interface ConsentOption {
	id: string;
	description?: string;
	frequency?: string;
	name: string;
	theme?: string;
	group?: string;
	type: ConsentOptionType;
	subscribed: boolean;
	identityName?: string;
	isProduct?: boolean;
	isChannel?: boolean;
}

export interface ConsentOptionCollection {
	getAll: () => Promise<ConsentOption[]>;
	subscribe: (option: ConsentOption) => Promise<void>;
	unsubscribe: (option: ConsentOption) => Promise<void>;
	newsletters: (options: ConsentOption[]) => ConsentOption[];
	consents: (options: ConsentOption[]) => ConsentOption[];
	unsubscribeAll: () => Promise<void>;
	findById: (
		options: ConsentOption[],
		id: ConsentOption['id'],
	) => ConsentOption | undefined;
	findByIds: (options: ConsentOption[], ids: string[]) => ConsentOption[];
}

/*
 * The following models are being used to aid in migration of functionality off of a legacy system. There is
 * currently no standard library or API for these values at the Guardian, when these become available, these hardcoded values should be replaced.
 * Note: COUNTRIES comes from a non-standard list used by the Guardian.
 * Note : REGISTRATION LOCATION comes from a non-standard list used by the Guardian and enforced by the Identity API
 */

type registrationLocationType = `${RegistrationLocations}`;
export enum RegistrationLocations {
	PREFER_NOT_TO_SAY = 'Prefer not to say',
	UNITED_KINGDOM = 'United Kingdom',
	EUROPE = 'Europe',
	UNITED_STATES = 'United States',
	CANADA = 'Canada',
	AUSTRALIA = 'Australia',
	NEW_ZEALAND = 'New Zealand',
	OTHER = 'Other',
}

export const RegistrationLocationStatesByLocation = {
	[RegistrationLocations.AUSTRALIA]: [
		// Australia - https://en.wikipedia.org/wiki/ISO_3166-2:AU
		// Australian States
		'New South Wales', // AU-NSW
		'Victoria', // AU-VIC
		'Queensland', // AU-QLD
		'South Australia', // AU-SA
		'Western Australia', // AU-WA
		'Tasmania', // AU-TAS
		// Australian Territories
		'Australian Capital Territory', // AU-ACT
		'Northern Territory', // AU-NT
	],
	[RegistrationLocations.UNITED_STATES]: [
		// United States - https://en.wikipedia.org/wiki/ISO_3166-2:US
		// US States
		'Alabama', // US-AL
		'Alaska', // US-AK
		'Arizona', // US-AZ
		'Arkansas', // US-AR
		'California', // US-CA
		'Colorado', // US-CO
		'Connecticut', // US-CT
		'Delaware', // US-DE
		'Florida', // US-FL
		'Georgia', // US-GA
		'Hawaii', // US-HI
		'Idaho', // US-ID
		'Illinois', // US-IL
		'Indiana', // US-IN
		'Iowa', // US-IA
		'Kansas', // US-KS
		'Kentucky', // US-KY
		'Louisiana', // US-LA
		'Maine', // US-ME
		'Maryland', // US-MD
		'Massachusetts', // US-MA
		'Michigan', // US-MI
		'Minnesota', // US-MN
		'Mississippi', // US-MS
		'Missouri', // US-MO
		'Montana', // US-MT
		'Nebraska', // US-NE
		'Nevada', // US-NV
		'New Hampshire', // US-NH
		'New Jersey', // US-NJ
		'New Mexico', // US-NM
		'New York', // US-NY
		'North Carolina', // US-NC
		'North Dakota', // US-ND
		'Ohio', // US-OH
		'Oklahoma', // US-OK
		'Oregon', // US-OR
		'Pennsylvania', // US-PA
		'Rhode Island', // US-RI
		'South Carolina', // US-SC
		'South Dakota', // US-SD
		'Tennessee', // US-TN
		'Texas', // US-TX
		'Utah', // US-UT
		'Vermont', // US-VT
		'Virginia', // US-VA
		'Washington', // US-WA
		'West Virginia', // US-WV
		'Wisconsin', // US-WI
		'Wyoming', // US-WY
		// US Districts
		'District of Columbia', // US-DC
		// US Outlying Areas
		'American Samoa', // US-AS
		'Guam', // US-GU
		'Northern Mariana Islands', // US-MP
		'Puerto Rico', // US-PR
		'United States Minor Outlying Islands', // US-UM
		'Virgin Islands', // US-VI
	],
	general: [
		// General
		'Other', // Other
		'Prefer not to say', // Prefer not to say
	],
} as const;

export const RegistrationLocationStates = [
	...RegistrationLocationStatesByLocation[RegistrationLocations.AUSTRALIA],
	...RegistrationLocationStatesByLocation[
		RegistrationLocations.UNITED_STATES
	],
	...RegistrationLocationStatesByLocation.general,
	'',
] as const;
export type RegistrationLocationState =
	typeof RegistrationLocationStates[number];

export enum Titles {
	MR = 'Mr',
	MRS = 'Mrs',
	MS = 'Ms',
	MX = 'Mx',
	MISS = 'Miss',
	DR = 'Dr',
	PROF = 'Prof',
	REV = 'Rev',
}

/* Extracted from https://github.com/catamphetamine/libphonenumber-js using:
 * const core = require('libphonenumber-js/core');
 * const meta = require('libphonenumber-js/metadata.min.json');
 * const ccs = (new core.Metadata(meta)).countryCallingCodes();
 * const processed = Object.keys(ccs);
 * console.dir(processed, { 'maxArrayLength': null });
 */

export const PHONE_CALLING_CODES: string[] = [
	'1',
	'7',
	'20',
	'27',
	'30',
	'31',
	'32',
	'33',
	'34',
	'36',
	'39',
	'40',
	'41',
	'43',
	'44',
	'45',
	'46',
	'47',
	'48',
	'49',
	'51',
	'52',
	'53',
	'54',
	'55',
	'56',
	'57',
	'58',
	'60',
	'61',
	'62',
	'63',
	'64',
	'65',
	'66',
	'81',
	'82',
	'84',
	'86',
	'90',
	'91',
	'92',
	'93',
	'94',
	'95',
	'98',
	'211',
	'212',
	'213',
	'216',
	'218',
	'220',
	'221',
	'222',
	'223',
	'224',
	'225',
	'226',
	'227',
	'228',
	'229',
	'230',
	'231',
	'232',
	'233',
	'234',
	'235',
	'236',
	'237',
	'238',
	'239',
	'240',
	'241',
	'242',
	'243',
	'244',
	'245',
	'246',
	'247',
	'248',
	'249',
	'250',
	'251',
	'252',
	'253',
	'254',
	'255',
	'256',
	'257',
	'258',
	'260',
	'261',
	'262',
	'263',
	'264',
	'265',
	'266',
	'267',
	'268',
	'269',
	'290',
	'291',
	'297',
	'298',
	'299',
	'350',
	'351',
	'352',
	'353',
	'354',
	'355',
	'356',
	'357',
	'358',
	'359',
	'370',
	'371',
	'372',
	'373',
	'374',
	'375',
	'376',
	'377',
	'378',
	'380',
	'381',
	'382',
	'383',
	'385',
	'386',
	'387',
	'389',
	'420',
	'421',
	'423',
	'500',
	'501',
	'502',
	'503',
	'504',
	'505',
	'506',
	'507',
	'508',
	'509',
	'590',
	'591',
	'592',
	'593',
	'594',
	'595',
	'596',
	'597',
	'598',
	'599',
	'670',
	'672',
	'673',
	'674',
	'675',
	'676',
	'677',
	'678',
	'679',
	'680',
	'681',
	'682',
	'683',
	'685',
	'686',
	'687',
	'688',
	'689',
	'690',
	'691',
	'692',
	'800',
	'808',
	'850',
	'852',
	'853',
	'855',
	'856',
	'870',
	'878',
	'880',
	'881',
	'882',
	'883',
	'886',
	'888',
	'960',
	'961',
	'962',
	'963',
	'964',
	'965',
	'966',
	'967',
	'968',
	'970',
	'971',
	'972',
	'973',
	'974',
	'975',
	'976',
	'977',
	'979',
	'992',
	'993',
	'994',
	'995',
	'996',
	'998',
];

interface CountryValues {
	iso: string;
	name: string;
}
export const COUNTRIES: CountryValues[] = [
	{ iso: 'AF', name: 'Afghanistan' },
	{ iso: 'AL', name: 'Albania' },
	{ iso: 'DZ', name: 'Algeria' },
	{ iso: 'AS', name: 'American Samoa' },
	{ iso: 'AD', name: 'Andorra' },
	{ iso: 'AO', name: 'Angola' },
	{ iso: 'AI', name: 'Anguilla' },
	{ iso: 'AQ', name: 'Antarctica' },
	{ iso: 'AG', name: 'Antigua & Barbuda' },
	{ iso: 'AR', name: 'Argentina' },
	{ iso: 'AM', name: 'Armenia' },
	{ iso: 'AW', name: 'Aruba' },
	{ iso: 'AU', name: 'Australia' },
	{ iso: 'AT', name: 'Austria' },
	{ iso: 'AZ', name: 'Azerbaijan' },
	{ iso: 'BS', name: 'Bahamas' },
	{ iso: 'BH', name: 'Bahrain' },
	{ iso: 'BD', name: 'Bangladesh' },
	{ iso: 'BB', name: 'Barbados' },
	{ iso: 'BY', name: 'Belarus' },
	{ iso: 'BE', name: 'Belgium' },
	{ iso: 'BZ', name: 'Belize' },
	{ iso: 'BJ', name: 'Benin' },
	{ iso: 'BM', name: 'Bermuda' },
	{ iso: 'BT', name: 'Bhutan' },
	{ iso: 'BO', name: 'Bolivia' },
	{ iso: 'BQ', name: 'Bonaire, Saint Eustatius and Saba' },
	{ iso: 'BA', name: 'Bosnia-Herzegovina' },
	{ iso: 'BW', name: 'Botswana' },
	{ iso: 'BV', name: 'Bouvet Island' },
	{ iso: 'BR', name: 'Brazil' },
	{ iso: 'IO', name: 'British Indian Ocean Territory' },
	{ iso: 'VG', name: 'British Virgin Islands' },
	{ iso: 'BN', name: 'Brunei Darussalam' },
	{ iso: 'BG', name: 'Bulgaria' },
	{ iso: 'BF', name: 'Burkina Faso' },
	{ iso: 'BI', name: 'Burundi' },
	{ iso: 'KH', name: 'Cambodia' },
	{ iso: 'CM', name: 'Cameroon' },
	{ iso: 'CA', name: 'Canada' },
	{ iso: 'CV', name: 'Cape Verde Islands' },
	{ iso: 'KY', name: 'Cayman Islands' },
	{ iso: 'CF', name: 'Central African Republic' },
	{ iso: 'TD', name: 'Chad' },
	{ iso: 'CL', name: 'Chile' },
	{ iso: 'CN', name: 'China' },
	{ iso: 'CX', name: 'Christmas Island' },
	{ iso: 'CC', name: 'Cocos (Keeling) Islands' },
	{ iso: 'CO', name: 'Colombia' },
	{ iso: 'KM', name: 'Comoros' },
	{ iso: 'CG', name: 'Congo (Brazzaville)' },
	{ iso: 'CD', name: 'Congo (Kinshasa)' },
	{ iso: 'CK', name: 'Cook Islands' },
	{ iso: 'CR', name: 'Costa Rica' },
	{ iso: 'HR', name: 'Croatia' },
	{ iso: 'CU', name: 'Cuba' },
	{ iso: 'CW', name: 'Curaçao' },
	{ iso: 'CY', name: 'Cyprus' },
	{ iso: 'CZ', name: 'Czech Republic' },
	{ iso: 'DK', name: 'Denmark' },
	{ iso: 'DJ', name: 'Djibouti' },
	{ iso: 'DM', name: 'Dominica' },
	{ iso: 'DO', name: 'Dominican Republic' },
	{ iso: 'TL', name: 'East Timor' },
	{ iso: 'EC', name: 'Ecuador' },
	{ iso: 'EG', name: 'Egypt' },
	{ iso: 'SV', name: 'El Salvador' },
	{ iso: 'GQ', name: 'Equatorial Guinea' },
	{ iso: 'ER', name: 'Eritrea' },
	{ iso: 'EE', name: 'Estonia' },
	{ iso: 'ET', name: 'Ethiopia' },
	{ iso: 'FK', name: 'Falkland Islands' },
	{ iso: 'FO', name: 'Faroe Islands' },
	{ iso: 'FJ', name: 'Fiji' },
	{ iso: 'FI', name: 'Finland' },
	{ iso: 'FR', name: 'France' },
	{ iso: 'GF', name: 'French Guiana' },
	{ iso: 'PF', name: 'French Polynesia' },
	{ iso: 'TF', name: 'French Southern Territories' },
	{ iso: 'GA', name: 'Gabon' },
	{ iso: 'GM', name: 'Gambia' },
	{ iso: 'GE', name: 'Georgia' },
	{ iso: 'DE', name: 'Germany' },
	{ iso: 'GH', name: 'Ghana' },
	{ iso: 'GI', name: 'Gibraltar' },
	{ iso: 'GR', name: 'Greece' },
	{ iso: 'GL', name: 'Greenland' },
	{ iso: 'GD', name: 'Grenada' },
	{ iso: 'GP', name: 'Guadeloupe' },
	{ iso: 'GU', name: 'Guam' },
	{ iso: 'GT', name: 'Guatemala' },
	{ iso: 'GG', name: 'Guernsey' },
	{ iso: 'GN', name: 'Guinea' },
	{ iso: 'GW', name: 'Guinea-Bissau' },
	{ iso: 'GY', name: 'Guyana' },
	{ iso: 'HT', name: 'Haiti' },
	{ iso: 'HM', name: 'Heard Island and McDonald Islands' },
	{ iso: 'VA', name: 'Holy See' },
	{ iso: 'HN', name: 'Honduras' },
	{ iso: 'HK', name: 'Hong Kong' },
	{ iso: 'HU', name: 'Hungary' },
	{ iso: 'IS', name: 'Iceland' },
	{ iso: 'IN', name: 'India' },
	{ iso: 'ID', name: 'Indonesia' },
	{ iso: 'IR', name: 'Iran' },
	{ iso: 'IQ', name: 'Iraq' },
	{ iso: 'IE', name: 'Ireland' },
	{ iso: 'IM', name: 'Isle of Man' },
	{ iso: 'IL', name: 'Israel' },
	{ iso: 'IT', name: 'Italy' },
	{ iso: 'CI', name: 'Ivory Coast' },
	{ iso: 'JM', name: 'Jamaica' },
	{ iso: 'JP', name: 'Japan' },
	{ iso: 'JE', name: 'Jersey' },
	{ iso: 'JO', name: 'Jordan' },
	{ iso: 'KZ', name: 'Kazakhstan' },
	{ iso: 'KE', name: 'Kenya' },
	{ iso: 'KI', name: 'Kiribati' },
	{ iso: 'KW', name: 'Kuwait' },
	{ iso: 'KG', name: 'Kyrgyzstan' },
	{ iso: 'LA', name: 'Laos' },
	{ iso: 'LV', name: 'Latvia' },
	{ iso: 'LB', name: 'Lebanon' },
	{ iso: 'LS', name: 'Lesotho' },
	{ iso: 'LR', name: 'Liberia' },
	{ iso: 'LY', name: 'Libya' },
	{ iso: 'LI', name: 'Liechtenstein' },
	{ iso: 'LT', name: 'Lithuania' },
	{ iso: 'LU', name: 'Luxembourg' },
	{ iso: 'MO', name: 'Macau' },
	{ iso: 'MK', name: 'Macedonia' },
	{ iso: 'MG', name: 'Madagascar' },
	{ iso: 'MW', name: 'Malawi' },
	{ iso: 'MY', name: 'Malaysia' },
	{ iso: 'MV', name: 'Maldives' },
	{ iso: 'ML', name: 'Mali' },
	{ iso: 'MT', name: 'Malta' },
	{ iso: 'MH', name: 'Marshall Islands' },
	{ iso: 'MQ', name: 'Martinique' },
	{ iso: 'MR', name: 'Mauritania' },
	{ iso: 'MU', name: 'Mauritius' },
	{ iso: 'YT', name: 'Mayotte' },
	{ iso: 'MX', name: 'Mexico' },
	{ iso: 'FM', name: 'Micronesia' },
	{ iso: 'MD', name: 'Moldova' },
	{ iso: 'MC', name: 'Monaco' },
	{ iso: 'MN', name: 'Mongolia' },
	{ iso: 'ME', name: 'Montenegro' },
	{ iso: 'MS', name: 'Montserrat' },
	{ iso: 'MA', name: 'Morocco' },
	{ iso: 'MZ', name: 'Mozambique' },
	{ iso: 'MM', name: 'Myanmar' },
	{ iso: 'NA', name: 'Namibia' },
	{ iso: 'NR', name: 'Nauru' },
	{ iso: 'NP', name: 'Nepal' },
	{ iso: 'NL', name: 'Netherlands' },
	{ iso: 'NC', name: 'New Caledonia' },
	{ iso: 'NZ', name: 'New Zealand' },
	{ iso: 'NI', name: 'Nicaragua' },
	{ iso: 'NE', name: 'Niger' },
	{ iso: 'NG', name: 'Nigeria' },
	{ iso: 'NU', name: 'Niue' },
	{ iso: 'NF', name: 'Norfolk Island' },
	{ iso: 'KP', name: 'North Korea' },
	{ iso: 'MP', name: 'Northern Mariana Islands' },
	{ iso: 'NO', name: 'Norway' },
	{ iso: 'OM', name: 'Oman' },
	{ iso: 'PK', name: 'Pakistan' },
	{ iso: 'PW', name: 'Palau' },
	{ iso: 'PS', name: 'Palestinian Territories' },
	{ iso: 'PA', name: 'Panama' },
	{ iso: 'PG', name: 'Papua New Guinea' },
	{ iso: 'PY', name: 'Paraguay' },
	{ iso: 'PE', name: 'Peru' },
	{ iso: 'PH', name: 'Philippines' },
	{ iso: 'PN', name: 'Pitcairn Islands' },
	{ iso: 'PL', name: 'Poland' },
	{ iso: 'PT', name: 'Portugal' },
	{ iso: 'PR', name: 'Puerto Rico' },
	{ iso: 'QA', name: 'Qatar' },
	{ iso: 'RO', name: 'Romania' },
	{ iso: 'RU', name: 'Russia' },
	{ iso: 'RW', name: 'Rwanda' },
	{ iso: 'RE', name: 'Réunion' },
	{ iso: 'BL', name: 'Saint Barthélemy' },
	{ iso: 'KN', name: 'Saint Christopher & Nevis' },
	{ iso: 'SH', name: 'Saint Helena' },
	{ iso: 'LC', name: 'Saint Lucia' },
	{ iso: 'MF', name: 'Saint Martin' },
	{ iso: 'PM', name: 'Saint Pierre & Miquelon' },
	{ iso: 'VC', name: 'Saint Vincent & The Grenadines' },
	{ iso: 'WS', name: 'Samoa' },
	{ iso: 'SM', name: 'San Marino' },
	{ iso: 'ST', name: 'Sao Tome & Principe' },
	{ iso: 'SA', name: 'Saudi Arabia' },
	{ iso: 'SN', name: 'Senegal' },
	{ iso: 'RS', name: 'Serbia' },
	{ iso: 'SC', name: 'Seychelles' },
	{ iso: 'SL', name: 'Sierra Leone' },
	{ iso: 'SG', name: 'Singapore' },
	{ iso: 'SX', name: 'Sint Maarten' },
	{ iso: 'SK', name: 'Slovakia' },
	{ iso: 'SI', name: 'Slovenia' },
	{ iso: 'SB', name: 'Solomon Islands' },
	{ iso: 'SO', name: 'Somalia' },
	{ iso: 'ZA', name: 'South Africa' },
	{ iso: 'GS', name: 'South Georgia & The South Sandwich Islands' },
	{ iso: 'KR', name: 'South Korea' },
	{ iso: 'SS', name: 'South Sudan' },
	{ iso: 'ES', name: 'Spain' },
	{ iso: 'LK', name: 'Sri Lanka' },
	{ iso: 'SD', name: 'Sudan' },
	{ iso: 'SR', name: 'Suriname' },
	{ iso: 'SJ', name: 'Svalbard and Jan Mayen' },
	{ iso: 'SZ', name: 'Swaziland' },
	{ iso: 'SE', name: 'Sweden' },
	{ iso: 'CH', name: 'Switzerland' },
	{ iso: 'SY', name: 'Syria' },
	{ iso: 'TW', name: 'Taiwan' },
	{ iso: 'TJ', name: 'Tajikistan' },
	{ iso: 'TZ', name: 'Tanzania' },
	{ iso: 'TH', name: 'Thailand' },
	{ iso: 'TG', name: 'Togo' },
	{ iso: 'TK', name: 'Tokelau' },
	{ iso: 'TO', name: 'Tonga' },
	{ iso: 'TT', name: 'Trinidad & Tobago' },
	{ iso: 'TN', name: 'Tunisia' },
	{ iso: 'TR', name: 'Turkey' },
	{ iso: 'TM', name: 'Turkmenistan' },
	{ iso: 'TC', name: 'Turks & Caicos Islands' },
	{ iso: 'TV', name: 'Tuvalu' },
	{ iso: 'UG', name: 'Uganda' },
	{ iso: 'UA', name: 'Ukraine' },
	{ iso: 'AE', name: 'United Arab Emirates' },
	{ iso: 'GB', name: 'United Kingdom' },
	{ iso: 'US', name: 'United States' },
	{ iso: 'UM', name: 'United States Minor Outlying Islands' },
	{ iso: 'VI', name: 'United States Virgin Islands' },
	{ iso: 'UY', name: 'Uruguay' },
	{ iso: 'UZ', name: 'Uzbekistan' },
	{ iso: 'VU', name: 'Vanuatu' },
	{ iso: 'VE', name: 'Venezuela' },
	{ iso: 'VN', name: 'Vietnam' },
	{ iso: 'WF', name: 'Wallis & Futuna' },
	{ iso: 'EH', name: 'Western Sahara' },
	{ iso: 'YE', name: 'Yemen' },
	{ iso: 'ZM', name: 'Zambia' },
	{ iso: 'ZW', name: 'Zimbabwe' },
	{ iso: 'AX', name: 'Åland Islands' },
];
