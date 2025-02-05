import {
	financialCircumstances,
	standardAlternateFeedbackIntro,
} from '../cancellationConstants';
import type { CancellationReason } from '../cancellationReason';

export const supporterplusCancellationReasons: CancellationReason[] = [
	{
		reasonId: 'mma_editorial',
		linkLabel: 'I am unhappy with some editorial decisions',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_financial_circumstances',
		linkLabel: 'I can no longer afford to support you',
		saveBody: financialCircumstances,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_price_increase',
		linkLabel: 'The price has recently increased',
		saveBody: financialCircumstances,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_support_another_way',
		linkLabel: 'I’d like to support you, but at a lower amount',
		saveBody: financialCircumstances,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_values',
		linkLabel: 'I don’t feel that the Guardian values my support',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_benefits',
		linkLabel:
			'I’m not fully satisfied with the product features or benefits',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_break_from_news',
		linkLabel: 'I’m taking a break from news',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_dont_read_enough',
		linkLabel: 'I don’t have enough time to read regularly',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_issue',
		linkLabel: 'I’m having technical issues',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_health',
		linkLabel: 'I’m dealing with personal or health matters',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
];

export const otherCancellationReason: CancellationReason[] = [
	{
		reasonId: 'mma_other',
		linkLabel: 'Another reason (please specify)',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
];

const shuffledArray = [...supporterplusCancellationReasons].sort(
	() => 0.5 - Math.random(),
);

export const shuffledSupporterPlusCancellationReasons: CancellationReason[] = [
	...shuffledArray,
	...otherCancellationReason,
];
