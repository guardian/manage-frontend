import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';
import type { DirectDebitDetails } from '../../../../shared/productResponse';
import { DirectDebitLogo } from './assets/DirectDebitLogo';
import type { Inlineable } from './inlineable';

const NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW = 3;

export const cleanSortCode = (sortCode: string) =>
	sortCode.replace(/[^0-9]/g, '');

const dashifySortCode = (sortCode: string) => {
	if (!sortCode) {
		return sortCode;
	}
	const cleanedSortCode = cleanSortCode(sortCode);
	if (cleanedSortCode.length !== 6) {
		return cleanedSortCode;
	}
	return (
		cleanedSortCode.substring(0, 2) +
		'-' +
		cleanedSortCode.substring(2, 4) +
		'-' +
		cleanedSortCode.substring(4, 6)
	);
};

export const sanitiseAccountNumber = (
	accountNumber: string,
	shortVersion?: boolean,
) => {
	if (!accountNumber) {
		return accountNumber;
	}
	return (
		accountNumber.length >= NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW && (
			<span
				css={css`
					${from.tablet} {
						:before {
							display: inline;
							content: '${shortVersion ? '' : 'account '}';
						}
					}
				`}
			>
				{`ending ${accountNumber.substr(
					accountNumber.length -
						NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW,
				)}`}
			</span>
		)
	);
};

interface DirectDebitDisplayProps extends DirectDebitDetails, Inlineable {
	showAccountName?: true;
	inErrorState?: boolean;
	onlyAccountEnding?: true;
	onlySortCode?: true;
}

export const DirectDebitDisplay = (props: DirectDebitDisplayProps) => {
	if (props.onlyAccountEnding) {
		return (
			<div
				css={css`
					display: flex;
					align-items: center;
				`}
			>
				<DirectDebitLogo
					fill={palette.brand[400]}
					additionalCss={css`
						margin-right: 10px;
					`}
				/>
				<span>{sanitiseAccountNumber(props.accountNumber, true)}</span>
			</div>
		);
	}

	if (props.onlySortCode) {
		return (
			<div
				css={css`
					display: flex;
					justify-content: right;
					${from.tablet} {
						justify-content: left;
					}
				`}
			>
				<DirectDebitLogo
					fill={palette.brand[400]}
					additionalCss={css`
						margin: auto 10px auto 0;
						width: 47px;
						height: 16px;
					`}
				/>
				<span
					css={css`
						margin-right: 10px;
					`}
				>
					{dashifySortCode(props.sortCode)}
				</span>
			</div>
		);
	}

	if (props.inline) {
		return (
			<div
				css={css`
					display: flex;
					align-items: center;
				`}
			>
				<DirectDebitLogo fill={palette.brand[400]} />
				<span
					css={css`
						margin-left: 0.5ch;
					`}
				>
					{dashifySortCode(props.sortCode)}{' '}
					{sanitiseAccountNumber(props.accountNumber)}
				</span>
			</div>
		);
	}

	return (
		<>
			<DirectDebitLogo
				fill={palette.brand[400]}
				additionalCss={css`
					margin: 0 10px 0 0;
				`}
			/>
			<div>
				<span
					css={css`
						margin-right: 10px;
					`}
				>
					{dashifySortCode(props.sortCode)}
				</span>
				<span
					css={css`
						display: block;
					`}
				>
					{sanitiseAccountNumber(props.accountNumber)}
				</span>
				{props.showAccountName && props.accountName ? (
					<span>{props.accountName}</span>
				) : undefined}
			</div>
		</>
	);
};
