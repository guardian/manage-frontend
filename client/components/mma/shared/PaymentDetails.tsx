import { css } from '@emotion/react';
import type { Subscription } from '../../../../shared/productResponse';
import { DirectDebitLogo } from './assets/DirectDebitLogo';
import { PaypalLogo } from './assets/PaypalLogo';
import { cardTypeToSVG } from './CardDisplay';
import { getObfuscatedPayPalId } from './PaypalDisplay';

export const PaymentDetails = (props: { subscription: Subscription }) => {
	const subscription = props.subscription;

	const cardType = (type: string) => {
		if (type !== 'MasterCard') {
			return `${type} card`;
		}
		return type;
	};

	const containerCss = css`
		display: inline-flex;
		align-items: center;
		font-weight: 700;
		max-width: 100%;
		> svg {
			flex: 0 0 auto;
			margin-left: 0.5ch;
		}
	`;

	const truncateCss = css`
		flex: 0 1 auto;
		overflow: hidden;
		text-overflow: ellipsis;
	`;

	return (
		<span css={containerCss} data-qm-masking="blocklist">
			{subscription.card && (
				<>
					{cardType(subscription.card.type)} ending{' '}
					{subscription.card.last4}
					{cardTypeToSVG(subscription.card.type)}
				</>
			)}
			{subscription.payPalEmail && (
				<>
					<span css={truncateCss}>
						{getObfuscatedPayPalId(subscription.payPalEmail)}
					</span>
					<PaypalLogo />
				</>
			)}
			{subscription.mandate && (
				<>
					account ending{' '}
					{subscription.mandate.accountNumber.slice(-3)}
					<DirectDebitLogo />
				</>
			)}
			{subscription.sepaMandate && (
				<>
					SEPA {subscription.sepaMandate.accountName}{' '}
					{subscription.sepaMandate.iban}
				</>
			)}
		</span>
	);
};
