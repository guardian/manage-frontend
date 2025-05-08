import { css } from '@emotion/react';
import { textSans17 } from '@guardian/source/foundations';
import type { Subscription } from '@/shared/productResponse';
import { CardDisplay } from './CardDisplay';
import { DirectDebitDisplay } from './DirectDebitDisplay';
import { PaypalDisplay } from './PaypalDisplay';
import { SepaDisplay } from './SepaDisplay';

export const PaymentMethoDisplay = ({
	subscription,
	inPaymentFailure,
}: {
	subscription: Subscription;
	inPaymentFailure: boolean;
}) => (
	<div
		css={css`
			${textSans17}
		`}
		data-qm-masking="blocklist"
	>
		{subscription.card && (
			<CardDisplay
				inErrorState={inPaymentFailure}
				cssOverrides={css`
					margin: 0;
				`}
				{...subscription.card}
			/>
		)}
		{subscription.payPalEmail && (
			<PaypalDisplay inline={true} payPalId={subscription.payPalEmail} />
		)}
		{subscription.sepaMandate && (
			<SepaDisplay
				inline={true}
				accountName={subscription.sepaMandate.accountName}
				iban={subscription.sepaMandate.iban}
			/>
		)}
		{subscription.mandate && (
			<DirectDebitDisplay inline={true} {...subscription.mandate} />
		)}
		{subscription.stripePublicKeyForCardAddition && (
			<span>No Payment Method</span>
		)}
	</div>
);
