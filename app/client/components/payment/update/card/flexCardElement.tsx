import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement
} from "@stripe/react-stripe-js";
import { StripeElementBase } from "@stripe/stripe-js";
import React, { Dispatch, SetStateAction } from "react";
import { sans } from "../../../../styles/fonts";
import { FieldWrapper } from "../fieldWrapper";

interface FlexCardElementProps {
  disabled?: boolean;
  setCardNumberElement: Dispatch<SetStateAction<undefined | StripeElementBase>>;
  setCardExpiryElement: Dispatch<SetStateAction<undefined | StripeElementBase>>;
  setCardCVCElement: Dispatch<SetStateAction<undefined | StripeElementBase>>;
}

const baseStyle = {
  base: {
    fontSize: "18px",
    fontFamily: sans
  }
};

/*TODO find some way to lock these based on this.props.disabled*/
export const FlexCardElement = (props: FlexCardElementProps) => (
  <>
    <div
      css={{
        textAlign: "left"
      }}
    >
      <FieldWrapper width="500px" label="Card Number">
        <CardNumberElement
          options={{
            style: baseStyle,
            placeholder: "Card Number"
          }}
          onReady={props.setCardNumberElement}
        />
      </FieldWrapper>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "12px"
        }}
      >
        <FieldWrapper width="240px" label="Expiry Date">
          <CardExpiryElement
            options={{
              style: baseStyle
            }}
            onReady={props.setCardExpiryElement}
          />
        </FieldWrapper>
        <FieldWrapper width="240px" label="CVC">
          <CardCvcElement
            options={{
              style: baseStyle
            }}
            onReady={props.setCardCVCElement}
          />
        </FieldWrapper>
      </div>
    </div>
  </>
);
