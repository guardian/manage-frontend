import type { ProductDetail } from '../../../../shared/productResponse';
import type { SavedBodyProps } from './stages/savedCancellation';

export interface SaveBodyProps {
	caseId: string;
}

export interface CancellationReason {
	reasonId: CancellationReasonId;
	linkLabel: string;
	saveTitle?: string;
	saveBody?: string[] | React.FC<SaveBodyProps>;
	hideSaveActions?: boolean;
	escalationSaveBody?: string[] | React.FC<SaveBodyProps>;
	alternateCallUsPrefix?: string;
	alternateFeedbackIntro?: string;
	alternateFeedbackThankYouTitle?: string;
	alternateFeedbackThankYouBody?: string;
	hideContactUs?: boolean;
	skipFeedback?: boolean;
	savedBody?: React.FC<SavedBodyProps>;
	shouldShow?: (productDetail: ProductDetail) => boolean;
}

export type CancellationReasonId =
	| 'mma_autorenew'
	| 'mma_covid'
	| 'mma_delivery_issue'
	| 'mma_redemption_issue'
	| 'mma_time'
	| 'mma_dont_read_enough'
	| 'mma_better_offer'
	| 'mma_issue'
	| 'mma_financial_circumstances'
	| 'mma_cost_of_living'
	| 'mma_cutting_subscriptions'
	| 'mma_payment_issue'
	| 'mma_article'
	| 'mma_editorial'
	| 'mma_benefits'
	| 'mma_value_for_money'
	| 'mma_support_another_way'
	| 'mma_prefer_lower_amount'
	| 'mma_prefer_less_frequent'
	| 'mma_direct_debit'
	| 'mma_one_off'
	| 'mma_wants_monthly_contribution'
	| 'mma_wants_annual_contribution'
	| 'mma_health'
	| 'mma_break_from_news'
	| 'mma_values'
	| 'mma_no_need'
	| 'mma_dont_know_what_for'
	| 'mma_other';

export type OptionalCancellationReasonId = CancellationReasonId | undefined;
