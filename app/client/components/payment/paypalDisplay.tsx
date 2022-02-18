import { PaypalLogo } from './paypalLogo';

interface PayPalProps {
	payPalId?: string;
	shouldIncludePrefixCopy?: true;
}

// Regex to split a PayPal ID into 3 groups:
//
// 1: (.)        First character
// 2: (.*?)      Zero or more remaining characters, lazily matched [1]
// 3: (.?|.?@.+) Zero or one character, or
//               zero or one character followed by an 'at' symbol and
//               one or more characters.
//
// [1] The 2nd group is lazily matched so it doesn't capture the final character
//     allowing it to be captured by the 3rd group instead.
//
// Examples:
//
// ID           | 1 | 2   | 3
// -------------|---|-----|---------
// james        | j | ame | s
// james@gu.com | j | ame | s@gu.com
// jim@gu.com   | j | i   | m@gu.com
// jm@gu.com    | j |     | m@gu.com
// j@gu.com     | j |     | @gu.com

const SPLIT_PAYPAL_ID_REGEX = /^(.)(.*?)(.?|.?@.+)$/;

export const getObfuscatedPayPalId = (rawId: string) => {
	return rawId.replace(
		SPLIT_PAYPAL_ID_REGEX,
		(_, firstChar, remainingChars, lastChar) =>
			`${firstChar}${remainingChars.replace(/./g, '*')}${lastChar}`,
	);
};

export const PayPalDisplay = (props: PayPalProps) => (
	<>
		<PaypalLogo />
		{props.payPalId && (
			<p>
				{props.shouldIncludePrefixCopy && (
					<>
						To update your payment details, please login to your
						PayPal account.
						<br />
						Your PayPal ID is&nbsp;
					</>
				)}
				{getObfuscatedPayPalId(props.payPalId)}
			</p>
		)}
	</>
);
