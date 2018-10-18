export interface CancellationReason {
  reasonId: CancellationReasonId;
  linkLabel: string;
  saveTitle: string;
  saveBody: string | JSX.Element;
  experimentSaveBody?: JSX.Element;
  experimentTriggerFlag?: string;
  alternateCallUsPrefix?: string;
  alternateFeedbackIntro?: string;
  alternateFeedbackThankYouTitle?: string;
  alternateFeedbackThankYouBody?: string;
  hideContactUs?: boolean;
  skipFeedback?: boolean;
}

export type CancellationReasonId =
  | "mma_financial_circumstances"
  | "mma_payment_issue"
  | "mma_article"
  | "mma_editorial"
  | "mma_benefits"
  | "mma_value_for_money"
  | "mma_support_another_way"
  | "mma_direct_debit"
  | "mma_one_off"
  | "mma_wants_monthly_contribution"
  | "mma_wants_annual_contribution"
  | "mma_health"
  | "mma_break_from_news"
  | "mma_values"
  | "mma_other";

export type OptionalCancellationReasonId = CancellationReasonId | undefined;
