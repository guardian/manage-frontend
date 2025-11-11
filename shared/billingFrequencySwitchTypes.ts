// Types for subscription billing frequency change (preview & switch) responses
// Derived from frequencyChangeSwitchSuccessResponseSchema and frequencyChangePreviewSuccessResponseSchema

import type { ProductDetail } from './productResponse';

export type BillingFrequencySwitchPeriod = 'year' | 'month';

export interface BillingFrequencySwitchPreviewValue {
	amount: number;
	currency: string;
	period: BillingFrequencySwitchPeriod;
}

// Placeholder for future detailed invoice preview structure
export type ZuoraPreviewInvoice = Record<string, unknown>;

export interface BillingFrequencySwitchPreview {
	previewInvoices: ZuoraPreviewInvoice[];
	savings: BillingFrequencySwitchPreviewValue;
	newPrice: BillingFrequencySwitchPreviewValue;
}

export interface BillingFrequencySwitchResult {
	invoiceIds: string[];
}

export interface BillingFrequencySwitchPreviewState {
	productDetail: ProductDetail;
	preview: BillingFrequencySwitchPreview;
}
