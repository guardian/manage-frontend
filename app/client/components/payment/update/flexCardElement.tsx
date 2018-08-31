import React from "react";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement
} from "react-stripe-elements";
import { sans } from "../../../styles/fonts";
import { Spinner } from "../../spinner";
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

export interface FlexCardElementState {
  readyElements: string[];
}

export class FlexCardElement extends React.Component<
  FlexCardElementProps,
  FlexCardElementState
> {
  /*TODO find some way to lock these based on this.props.disabled*/

  public state = { readyElements: [] };

  public render(): React.ReactNode {
    return (
      <>
        <div
          css={{
            display: this.state.readyElements.length === 3 ? "block" : "none",
            textAlign: "left"
          }}
        >
          <FieldWrapper width="500px" label="Card Number">
            <CardNumberElement
              style={baseStyle}
              placeholder="Card Number"
              onReady={this.markElementReady("CardNumberElement")}
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
                onReady={this.markElementReady("CardExpiryElement")}
              />
            </FieldWrapper>
            <FieldWrapper width="240px" label="CVC">
              <CardCVCElement
                style={baseStyle}
                onReady={this.markElementReady("CardCVCElement")}
              />
            </FieldWrapper>
          </div>
          <a href="https://stripe.com/" target="_blank">
            {stripeLogo()}
          </a>
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
