import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
} from '@stripe/react-stripe-js';
import { StripeElementBase } from '@stripe/stripe-js';
import { Dispatch, SetStateAction } from 'react';
import { css } from '@emotion/react';
import { minWidth } from '../../../../styles/breakpoints';
import { space } from '@guardian/src-foundations';
import { sans } from '../../../../styles/fonts';
import { FieldWrapper } from '../fieldWrapper';
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
		fontSize: '17px',
		fontFamily: sans,
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
		{getLogos(PaymentMethod.card)}
	</div>
);
/*TODO find some way to lock these based on this.props.disabled*/
export const FlexCardElement = (props: FlexCardElementProps) => (
	<>
		<div
			css={{
				marginTop: `${space[9]}px`,
				marginBottom: `${space[9]}px`,
				textAlign: 'left',
			}}
		>
			<FieldWrapper
				width="100%"
				label="Card Number"
				cornerHint={numberCornerHint()}
			>
				<CardNumberElement
					options={{
						style: baseStyle,
						placeholder: '•••• •••• •••• ••••',
					}}
					onReady={props.setCardNumberElement}
				/>
			</FieldWrapper>
			<div
				css={css`
					display: flex;
					justify-content: flex-start;

					${minWidth.tablet} {
						margin-top: ${space[4]}px;
					}
				`}
			>
				<FieldWrapper width="50%" label="Expiry Date">
					<CardExpiryElement
						options={{
							style: baseStyle,
							placeholder: 'MM/YY',
						}}
						onReady={props.setCardExpiryElement}
					/>
				</FieldWrapper>
				<FieldWrapper width="50%" label="CVC">
					<CardCvcElement
						options={{
							style: baseStyle,
							placeholder: '123',
						}}
						onReady={props.setCardCVCElement}
					/>
				</FieldWrapper>
			</div>
		</div>
	</>
);
