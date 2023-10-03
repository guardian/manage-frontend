import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { InlineError } from '@guardian/source-react-components';
import type { ProductDetail } from '@/shared/productResponse';
import { getMainPlan } from '@/shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';
import { PaypalLogo } from '../shared/assets/PaypalLogo';
import { CardDisplay } from '../shared/CardDisplay';
import {
	DirectDebitDisplay,
	sanitiseAccountNumber,
} from '../shared/DirectDebitDisplay';
import { getObfuscatedPayPalId } from '../shared/PaypalDisplay';

function cardExpired(year: number, month: number) {
	const expiryTimestamp = new Date(year, month);
	const now = new Date();

	return expiryTimestamp < now;
}

export const CurrentPaymentDetails = (props: ProductDetail) => {
	const { subscription } = props;

	const mainPlan = getMainPlan(subscription);
	const hasCancellationPending: boolean = subscription.cancelledAt;

	const groupedProductType = GROUPED_PRODUCT_TYPES[props.mmaCategory];

	const specificProductType = groupedProductType.mapGroupedToSpecific(props);

	const keyValuePairCss = css`
		list-style: none;
		margin: 0;
		padding: 0;
	`;

	const keyCss = css`
		${textSans.medium({ fontWeight: 'bold' })};
		padding: 0 ${space[2]}px 0 0;
		display: inline-block;
		vertical-align: top;
		width: 14ch;
	`;

	const valueCss = css`
		${textSans.medium()};
		padding: 0;
		display: inline-block;
		vertical-align: top;
		width: calc(100% - 15ch);

		text-align: right;

		${from.tablet} {
			text-align: left;
		}
	`;

	const hasPaymentFailure: boolean = !!props.alertText;

	return (
		<div
			css={css`
				border: 1px solid ${palette.neutral[86]};
				margin-bottom: ${space[4]}px;
			`}
		>
			<div
				css={css`
					display: flex;
					justify-content: space-between;
					align-items: start;
					background-color: ${hasCancellationPending
						? palette.neutral[97]
						: palette.brand[400]};
					${from.mobileLandscape} {
						align-items: center;
					}
				`}
			>
				<h2
					css={css`
						font-size: 17px;
						font-weight: bold;
						margin: 0;
						padding: ${space[3]}px;
						color: ${hasCancellationPending
							? palette.neutral[7]
							: palette.neutral[100]};
						${until.mobileLandscape} {
							padding: ${space[3]}px;
						}
						${from.tablet} {
							font-size: 20px;
							padding: ${space[3]}px ${space[5]}px;
						}
					`}
				>
					{specificProductType.productTitle(mainPlan)}
				</h2>
				<div
					css={css`
						display: flex;
						align-items: center;
						padding: ${space[3]}px 0;
						${until.mobileLandscape} {
							flex-direction: column;
							align-items: end;
						}
					`}
				></div>
			</div>
			<div
				css={css`
					padding: ${space[5]}px ${space[3]}px;
					${from.tablet} {
						padding: ${space[5]}px;
						display: flex;
					}
				`}
			>
				<div
					css={css`
						padding-bottom: ${space[3]}px;

						${from.tablet} {
							flex: 1;
							display: flex;
							flex-flow: column nowrap;
							padding: 0;
							margin: 0;
						}
					`}
				>
					{props.isPaidTier && (
						<>
							<ul css={keyValuePairCss}>
								<li css={keyCss}>Payment method</li>
								<li css={valueCss} data-qm-masking="blocklist">
									{subscription.card && (
										<CardDisplay
											inErrorState={hasPaymentFailure}
											cssOverrides={css`
												margin: 0;
												justify-content: flex-end;
												${from.tablet} {
													justify-content: left;
												}
											`}
											{...subscription.card}
										/>
									)}
									{subscription.payPalEmail && <PaypalLogo />}
									{subscription.sepaMandate && (
										<div>SEPA</div>
									)}
									{subscription.mandate && (
										<span
											css={css`
												text-align: right;
												${from.tablet} {
													text-align: left;
												}
											`}
										>
											{sanitiseAccountNumber(
												subscription.mandate
													.accountNumber,
												false,
											)}
										</span>
									)}
									{subscription.stripePublicKeyForCardAddition && (
										<span>No Payment Method</span>
									)}
								</li>
							</ul>
						</>
					)}
				</div>
				<div
					css={css`
						padding: ${space[3]}px 0 0 0;
						border-top: 1px solid ${palette.neutral[86]};
						${subscription.mandate ? 'text-align: right;' : ''}

						${from.tablet} {
							flex: 1;
							display: inline-block;
							flex-flow: column nowrap;
							padding: 0 0 0 ${space[5]}px;
							margin: 0;
							text-align: center;
							border-top: none;
						}
						ul:last-of-type {
							margin-bottom: ${space[5]}px;
						}
					`}
				>
					{subscription.card && subscription.card.expiry && (
						<>
							<span
								css={css`
									${keyCss};
									${from.tablet} {
										text-align: right;
									}
								`}
							>
								{cardExpired(
									subscription.card.expiry.year,
									subscription.card.expiry.month,
								) ? (
									<InlineError>Expired</InlineError>
								) : (
									<>Expiry</>
								)}
							</span>
							<span
								data-qm-masking="blocklist"
								css={css`
									${valueCss};
									color: ${hasPaymentFailure
										? palette.error[400]
										: palette.neutral[7]};
								`}
							>
								{subscription.card.expiry.month} /{' '}
								{subscription.card.expiry.year}
							</span>
						</>
					)}

					{subscription.sepaMandate && (
						<span
							css={css`
								${valueCss};
							`}
						>
							<div>
								{subscription.sepaMandate.accountName}
								<br />
								{subscription.sepaMandate.iban}
							</div>
						</span>
					)}

					{subscription.mandate && (
						<span
							css={css`
								${valueCss};
								color: ${hasPaymentFailure
									? palette.error[400]
									: palette.neutral[7]};
							`}
						>
							<DirectDebitDisplay
								{...subscription.mandate}
								onlySortCode
							/>
						</span>
					)}

					{subscription.payPalEmail && (
						<span
							css={css`
								${valueCss};
							`}
						>
							{getObfuscatedPayPalId(subscription.payPalEmail)}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};
