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
		reasonId: 'mma_article',
		linkLabel: 'As a result of a specific article I read',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_financial_circumstances',
		linkLabel: 'I can no longer afford to support you',
		saveBody: financialCircumstances,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_cost_of_living',
		linkLabel: 'Due to the cost of living crisis',
		saveBody: financialCircumstances,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_cutting_subscriptions',
		linkLabel:
			'I’m cutting down on my subscriptions with various organisations',
		saveBody: financialCircumstances,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_prefer_lower_amount',
		linkLabel: 'I’d like to support you, but at a lower amount',
		saveBody: financialCircumstances,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_prefer_less_frequent',
		linkLabel: 'I’d like to support you, but less frequently',
		saveBody: financialCircumstances,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_one_off',
		linkLabel:
			'I’d rather give spontaneously than have a recurring payment',
		saveBody: financialCircumstances,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_values',
		linkLabel: 'I don’t feel that the Guardian values my support',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_no_need',
		linkLabel: 'I don’t think the Guardian needs my support',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_dont_know_what_for',
		linkLabel: 'I don’t know what my money is being used for',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_value_for_money',
		linkLabel:
			'I didn’t get enough value for money from my ‘supporter extras’',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_break_from_news',
		linkLabel: 'I am taking a break from news',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_dont_read_enough',
		linkLabel: 'I no longer read the Guardian enough to justify my support',
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

const shuffledArray = supporterplusCancellationReasons.sort(
	() => 0.5 - Math.random(),
);

export const shuffledSupporterPlusCancellationReasons: CancellationReason[] =
	shuffledArray.concat(otherCancellationReason);
