export interface CancellationReason {
  reasonId: string;
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
