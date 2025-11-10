// Types for subscription billing frequency change (preview & switch) responses
// Derived from frequencyChangeSwitchSuccessResponseSchema and frequencyChangePreviewSuccessResponseSchema

export type FrequencyChangePeriod = 'year' | 'month';

export interface FrequencyChangePreviewSavings {
	amount: number;
	currency: string;
	period: FrequencyChangePeriod;
}

// Placeholder for future detailed invoice preview structure
export type ZuoraPreviewInvoice = Record<string, unknown>;

export interface FrequencyChangePreviewResponse {
	previewInvoices: ZuoraPreviewInvoice[];
	savings: FrequencyChangePreviewSavings;
}

export interface FrequencyChangeSwitchResponse {
	invoiceIds: string[];
}
