import React from "react";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement
} from "react-stripe-elements";
import { sans } from "../../../styles/fonts";
import { FieldWrapper } from "./fieldWrapper";

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
  /*TODO add powered by Stripe badge - https://stripe.com/about/resources*/

  public render(): React.ReactNode {
    return (
      <div>
        <FieldWrapper width="500px" label="Card Number">
          <CardNumberElement style={baseStyle} placeholder="Card Number" />
        </FieldWrapper>
        <div
          css={{
            display: "flex",
            justifyContent: "flex-start"
          }}
        >
          <FieldWrapper width="300px" label="Expiry Date">
            <CardExpiryElement style={baseStyle} />
          </FieldWrapper>
          <FieldWrapper width="200px" label="CVC">
            <CardCVCElement style={baseStyle} />
          </FieldWrapper>
        </div>
      </div>
    );
  }
}
