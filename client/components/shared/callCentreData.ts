import type { PhoneRegionKey } from '@/shared/productResponse';

export type PhoneRegion = {
	key: PhoneRegionKey;
	title: string;
	openingHours: string[];
	phoneNumbers: Array<{ phoneNumber: string; suffix?: string }>;
	additionalOpeningHoursInfo?: string;
};

export const customerHelpEmailAddress = 'customer.help@theguardian.com';

export const phoneData: PhoneRegion[] = [
	{
		key: 'UK & ROW',
		title: 'United Kingdom, Europe and rest of world',
		openingHours: [
			'8am - 6pm Monday - Friday (GMT/BST)',
			'9am - 6pm Saturday - Sunday (GMT/BST)',
		],
		phoneNumbers: [
			{
				phoneNumber: '+44 (0) 330 333 6767',
			},
		],
	},
	{
		key: 'AUS',
		title: 'Australia, New Zealand, and Asia Pacific',
		openingHours: ['9am - 5pm Monday - Friday (AEDT)'],
		phoneNumbers: [
			{
				phoneNumber: '1800 773 766',
				suffix: '(within Australia)',
			},
			{
				phoneNumber: '+61 28076 8599',
				suffix: '(outside Australia)',
			},
		],
	},
	{
		key: 'US',
		title: 'Canada and USA',
		openingHours: ['9am - 5pm on weekdays (EST/EDT)'],
		phoneNumbers: [
			{
				phoneNumber: '1-844-632-2010',
				suffix: '(toll free USA)',
			},
			{
				phoneNumber: '+1 917-900-4663',
				suffix: '(outside USA)',
			},
		],
	},
];
