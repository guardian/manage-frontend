import palette from '../colours';

export const ukPhoneNumberWithoutPrefix = '0330 333 6790';

export interface CallCentreNumbersProps {
	prefixText?: string;
}

// TODO after Coronavirus, migrate uses of this to the newer callCenterEmailAndNumbers.tsx
export const CallCentreNumbers = (props: CallCentreNumbersProps) => (
	<div>
		{props.prefixText || 'To contact us'}&nbsp;directly, please email&nbsp;
		<a
			css={{
				textDecoration: 'underline',
				color: palette.blue.dark,
				':visited': { color: palette.blue.dark },
			}}
			href="mailto:customer.help@theguardian.com"
		>
			customer.help@theguardian.com
		</a>
		.
	</div>
);
