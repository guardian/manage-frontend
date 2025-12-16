// Types for subscription billing frequency change (preview & switch) responses
// Derived from frequencyChangeSwitchSuccessResponseSchema and frequencyChangePreviewSuccessResponseSchema

import type { ProductDetail } from './productResponse';

export type BillingFrequencySwitchPeriod = 'year' | 'month';

export interface BillingFrequencySwitchPreviewValue {
	amount: number;
	period: BillingFrequencySwitchPeriod;
}

// Placeholder for future detailed invoice preview structure
export type ZuoraPreviewInvoice = Record<string, unknown>;

export interface BillingFrequencySwitchPreview {
	currency: string;
	previewInvoices: ZuoraPreviewInvoice[];
	savings: BillingFrequencySwitchPreviewValue;
	newPrice: BillingFrequencySwitchPreviewValue;
	currentContribution: BillingFrequencySwitchPreviewValue;
	currentDiscount: BillingFrequencySwitchPreviewValue;
}

export interface BillingFrequencySwitchResult {
	invoiceIds: string[];
}

export interface BillingFrequencySwitchPreviewState {
	productDetail: ProductDetail;
	preview: BillingFrequencySwitchPreview;
}
