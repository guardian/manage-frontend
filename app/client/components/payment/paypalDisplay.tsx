import React from "react";
import { PaypalLogo } from "./paypalLogo";

interface PayPalProps {
  payPalId?: string;
  shouldIncludePrefixCopy?: true;
}

export const getObfuscatedPayPalId = (rawId: string) => {
  return rawId.replace(
    /^(.)(.*?)(.?|.?@.+)$/,
    (_, firstChar, remainingChars, lastChar) => {
      const maskedRemainingChars = remainingChars.replace(/./g, "*");
      return firstChar + maskedRemainingChars + lastChar;
    }
  );
};

export const PayPalDisplay = (props: PayPalProps) => (
  <>
    <PaypalLogo />
    {props.payPalId && (
      <p>
        {props.shouldIncludePrefixCopy && (
          <>
            To update your payment details, please login to your PayPal account.
            <br />
            Your PayPal ID is&nbsp;
          </>
        )}
        {getObfuscatedPayPalId(props.payPalId)}
      </p>
    )}
  </>
);
