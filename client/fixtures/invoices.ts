import type { InvoiceDataApiItem } from '../../shared/productResponse';
import { guardianWeeklyCard } from './productDetail';

export const guardianWeeklyCardInvoice: InvoiceDataApiItem = {
	invoiceId: '',
	subscriptionName: guardianWeeklyCard.subscription.subscriptionId,
	date: '2021-12-10',
	pdfPath: '',
	price: 135,
	paymentMethod: 'Card',
	last4: '4242',
	hasMultipleSubs: false,
};
