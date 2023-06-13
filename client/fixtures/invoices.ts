import type { InvoiceDataApiItem } from '../../shared/productResponse';
import { guardianWeeklyPaidByCard } from './productBuilder/testProducts';

export const guardianWeeklyCardInvoice: InvoiceDataApiItem = {
	invoiceId: '',
	subscriptionName: guardianWeeklyPaidByCard().subscription.subscriptionId,
	date: '2021-12-10',
	pdfPath: '',
	price: 135,
	paymentMethod: 'Card',
	last4: '4242',
	hasMultipleSubs: false,
};
