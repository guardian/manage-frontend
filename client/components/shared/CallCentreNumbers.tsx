import { palette } from '@guardian/source/foundations';

export const ukPhoneNumberWithoutPrefix = '0330 333 6790';

export interface CallCentreNumbersProps {
	prefixText?: string;
}

// TODO after Coronavirus, migrate uses of this to the newer CallCenterEmailAndNumbers.tsx
export const CallCentreNumbers = (props: CallCentreNumbersProps) => (
	<div>
		{props.prefixText || 'To contact us'}&nbsp;directly, please email&nbsp;
		<a
			css={{
				textDecoration: 'underline',
				color: palette.sport[300],
				':visited': { color: palette.sport[300] },
			}}
			href="mailto:customer.help@theguardian.com"
		>
			customer.help@theguardian.com
		</a>
		.
	</div>
);
