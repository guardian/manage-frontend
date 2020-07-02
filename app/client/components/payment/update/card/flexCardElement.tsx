import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement
} from "@stripe/react-stripe-js";
import React, { Dispatch, SetStateAction } from "react";
import { sans } from "../../../../styles/fonts";
import { FieldWrapper } from "../fieldWrapper";

interface FlexCardElementProps {
  disabled?: boolean;
  markCardNumberReady: Dispatch<SetStateAction<boolean>>;
  markCardExpiryReady: Dispatch<SetStateAction<boolean>>;
  markCardCVCReady: Dispatch<SetStateAction<boolean>>;
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
          onReady={() => props.markCardNumberReady(true)}
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
            onReady={() => props.markCardExpiryReady(true)}
          />
        </FieldWrapper>
        <FieldWrapper width="240px" label="CVC">
          <CardCvcElement
            options={{
              style: baseStyle
            }}
            onReady={() => props.markCardCVCReady(true)}
          />
        </FieldWrapper>
      </div>
    </div>
  </>
);
