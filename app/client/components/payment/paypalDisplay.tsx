import React from "react";
import { PaypalLogo } from "./paypalLogo";

interface PayPalProps {
  payPalId?: string;
  shouldIncludePrefixCopy?: true;
}

export const getObfuscatedPayPalId = (rawId: string) => {
  const indexOfAtSymbol = rawId.indexOf("@");
  if (indexOfAtSymbol > -1) {
    return `${rawId.charAt(0)}${"*".repeat(indexOfAtSymbol - 2)}${rawId.charAt(
      indexOfAtSymbol - 1
    )}${rawId.substring(indexOfAtSymbol)}`;
  }
  return `${rawId.charAt(0)}${"*".repeat(rawId.length - 2)}${rawId.charAt(
    rawId.length - 1
  )}`;
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
