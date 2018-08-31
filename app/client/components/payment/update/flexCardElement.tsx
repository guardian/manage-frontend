import React from "react";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement
} from "react-stripe-elements";
import { sans } from "../../../styles/fonts";
import { Spinner } from "../../spinner";
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

export interface FlexCardElementState {
  readyElements: string[];
}

export class FlexCardElement extends React.Component<
  FlexCardElementProps,
  FlexCardElementState
> {
  /*TODO find some way to lock these based on this.props.disabled*/
  /*TODO add powered by Stripe badge - https://stripe.com/about/resources*/

  public state = { readyElements: [] };

  public render(): React.ReactNode {
    return (
      <>
        <div
          css={{
            display: this.state.readyElements.length === 3 ? "flex" : "none",
            justifyContent: "space-between",
            flexWrap: "wrap"
          }}
        >
          <FieldWrapper width="210px" label="Card Number" grow>
            <CardNumberElement
              style={baseStyle}
              placeholder="Card Number"
              onReady={this.markElementReady("CardNumberElement")}
            />
          </FieldWrapper>
          <FieldWrapper width="100px" label="Expiry Date">
            <CardExpiryElement
              style={baseStyle}
              onReady={this.markElementReady("CardExpiryElement")}
            />
          </FieldWrapper>
          <FieldWrapper width="80px" label="CVC">
            <CardCVCElement
              style={baseStyle}
              onReady={this.markElementReady("CardCVCElement")}
            />
          </FieldWrapper>
        </div>
        <div
          css={{
            display: this.state.readyElements.length === 3 ? "none" : "block"
          }}
        >
          <Spinner loadingMessage="Preparing card details form..." />
        </div>
      </>
    );
  }

  private markElementReady = (element: string) => () =>
    this.setState(prevState => ({
      readyElements: prevState.readyElements.concat(element)
    }));
}
