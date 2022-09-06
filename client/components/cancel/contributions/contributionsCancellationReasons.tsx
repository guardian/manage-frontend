import {
	getMainPlan,
	isPaidSubscriptionPlan,
	ProductDetail,
} from '../../../../shared/productResponse';
import { CancellationReason } from '../cancellationReason';
import ContributionsCancellationAmountUpdatedSaved from './contributionsCancellationAmountUpdatedSaved';
import ContributionsCancellationFlowFinancialSaveAttempt from './contributionsCancellationFlowFinancialSaveAttempt';
import ContributionsCancellationPaymentIssueSaveAttempt from './contributionsCancellationFlowPaymentIssueSaveAttempt';

const alternateFeedbackIntro =
	'Please share any further thoughts you have about cancelling – you can help us improve. Thank you.';

export const contributionsCancellationReasons: CancellationReason[] = [
	{
		reasonId: 'mma_article',
		linkLabel: 'As a result of a specific article I read',
		saveTitle: 'As a result of a specific article you read',
		alternateFeedbackIntro,
	},
	{
		reasonId: 'mma_editorial',
		linkLabel: 'I disagree with some editorial decisions',
		saveTitle:
			'You disagree with some of The Guardian’s editorial decisions',
		alternateFeedbackIntro,
	},
	{
		reasonId: 'mma_values',
		linkLabel: 'I don’t feel that The Guardian values my support',
		saveTitle: 'You don’t feel that The Guardian values your support',
		alternateFeedbackIntro,
	},
	{
		reasonId: 'mma_support_another_way',
		linkLabel: 'I support in another way, e.g. with a subscription',
		saveTitle:
			'You support The Guardian in another way, e.g. with a subscription',
		alternateFeedbackIntro,
	},
	{
		reasonId: 'mma_financial_circumstances',
		linkLabel: 'I can no longer afford it',
		saveTitle: 'You can no longer afford your current contribution',
		saveBody: ContributionsCancellationFlowFinancialSaveAttempt,
		savedBody: ContributionsCancellationAmountUpdatedSaved,
		hideSaveActions: true,
		skipFeedback: true,
		hideContactUs: true,
	},
	{
		reasonId: 'mma_value_for_money',
		linkLabel: 'I wasn’t getting value for money',
		saveTitle: 'You don’t feel your contribution offers you adequate value',
		alternateFeedbackIntro,
	},
	{
		reasonId: 'mma_payment_issue',
		linkLabel: 'A payment issue',
		saveTitle: 'You have experienced an issue with your payment',
		saveBody: ContributionsCancellationPaymentIssueSaveAttempt,
		savedBody: ContributionsCancellationAmountUpdatedSaved,
		hideSaveActions: true,
		skipFeedback: true,
		hideContactUs: true,
	},
	{
		reasonId: 'mma_direct_debit',
		linkLabel: 'I want to change to Direct Debit',
		saveTitle: 'You would prefer to contribute using Direct Debit',
		saveBody: [
			"Unfortunately it's not yet possible to switch to paying by Direct Debit online. We’re working on it. To make this change, please contact our customer services team, who will be happy to help you.",
		],
		skipFeedback: true,
	},
	{
		reasonId: 'mma_one_off',
		linkLabel: 'I would rather make a single contribution',
		saveTitle: 'You would prefer to make a single contribution',
		saveBody: [
			'After cancelling your monthly or annual contribution, we will show you how to make a single contribution quickly and easily.',
		],
		alternateFeedbackIntro,
	},
	{
		reasonId: 'mma_wants_annual_contribution',
		linkLabel: 'I would rather make an annual contribution',
		saveTitle: 'You would prefer to make an annual contribution',
		saveBody: [
			'After cancelling your monthly contribution, we will show you how to set up an annual contribution quickly and easily.',
		],
		alternateFeedbackIntro,
		shouldShow: (productDetail: ProductDetail) => {
			const mainPlan = getMainPlan(productDetail.subscription);
			if (!isPaidSubscriptionPlan(mainPlan)) {
				return false;
			}
			return mainPlan.interval === 'month';
		},
	},
	{
		reasonId: 'mma_wants_monthly_contribution',
		linkLabel: 'I would rather make a monthly contribution',
		saveTitle: 'You would prefer to make a monthly contribution',
		saveBody: [
			'After cancelling your annual contribution, we will show you how to set up an monthly contribution quickly and easily.',
		],
		alternateFeedbackIntro,
		shouldShow: (productDetail: ProductDetail) => {
			const mainPlan = getMainPlan(productDetail.subscription);
			if (!isPaidSubscriptionPlan(mainPlan)) {
				return false;
			}
			return mainPlan.interval === 'year';
		},
	},
	{
		reasonId: 'mma_health',
		linkLabel: 'Ill-health',
		saveTitle:
			'You would like to cancel your contribution due to health reasons',
		saveBody: [
			'Your contributions have ensured that our quality journalism remains open for everyone to read and enjoy. Please confirm your cancellation below.',
		],
		skipFeedback: true,
	},
	{
		reasonId: 'mma_other',
		linkLabel: 'None of the above',
		saveTitle: '',
		alternateFeedbackIntro,
	},
];
