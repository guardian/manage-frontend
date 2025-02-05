import { css } from '@emotion/react';
import { from, space, textSans17Object } from '@guardian/source/foundations';
import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
} from '@stripe/react-stripe-js';
import type { StripeElementBase } from '@stripe/stripe-js';
import type { Dispatch, SetStateAction } from 'react';
import { FieldWrapper } from '../FieldWrapper';
import { getLogos, PaymentMethod } from '../PaymentDetailUpdate';

interface FlexCardElementProps {
	disabled?: boolean;
	setCardNumberElement: Dispatch<
		SetStateAction<undefined | StripeElementBase>
	>;
	setCardExpiryElement: Dispatch<
		SetStateAction<undefined | StripeElementBase>
	>;
	setCardCVCElement: Dispatch<SetStateAction<undefined | StripeElementBase>>;
}

const baseStyle = {
	base: {
		...{ textSans17Object },
		'::placeholder': {
			color: '#c4c4c4',
		},
		':-ms-input-placeholder': {
			color: '#c4c4c4',
		},
	},
};

const numberCornerHint = () => (
	<div
		css={css`
			display: flex;
		`}
	>
		{getLogos(PaymentMethod.Card)}
	</div>
);
/*TODO find some way to lock these based on this.props.disabled*/
export const FlexCardElement = (props: FlexCardElementProps) => (
	<>
		<div
			css={css`
				margin-top: ${space[9]}px;
				margin-bottom: ${space[9]}px;
				textalign: left;
			`}
		>
			<FieldWrapper
				width="100%"
				label="Card Number"
				cornerHint={numberCornerHint()}
			>
				<span data-qm-masking="blocklist">
					<CardNumberElement
						options={{
							style: baseStyle,
							placeholder: '•••• •••• •••• ••••',
						}}
						onReady={props.setCardNumberElement}
					/>
				</span>
			</FieldWrapper>
			<div
				css={css`
					display: flex;
					justify-content: flex-start;

					${from.tablet} {
						margin-top: ${space[4]}px;
					}
				`}
			>
				<FieldWrapper width="50%" label="Expiry Date">
					<span data-qm-masking="blocklist">
						<CardExpiryElement
							options={{
								style: baseStyle,
								placeholder: 'MM/YY',
							}}
							onReady={props.setCardExpiryElement}
						/>
					</span>
				</FieldWrapper>
				<FieldWrapper width="50%" label="CVC">
					<span data-qm-masking="blocklist">
						<CardCvcElement
							options={{
								style: baseStyle,
								placeholder: '123',
							}}
							onReady={props.setCardCVCElement}
						/>
					</span>
				</FieldWrapper>
			</div>
		</div>
	</>
);
