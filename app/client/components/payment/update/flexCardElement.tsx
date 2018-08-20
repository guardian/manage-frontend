import React from "react";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement
} from "react-stripe-elements";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";

export interface FlexCardElementProps {
  disabled?: boolean;
}

const baseStyle = {
  base: {
    fontSize: "18px",
    fontFamily: sans
  }
};

interface FieldWrapperProps {
  label: string;
  width: string;
  children: any; // TODO refine the type to single StripeElement
  grow?: true;
}

const FieldWrapper = (props: FieldWrapperProps) => (
  <div
    css={{
      minWidth: props.width,
      flexGrow: props.grow ? "1" : undefined,
      margin: "10px",
      textAlign: "left"
    }}
  >
    <span css={{ marginLeft: "5px" }}>{props.label}</span>
    <div
      css={{
        borderRadius: "10px",
        backgroundColor: palette.neutral["7"],
        padding: "5px 10px"
      }}
    >
      {props.children}
    </div>
  </div>
);

export class FlexCardElement extends React.PureComponent<FlexCardElementProps> {
  /*TODO find some way to lock these based on this.props.disabled*/
  /*TODO add powered by Stripe badge - https://stripe.com/about/resources*/

  public render(): React.ReactNode {
    return (
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <FieldWrapper width="210px" label="Card Number" grow>
          <CardNumberElement style={baseStyle} placeholder="Card Number" />
        </FieldWrapper>
        <FieldWrapper width="100px" label="Expiry Date">
          <CardExpiryElement style={baseStyle} />
        </FieldWrapper>
        <FieldWrapper width="80px" label="CVC">
          <CardCVCElement style={baseStyle} />
        </FieldWrapper>
      </div>
    );
  }
}
