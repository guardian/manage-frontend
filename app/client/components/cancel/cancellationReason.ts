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
  skipFeedback?: boolean;
}

export type CancellationReasonId =
  | "mma_financial_circumstances"
  | "mma_payment_issue"
  | "mma_editorial"
  | "mma_benefits"
  | "mma_support_another_way"
  | "mma_health"
  | "mma_break_from_news"
  | "mma_values"
  | "mma_other";
