import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	palette,
	space,
	textSans17,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import { useState } from 'react';
import { parseDate } from '@/shared/dates';
import type { InvoiceDataApiItem } from '@/shared/productResponse';
import { trackEvent } from '../../../utilities/analytics';
import { DownloadIcon } from '../shared/assets/DownloadIcon';
import { CardDisplay } from '../shared/CardDisplay';
import { DirectDebitDisplay } from '../shared/DirectDebitDisplay';
import { Pagination } from '../shared/Pagination';
import { PaypalDisplay } from '../shared/PaypalDisplay';
import { SepaDisplay } from '../shared/SepaDisplay';
import { InvoiceTableYearSelect } from './InvoiceTableYearSelect';

const invoicePaymentMethods = {
	CARD: 'card',
	DIRECT_DEBIT: 'directdebit',
	PAYPAL: 'paypal',
	SEPA: 'sepa',
};

interface InvoiceInfo extends InvoiceDataApiItem {
	productUrlPart?: string;
	currencyISO: string;
	currency: string;
}

interface InvoicesTableProps {
	resultsPerPage: number;
	invoiceData: InvoiceInfo[];
}

export const InvoicesTable = (props: InvoicesTableProps) => {
	const [
		trackingPaginationInteractionCount,
		setTrackingPaginationInteractionCount,
	] = useState<number>(1);
	const initialPage = 1;

	const [currentPage, setCurrentPage] = useState<number>(initialPage);

	const tableHeadings = ['Date', 'Payment method', 'Price', ''];
	const invoiceYears = [
		...new Set(
			[...props.invoiceData].map(
				(invoice) => `${parseDate(invoice.date).date.getFullYear()}`,
			),
		),
	];
	const [currentInvoiceYear, setCurrentInvoiceYear] = useState<string>(
		invoiceYears[0],
	);

	const [currentPaginationPage, setCurrentPaginationPage] =
		useState<number>(initialPage);

	const directPaginationUpdate = (newPageNumber: number) => {
		const targetInvoiceYear = `${parseDate(
			props.invoiceData[(newPageNumber - 1) * props.resultsPerPage].date,
		).date.getFullYear()}`;
		setCurrentInvoiceYear(targetInvoiceYear);
		setCurrentPage(newPageNumber);
		trackEvent({
			eventCategory: 'invoice',
			eventAction: 'click',
			eventLabel: 'invoice_pagination_select',
			eventValue: trackingPaginationInteractionCount,
		});
		setTrackingPaginationInteractionCount(
			trackingPaginationInteractionCount + 1,
		);
	};

	const directYearUpdate = (newYear: string) => {
		const invoiceIndex = props.invoiceData.findIndex(
			(invoice) =>
				`${parseDate(invoice.date).date.getFullYear()}` === newYear,
		);
		const targetPage = Math.ceil((invoiceIndex + 1) / props.resultsPerPage);
		setCurrentPaginationPage(targetPage);
		setCurrentPage(targetPage);
	};

	const tableCss2 = css`
		display: block;
		width: 100%;
		border: 1px solid ${palette.neutral[86]};
		${from.tablet} {
			display: table;
		}
	`;

	const tableHeaderCss2 = css`
		display: block;
		${from.tablet} {
			display: table-header-group;
		}
	`;

	const tableBodyCss2 = css`
		display: block;
		${from.tablet} {
			display: table-row-group;
		}
	`;

	const invoiceYearSelectCss = css`
		display: none;
		padding: ${space[3]}px;
		background-color: ${palette.neutral[97]};
		border-bottom: 1px solid ${palette.neutral[86]};
		${from.tablet} {
			display: table-cell;
			padding: ${space[5]}px ${space[5]}px ${space[5]}px 0;
		}
	`;

	const tableTitleCss2 = css`
		display: table-cell;
		${headlineBold20};
		padding: ${space[5]}px;
		background-color: ${palette.neutral[97]};
		border-bottom: 1px solid ${palette.neutral[86]};
		${until.tablet} {
			margin: 0;
			padding: ${space[3]}px;
			font-size: 1.0625rem;
			line-height: 1.6;
			border-bottom: 0;
			display: block;
		}
	`;

	const thCss2 = css`
		display: table-cell;
		text-align: left;
		${textSansBold17};
		padding: ${space[5]}px;
		${until.tablet} {
			padding: ${space[3]}px;
		}
	`;

	const tableHeadingsRowCss2 = css`
		display: none;
		${from.tablet} {
			display: table-row;
		}
	`;

	const tableRowCss2 = css`
		display: block;
		${from.tablet} {
			display: table-row;
		}
	`;

	const tdCss2 = (rowIndex: number, title?: string) => css`
		display: block;
		${textSans17};
		padding: ${space[3]}px ${space[3]}px 0;
		:last-of-type {
			${until.tablet} {
				border-bottom: 1px solid ${palette.neutral[86]};
			}
			padding: ${space[3]}px;
		}
		:before {
			display: ${title ? 'inline-block' : 'none'};
			width: calc(60% - ${space[3]}px);
			padding-right: ${space[3]}px;
			${textSansBold17};
			content: '${title}';
		}
		${from.tablet} {
			display: table-cell;
			width: auto;
			padding: ${space[5]}px;
			margin: 0;
			border-top: 1px solid ${palette.neutral[86]};
			background-color: ${rowIndex % 2 === 0
				? palette.neutral[97]
				: 'transparent'};
			:before {
				display: none;
				content: '';
			}
		}
	`;

	const paymentDetailsHolderCss = css`
		display: inline-block;
		width: calc(40% + ${space[3]}px);
		${from.tablet} {
			width: auto;
			min-width: 15ch;
		}
	`;

	const invoiceLinkCss = css`
		color: ${palette.brand[400]};
		font-weight: bold;
	`;

	const invoiceDownloadLinkCss = css`
		display: inline-block;
		width: 22px;
		margin-left: ${space[6]}px;
	`;

	return (
		<>
			<div css={tableCss2}>
				<header css={tableHeaderCss2}>
					<div css={tableRowCss2}>
						<h2 css={tableTitleCss2}>Invoices</h2>
						<div
							css={css`
								display: none;
								background-color: ${palette.neutral[97]};
								border-bottom: 1px solid ${palette.neutral[86]};
								${from.tablet} {
									display: table-cell;
								}
							`}
						/>
						<div
							css={css`
								display: none;
								background-color: ${palette.neutral[97]};
								border-bottom: 1px solid ${palette.neutral[86]};
								${from.tablet} {
									display: table-cell;
								}
							`}
						/>
						<div css={invoiceYearSelectCss}>
							<InvoiceTableYearSelect
								years={invoiceYears}
								selectedYear={currentInvoiceYear}
								setSelectedYear={setCurrentInvoiceYear}
								onDirectUpdate={directYearUpdate}
							/>
						</div>
					</div>
					<div css={tableHeadingsRowCss2}>
						{tableHeadings.map((tableHeading, index) => (
							<div css={thCss2} key={`invoiceTH-${index}`}>
								{tableHeading}
							</div>
						))}
					</div>
				</header>
				<div css={tableBodyCss2}>
					{props.invoiceData
						.filter(
							(_, index) =>
								index >=
									(currentPage - 1) * props.resultsPerPage &&
								index <
									(currentPage - 1) * props.resultsPerPage +
										props.resultsPerPage,
						)
						.map((tableRow, index) => {
							const paymentMethodLowercase =
								tableRow.paymentMethod.toLowerCase();
							return (
								<div
									css={tableRowCss2}
									key={tableRow.invoiceId}
								>
									<div css={tdCss2(index, tableHeadings[0])}>
										{parseDate(tableRow.date).dateStr()}
									</div>
									<div css={tdCss2(index, tableHeadings[1])}>
										<div
											css={paymentDetailsHolderCss}
											data-qm-masking="blocklist"
										>
											{tableRow.cardType &&
												tableRow.last4 && (
													<CardDisplay
														cssOverrides={css`
															margin: 0;
														`}
														last4={tableRow.last4}
														type={tableRow.cardType}
													/>
												)}
											{paymentMethodLowercase ===
												invoicePaymentMethods.PAYPAL && (
												<PaypalDisplay />
											)}
											{paymentMethodLowercase ===
												invoicePaymentMethods.DIRECT_DEBIT &&
												tableRow.last4 && (
													<DirectDebitDisplay
														accountNumber={
															tableRow.last4
														}
														accountName=""
														sortCode=""
														onlyAccountEnding
													/>
												)}
											{paymentMethodLowercase ===
												invoicePaymentMethods.SEPA &&
												tableRow.last4 && (
													<SepaDisplay
														accountName=""
														iban={tableRow.last4}
													/>
												)}
											{paymentMethodLowercase !==
												invoicePaymentMethods.CARD &&
												paymentMethodLowercase !==
													invoicePaymentMethods.PAYPAL &&
												paymentMethodLowercase !==
													invoicePaymentMethods.DIRECT_DEBIT &&
												paymentMethodLowercase !==
													invoicePaymentMethods.SEPA && (
													<span>
														No Payment Method
													</span>
												)}
										</div>
									</div>
									<div css={tdCss2(index, tableHeadings[2])}>
										{tableRow.hasMultipleSubs
											? 'Multiple prices'
											: `${tableRow.currency}${Number(
													tableRow.price,
											  ).toFixed(2)} ${
													tableRow.currencyISO
											  }`}
									</div>
									<div css={tdCss2(index)}>
										<a
											css={invoiceLinkCss}
											href={tableRow.pdfPath}
											onClick={() =>
												trackEvent({
													eventCategory: 'invoice',
													eventAction: 'click',
													eventLabel: `view_${tableRow.productUrlPart}_pdf_invoice`,
												})
											}
										>
											View invoice (PDF)
										</a>
										<a
											css={invoiceDownloadLinkCss}
											download={`invoice_${
												tableRow.subscriptionName
											}_${parseDate(
												tableRow.date,
											).dateStr('yyyy-MM-dd')}.pdf`}
											href={tableRow.pdfPath}
											onClick={() =>
												trackEvent({
													eventCategory: 'invoice',
													eventAction: 'click',
													eventLabel: `download_${tableRow.productUrlPart}_pdf_invoice`,
												})
											}
										>
											<DownloadIcon />
										</a>
									</div>
								</div>
							);
						})}
				</div>
			</div>
			{props.resultsPerPage < props.invoiceData.length && (
				<Pagination
					currentPage={currentPaginationPage}
					setCurrentPage={setCurrentPaginationPage}
					onDirectUpdate={directPaginationUpdate}
					numberOfResults={props.invoiceData.length}
					resultsPerPage={props.resultsPerPage}
					additionalCSS={css`
						margin-top: ${space[5]}px;
					`}
				/>
			)}
		</>
	);
};
