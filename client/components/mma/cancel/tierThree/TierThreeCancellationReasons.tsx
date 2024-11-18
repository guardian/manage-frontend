import { shuffleArray } from '@/client/utilities/utils';
import {
	inOrderToImproveSubs,
	standardAlternateFeedbackIntro,
} from '../cancellationConstants';
import type { CancellationReason } from '../cancellationReason';
import { BreakFromNewsWithAlternative } from '../GenericSaveBodyResponses';

export const tierThreeCancellationReasons: CancellationReason[] = [
	{
		reasonId: 'mma_editorial',
		linkLabel: 'I am unhappy with Guardian journalism',
		saveBody: [
			'In order to improve our journalism, we’d love to know more about why you are thinking of cancelling.',
		],
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_financial_circumstances',
		linkLabel: 'A change in my financial circumstances',
		saveBody: [
			'We understand that financial circumstances can change from time to time.',
			'Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. Once you’ve completed your cancellation below, we hope you’ll consider a small one off or recurring contribution in the future.',
		],
		skipFeedback: true,
	},
	{
		reasonId: 'mma_support_another_way',
		linkLabel:
			'I am going to support The Guardian in another way, eg. by subscribing',
		saveBody: [
			'Thank you for your ongoing support.',
			'Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
		],
		skipFeedback: true,
	},
	{
		reasonId: 'mma_health',
		linkLabel: 'Ill-health',
		saveBody: [
			'Thank you for your ongoing support.',
			'Your subscription has ensured that our quality journalism remains open for everyone to read and enjoy.',
			'Please confirm your cancellation below.',
		],
		skipFeedback: true,
	},
	{
		reasonId: 'mma_break_from_news',
		linkLabel: 'I am taking a break from news',
		saveBody: BreakFromNewsWithAlternative,
		escalationSaveBody: [
			'We’d love to know more about what we could do better to help provide inspiring and trustworthy news.',
		],
	},
	{
		reasonId: 'mma_values',
		linkLabel: 'I don’t feel that The Guardian values my support',
		alternateFeedbackIntro: inOrderToImproveSubs,
	},
	{
		reasonId: 'mma_time',
		linkLabel: "I don't have time to use my subscription",
		alternateFeedbackIntro: inOrderToImproveSubs,
	},
	{
		reasonId: 'mma_better_offer',
		linkLabel: "I've found a better offer with another publisher",
		alternateFeedbackIntro: inOrderToImproveSubs,
	},
	{
		reasonId: 'mma_value_for_money',
		linkLabel: "I wasn't getting value for money",
		alternateFeedbackIntro: inOrderToImproveSubs,
	},
	{
		reasonId: 'mma_covid',
		linkLabel: 'My subscription use is disrupted due to COVID-19',
		alternateFeedbackIntro: inOrderToImproveSubs,
	},
	{
		reasonId: 'mma_delivery_issue',
		linkLabel: 'I’ve had repeated delivery issues',
		alternateFeedbackIntro: inOrderToImproveSubs,
	},
	{
		reasonId: 'mma_autorenew',
		linkLabel: 'I don’t want an auto-renewing subscription',
		skipFeedback: true,
	},
];

export const otherCancellationReason: CancellationReason[] = [
	{
		reasonId: 'mma_other',
		linkLabel: 'None of the above',
		saveTitle: 'Other',
		alternateFeedbackIntro: inOrderToImproveSubs,
	},
];

export const shuffledTierThreeCancellationReasons: CancellationReason[] = [
	...(shuffleArray(tierThreeCancellationReasons) as CancellationReason[]),
	...otherCancellationReason,
];
