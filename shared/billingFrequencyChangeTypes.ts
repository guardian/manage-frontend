// Types for subscription billing frequency change (preview & switch) responses
// Derived from frequencyChangeSwitchSuccessResponseSchema and frequencyChangePreviewSuccessResponseSchema

export type BillingFrequencyChangePeriod = 'year' | 'month';

export interface BillingFrequencyChangePreviewSavings {
	amount: number;
	currency: string;
	period: BillingFrequencyChangePeriod;
}

// Placeholder for future detailed invoice preview structure
export type ZuoraPreviewInvoice = Record<string, unknown>;

export interface BillingFrequencyChangePreview {
	previewInvoices: ZuoraPreviewInvoice[];
	savings: BillingFrequencyChangePreviewSavings;
}

export interface BillingFrequencyChangeSwitch {
	invoiceIds: string[];
}
