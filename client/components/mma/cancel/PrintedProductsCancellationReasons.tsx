import { shuffleArray } from '@/client/utilities/utils';
import { standardAlternateFeedbackIntro } from './cancellationConstants';
import type { CancellationReason } from './cancellationReason';

export const printedProductsCancellationReasons: CancellationReason[] = [
	{
		reasonId: 'mma_dont_read_enough',
		linkLabel: "I don't use the subscription enough to justify the cost",
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_benefits',
		linkLabel:
			"The subscription's benefits and features don't match my expectations",
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_time',
		linkLabel: 'I no longer engage with the content as I used to',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_issue',
		linkLabel:
			'I have encountered usability/technical issues or delivery issues',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_financial_circumstances',
		linkLabel:
			'My personal circumstances have changed, or I have decided to take a break from the news',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_duplicate_subscription',
		linkLabel:
			'I realised I have a duplicate subscription or am already covered by a multiple account plan',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_editorial',
		linkLabel: 'I am unhappy with some editorial decisions',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
];

export const otherCancellationReason: CancellationReason[] = [
	{
		reasonId: 'mma_other',
		linkLabel: 'Other (please specify)',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
];

export const shuffledPrintedProductsCancellationReasons: CancellationReason[] =
	[
		...(shuffleArray(
			printedProductsCancellationReasons,
		) as CancellationReason[]),
		...otherCancellationReason,
	];
