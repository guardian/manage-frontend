import React from "react";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement
} from "react-stripe-elements";
import { sans } from "../../../../styles/fonts";
import { FieldWrapper } from "../fieldWrapper";

interface FlexCardElementProps {
  disabled?: boolean;
  markElementReady: (element: string) => () => void;
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
          style={baseStyle}
          placeholder="Card Number"
          onReady={props.markElementReady("CardNumberElement")}
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
            style={baseStyle}
            onReady={props.markElementReady("CardExpiryElement")}
          />
        </FieldWrapper>
        <FieldWrapper width="240px" label="CVC">
          <CardCVCElement
            style={baseStyle}
            onReady={props.markElementReady("CardCVCElement")}
          />
        </FieldWrapper>
      </div>
    </div>
  </>
);
