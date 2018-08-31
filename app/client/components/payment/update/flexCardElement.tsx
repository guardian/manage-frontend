import React from "react";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement
} from "react-stripe-elements";
import { sans } from "../../../styles/fonts";
import { FieldWrapper } from "./fieldWrapper";
import { stripeLogo } from "./stripe-logo";

export interface FlexCardElementProps {
  disabled?: boolean;
}

const baseStyle = {
  base: {
    fontSize: "18px",
    fontFamily: sans
  }
};

export class FlexCardElement extends React.PureComponent<FlexCardElementProps> {
  /*TODO find some way to lock these based on this.props.disabled*/

  public render(): React.ReactNode {
    return (
      <div
        css={{
          textAlign: "left"
        }}
      >
        <FieldWrapper width="500px" label="Card Number">
          <CardNumberElement style={baseStyle} placeholder="Card Number" />
        </FieldWrapper>
        <div
          css={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "12px"
          }}
        >
          <FieldWrapper width="240px" label="Expiry Date">
            <CardExpiryElement style={baseStyle} />
          </FieldWrapper>
          <FieldWrapper width="240px" label="CVC">
            <CardCVCElement style={baseStyle} />
          </FieldWrapper>
        </div>
        <a href="https://stripe.com/" target="_blank">
          {stripeLogo()}
        </a>
      </div>
    );
  }
}
