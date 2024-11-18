import { shuffleArray } from '@/client/utilities/utils';
import { standardAlternateFeedbackIntro } from '../cancellationConstants';
import type { CancellationReason } from '../cancellationReason';
import { ContributionsCancellationAmountUpdatedSaved } from './ContributionsCancellationAmountUpdatedSaved';
import { ContributionsCancellationFlowFinancialSaveAttempt } from './ContributionsCancellationFlowFinancialSaveAttempt';

export const contributionsCancellationReasons: CancellationReason[] = [
	{
		reasonId: 'mma_editorial',
		linkLabel: 'I am unhappy with some editorial decisions',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
	},
	{
		reasonId: 'mma_financial_circumstances',
		linkLabel: 'I can no longer afford to support you',
		saveBody: ContributionsCancellationFlowFinancialSaveAttempt,
		savedBody: ContributionsCancellationAmountUpdatedSaved,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
		hideSaveActions: true,
		skipFeedback: true,
		hideContactUs: true,
	},
	{
		reasonId: 'mma_price_increase',
		linkLabel: 'The price has recently increased',
		saveBody: ContributionsCancellationFlowFinancialSaveAttempt,
		savedBody: ContributionsCancellationAmountUpdatedSaved,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
		hideSaveActions: true,
		skipFeedback: true,
		hideContactUs: true,
	},
	{
		reasonId: 'mma_benefits',
		linkLabel:
			'I’m not fully satisfied with the product features or benefits',
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
		saveBody: [
			'Thank you for your ongoing support. Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
		],
	},
	{
		reasonId: 'mma_support_another_way',
		linkLabel: 'I want to support in a different way',
		saveBody: ContributionsCancellationFlowFinancialSaveAttempt,
		savedBody: ContributionsCancellationAmountUpdatedSaved,
		alternateFeedbackIntro: standardAlternateFeedbackIntro,
		hideSaveActions: true,
	},
	{
		reasonId: 'mma_values',
		linkLabel: 'I don’t feel that the Guardian values my support',
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

export const shuffledContributionsCancellationReasons: CancellationReason[] = [
	...(shuffleArray(contributionsCancellationReasons) as CancellationReason[]),
	...otherCancellationReason,
];
