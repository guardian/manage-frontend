import type { CancellationReason } from '../cancellationReason';
import { BreakFromNewsWithGW, PaymentIssue } from '../GenericSaveBodyResponses';

export const membershipCancellationReasons: CancellationReason[] = [
	{
		reasonId: 'mma_financial_circumstances',
		linkLabel: 'A change in my financial circumstances',
		saveTitle:
			'We understand that financial circumstances can change from time to time',
		saveBody: [
			'Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. There are a number of flexible ways to support us and one of our customer service specialist would be happy to hear from you.',
		],
	},
	{
		reasonId: 'mma_payment_issue',
		linkLabel: "I didn't expect The Guardian to take another payment",
		saveTitle: 'We are sorry that you have been charged again',
		saveBody: PaymentIssue,
		alternateFeedbackIntro: '',
	},
	{
		reasonId: 'mma_editorial',
		linkLabel: 'I am unhappy with Guardian journalism',
		saveTitle:
			'In order to improve our journalism, we’d love to know more about why you are thinking of cancelling',
		saveBody: [
			'If there’s anything we can do differently please take a moment to contact our customer services team we would be happy to hear from you.',
		],
	},
	{
		reasonId: 'mma_benefits',
		linkLabel: 'None of the membership benefits are of interest to me',
		saveTitle:
			'In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling',
		saveBody: [
			'If there’s anything we can do differently please take a moment to give us some feedback',
		],
	},
	{
		reasonId: 'mma_support_another_way',
		linkLabel:
			'I am going to support The Guardian in another way, eg. by subscribing',
		saveTitle: 'Thank you for your ongoing support.',
		saveBody: ['Please confirm your membership cancellation below.'],
		alternateCallUsPrefix:
			'If you’re not sure what’s best for you or would like help, to contact us',
		alternateFeedbackIntro:
			"Alternatively if you'd like to give us feedback, please enter in the box the below.",
		// "Alternatively please provide some more details in the form below and we’ll get back to you as soon as possible",
		// alternateFeedbackThankYouBody:  "One of our customer service specialists will be in touch shortly."
	},
	{
		reasonId: 'mma_health',
		linkLabel: 'Ill-health',
		saveTitle: 'Thank you so much for your support.',
		saveBody: [
			'Your contribution has ensured that our quality journalism remains open for everyone to read and enjoy. Please confirm your cancellation below.',
		],
		skipFeedback: true,
		hideContactUs: true,
	},
	{
		reasonId: 'mma_break_from_news',
		linkLabel: 'I am taking a break from news',
		saveTitle:
			'We understand that sometimes the news cycle can feel a little overwhelming.',
		saveBody: BreakFromNewsWithGW,
	},
	{
		reasonId: 'mma_values',
		linkLabel: "I don't feel that the Guardian values my support",
		saveTitle:
			'In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling',
		saveBody: [
			'If there’s anything we can do differently please take a moment to give us some feedback',
		],
	},
	{
		reasonId: 'mma_other',
		linkLabel: 'Other',
		saveTitle:
			'In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling',
		saveBody: [
			'If there’s anything we can do differently please take a moment to give us some feedback',
		],
	},
];
