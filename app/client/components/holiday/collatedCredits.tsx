import React from 'react';
import { DATE_FNS_LONG_OUTPUT_FORMAT } from '../../../shared/dates';
import { HolidayStopDetail } from './holidayStopApi';

interface CollatedCreditByInvoiceDate {
	[invoiceDateString: string]: number;
}

const reduceCreditCallback = (
	accumulator: CollatedCreditByInvoiceDate | null,
	currentValue: HolidayStopDetail,
) => {
	const credit = currentValue.actualPrice || currentValue.estimatedPrice;
	if (accumulator && currentValue.invoiceDate && credit) {
		const invoiceDateAsString = currentValue.invoiceDate.dateStr(
			DATE_FNS_LONG_OUTPUT_FORMAT,
		);
		return {
			...accumulator,
			[invoiceDateAsString]:
				credit + (accumulator[invoiceDateAsString] || 0),
		};
	}
	return null; // if we don't have credits and dates for EVERY entry we shouldn't show anything
};

interface CollatedCreditsProps {
	publicationsImpacted: HolidayStopDetail[];
	currency?: string;
	withBullet?: true;
}

export const CollatedCredits = (props: CollatedCreditsProps) => {
	const collatedCreditsByInvoiceDate: CollatedCreditByInvoiceDate | null =
		props.publicationsImpacted.reduce(
			reduceCreditCallback,
			{} as CollatedCreditByInvoiceDate,
		);

	return (
		<div>
			{collatedCreditsByInvoiceDate
				? Object.keys(collatedCreditsByInvoiceDate).map(
						(invoiceDateString, index) => (
							<div key={`cc-${index}`}>
								{props.withBullet && '- '}
								<strong>
									{props.currency}
									{Math.abs(
										collatedCreditsByInvoiceDate[
											invoiceDateString
										],
									).toFixed(2)}
								</strong>{' '}
								off your {invoiceDateString} payment
							</div>
						),
				  )
				: 'Unavailable at this time.'}
		</div>
	);
};
